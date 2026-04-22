# PrismTalk Live Translate

QR 코드 또는 4자리 코드로 입장하고, 각 참여자가 자신의 입력 언어와 출력 언어를 설정한 뒤 실시간으로 원문과 번역문을 동시에 확인할 수 있는 웹 번역 앱입니다.

## 핵심 기능

- 호스트가 방을 만들면 4자리 코드와 QR 코드가 즉시 생성됩니다.
- 참여자는 공유 링크, QR, 4자리 코드로 앱 설치 없이 웹브라우저에서 입장할 수 있습니다.
- Web Speech API로 입력 언어 기준 실시간 STT를 수행합니다.
- Socket.io로 모든 참여자에게 초저지연으로 번역 결과를 전송합니다.
- Google Cloud Translation API 키가 있으면 정식 API로 번역하고, 없으면 Google 기반 웹 엔드포인트로 자동 폴백합니다.
- 모바일, 태블릿, 데스크탑에 맞는 반응형 글래스모피즘 UI를 제공합니다.

## 로컬 실행

```bash
npm.cmd install
npm.cmd start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하세요.

## file:// 모드 사용

지금처럼 `public/index.html` 을 직접 열어도 동작할 수 있도록 프런트가 기본적으로 `http://localhost:3000` 백엔드에 연결되게 구성했습니다.

1. 먼저 `npm.cmd start` 로 서버를 켭니다.
2. 그 다음 `file:///.../public/index.html` 또는 `http://localhost:3000` 중 하나로 엽니다.
3. 다른 서버를 쓰려면 URL 뒤에 `?server=https://your-domain.com` 을 붙일 수 있습니다.

## 환경 변수

`.env.example` 을 복사해 `.env` 로 만든 뒤 필요한 값만 채우면 됩니다.

- `PORT`: 서버 포트
- `PUBLIC_BASE_URL`: QR 코드와 공유 링크에 들어갈 외부 공개 주소
- `GOOGLE_TRANSLATE_API_KEY`: Google Cloud Translation API 키
- `HTTPS`: `true` 이면 HTTPS 서버로 구동
- `SSL_PFX_PATH`: PFX 인증서 파일 경로
- `SSL_PFX_PASSWORD`: PFX 비밀번호
- `SSL_KEY_PATH`: 개인키 파일 경로
- `SSL_CERT_PATH`: 인증서 파일 경로
- `CORS_ORIGIN`: 허용할 오리진을 쉼표로 구분해 지정. 비워두면 모든 오리진 허용

## Google Cloud Translation API 정식 연동

1. Google Cloud Console 에서 Cloud Translation API 를 활성화합니다.
2. API 키를 발급합니다.
3. `.env` 에 `GOOGLE_TRANSLATE_API_KEY=발급받은키` 를 넣습니다.
4. 서버를 재시작하면 `/health` 에서 `translationProvider` 가 `google-cloud-translation-api` 로 표시됩니다.

## HTTPS 로컬/배포 실행

예시:

```bash
HTTPS=true
SSL_PFX_PATH=ssl/localhost-dev.pfx
SSL_PFX_PASSWORD=prismtalk-local
PUBLIC_BASE_URL=https://your-domain.com
```

이후 `npm.cmd start` 로 실행하면 HTTPS 서버가 올라갑니다.

## 로컬 HTTPS 인증서 자동 생성

다음 명령으로 `localhost`용 자체 서명 인증서를 만들고 현재 사용자에게 신뢰시킬 수 있습니다.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-local-https.ps1
```

생성 결과:

- `ssl/localhost-dev.pfx`
- `ssl/localhost-dev.cer`

프런트는 `file://` 모드에서 `https://localhost:3443` 를 먼저 시도하고, 실패하면 `http://localhost:3000` 으로 폴백합니다.

## 배포 권장 방식

- Docker 컨테이너로 배포
- Nginx 또는 클라우드 로드밸런서 뒤에 Node.js 서버 실행
- `PUBLIC_BASE_URL` 을 실제 공개 도메인으로 지정
- HTTPS 종료는 프록시 또는 앱 자체 인증서 둘 중 하나 선택

## 주의 사항

- 실시간 STT 는 브라우저의 Web Speech API 지원 여부에 따라 달라집니다. Chrome 또는 Edge 최신 버전을 권장합니다.
- 스마트폰에서 마이크 권한이 차단되어 있으면 음성 인식이 시작되지 않습니다.
