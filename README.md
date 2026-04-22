# PrismTalk Live Translate

## App Launch

[Open the app on GitHub Pages](https://pau7196533-lang.github.io/multitranslator/)

[Open the app on Netlify](https://mulittranslator.netlify.app/)

[Deploy the backend to Render](https://render.com/deploy?repo=https://github.com/pau7196533-lang/multitranslator)

Repository page note:
`https://github.com/pau7196533-lang/multitranslator` is GitHub's code/repository page, so GitHub will always show the repository UI there rather than the running app.
Use the GitHub Pages or Netlify link above to open the actual app.

## What It Does

PrismTalk Live Translate is a realtime multilingual translation web app.
Participants join with a QR code or a 4-digit room code, choose their input and output languages, and see the original speech and translated text at the same time.

## Core Features

- Hosts can create a room and instantly get a QR code plus a 4-digit join code.
- Participants can join from a browser without installing an app.
- Web Speech API is used for realtime speech-to-text based on the selected input language.
- Socket.IO delivers low-latency translation updates to everyone in the room.
- If a Google Cloud Translation API key is configured, the app uses the official API. Otherwise it falls back automatically.
- The UI is responsive across mobile, tablet, and desktop.

## Local Run

```bash
npm.cmd install
npm.cmd start
```

Then open [http://localhost:3000](http://localhost:3000).

## `file://` Mode

You can also open `public/index.html` directly.
In that mode the frontend tries to connect to `http://localhost:3000` by default.

1. Run `npm.cmd start`
2. Open either `file:///.../public/index.html` or `http://localhost:3000`
3. To use a different backend, append `?server=https://your-domain.com`

## Environment Variables

Copy `.env.example` to `.env` and fill in the values you need.

- `PORT`: server port
- `PUBLIC_BASE_URL`: public URL used in QR codes and share links
- `GOOGLE_TRANSLATE_API_KEY`: Google Cloud Translation API key
- `GOOGLE_SPEECH_API_KEY`: Google Speech-to-Text API key
- `HTTPS`: run the backend in HTTPS mode when set to `true`
- `SSL_PFX_PATH`: path to a PFX certificate
- `SSL_PFX_PASSWORD`: PFX password
- `SSL_KEY_PATH`: TLS private key path
- `SSL_CERT_PATH`: TLS certificate path
- `CORS_ORIGIN`: allowed origins separated by commas

## Google Cloud Translation API

1. Enable Cloud Translation API in Google Cloud Console
2. Create an API key
3. Set `GOOGLE_TRANSLATE_API_KEY=your-key` in `.env`
4. Restart the server and check `/health`

## HTTPS Example

```bash
HTTPS=true
SSL_PFX_PATH=ssl/localhost-dev.pfx
SSL_PFX_PASSWORD=prismtalk-local
PUBLIC_BASE_URL=https://your-domain.com
```

## Local HTTPS Certificate

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-local-https.ps1
```

This creates:

- `ssl/localhost-dev.pfx`
- `ssl/localhost-dev.cer`

## Recommended Deployment

- Deploy the backend as a Node.js web service
- Put it behind Nginx or a cloud load balancer if needed
- Set `PUBLIC_BASE_URL` to the real public backend URL
- Use GitHub Pages or Netlify for the static frontend

## Render Notes

- Create a `Web Service`, not a `Static Site`
- Use the repository root and the included `render.yaml`
- Health check path should be `/health`
- `FRONTEND_BASE_URL` should point to `https://pau7196533-lang.github.io/multitranslator/public/`
- `CORS_ORIGIN` should allow both `https://pau7196533-lang.github.io` and `https://mulittranslator.netlify.app`

## Notes

- Realtime STT depends on browser support for Web Speech API
- Chrome or Edge is recommended
- On mobile devices, microphone permission must be allowed
