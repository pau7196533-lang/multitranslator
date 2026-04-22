const APP_LANGUAGE_KEY = "prismtalk-ui-language";
const PROFILE_KEY = "prismtalk-profile";
const SERVER_BASE_URL_KEY = "prismtalk-server-base-url";
const SPEECH_API_KEY_STORAGE_KEY = "prismtalk-google-speech-api-key";
const ROOM_SESSION_KEY = "prismtalk-room-session";
const DEPLOY_CONFIG = window.PRISMTALK_DEPLOY_CONFIG || {};
const DEPLOYED_BACKEND_FALLBACKS = DEPLOY_CONFIG.backendFallbacks || {};
const DEPLOYED_BACKEND_REPLACEMENTS = DEPLOY_CONFIG.backendReplacements || {};

const UI_COPY = {
  ko: {
    html_lang: "ko",
    toolbar_badge: "Live UI",
    settings_button: "언어 설정",
    hero_eyebrow: "실시간 다국어 대화",
    hero_description:
      "QR 코드 또는 4자리 코드만으로 입장하고, 각자 원하는 언어로 동시에 번역되는 실시간 대화 공간입니다.",
    hero_badge_google: "Google 기반 번역",
    hero_badge_stt: "Web Speech STT",
    hero_badge_responsive: "모바일 · 태블릿 · 데스크탑 최적화",
    preview_mode: "무음 번역 모드",
    label_original: "원문",
    label_translation: "번역",
    preview_original_text: "안녕하세요 반갑습니다",
    preview_translated_text: "hello nice to meet you",
    step_1: "Step 1",
    step_2: "Step 2",
    profile_title: "내 정보와 언어 설정",
    name_label: "이름",
    name_placeholder: "예: Host Kim",
    input_language_label: "내 입력 언어 (STT)",
    output_language_label: "내 출력 언어 (번역 표시)",
    profile_hint:
      "마이크를 켜면 음성이 텍스트로 변환되고, 번역은 화면에만 표시됩니다. 기기에서 소리는 재생되지 않습니다.",
    room_entry_title: "방 만들기 또는 입장",
    create_room_button: "새 대화방 만들기",
    divider_or: "or",
    join_code_label: "4자리 코드로 입장",
    join_button: "입장",
    room_kicker: "Room",
    room_title: "실시간 대화방",
    room_code_label: "입장 코드",
    copy_code_button: "코드 복사",
    room_share_title: "QR 코드 또는 4자리 코드로 입장",
    room_share_hint:
      "상대방은 QR 코드를 스캔하거나 같은 코드 번호를 입력해 바로 이 대화방에 입장할 수 있습니다.",
    open_join_link: "브라우저 입장 링크 열기",
    participants_title: "참여자",
    live_speech_kicker: "Live Speech",
    transcript_title: "다국어 동시 번역 스트림",
    mic_on: "마이크 켜짐",
    mic_off: "마이크 꺼짐",
    mic_hint: "눌러서 말하기 시작 / 다시 눌러 중단",
    room_input_language_label: "내 입력 언어",
    room_output_language_label: "내 출력 언어",
    save_language_button: "언어 저장",
    save_conversation_button: "대화 저장",
    delete_conversation_button: "대화 삭제",
    leave_room_button: "나가기",
    speech_warning:
      "이 브라우저는 Web Speech API를 지원하지 않습니다. Chrome 또는 Edge 최신 버전을 권장합니다.",
    settings_kicker: "Settings",
    settings_title: "앱 언어 선택",
    ui_language_label: "메뉴 및 기능 언어",
    apply_ui_language_button: "적용하기",
    participant_count: "{count}명",
    participant_role_host: "Host",
    participant_meta: "입력: {input} · 출력: {output}",
    runtime_ready: "{mode} 연결 준비 완료 · 서버 {server} · {provider}",
    runtime_failed:
      "서버 후보({servers})에 연결할 수 없습니다. 먼저 npm.cmd start 로 백엔드를 실행해 주세요.",
    socket_ready: "실시간 연결이 준비되었습니다. {server}",
    socket_failed: "실시간 서버 연결 실패: {server}",
    unsupported_socket: "Socket.io 클라이언트를 불러오지 못했습니다. 네트워크 연결을 확인해 주세요.",
    speech_error: "음성 인식 오류: {error}",
    need_name: "이름을 입력해 주세요.",
    creating_room: "방을 생성하는 중입니다...",
    create_room_failed: "방 생성 실패",
    socket_not_ready: "실시간 소켓이 아직 준비되지 않았습니다. 다시 시도해 주세요.",
    invalid_room_code: "정확한 4자리 코드를 입력해 주세요.",
    joining_room: "대화방에 입장하는 중입니다...",
    join_failed: "입장 실패",
    joined_room: "방 {code}에 입장했습니다.",
    need_room_first: "먼저 대화방에 입장해 주세요.",
    language_saved: "언어 설정이 저장되었습니다.",
    unsupported_speech: "이 브라우저에서는 실시간 음성 인식이 지원되지 않습니다.",
    mic_started: "마이크가 켜졌습니다. 말하는 내용이 실시간 번역됩니다.",
    mic_stopped: "마이크를 껐습니다. 현재 발화 이후 번역이 중단됩니다.",
    translation_send_failed: "번역 전송 중 오류가 발생했습니다.",
    empty_feed:
      "아직 번역된 대화가 없습니다. 마이크를 눌러 말하면 원문과 번역문이 동시에 표시됩니다.",
    shared_link_detected: "공유 링크를 감지했습니다. 코드 {code}로 바로 입장할 수 있습니다.",
    no_room_code_to_copy: "복사할 방 코드가 없습니다.",
    copied_room_code: "방 코드 {code}를 복사했습니다.",
    clipboard_failed: "클립보드 복사 권한이 없어 수동 복사가 필요합니다.",
    provider_google_cloud: "Google Cloud API",
    provider_google_web: "Google Web Fallback",
    provider_translator: "Translator",
    speaker_fallback: "Speaker",
    file_mode: "file mode",
    served_mode: "served mode",
    save_empty: "저장할 대화가 없습니다.",
    save_complete: "대화 내용을 파일로 저장했습니다.",
    save_filename_prefix: "대화기록",
    delete_confirm: "현재 방의 대화 기록을 모두 삭제할까요?",
    delete_complete: "대화 기록을 삭제했습니다.",
    delete_failed: "대화 기록 삭제에 실패했습니다.",
    leave_complete: "대화방에서 나왔습니다.",
    leave_failed: "대화방 나가기에 실패했습니다.",
    conversation_header: "대화 기록",
    room_label_short: "방",
    exported_original: "원문",
    exported_translated: "번역"
  },
  en: {
    html_lang: "en",
    toolbar_badge: "Live UI",
    settings_button: "Language Settings",
    hero_eyebrow: "Realtime Multilingual Conversation",
    hero_description:
      "Join with a QR code or a 4-digit code and chat in a realtime space where everyone sees simultaneous translation in their preferred language.",
    hero_badge_google: "Google-powered translation",
    hero_badge_stt: "Web Speech STT",
    hero_badge_responsive: "Optimized for mobile, tablet, and desktop",
    preview_mode: "Silent translation mode",
    label_original: "Original",
    label_translation: "Translation",
    preview_original_text: "안녕하세요 반갑습니다",
    preview_translated_text: "hello nice to meet you",
    step_1: "Step 1",
    step_2: "Step 2",
    profile_title: "Your profile and language settings",
    name_label: "Name",
    name_placeholder: "e.g. Host Kim",
    input_language_label: "Input language (STT)",
    output_language_label: "Output language (translation display)",
    profile_hint:
      "When the microphone is on, speech is converted to text and translations appear on screen only. No sound is played from the device.",
    room_entry_title: "Create or join a room",
    create_room_button: "Create new room",
    divider_or: "or",
    join_code_label: "Join with a 4-digit code",
    join_button: "Join",
    room_kicker: "Room",
    room_title: "Realtime conversation room",
    room_code_label: "Room code",
    copy_code_button: "Copy code",
    room_share_title: "Join with the QR code or the 4-digit code",
    room_share_hint:
      "Other participants can scan the QR code or enter the same code number to enter this room instantly.",
    open_join_link: "Open join link in browser",
    participants_title: "Participants",
    live_speech_kicker: "Live Speech",
    transcript_title: "Multilingual translation stream",
    mic_on: "Microphone on",
    mic_off: "Microphone off",
    mic_hint: "Tap to start speaking / tap again to stop",
    room_input_language_label: "My input language",
    room_output_language_label: "My output language",
    save_language_button: "Save languages",
    save_conversation_button: "Save conversation",
    delete_conversation_button: "Delete conversation",
    leave_room_button: "Leave room",
    speech_warning:
      "This browser does not support the Web Speech API. The latest Chrome or Edge is recommended.",
    settings_kicker: "Settings",
    settings_title: "Choose app language",
    ui_language_label: "Menu and feature language",
    apply_ui_language_button: "Apply",
    participant_count: "{count} participant(s)",
    participant_role_host: "Host",
    participant_meta: "Input: {input} · Output: {output}",
    runtime_ready: "{mode} ready · server {server} · {provider}",
    runtime_failed:
      "Unable to connect to server candidates ({servers}). Start the backend first with npm.cmd start.",
    socket_ready: "Realtime connection ready. {server}",
    socket_failed: "Realtime server connection failed: {server}",
    unsupported_socket: "Could not load the Socket.io client. Please check your network connection.",
    speech_error: "Speech recognition error: {error}",
    need_name: "Please enter your name.",
    creating_room: "Creating a room...",
    create_room_failed: "Failed to create room",
    socket_not_ready: "The realtime socket is not ready yet. Please try again.",
    invalid_room_code: "Please enter a valid 4-digit room code.",
    joining_room: "Joining the room...",
    join_failed: "Failed to join",
    joined_room: "Joined room {code}.",
    need_room_first: "Please join a room first.",
    language_saved: "Language settings have been saved.",
    unsupported_speech: "This browser does not support realtime speech recognition.",
    mic_started: "Microphone is on. Your speech is being translated in realtime.",
    mic_stopped: "Microphone is off. Translation stops after the current utterance.",
    translation_send_failed: "An error occurred while sending translation data.",
    empty_feed: "No translated conversation yet. Press the microphone and speak to see original and translated text together.",
    shared_link_detected: "Shared link detected. You can join immediately with code {code}.",
    no_room_code_to_copy: "There is no room code to copy.",
    copied_room_code: "Copied room code {code}.",
    clipboard_failed: "Clipboard permission is unavailable, so manual copy is required.",
    provider_google_cloud: "Google Cloud API",
    provider_google_web: "Google Web Fallback",
    provider_translator: "Translator",
    speaker_fallback: "Speaker",
    file_mode: "file mode",
    served_mode: "served mode",
    save_empty: "There is no conversation to save.",
    save_complete: "Saved the conversation to a file.",
    save_filename_prefix: "conversation-log",
    delete_confirm: "Delete all conversation history in this room?",
    delete_complete: "Conversation history was deleted.",
    delete_failed: "Failed to delete the conversation history.",
    leave_complete: "You left the room.",
    leave_failed: "Failed to leave the room.",
    conversation_header: "Conversation log",
    room_label_short: "Room",
    exported_original: "Original",
    exported_translated: "Translated"
  }
};

Object.assign(UI_COPY.ko, {
  external_audio_title: "외부 오디오 동시번역",
  external_audio_hint:
    "탭 또는 화면을 오디오와 함께 공유하면 유튜브, 줌, 구글미팅 음성도 이 대화방에서 실시간 번역할 수 있습니다.",
  external_audio_start_button: "외부 오디오 번역 시작",
  external_audio_stop_button: "외부 오디오 번역 중지",
  external_audio_started:
    "외부 오디오 캡처를 시작했습니다. 공유 창에서 탭/화면과 오디오 공유를 함께 선택해 주세요.",
  external_audio_stopped: "외부 오디오 번역을 중지했습니다.",
  external_audio_failed:
    "외부 오디오 번역을 시작할 수 없습니다. 브라우저 권한과 오디오 공유 선택을 확인해 주세요.",
  external_audio_unsupported:
    "이 브라우저는 탭/화면 오디오 캡처 또는 미디어 녹화를 지원하지 않습니다.",
  external_audio_empty:
    "공유된 오디오에서 아직 인식된 음성이 없습니다. 유튜브/회의 탭의 오디오 공유가 켜져 있는지 확인해 주세요.",
  external_audio_processing_error: "외부 오디오를 문자로 변환하는 중 오류가 발생했습니다.",
  external_audio_requires_key:
    "외부 오디오 번역을 쓰려면 서버에 GOOGLE_SPEECH_API_KEY 설정이 필요합니다.",
  external_audio_stream_label: "외부 오디오",
  external_audio_provider: "Google Speech-to-Text",
  speech_api_key_label: "Google Speech API key",
  speech_api_key_placeholder: "외부 오디오 번역용 Google API 키를 입력하세요",
  speech_api_key_hint:
    "서버 환경변수가 비어 있을 때만 이 브라우저에 저장된 키를 외부 오디오 번역에 사용합니다.",
  speech_api_key_saved: "Google Speech API key 설정을 저장했습니다."
});

Object.assign(UI_COPY.en, {
  external_audio_title: "External Audio Translation",
  external_audio_hint:
    "Share a browser tab or screen with audio to translate YouTube, Zoom, or Google Meet sound in this room.",
  external_audio_start_button: "Start external audio translation",
  external_audio_stop_button: "Stop external audio translation",
  external_audio_started:
    "External audio capture started. In the share dialog, choose a tab or screen and make sure audio sharing is enabled.",
  external_audio_stopped: "External audio translation stopped.",
  external_audio_failed:
    "Unable to start external audio translation. Please check browser permissions and audio sharing.",
  external_audio_unsupported:
    "This browser does not support tab/screen audio capture or media recording.",
  external_audio_empty:
    "No speech has been recognized from the shared audio yet. Make sure the YouTube or meeting tab is shared with audio.",
  external_audio_processing_error: "An error occurred while converting external audio to text.",
  external_audio_requires_key:
    "Configure GOOGLE_SPEECH_API_KEY in .env or paste a Google Speech API key in Settings to use external audio translation.",
  external_audio_stream_label: "External audio",
  external_audio_provider: "Google Speech-to-Text",
  speech_api_key_label: "Google Speech API key",
  speech_api_key_placeholder: "Paste a Google API key for external audio translation",
  speech_api_key_hint:
    "This key is stored only in this browser and is used for external audio translation when the server env is empty.",
  speech_api_key_saved: "Saved the Google Speech API key setting."
});

Object.assign(UI_COPY.ko, {
  room_restored: "이전 대화방으로 자동 복원했습니다.",
  room_restore_failed: "이전 대화방을 복원하지 못했습니다. 방이 종료되었을 수 있습니다."
});

Object.assign(UI_COPY.en, {
  room_restored: "Automatically restored your previous room.",
  room_restore_failed: "Unable to restore the previous room. The room may no longer be available."
});

const FALLBACK_LANGUAGE_OPTIONS = [
  { speech: "ko-KR", labels: { ko: "한국어", en: "Korean" } },
  { speech: "en-US", labels: { ko: "English (United States)", en: "English (United States)" } },
  { speech: "ja-JP", labels: { ko: "Japanese (Japan)", en: "Japanese (Japan)" } },
  { speech: "cmn-Hans-CN", labels: { ko: "Chinese (Simplified, China)", en: "Chinese (Simplified, China)" } }
];

const LANGUAGE_OPTIONS = Array.isArray(window.STT_LANGUAGE_OPTIONS) && window.STT_LANGUAGE_OPTIONS.length
  ? window.STT_LANGUAGE_OPTIONS
  : FALLBACK_LANGUAGE_OPTIONS;

const state = {
  socket: null,
  roomCode: "",
  joinUrl: "",
  qrCodeDataUrl: "",
  isHost: false,
  recognition: null,
  recognitionSupported: false,
  listening: false,
  pendingInterimTimeout: null,
  activeMessageId: null,
  participants: [],
  messages: new Map(),
  serverBaseUrl: getInitialServerBaseUrl(),
  runtimeConfig: null,
  uiLanguage: readUiLanguage(),
  speechApiKey: readSpeechApiKey(),
  externalAudioStream: null,
  externalAudioRecorder: null,
  externalAudioActive: false,
  externalAudioMimeType: ""
};

const els = {
  createRoomBtn: document.querySelector("#createRoomBtn"),
  joinRoomBtn: document.querySelector("#joinRoomBtn"),
  copyCodeBtn: document.querySelector("#copyCodeBtn"),
  saveSettingsBtn: document.querySelector("#saveSettingsBtn"),
  saveConversationBtn: document.querySelector("#saveConversationBtn"),
  deleteConversationBtn: document.querySelector("#deleteConversationBtn"),
  leaveRoomBtn: document.querySelector("#leaveRoomBtn"),
  micToggleBtn: document.querySelector("#micToggleBtn"),
  externalAudioBtn: document.querySelector("#externalAudioBtn"),
  statusMessage: document.querySelector("#statusMessage"),
  displayName: document.querySelector("#displayName"),
  roomCodeInput: document.querySelector("#roomCodeInput"),
  inputLanguage: document.querySelector("#inputLanguage"),
  outputLanguage: document.querySelector("#outputLanguage"),
  roomInputLanguage: document.querySelector("#roomInputLanguage"),
  roomOutputLanguage: document.querySelector("#roomOutputLanguage"),
  roomSection: document.querySelector("#roomSection"),
  roomCodeLabel: document.querySelector("#roomCodeLabel"),
  qrImage: document.querySelector("#qrImage"),
  joinLink: document.querySelector("#joinLink"),
  participantCount: document.querySelector("#participantCount"),
  participantList: document.querySelector("#participantList"),
  transcriptFeed: document.querySelector("#transcriptFeed"),
  micStateLabel: document.querySelector("#micStateLabel"),
  speechSupportWarning: document.querySelector("#speechSupportWarning"),
  uiSettingsBtn: document.querySelector("#uiSettingsBtn"),
  settingsModal: document.querySelector("#settingsModal"),
  closeSettingsBtn: document.querySelector("#closeSettingsBtn"),
  applyUiLanguageBtn: document.querySelector("#applyUiLanguageBtn"),
  uiLanguageSelect: document.querySelector("#uiLanguageSelect"),
  speechApiKeyInput: document.querySelector("#speechApiKeyInput")
};

void bootstrap();

async function bootstrap() {
  applyUiLanguage(state.uiLanguage);
  fillLanguageSelects();
  hydrateRoomCodeFromQuery();
  bindEvents();
  await loadRuntimeConfig();
  connectSocket();
  initSpeechRecognition();
  renderParticipants();
  renderMessages();
  updateExternalAudioUi();
  await restoreRoomSessionIfNeeded();
}

function bindEvents() {
  els.createRoomBtn.addEventListener("click", handleCreateRoom);
  els.joinRoomBtn.addEventListener("click", () => {
    void joinRoom(els.roomCodeInput.value, false);
  });
  els.copyCodeBtn.addEventListener("click", copyRoomCode);
  els.saveSettingsBtn.addEventListener("click", savePreferences);
  els.saveConversationBtn.addEventListener("click", saveConversation);
  els.deleteConversationBtn.addEventListener("click", deleteConversation);
  els.leaveRoomBtn.addEventListener("click", leaveRoom);
  els.micToggleBtn.addEventListener("click", toggleMicrophone);
  els.externalAudioBtn?.addEventListener("click", () => {
    void toggleExternalAudioCapture();
  });
  els.uiSettingsBtn.addEventListener("click", openSettingsModal);
  els.closeSettingsBtn.addEventListener("click", closeSettingsModal);
  els.applyUiLanguageBtn.addEventListener("click", handleApplyUiLanguage);
  els.settingsModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeSettings === "true") {
      closeSettingsModal();
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSettingsModal();
    }
  });
  els.roomCodeInput.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
  });
}

async function loadRuntimeConfig() {
  const candidates = getServerCandidates();

  for (const candidate of candidates) {
    try {
      state.serverBaseUrl = normalizeBaseUrl(candidate);
      const response = await fetch(withApiBase("/api/runtime-config"));
      if (!response.ok) {
        throw new Error(`Runtime config request failed: ${response.status}`);
      }

      state.runtimeConfig = await response.json();
      const mode = window.location.protocol === "file:" ? t("file_mode") : t("served_mode");
      setStatus(
        interpolate(t("runtime_ready"), {
          mode,
          server: state.serverBaseUrl,
          provider: translateProviderLabel(state.runtimeConfig.translationProvider)
        })
      );
      renderMessages();
      return;
    } catch (_error) {
      continue;
    }
  }

  setStatus(interpolate(t("runtime_failed"), { servers: candidates.join(", ") }));
}

function connectSocket() {
  if (typeof io !== "function") {
    setStatus(t("unsupported_socket"));
    return;
  }

  if (!state.runtimeConfig) {
    return;
  }

  if (state.socket) {
    state.socket.disconnect();
  }

  state.socket = io(state.serverBaseUrl, {
    transports: ["websocket", "polling"],
    withCredentials: true,
    autoConnect: false
  });

  state.socket.on("connect", () => {
    setStatus(interpolate(t("socket_ready"), { server: state.serverBaseUrl }));
  });

  state.socket.on("connect_error", () => {
    setStatus(interpolate(t("socket_failed"), { server: state.serverBaseUrl }));
  });

  state.socket.on("room-state", (room) => {
    state.participants = room.participants || [];
    renderParticipants();
  });

  state.socket.on("translation-update", (payload) => {
    const existing = state.messages.get(payload.messageId) || {};
    state.messages.set(payload.messageId, {
      ...existing,
      ...payload
    });
    renderMessages();
  });

  state.socket.on("history-cleared", () => {
    state.messages.clear();
    renderMessages();
    setStatus(t("delete_complete"));
  });

  state.socket.connect();
}

async function ensureSocketReady() {
  if (!state.socket) {
    return false;
  }

  if (state.socket.connected) {
    return true;
  }

  state.socket.connect();

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      cleanup();
      resolve(false);
    }, 4000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      state.socket.off("connect", onConnect);
      state.socket.off("connect_error", onError);
    };

    const onConnect = () => {
      cleanup();
      resolve(true);
    };

    const onError = () => {
      cleanup();
      resolve(false);
    };

    state.socket.once("connect", onConnect);
    state.socket.once("connect_error", onError);
  });
}

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    state.recognitionSupported = false;
    els.speechSupportWarning.classList.remove("hidden");
    els.micToggleBtn.disabled = true;
    els.micToggleBtn.style.opacity = "0.45";
    return;
  }

  state.recognitionSupported = true;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.lang = els.roomInputLanguage.value;

  recognition.onresult = handleRecognitionResult;
  recognition.onend = () => {
    if (state.listening) {
      recognition.start();
      return;
    }

    state.activeMessageId = null;
    updateMicUi(false);
  };

  recognition.onerror = (event) => {
    setStatus(interpolate(t("speech_error"), { error: event.error }));
    state.listening = false;
    updateMicUi(false);
  };

  state.recognition = recognition;
}

async function handleCreateRoom() {
  const profile = getProfile();
  if (!profile.name) {
    setStatus(t("need_name"));
    els.displayName.focus();
    return;
  }

  setStatus(t("creating_room"));

  try {
    const response = await fetch(withApiBase("/api/rooms"), {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || t("create_room_failed"));
    }

    state.roomCode = data.roomCode;
    state.joinUrl = data.joinUrl;
    state.qrCodeDataUrl = data.qrCodeDataUrl;
    state.isHost = true;
    els.roomCodeInput.value = data.roomCode;

    await joinRoom(data.roomCode, true);
  } catch (error) {
    setStatus(error.message);
  }
}

async function joinRoom(roomCode, isHost, options = {}) {
  const profile = getProfile();
  const sanitizedCode = String(roomCode || "").replace(/\D/g, "").slice(0, 4);

  if (!profile.name) {
    setStatus(t("need_name"));
    els.displayName.focus();
    return;
  }

  if (sanitizedCode.length !== 4) {
    setStatus(t("invalid_room_code"));
    els.roomCodeInput.focus();
    return;
  }

  const socketReady = await ensureSocketReady();
  if (!socketReady) {
    setStatus(t("socket_not_ready"));
    return;
  }

  setStatus(t("joining_room"));

  state.socket.emit(
    "join-room",
    {
      roomCode: sanitizedCode,
      name: profile.name,
      inputLanguage: profile.inputLanguage,
      outputLanguage: profile.outputLanguage,
      isHost
    },
    (response) => {
      if (!response.ok) {
        if (options.restoreAttempt) {
          clearRoomSession();
          setStatus(response.message || t("room_restore_failed"));
          return;
        }

        setStatus(response.message || t("join_failed"));
        return;
      }

      state.roomCode = sanitizedCode;
      state.isHost = isHost;
      state.messages.clear();

      if (!state.joinUrl) {
        state.joinUrl = buildAbsoluteJoinUrl(sanitizedCode);
      }

      applyHistory(response.history || []);
      enterRoomLayout();
      showRoom();
      state.participants = response.room.participants || [];
      renderParticipants();
      renderMessages();
      syncRoomSelectors();
      persistRoomSession({
        roomCode: sanitizedCode,
        isHost,
        joinUrl: state.joinUrl
      });
      setStatus(options.restoreAttempt ? t("room_restored") : interpolate(t("joined_room"), { code: sanitizedCode }));
      window.history.replaceState({}, "", buildUiUrl(sanitizedCode));
      els.roomSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  );
}

function showRoom() {
  els.roomSection.classList.remove("hidden");
  els.roomCodeLabel.textContent = state.roomCode;
  els.joinLink.href = state.joinUrl;
  els.joinLink.textContent = state.joinUrl;
  els.qrImage.alt = t("room_title");
  els.qrImage.src =
    state.qrCodeDataUrl ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Crect width='240' height='240' rx='24' fill='%230D0A16'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23F4E8FF' font-size='18'%3EShare QR from host%3C/text%3E%3C/svg%3E";
}

function savePreferences() {
  if (!state.roomCode || !state.socket) {
    setStatus(t("need_room_first"));
    return;
  }

  const inputLanguage = els.roomInputLanguage.value;
  const outputLanguage = els.roomOutputLanguage.value;
  els.inputLanguage.value = inputLanguage;
  els.outputLanguage.value = outputLanguage;
  persistProfile();

  state.socket.emit(
    "update-preferences",
    {
      name: els.displayName.value.trim(),
      inputLanguage,
      outputLanguage
    },
    (response) => {
      if (!response.ok) {
        setStatus(response.message || t("language_saved"));
        return;
      }

      applyHistory(response.history || []);
      renderMessages();
      setStatus(t("language_saved"));
      if (state.recognition) {
        state.recognition.lang = inputLanguage;
      }
    }
  );
}

function saveConversation() {
  const messages = getSortedMessages();
  if (!messages.length) {
    setStatus(t("save_empty"));
    return;
  }

  const lines = [`${t("conversation_header")} - ${t("room_label_short")} ${state.roomCode}`, ""];

  messages.forEach((message) => {
    lines.push(`[${formatTime(message.timestamp)}] ${message.speakerName || t("speaker_fallback")}`);
    lines.push(`${t("exported_original")}: ${message.originalText}`);
    lines.push(`${t("exported_translated")}: ${message.translatedText}`);
    lines.push("");
  });

  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  const fileName = `${t("save_filename_prefix")}-${state.roomCode}-${Date.now()}.txt`;
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
  setStatus(t("save_complete"));
}

function deleteConversation() {
  if (!state.roomCode || !state.socket) {
    setStatus(t("need_room_first"));
    return;
  }

  if (!window.confirm(t("delete_confirm"))) {
    return;
  }

  state.socket.emit("delete-history", (response) => {
    if (!response?.ok) {
      setStatus(response?.message || t("delete_failed"));
    }
  });
}

function leaveRoom() {
  if (!state.roomCode || !state.socket) {
    setStatus(t("leave_complete"));
    return;
  }

  stopExternalAudioCapture(true);

  if (state.listening) {
    state.listening = false;
    clearTimeout(state.pendingInterimTimeout);
    state.pendingInterimTimeout = null;
    if (state.recognition) {
      state.recognition.stop();
    }
  }

  state.socket.emit("leave-room", (response) => {
    if (!response?.ok) {
      setStatus(response?.message || t("leave_failed"));
      return;
    }

    resetRoomState();
    setStatus(t("leave_complete"));
  });
}

function resetRoomState() {
  stopExternalAudioCapture(true);
  clearRoomSession();
  state.roomCode = "";
  state.joinUrl = "";
  state.qrCodeDataUrl = "";
  state.isHost = false;
  state.participants = [];
  state.messages.clear();
  state.activeMessageId = null;
  els.roomSection.classList.add("hidden");
  exitRoomLayout();
  renderParticipants();
  renderMessages();
  updateMicUi(false);
  updateExternalAudioUi();
  window.history.replaceState({}, "", window.location.protocol === "file:" ? window.location.pathname : "/");
}

function enterRoomLayout() {
  document.body.classList.add("room-active");
}

function exitRoomLayout() {
  document.body.classList.remove("room-active");
}

function toggleMicrophone() {
  if (!state.recognitionSupported) {
    setStatus(t("unsupported_speech"));
    return;
  }

  if (!state.roomCode) {
    setStatus(t("need_room_first"));
    return;
  }

  if (!state.listening) {
    state.listening = true;
    state.activeMessageId = crypto.randomUUID();
    state.recognition.lang = els.roomInputLanguage.value;
    state.recognition.start();
    updateMicUi(true);
    setStatus(t("mic_started"));
    return;
  }

  state.listening = false;
  clearTimeout(state.pendingInterimTimeout);
  state.pendingInterimTimeout = null;
  state.recognition.stop();
  updateMicUi(false);
  setStatus(t("mic_stopped"));
}

async function toggleExternalAudioCapture() {
  if (state.externalAudioActive) {
    stopExternalAudioCapture();
    setStatus(t("external_audio_stopped"));
    return;
  }

  if (!state.roomCode) {
    setStatus(t("need_room_first"));
    return;
  }

  if (!navigator.mediaDevices?.getDisplayMedia || !window.MediaRecorder) {
    setStatus(t("external_audio_unsupported"));
    return;
  }

  if (!hasSpeechToTextKeyConfigured()) {
    setStatus(t("external_audio_requires_key"));
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true
    });

    const audioTracks = stream.getAudioTracks();
    if (!audioTracks.length) {
      stream.getTracks().forEach((track) => track.stop());
      setStatus(t("external_audio_failed"));
      return;
    }

    const mimeType = getSupportedExternalAudioMimeType();
    const recorderOptions = mimeType ? { mimeType } : undefined;
    const recorder = recorderOptions ? new MediaRecorder(stream, recorderOptions) : new MediaRecorder(stream);

    state.externalAudioStream = stream;
    state.externalAudioRecorder = recorder;
    state.externalAudioActive = true;
    state.externalAudioMimeType = recorder.mimeType || mimeType || "audio/webm;codecs=opus";

    audioTracks.forEach((track) => {
      track.onended = () => {
        if (state.externalAudioActive) {
          stopExternalAudioCapture(true);
          setStatus(t("external_audio_stopped"));
        }
      };
    });

    recorder.ondataavailable = async (event) => {
      if (!event.data || event.data.size === 0 || !state.externalAudioActive) {
        return;
      }

      try {
        await processExternalAudioChunk(event.data);
      } catch (_error) {
        setStatus(t("external_audio_processing_error"));
      }
    };

    recorder.onerror = () => {
      stopExternalAudioCapture(true);
      setStatus(t("external_audio_failed"));
    };

    recorder.start(3500);
    updateExternalAudioUi();
    setStatus(t("external_audio_started"));
  } catch (_error) {
    stopExternalAudioCapture(true);
    setStatus(t("external_audio_failed"));
  }
}

function stopExternalAudioCapture(silent = false) {
  const recorder = state.externalAudioRecorder;
  if (recorder && recorder.state !== "inactive") {
    recorder.ondataavailable = null;
    recorder.onerror = null;
    recorder.stop();
  }

  const stream = state.externalAudioStream;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  state.externalAudioRecorder = null;
  state.externalAudioStream = null;
  state.externalAudioActive = false;
  state.externalAudioMimeType = "";
  updateExternalAudioUi();

  if (!silent) {
    setStatus(t("external_audio_stopped"));
  }
}

function updateExternalAudioUi() {
  if (!els.externalAudioBtn) {
    return;
  }

  els.externalAudioBtn.textContent = state.externalAudioActive
    ? t("external_audio_stop_button")
    : t("external_audio_start_button");
  els.externalAudioBtn.classList.toggle("danger-btn", state.externalAudioActive);
}

function hasSpeechToTextKeyConfigured() {
  return Boolean(state.runtimeConfig?.speechToTextConfigured || state.speechApiKey);
}

function getSupportedExternalAudioMimeType() {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"];

  for (const candidate of candidates) {
    if (window.MediaRecorder?.isTypeSupported?.(candidate)) {
      return candidate;
    }
  }

  return "";
}

async function processExternalAudioChunk(blob) {
  const base64Audio = await blobToBase64(blob);
  const response = await fetch(withApiBase("/api/transcribe-external-audio"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      audioBase64: base64Audio,
      mimeType: state.externalAudioMimeType || blob.type || "audio/webm;codecs=opus",
      languageCode: els.roomInputLanguage.value,
      googleApiKey: state.speechApiKey || undefined
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = String(data?.detail || data?.message || "");
    if (detail.includes("GOOGLE_SPEECH_API_KEY") || detail.includes("Speech-to-Text API key")) {
      setStatus(t("external_audio_requires_key"));
      stopExternalAudioCapture(true);
      return;
    }

    throw new Error(data?.message || t("external_audio_processing_error"));
  }

  const transcript = String(data?.transcript || "").trim();
  if (!transcript) {
    return;
  }

  emitRecognizedText(transcript);
}

function emitRecognizedText(text) {
  if (!text || !state.roomCode || !state.socket) {
    return;
  }

  state.socket.emit(
    "speech-chunk",
    {
      roomCode: state.roomCode,
      text,
      isFinal: true,
      messageId: crypto.randomUUID()
    },
    (response) => {
      if (!response?.ok) {
        setStatus(response?.message || t("translation_send_failed"));
      }
    }
  );
}

async function blobToBase64(blob) {
  const buffer = await blob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function handleRecognitionResult(event) {
  let finalText = "";
  let interimText = "";

  for (let index = event.resultIndex; index < event.results.length; index += 1) {
    const transcript = event.results[index][0].transcript.trim();
    if (event.results[index].isFinal) {
      finalText += `${transcript} `;
    } else {
      interimText += `${transcript} `;
    }
  }

  if (interimText.trim()) {
    sendSpeechChunk(interimText.trim(), false);
  }

  if (finalText.trim()) {
    sendSpeechChunk(finalText.trim(), true);
    state.activeMessageId = crypto.randomUUID();
  }
}

function sendSpeechChunk(text, isFinal) {
  if (!text || !state.roomCode || !state.socket) {
    return;
  }

  if (!isFinal) {
    clearTimeout(state.pendingInterimTimeout);
    state.pendingInterimTimeout = setTimeout(() => {
      dispatchSpeechChunk(text, false);
    }, 280);
    return;
  }

  clearTimeout(state.pendingInterimTimeout);
  dispatchSpeechChunk(text, true);
}

function dispatchSpeechChunk(text, isFinal) {
  const messageId = state.activeMessageId || crypto.randomUUID();
  state.activeMessageId = messageId;

  state.socket.emit(
    "speech-chunk",
    {
      roomCode: state.roomCode,
      text,
      isFinal,
      messageId
    },
    (response) => {
      if (!response.ok) {
        setStatus(response.message || t("translation_send_failed"));
      }
    }
  );
}

function applyHistory(history) {
  state.messages.clear();
  history.forEach((item) => {
    state.messages.set(item.messageId, item);
  });
}

function renderParticipants() {
  els.participantCount.textContent = interpolate(t("participant_count"), {
    count: state.participants.length
  });
  els.participantList.innerHTML = "";

  state.participants.forEach((participant) => {
    const item = document.createElement("li");
    const inputLabel = getLanguageLabel(participant.inputLanguage);
    const outputLabel = getLanguageLabel(participant.outputLanguage);
    const hostBadge = participant.isHost ? ` <span>(${escapeHtml(t("participant_role_host"))})</span>` : "";

    item.innerHTML = `
      <strong>${escapeHtml(participant.name)}${hostBadge}</strong>
      <small>${escapeHtml(interpolate(t("participant_meta"), { input: inputLabel, output: outputLabel }))}</small>
    `;
    els.participantList.appendChild(item);
  });
}

function renderMessages() {
  const messages = getSortedMessages();

  if (!messages.length) {
    els.transcriptFeed.innerHTML = `<div class="message-empty">${escapeHtml(t("empty_feed"))}</div>`;
    return;
  }

  els.transcriptFeed.innerHTML = "";

  messages.forEach((message) => {
    const card = document.createElement("article");
    card.className = `message-card ${message.isFinal ? "" : "live"}`.trim();
    card.innerHTML = `
      <div class="message-original-line">
        ${escapeHtml(message.originalText || "")}
        <span class="message-language-tag">(${escapeHtml(getLanguageTag(message.speakerInputLanguage))})</span>
      </div>
      <div class="message-translation-line">${escapeHtml(message.translatedText || "")}</div>
    `;
    els.transcriptFeed.appendChild(card);
  });

  els.transcriptFeed.scrollTop = els.transcriptFeed.scrollHeight;
}

function getSortedMessages() {
  return Array.from(state.messages.values()).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
}

function fillLanguageSelects() {
  const selects = [els.inputLanguage, els.outputLanguage, els.roomInputLanguage, els.roomOutputLanguage];
  const savedProfile = readSavedProfile();

  selects.forEach((select) => {
    select.innerHTML = LANGUAGE_OPTIONS.map((language) => {
      const label = getLocalizedLanguageName(language);
      return `<option value="${language.speech}">${escapeHtml(label)}</option>`;
    }).join("");
  });

  els.displayName.value = savedProfile.name || "";
  els.inputLanguage.value = savedProfile.inputLanguage || "ko-KR";
  els.outputLanguage.value = savedProfile.outputLanguage || "en-US";
  syncRoomSelectors();
}

function getLocalizedLanguageName(language) {
  if (!language) {
    return "";
  }

  if (language.labels && language.labels[state.uiLanguage]) {
    return language.labels[state.uiLanguage];
  }

  if (language.label) {
    return language.label;
  }

  return language.speech;
}

function syncRoomSelectors() {
  els.roomInputLanguage.value = els.inputLanguage.value;
  els.roomOutputLanguage.value = els.outputLanguage.value;
}

function getProfile() {
  const profile = {
    name: els.displayName.value.trim(),
    inputLanguage: els.inputLanguage.value,
    outputLanguage: els.outputLanguage.value
  };

  persistProfile();
  return profile;
}

function persistProfile() {
  localStorage.setItem(
    PROFILE_KEY,
    JSON.stringify({
      name: els.displayName.value.trim(),
      inputLanguage: els.inputLanguage.value,
      outputLanguage: els.outputLanguage.value
    })
  );
}

function readSavedProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
  } catch (_error) {
    return {};
  }
}

function persistSpeechApiKey(value) {
  localStorage.setItem(SPEECH_API_KEY_STORAGE_KEY, String(value || "").trim());
}

function readSpeechApiKey() {
  return localStorage.getItem(SPEECH_API_KEY_STORAGE_KEY) || "";
}

function persistRoomSession(session) {
  localStorage.setItem(
    ROOM_SESSION_KEY,
    JSON.stringify({
      roomCode: String(session?.roomCode || "").replace(/\D/g, "").slice(0, 4),
      isHost: Boolean(session?.isHost),
      joinUrl: String(session?.joinUrl || ""),
      savedAt: Date.now()
    })
  );
}

function readRoomSession() {
  try {
    return JSON.parse(localStorage.getItem(ROOM_SESSION_KEY) || "{}");
  } catch (_error) {
    return {};
  }
}

function clearRoomSession() {
  localStorage.removeItem(ROOM_SESSION_KEY);
}

function getLanguageLabel(languageCode) {
  const language = LANGUAGE_OPTIONS.find((item) => item.speech === languageCode);
  return getLocalizedLanguageName(language) || languageCode;
}

function getLanguageTag(languageCode) {
  return String(languageCode || "").split("-")[0].toUpperCase();
}

function hydrateRoomCodeFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const roomCode = String(params.get("room") || "").replace(/\D/g, "").slice(0, 4);
  const serverOverride = params.get("server");
  const savedSession = readRoomSession();

  if (serverOverride) {
    state.serverBaseUrl = normalizeBaseUrl(serverOverride);
  }

  if (roomCode) {
    els.roomCodeInput.value = roomCode;
    setStatus(interpolate(t("shared_link_detected"), { code: roomCode }));
    return;
  }

  if (String(savedSession.roomCode || "").length === 4) {
    els.roomCodeInput.value = savedSession.roomCode;
  }
}

async function restoreRoomSessionIfNeeded() {
  const savedSession = readRoomSession();
  const explicitRoomCode = String(els.roomCodeInput.value || "").replace(/\D/g, "").slice(0, 4);
  const roomCode = String(explicitRoomCode || savedSession.roomCode || "").replace(/\D/g, "").slice(0, 4);

  if (!roomCode || state.roomCode) {
    return;
  }

  if (!els.displayName.value.trim()) {
    return;
  }

  if (!explicitRoomCode && savedSession.joinUrl) {
    state.joinUrl = savedSession.joinUrl;
  }

  await joinRoom(roomCode, Boolean(savedSession.isHost), { restoreAttempt: true });
}

async function copyRoomCode() {
  if (!state.roomCode) {
    setStatus(t("no_room_code_to_copy"));
    return;
  }

  try {
    await navigator.clipboard.writeText(state.roomCode);
    setStatus(interpolate(t("copied_room_code"), { code: state.roomCode }));
  } catch (_error) {
    setStatus(t("clipboard_failed"));
  }
}

function updateMicUi(isListening) {
  els.micToggleBtn.classList.toggle("listening", isListening);
  els.micToggleBtn.setAttribute("aria-pressed", String(isListening));
  els.micStateLabel.textContent = isListening ? t("mic_on") : t("mic_off");
}

function setStatus(message) {
  els.statusMessage.textContent = message;
}

function openSettingsModal() {
  els.uiLanguageSelect.value = state.uiLanguage;
  if (els.speechApiKeyInput) {
    els.speechApiKeyInput.value = state.speechApiKey;
  }
  els.settingsModal.classList.remove("hidden");
  els.settingsModal.setAttribute("aria-hidden", "false");
}

function closeSettingsModal() {
  els.settingsModal.classList.add("hidden");
  els.settingsModal.setAttribute("aria-hidden", "true");
}

function handleApplyUiLanguage() {
  const nextLanguage = els.uiLanguageSelect.value === "en" ? "en" : "ko";
  state.speechApiKey = els.speechApiKeyInput?.value.trim() || "";
  persistSpeechApiKey(state.speechApiKey);
  applyUiLanguage(nextLanguage);
  fillLanguageSelects();
  renderParticipants();
  renderMessages();
  updateMicUi(state.listening);
  updateExternalAudioUi();
  setStatus(t("speech_api_key_saved"));
  closeSettingsModal();
}

function applyUiLanguage(language) {
  state.uiLanguage = language === "en" ? "en" : "ko";
  localStorage.setItem(APP_LANGUAGE_KEY, state.uiLanguage);
  document.documentElement.lang = t("html_lang");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute("placeholder", t(key));
  });

  els.uiLanguageSelect.value = state.uiLanguage;
}

function readUiLanguage() {
  const saved = localStorage.getItem(APP_LANGUAGE_KEY);
  return saved === "en" ? "en" : "ko";
}

function t(key) {
  return UI_COPY[state.uiLanguage][key] || UI_COPY.ko[key] || key;
}

function interpolate(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_match, token) => String(values[token] ?? ""));
}

function getInitialServerBaseUrl() {
  const params = new URLSearchParams(window.location.search);
  const explicit = migrateConfiguredBaseUrl(params.get("server"));
  const saved = migrateConfiguredBaseUrl(localStorage.getItem(SERVER_BASE_URL_KEY));
  const configured = getConfiguredBackendUrl();
  const deployedFallback = getDeployedBackendFallback();

  if (explicit) {
    localStorage.setItem(SERVER_BASE_URL_KEY, normalizeBaseUrl(explicit));
    return normalizeBaseUrl(explicit);
  }

  if (saved) {
    return normalizeBaseUrl(saved);
  }

  if (window.location.protocol === "file:") {
    localStorage.setItem(SERVER_BASE_URL_KEY, "https://localhost:3443");
    return "https://localhost:3443";
  }

  if (configured) {
    localStorage.setItem(SERVER_BASE_URL_KEY, configured);
    return configured;
  }

  if (deployedFallback) {
    localStorage.setItem(SERVER_BASE_URL_KEY, deployedFallback);
    return deployedFallback;
  }

  return window.location.origin;
}

function getServerCandidates() {
  const params = new URLSearchParams(window.location.search);
  const explicit = migrateConfiguredBaseUrl(params.get("server"));
  const saved = migrateConfiguredBaseUrl(localStorage.getItem(SERVER_BASE_URL_KEY));
  const configured = getConfiguredBackendUrl();
  const deployedFallback = getDeployedBackendFallback();
  const candidates = [];

  if (explicit) {
    candidates.push(explicit);
  }

  if (saved) {
    candidates.push(saved);
  }

  if (configured) {
    candidates.push(configured);
  }

  if (deployedFallback) {
    candidates.push(deployedFallback);
  }

  if (window.location.protocol === "file:") {
    candidates.push("https://localhost:3443", "http://localhost:3000");
  } else if (!isStaticFrontendHost(window.location.hostname)) {
    candidates.push(window.location.origin);
  }

  return [...new Set(candidates.map((value) => normalizeBaseUrl(value)).filter(Boolean))];
}

function withApiBase(endpoint) {
  return `${state.serverBaseUrl}${endpoint}`;
}

function buildUiUrl(roomCode) {
  const params = new URLSearchParams();
  params.set("room", roomCode);

  if (window.location.protocol === "file:") {
    params.set("server", state.serverBaseUrl);
    return `${window.location.pathname}?${params.toString()}`;
  }

  if (shouldPersistServerInUrl()) {
    params.set("server", state.serverBaseUrl);
  }

  return `/?${params.toString()}`;
}

function buildAbsoluteJoinUrl(roomCode) {
  const relativeUrl = buildUiUrl(roomCode);

  if (window.location.protocol === "file:") {
    return relativeUrl;
  }

  return new URL(relativeUrl, window.location.origin).toString();
}

function normalizeBaseUrl(value) {
  const normalized = String(value || "").replace(/\/+$/, "");
  localStorage.setItem(SERVER_BASE_URL_KEY, normalized);
  return normalized;
}

function getDeployedBackendFallback() {
  return sanitizeBaseUrl(DEPLOYED_BACKEND_FALLBACKS[window.location.hostname] || "");
}

function getConfiguredBackendUrl() {
  return sanitizeBaseUrl(DEPLOY_CONFIG.backendUrl || "");
}

function migrateConfiguredBaseUrl(value) {
  const sanitized = sanitizeBaseUrl(value);

  if (!sanitized) {
    return "";
  }

  return sanitizeBaseUrl(DEPLOYED_BACKEND_REPLACEMENTS[sanitized] || sanitized);
}

function sanitizeBaseUrl(value) {
  const normalized = String(value || "").trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(normalized)) {
    return "";
  }

  if (normalized.includes("your-render-web-service.onrender.com")) {
    return "";
  }

  return normalized;
}

function isStaticFrontendHost(hostname) {
  const normalized = String(hostname || "").trim().toLowerCase();
  return normalized.endsWith(".netlify.app") || normalized.endsWith(".github.io");
}

function shouldPersistServerInUrl() {
  const currentOrigin = sanitizeBaseUrl(window.location.origin);
  const activeServer = sanitizeBaseUrl(state.serverBaseUrl);

  if (!activeServer) {
    return false;
  }

  return currentOrigin !== activeServer;
}

function translateProviderLabel(provider) {
  if (provider === "google-cloud-translation-api") {
    return t("provider_google_cloud");
  }

  if (provider === "google-web-fallback") {
    return t("provider_google_web");
  }

  return t("provider_translator");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatTime(timestamp) {
  if (!timestamp) {
    return "";
  }

  return new Intl.DateTimeFormat(state.uiLanguage === "en" ? "en-US" : "ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(timestamp);
}
