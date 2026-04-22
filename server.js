const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const QRCode = require("qrcode");
const { Server } = require("socket.io");

dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || "";
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "";
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || "";
const GOOGLE_SPEECH_API_KEY =
  process.env.GOOGLE_SPEECH_API_KEY || process.env.GOOGLE_TRANSLATE_API_KEY || "";
const HTTPS_ENABLED = String(process.env.HTTPS || "false").toLowerCase() === "true";
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || "";
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || "";
const SSL_PFX_PATH = process.env.SSL_PFX_PATH || "";
const SSL_PFX_PASSWORD = process.env.SSL_PFX_PASSWORD || "";
const ROOM_TTL_MS = 10 * 60 * 1000;
const CACHE_LIMIT = 500;
const CORS_ORIGINS = parseCorsOrigins(process.env.CORS_ORIGIN);

const TRANSLATE_CODE_MAP = {
  "ar-SA": "ar",
  "de-DE": "de",
  "en-US": "en",
  "es-ES": "es",
  "fr-FR": "fr",
  "hi-IN": "hi",
  "id-ID": "id",
  "it-IT": "it",
  "ja-JP": "ja",
  "ko-KR": "ko",
  "pt-BR": "pt",
  "ru-RU": "ru",
  "th-TH": "th",
  "tr-TR": "tr",
  "vi-VN": "vi",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW"
};

const app = express();
const server = createTransportServer(app);
const io = new Server(server, {
  cors: {
    origin: allowCorsOrigin,
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();
const translationCache = new Map();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: allowCorsOrigin,
    credentials: true
  })
);
app.use(express.json({ limit: "25mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    port: PORT,
    httpsEnabled: HTTPS_ENABLED,
    translationProvider: getTranslationProvider(),
    publicBaseUrl: PUBLIC_BASE_URL || null,
    timestamp: Date.now()
  });
});

app.get("/api/runtime-config", (req, res) => {
  res.json({
    serverOrigin: getBackendOrigin(req),
    publicBaseUrl: PUBLIC_BASE_URL || getBackendOrigin(req),
    translationProvider: getTranslationProvider(),
    httpsEnabled: HTTPS_ENABLED,
    speechToTextConfigured: Boolean(GOOGLE_SPEECH_API_KEY)
  });
});

app.post("/api/rooms", async (req, res) => {
  try {
    const roomCode = createUniqueRoomCode();
    const joinUrl = buildJoinUrl(req, roomCode);
    const qrCodeDataUrl = await QRCode.toDataURL(joinUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: "#F4E8FF",
        light: "#0D0A16"
      }
    });

    rooms.set(roomCode, {
      code: roomCode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      participants: new Map(),
      history: []
    });

    res.status(201).json({
      roomCode,
      joinUrl,
      qrCodeDataUrl
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create room.",
      detail: error.message
    });
  }
});

app.post("/api/transcribe-external-audio", async (req, res) => {
  try {
    const runtimeSpeechApiKey = String(
      req.body.googleApiKey || GOOGLE_SPEECH_API_KEY || GOOGLE_TRANSLATE_API_KEY || ""
    ).trim();

    if (!runtimeSpeechApiKey) {
      res.status(503).json({
        message: "Google Speech-to-Text API key is not configured.",
        detail: "Set GOOGLE_SPEECH_API_KEY in your environment or provide a key from the app settings."
      });
      return;
    }

    const audioBase64 = String(req.body.audioBase64 || "").trim();
    const mimeType = String(req.body.mimeType || "audio/webm;codecs=opus").trim();
    const languageCode = String(req.body.languageCode || "en-US").trim();

    if (!audioBase64) {
      res.status(400).json({
        message: "No audio data was provided."
      });
      return;
    }

    const transcript = await transcribeExternalAudio({
      audioBase64,
      mimeType,
      languageCode,
      apiKey: runtimeSpeechApiKey
    });

    res.json({
      ok: true,
      transcript
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to transcribe external audio.",
      detail: error.message
    });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("join-room", async (payload, callback = () => {}) => {
    try {
      const roomCode = sanitizeRoomCode(payload.roomCode);
      const room = rooms.get(roomCode);

      if (!room) {
        callback({ ok: false, message: "Room code not found." });
        return;
      }

      const participant = {
        id: socket.id,
        name: sanitizeName(payload.name),
        isHost: Boolean(payload.isHost),
        inputLanguage: payload.inputLanguage,
        outputLanguage: payload.outputLanguage,
        joinedAt: Date.now()
      };

      room.participants.set(socket.id, participant);
      room.updatedAt = Date.now();
      socket.join(roomCode);
      socket.data.roomCode = roomCode;

      callback({
        ok: true,
        room: serializeRoom(room),
        participant,
        history: await buildTranslatedHistoryForParticipant(room, participant)
      });

      io.to(roomCode).emit("room-state", serializeRoom(room));
    } catch (error) {
      callback({
        ok: false,
        message: "Failed to join room.",
        detail: error.message
      });
    }
  });

  socket.on("update-preferences", async (payload, callback = () => {}) => {
    const roomCode = socket.data.roomCode;
    const room = rooms.get(roomCode);

    if (!room || !room.participants.has(socket.id)) {
      callback({ ok: false, message: "Active room not found." });
      return;
    }

    try {
      const participant = room.participants.get(socket.id);
      participant.name = sanitizeName(payload.name || participant.name);
      participant.inputLanguage = payload.inputLanguage || participant.inputLanguage;
      participant.outputLanguage = payload.outputLanguage || participant.outputLanguage;
      room.updatedAt = Date.now();

      callback({
        ok: true,
        participant,
        history: await buildTranslatedHistoryForParticipant(room, participant)
      });
      io.to(roomCode).emit("room-state", serializeRoom(room));
    } catch (error) {
      callback({ ok: false, message: "Failed to update preferences.", detail: error.message });
    }
  });

  socket.on("speech-chunk", async (payload, callback = () => {}) => {
    const roomCode = socket.data.roomCode;
    const room = rooms.get(roomCode);

    if (!room || !room.participants.has(socket.id)) {
      callback({ ok: false, message: "No active room." });
      return;
    }

    const speaker = room.participants.get(socket.id);
    const text = String(payload.text || "").trim();

    if (!text) {
      callback({ ok: false, message: "No text to translate." });
      return;
    }

    room.updatedAt = Date.now();

    if (payload.isFinal) {
      upsertRoomHistory(room, {
        messageId: payload.messageId,
        speakerId: speaker.id,
        speakerName: speaker.name,
        speakerInputLanguage: speaker.inputLanguage,
        originalText: text,
        timestamp: Date.now()
      });
    }

    const recipients = Array.from(room.participants.values());
    const translationJobs = recipients.map(async (recipient) => {
      const translatedText = await safeTranslate({
        text,
        sourceLanguage: toTranslateCode(speaker.inputLanguage),
        targetLanguage: toTranslateCode(recipient.outputLanguage)
      });

      io.to(recipient.id).emit("translation-update", {
        messageId: payload.messageId,
        isFinal: Boolean(payload.isFinal),
        speakerId: speaker.id,
        speakerName: speaker.name,
        speakerInputLanguage: speaker.inputLanguage,
        recipientOutputLanguage: recipient.outputLanguage,
        originalText: text,
        translatedText,
        timestamp: Date.now(),
        provider: getTranslationProvider()
      });
    });

    await Promise.all(translationJobs);
    callback({ ok: true });
  });

  socket.on("delete-history", (callback = () => {}) => {
    const roomCode = socket.data.roomCode;
    const room = rooms.get(roomCode);

    if (!room) {
      callback({ ok: false, message: "Room not found." });
      return;
    }

    room.history = [];
    room.updatedAt = Date.now();
    io.to(roomCode).emit("history-cleared");
    callback({ ok: true });
  });

  socket.on("leave-room", (callback = () => {}) => {
    removeParticipantFromRoom(socket);
    callback({ ok: true });
  });

  socket.on("disconnect", () => {
    removeParticipantFromRoom(socket);
  });
});

setInterval(() => {
  const now = Date.now();

  for (const [roomCode, room] of rooms.entries()) {
    if (room.participants.size === 0 && now - room.updatedAt > ROOM_TTL_MS) {
      rooms.delete(roomCode);
    }
  }

  if (translationCache.size > CACHE_LIMIT) {
    const keysToDelete = Array.from(translationCache.keys()).slice(0, 200);
    keysToDelete.forEach((key) => translationCache.delete(key));
  }
}, 60 * 1000);

server.listen(PORT, () => {
  const localOrigin = HTTPS_ENABLED ? `https://localhost:${PORT}` : `http://localhost:${PORT}`;
  console.log(`Realtime translation app listening on ${PUBLIC_BASE_URL || localOrigin}`);
  console.log(`Translation provider: ${getTranslationProvider()}`);
});

function createTransportServer(expressApp) {
  if (HTTPS_ENABLED) {
    if (SSL_PFX_PATH) {
      const pfx = fs.readFileSync(path.resolve(__dirname, SSL_PFX_PATH));
      return https.createServer(
        {
          pfx,
          passphrase: SSL_PFX_PASSWORD || undefined
        },
        expressApp
      );
    }

    if (!SSL_KEY_PATH || !SSL_CERT_PATH) {
      throw new Error(
        "HTTPS=true requires SSL_PFX_PATH or both SSL_KEY_PATH and SSL_CERT_PATH."
      );
    }

    const key = fs.readFileSync(path.resolve(__dirname, SSL_KEY_PATH));
    const cert = fs.readFileSync(path.resolve(__dirname, SSL_CERT_PATH));
    return https.createServer({ key, cert }, expressApp);
  }

  return http.createServer(expressApp);
}

function parseCorsOrigins(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function allowCorsOrigin(origin, callback) {
  if (!origin || CORS_ORIGINS.length === 0) {
    callback(null, true);
    return;
  }

  callback(null, CORS_ORIGINS.includes(origin));
}

function createUniqueRoomCode() {
  let attempts = 0;

  while (attempts < 50) {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    if (!rooms.has(code)) {
      return code;
    }
    attempts += 1;
  }

  throw new Error("Failed to generate a unique room code.");
}

function buildJoinUrl(req, roomCode) {
  const backendOrigin = getBackendOrigin(req);
  const frontendBaseUrl = getFrontendBaseUrl(req);
  const joinUrl = new URL(frontendBaseUrl);

  joinUrl.searchParams.set("room", roomCode);

  if (normalizeOrigin(frontendBaseUrl) !== normalizeOrigin(backendOrigin)) {
    joinUrl.searchParams.set("server", backendOrigin);
  }

  return joinUrl.toString();
}

function getBackendOrigin(req) {
  return `${req.protocol}://${req.get("host")}`;
}

function getRequestOrigin(req) {
  return req.headers.origin || getBackendOrigin(req);
}

function getFrontendBaseUrl(req) {
  if (FRONTEND_BASE_URL) {
    return FRONTEND_BASE_URL;
  }

  if (PUBLIC_BASE_URL && !isLocalhostUrl(PUBLIC_BASE_URL)) {
    return PUBLIC_BASE_URL;
  }

  return req.headers.origin || getRequestOrigin(req);
}

function isLocalhostUrl(value) {
  const normalized = String(value || "").toLowerCase();
  return normalized.includes("localhost") || normalized.includes("127.0.0.1");
}

function normalizeOrigin(value) {
  return String(value || "").replace(/\/+$/, "").toLowerCase();
}

function sanitizeRoomCode(roomCode) {
  return String(roomCode || "")
    .replace(/\D/g, "")
    .slice(0, 4);
}

function sanitizeName(name) {
  const safeName = String(name || "").trim().slice(0, 24);
  return safeName || "Guest";
}

function serializeRoom(room) {
  return {
    code: room.code,
    createdAt: room.createdAt,
    participants: Array.from(room.participants.values()).map((participant) => ({
      id: participant.id,
      name: participant.name,
      isHost: participant.isHost,
      inputLanguage: participant.inputLanguage,
      outputLanguage: participant.outputLanguage
    }))
  };
}

function removeParticipantFromRoom(socket) {
  const roomCode = socket.data.roomCode;
  if (!roomCode) {
    return;
  }

  const room = rooms.get(roomCode);
  if (!room) {
    socket.data.roomCode = null;
    return;
  }

  room.participants.delete(socket.id);
  room.updatedAt = Date.now();
  socket.leave(roomCode);
  socket.data.roomCode = null;

  if (room.participants.size > 0) {
    io.to(roomCode).emit("room-state", serializeRoom(room));
  }
}

function upsertRoomHistory(room, entry) {
  const index = room.history.findIndex((item) => item.messageId === entry.messageId);
  if (index >= 0) {
    room.history[index] = entry;
    return;
  }

  room.history.push(entry);
}

async function buildTranslatedHistoryForParticipant(room, participant) {
  const outputLanguage = participant.outputLanguage;

  return Promise.all(
    room.history.map(async (item) => ({
      ...item,
      recipientOutputLanguage: outputLanguage,
      translatedText: await safeTranslate({
        text: item.originalText,
        sourceLanguage: toTranslateCode(item.speakerInputLanguage),
        targetLanguage: toTranslateCode(outputLanguage)
      }),
      isFinal: true,
      provider: getTranslationProvider()
    }))
  );
}

function toTranslateCode(languageCode) {
  const locale = String(languageCode || "").trim();
  if (!locale) {
    return "auto";
  }

  return TRANSLATE_CODE_MAP[locale] || locale.split("-")[0] || "auto";
}

function getTranslationProvider() {
  return GOOGLE_TRANSLATE_API_KEY ? "google-cloud-translation-api" : "google-web-fallback";
}

async function safeTranslate({ text, sourceLanguage, targetLanguage }) {
  try {
    return await translateText({ text, sourceLanguage, targetLanguage });
  } catch (error) {
    console.error("Translation error:", error.message);
    return text;
  }
}

async function translateText({ text, sourceLanguage, targetLanguage }) {
  if (!text || !targetLanguage || sourceLanguage === targetLanguage) {
    return text;
  }

  const cacheKey = `${getTranslationProvider()}:${sourceLanguage}:${targetLanguage}:${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const translatedText = GOOGLE_TRANSLATE_API_KEY
    ? await translateWithGoogleCloudApi({ text, sourceLanguage, targetLanguage })
    : await translateWithGoogleWeb({ text, sourceLanguage, targetLanguage });

  translationCache.set(cacheKey, translatedText);
  return translatedText;
}

async function translateWithGoogleCloudApi({ text, sourceLanguage, targetLanguage }) {
  const url = new URL("https://translation.googleapis.com/language/translate/v2");
  url.searchParams.set("key", GOOGLE_TRANSLATE_API_KEY);

  const body = {
    q: text,
    target: targetLanguage,
    format: "text"
  };

  if (sourceLanguage && sourceLanguage !== "auto") {
    body.source = sourceLanguage;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Cloud Translation API request failed: ${response.status} ${detail}`);
  }

  const data = await response.json();
  return data?.data?.translations?.[0]?.translatedText || text;
}

async function translateWithGoogleWeb({ text, sourceLanguage, targetLanguage }) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", sourceLanguage || "auto");
  url.searchParams.set("tl", targetLanguage);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Google web translation request failed: ${response.status}`);
  }

  const data = await response.json();
  const translatedText = data?.[0]?.map((entry) => entry?.[0] || "").join("").trim();
  return decodeHtmlEntities(translatedText || text);
}

function decodeHtmlEntities(value) {
  return String(value)
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

async function transcribeExternalAudio({ audioBase64, mimeType, languageCode, apiKey }) {
  const url = new URL("https://speech.googleapis.com/v1p1beta1/speech:recognize");
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      config: {
        languageCode,
        encoding: resolveSpeechEncoding(mimeType),
        sampleRateHertz: resolveSpeechSampleRate(mimeType),
        enableAutomaticPunctuation: true,
        maxAlternatives: 1
      },
      audio: {
        content: audioBase64
      }
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Speech-to-Text request failed: ${response.status} ${detail}`);
  }

  const data = await response.json();
  return (
    data?.results
      ?.map((result) => result?.alternatives?.[0]?.transcript || "")
      .join(" ")
      .trim() || ""
  );
}

function resolveSpeechEncoding(mimeType) {
  const normalized = String(mimeType || "").toLowerCase();

  if (normalized.includes("ogg")) {
    return "OGG_OPUS";
  }

  return "WEBM_OPUS";
}

function resolveSpeechSampleRate(mimeType) {
  const normalized = String(mimeType || "").toLowerCase();

  if (normalized.includes("16000")) {
    return 16000;
  }

  if (normalized.includes("24000")) {
    return 24000;
  }

  return 48000;
}

