# Deployment Guide

## Current diagnosis

- The current Render service link you shared is `https://dashboard.render.com/static/srv-d7j4aqnavr4c7383uea0`.
- That means the existing Render service is a `static site`, not a `web service`.
- This repository's backend is `server.js` + Express + Socket.IO, so it must run on a Render `web service`.
- A static site cannot serve `/health`, `/api/runtime-config`, or realtime Socket.IO traffic, so using that Render service as the backend will always fail.
- Because the new backend deploy never became healthy, Netlify is still effectively serving the last successful frontend deployment, which is why the live site still looks old.

## Frontend config

`public/deploy-config.js` should point to the exact Render `web service` URL after that service is created:

```js
window.PRISMTALK_DEPLOY_CONFIG = {
  backendUrl: "https://prismtalk-realtime.onrender.com",
  backendCandidates: [
    "https://prismtalk-realtime.onrender.com",
    "https://current-temporary-backend.example"
  ],
  backendFallbacks: {
    "mulittranslator.netlify.app": "https://prismtalk-realtime.onrender.com",
    "pau7196533-lang.github.io": "https://prismtalk-realtime.onrender.com"
  },
  backendReplacements: {
    "https://21f2e060752651.lhr.life": "https://current-temporary-backend.example",
    "https://29f21c4f5c6e90.lhr.life": "https://current-temporary-backend.example"
  }
};
```

This lets the app prefer Render first and fall back to the temporary backend until Render is healthy again.

## 1. Backend hosting

Deploy this repository root to a Render `web service`, not a static site.

- Runtime: Node.js
- Build command: `npm install`
- Start command: `npm start`

Recommended backend environment variables:

```env
FRONTEND_BASE_URL=https://pau7196533-lang.github.io/multitranslator/public/
CORS_ORIGIN=https://pau7196533-lang.github.io,https://mulittranslator.netlify.app
HTTPS=false
PUBLIC_BASE_URL=https://prismtalk-realtime.onrender.com
GOOGLE_TRANSLATE_API_KEY=
GOOGLE_SPEECH_API_KEY=
```

After deployment, confirm:

- `https://prismtalk-realtime.onrender.com/health`
- `https://prismtalk-realtime.onrender.com/api/runtime-config`

## 2. Netlify redeploy

This repo now includes [`netlify.toml`](/D:/OneDrive%20-%20FMB/Codex/%EB%8B%A4%EA%B5%AD%EC%96%B4%20%EB%8F%99%EC%8B%9C%EB%B2%88%EC%97%AD%EC%95%B1/netlify.toml), so Netlify can publish the static frontend directly from `public`.

- Publish directory: `public`
- Build command: none
- SPA redirect: included
- `deploy-config.js` cache: disabled for easy backend URL updates
- Netlify will keep serving the last successful production deploy until a new production deploy succeeds
- If the live HTML does not include `deploy-config.js`, the site is still serving an older successful deploy

## 3. Deploy order

1. Create or fix the Render `web service`
2. Wait until `/health` returns `200`
3. Confirm [`public/deploy-config.js`](/D:/OneDrive%20-%20FMB/Codex/%EB%8B%A4%EA%B5%AD%EC%96%B4%20%EB%8F%99%EC%8B%9C%EB%B2%88%EC%97%AD%EC%95%B1/public/deploy-config.js) prefers `https://prismtalk-realtime.onrender.com`
4. Trigger the Netlify build hook
5. Confirm the live HTML includes `deploy-config.js`
6. Test room creation, QR join, and realtime translation

## 4. Domain check

After redeploying the backend and frontend, open:

- `https://mulittranslator.netlify.app/`

Then verify room creation, QR join, and realtime socket connection from two devices.

## 5. Render values to paste

You can copy from [`render.env.example`](/D:/OneDrive%20-%20FMB/Codex/%EB%8B%A4%EA%B5%AD%EC%96%B4%20%EB%8F%99%EC%8B%9C%EB%B2%88%EC%97%AD%EC%95%B1/render.env.example) and set:

```env
FRONTEND_BASE_URL=https://pau7196533-lang.github.io/multitranslator/public/
CORS_ORIGIN=https://pau7196533-lang.github.io,https://mulittranslator.netlify.app
HTTPS=false
PUBLIC_BASE_URL=https://prismtalk-realtime.onrender.com
GOOGLE_TRANSLATE_API_KEY=
GOOGLE_SPEECH_API_KEY=
```
