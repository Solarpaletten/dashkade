D=>C

Claude, анализ структуры проекта завершён.
Начинаем **ФАЗУ 1 — Core Contract Extraction** на основе реального кода.

Проект НЕ чат в классическом виде.
Это:

* REST API
* WebSocket
* Text translation
* Voice → Whisper → Translation
* Text → TTS
* Multi-language config
* Rate limit + validation + cache

Это важно. Мы делаем не “чат”, а **унифицированный переводчик с голосом**.

---

# 🟦 TASK 1 — DASHKA CHAT CORE CONTRACT EXTRACTION

## 🎯 Цель

Вытащить точный контракт backend → mobile.

---

## 📂 Исследовать и задокументировать:

### 1️⃣ REST Endpoints

Из папки:

```
backend/src/routes
```

Обязательно разобрать:

* health.js
* languages.js
* translation.js
* voice.js

---

### 2️⃣ WebSocket Layer

```
backend/src/websocket
```

Определить:

* handshake формат
* типы сообщений
* event names
* broadcast логика

---

### 3️⃣ Translation Flow

Из:

```
services/unifiedTranslationService.js
```

Выделить:

* входные параметры
* формат запроса
* формат ответа
* кэширование
* обработку ошибок

---

### 4️⃣ Voice Flow

Из:

* whisperService.js
* textToSpeechService.js
* voice.js route

Определить:

* multipart формат
* response тип (JSON? audio stream?)
* временные файлы?
* лимиты размера?

---

### 5️⃣ Error Model

Из:

```
middleware/errorHandler.js
validation.js
rateLimit.js
```

Вывести unified error schema.

---

## 📄 OUTPUT ФАЙЛ

Создать:

```
/docs/dashka-chat-mobile-core-contract.md
```

Структура:

```
1. Base URL structure
2. REST Endpoints (таблица)
3. Translation Request Schema
4. Translation Response Schema
5. Voice Upload Schema
6. TTS Schema
7. WebSocket Events
8. Error Schema
9. Rate Limiting Rules
10. Cache Behavior
11. Security Notes
```

---

## ⚠️ ВАЖНО

* Никаких догадок
* Только реальные поля из кода
* Все JSON примеры должны соответствовать реальному backend
* Указать типы (string, number, boolean, array, binary)

---

## ⛔ Не делать

* Не писать mobile код
* Не рефакторить backend
* Не менять структуру
* Только extraction

---

Когда документ готов:

C=>D
с кратким summary:

* сколько endpoints
* используется ли WebSocket реально
* есть ли streaming
* есть ли auth
* есть ли state/session

---

D=>L

Leanid, архитектурно всё серьёзнее, чем казалось.
Это полноценный real-time translator с voice + ws.

Работаем чётко. 🚀


➜  dashka-chat git:(main) ✗ git remote -v       
origin  https://github.com/Solarpaletten/dashka-chat (fetch)
origin  https://github.com/Solarpaletten/dashka-chat (push)
➜  dashka-chat git:(main) ✗ tree
.
├── README.md
├── README_MULTILANG.md
├── backend
│   ├── package.json
│   └── src
│       ├── config
│       │   ├── cors.js
│       │   ├── index.js
│       │   └── multer.js
│       ├── dashkabot_config.json
│       ├── middleware
│       │   ├── errorHandler.js
│       │   ├── rateLimit.js
│       │   ├── requestLogger.js
│       │   └── validation.js
│       ├── routes
│       │   ├── health.js
│       │   ├── index.js
│       │   ├── languages.js
│       │   ├── translation.js
│       │   └── voice.js
│       ├── server.js
│       ├── services
│       │   ├── index.js
│       │   ├── textToSpeechService.js
│       │   ├── unifiedTranslationService.js
│       │   └── whisperService.js
│       ├── utils
│       │   ├── cache.js
│       │   ├── fileCleanup.js
│       │   └── logger.js
│       └── websocket
│           ├── clientManager.js
│           ├── handlers.js
│           └── index.js
├── commit_message.txt
├── commit_message_multilang.txt
├── docker-compose.yml
├── docs
│   ├── API_REFERENCE.md
│   └── SECURITY_CHECKLIST.md
├── frontend
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── AppShell.tsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Dashboard
│   │   │   │   ├── DashboardDesktop.tsx
│   │   │   │   ├── DashboardMobile.tsx
│   │   │   │   ├── DashboardTablet.tsx
│   │   │   │   ├── DualTranslator.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── LanguageSelector.tsx
│   │   │   │   ├── RoomJoin.tsx
│   │   │   │   ├── StatusIndicators.tsx
│   │   │   │   ├── TranslationPanel.tsx
│   │   │   │   └── VoiceRecorder.tsx
│   │   │   └── UI
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       └── Input.tsx
│   │   ├── config
│   │   │   ├── currentLanguage.ts
│   │   │   ├── languages
│   │   │   │   ├── english.ts
│   │   │   │   ├── german.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── polish.ts
│   │   │   └── types.ts
│   │   ├── hooks
│   │   │   └── useTranslator.ts
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── services
│   │   │   ├── api.ts
│   │   │   └── websocket.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── render.yaml
├── txt.txt
├── БЫСТРЫЙ_СТАРТ.md
├── ИНСТРУКЦИЯ.md
├── СВОДКА_ВСЕХ_ВЕРСИЙ.md
├── СХЕМА.md
└── УСТАНОВКА_ВСЕХ_ВЕРСИЙ.md

22 directories, 80 files
➜  dashka-chat git:(main) ✗ ls -la 
total 176
drwxr-xr-x@ 20 leanid  staff   640 Feb 22 00:06 .
drwxr-xr-x   4 leanid  staff   128 Feb 19 11:34 ..
-rw-r--r--@  1 leanid  staff  6148 Feb 22 00:06 .DS_Store
drwxr-xr-x@ 14 leanid  staff   448 Feb 15 20:51 .git
-rw-r--r--@  1 leanid  staff  4846 Feb 15 20:50 .gitignore
-rw-r--r--@  1 leanid  staff   932 Feb 15 20:52 README.md
-rw-r--r--@  1 leanid  staff  7702 Feb 15 20:50 README_MULTILANG.md
drwxr-xr-x@  5 leanid  staff   160 Feb 15 20:50 backend
-rw-r--r--@  1 leanid  staff   906 Feb 15 20:50 commit_message.txt
-rw-r--r--@  1 leanid  staff  1705 Feb 15 20:50 commit_message_multilang.txt
-rw-r--r--@  1 leanid  staff  3377 Feb 15 20:50 docker-compose.yml
drwxr-xr-x@  4 leanid  staff   128 Feb 15 20:50 docs
drwxr-xr-x@ 16 leanid  staff   512 Feb 15 20:50 frontend
-rw-r--r--@  1 leanid  staff   341 Feb 15 20:50 render.yaml
-rw-r--r--@  1 leanid  staff     3 Feb 15 20:50 txt.txt
-rw-r--r--@  1 leanid  staff  2262 Feb 15 20:50 БЫСТРЫЙ_СТАРТ.md
-rw-r--r--@  1 leanid  staff  6812 Feb 15 20:50 ИНСТРУКЦИЯ.md
-rw-r--r--@  1 leanid  staff  9086 Feb 15 20:50 СВОДКА_ВСЕХ_ВЕРСИЙ.md
-rw-r--r--@  1 leanid  staff  6350 Feb 15 20:50 СХЕМА.md
-rw-r--r--@  1 leanid  staff  5263 Feb 15 20:50 УСТАНОВКА_ВСЕХ_ВЕРСИЙ.md
➜  dashka-chat git:(main) ✗ cd backend                                                        
➜  backend git:(main) ✗ tree
.
├── package.json
└── src
    ├── config
    │   ├── cors.js
    │   ├── index.js
    │   └── multer.js
    ├── dashkabot_config.json
    ├── middleware
    │   ├── errorHandler.js
    │   ├── rateLimit.js
    │   ├── requestLogger.js
    │   └── validation.js
    ├── routes
    │   ├── health.js
    │   ├── index.js
    │   ├── languages.js
    │   ├── translation.js
    │   └── voice.js
    ├── server.js
    ├── services
    │   ├── index.js
    │   ├── textToSpeechService.js
    │   ├── unifiedTranslationService.js
    │   └── whisperService.js
    ├── utils
    │   ├── cache.js
    │   ├── fileCleanup.js
    │   └── logger.js
    └── websocket
        ├── clientManager.js
        ├── handlers.js
        └── index.js

8 directories, 25 files
➜  backend git:(main) ✗ ls -la 
total 16
drwxr-xr-x@  5 leanid  staff   160 Feb 15 20:50 .
drwxr-xr-x@ 20 leanid  staff   640 Feb 22 00:06 ..
-rw-r--r--@  1 leanid  staff    60 Feb 15 20:50 .env.example
-rw-r--r--@  1 leanid  staff  1066 Feb 15 20:50 package.json
drwxr-xr-x@ 10 leanid  staff   320 Feb 15 20:50 src
➜  backend git:(main) ✗ cd ..     
➜  dashka-chat git:(main) ✗ cd frontend 
➜  frontend git:(main) ✗ tree
.
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── AppShell.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── Dashboard
│   │   │   ├── DashboardDesktop.tsx
│   │   │   ├── DashboardMobile.tsx
│   │   │   ├── DashboardTablet.tsx
│   │   │   ├── DualTranslator.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LanguageSelector.tsx
│   │   │   ├── RoomJoin.tsx
│   │   │   ├── StatusIndicators.tsx
│   │   │   ├── TranslationPanel.tsx
│   │   │   └── VoiceRecorder.tsx
│   │   └── UI
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── config
│   │   ├── currentLanguage.ts
│   │   ├── languages
│   │   │   ├── english.ts
│   │   │   ├── german.ts
│   │   │   ├── index.ts
│   │   │   └── polish.ts
│   │   └── types.ts
│   ├── hooks
│   │   └── useTranslator.ts
│   ├── index.css
│   ├── main.tsx
│   ├── services
│   │   ├── api.ts
│   │   └── websocket.ts
│   ├── types
│   │   └── index.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

12 directories, 41 files
➜  frontend git:(main) ✗ ls -la 
total 96
drwxr-xr-x@ 16 leanid  staff   512 Feb 15 20:50 .
drwxr-xr-x@ 20 leanid  staff   640 Feb 22 00:06 ..
-rw-r--r--@  1 leanid  staff    70 Feb 15 20:50 .env.example
-rw-r--r--@  1 leanid  staff   253 Feb 15 20:50 .gitignore
-rw-r--r--@  1 leanid  staff  1658 Feb 15 20:50 README.md
-rw-r--r--@  1 leanid  staff   610 Feb 15 20:50 eslint.config.js
-rw-r--r--@  1 leanid  staff   366 Feb 15 20:50 index.html
-rw-r--r--@  1 leanid  staff   887 Feb 15 20:50 package.json
-rw-r--r--@  1 leanid  staff    80 Feb 15 20:50 postcss.config.js
drwxr-xr-x@  3 leanid  staff    96 Feb 15 20:50 public
drwxr-xr-x@ 14 leanid  staff   448 Feb 15 20:50 src
-rw-r--r--@  1 leanid  staff   314 Feb 15 20:50 tailwind.config.js
-rw-r--r--@  1 leanid  staff   702 Feb 15 20:50 tsconfig.app.json
-rw-r--r--@  1 leanid  staff   119 Feb 15 20:50 tsconfig.json
-rw-r--r--@  1 leanid  staff   630 Feb 15 20:50 tsconfig.node.json
-rw-r--r--@  1 leanid  staff   240 Feb 15 20:50 vite.config.ts
➜  frontend git:(main) ✗ cd src     
➜  src git:(main) ✗ tree
.
├── App.css
├── App.tsx
├── AppShell.tsx
├── assets
│   └── react.svg
├── components
│   ├── Dashboard
│   │   ├── DashboardDesktop.tsx
│   │   ├── DashboardMobile.tsx
│   │   ├── DashboardTablet.tsx
│   │   ├── DualTranslator.tsx
│   │   ├── Header.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── RoomJoin.tsx
│   │   ├── StatusIndicators.tsx
│   │   ├── TranslationPanel.tsx
│   │   └── VoiceRecorder.tsx
│   └── UI
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── config
│   ├── currentLanguage.ts
│   ├── languages
│   │   ├── english.ts
│   │   ├── german.ts
│   │   ├── index.ts
│   │   └── polish.ts
│   └── types.ts
├── hooks
│   └── useTranslator.ts
├── index.css
├── main.tsx
├── services
│   ├── api.ts
│   └── websocket.ts
├── types
│   └── index.ts
└── vite-env.d.ts

10 directories, 30 files
➜  src git:(main) ✗ ls -la 
total 48
drwxr-xr-x@ 14 leanid  staff   448 Feb 15 20:50 .
drwxr-xr-x@ 16 leanid  staff   512 Feb 15 20:50 ..
-rw-r--r--@  1 leanid  staff   606 Feb 15 20:50 App.css
-rw-r--r--@  1 leanid  staff    99 Feb 15 20:50 App.tsx
-rw-r--r--@  1 leanid  staff   309 Feb 15 20:50 AppShell.tsx
drwxr-xr-x@  3 leanid  staff    96 Feb 15 20:50 assets
drwxr-xr-x@  4 leanid  staff   128 Feb 15 20:50 components
drwxr-xr-x@  5 leanid  staff   160 Feb 15 20:50 config
drwxr-xr-x@  3 leanid  staff    96 Feb 15 20:50 hooks
-rw-r--r--@  1 leanid  staff  2060 Feb 15 20:50 index.css
-rw-r--r--@  1 leanid  staff   230 Feb 15 20:50 main.tsx
drwxr-xr-x@  4 leanid  staff   128 Feb 15 20:50 services
drwxr-xr-x@  3 leanid  staff    96 Feb 15 20:50 types
-rw-r--r--@  1 leanid  staff    38 Feb 15 20:50 vite-env.d.ts
➜  src git:(main) ✗ cd components
➜  components git:(main) ✗ ls -la 
total 0
drwxr-xr-x@  4 leanid  staff  128 Feb 15 20:50 .
drwxr-xr-x@ 14 leanid  staff  448 Feb 15 20:50 ..
drwxr-xr-x@ 12 leanid  staff  384 Feb 15 20:50 Dashboard
drwxr-xr-x@  5 leanid  staff  160 Feb 15 20:50 UI
➜  components git:(main) ✗ tree
.
├── Dashboard
│   ├── DashboardDesktop.tsx
│   ├── DashboardMobile.tsx
│   ├── DashboardTablet.tsx
│   ├── DualTranslator.tsx
│   ├── Header.tsx
│   ├── LanguageSelector.tsx
│   ├── RoomJoin.tsx
│   ├── StatusIndicators.tsx
│   ├── TranslationPanel.tsx
│   └── VoiceRecorder.tsx
└── UI
    ├── Button.tsx
    ├── Card.tsx
    └── Input.tsx

3 directories, 13 files
➜  components git:(main) ✗ cd ..        
➜  src git:(main) ✗ cd ..
➜  frontend git:(main) ✗ cd ..
➜  dashka-chat git:(main) ✗ cd backend
➜  backend git:(main) ✗ cd src    
➜  src git:(main) ✗ tree
.
├── config
│   ├── cors.js
│   ├── index.js
│   └── multer.js
├── dashkabot_config.json
├── middleware
│   ├── errorHandler.js
│   ├── rateLimit.js
│   ├── requestLogger.js
│   └── validation.js
├── routes
│   ├── health.js
│   ├── index.js
│   ├── languages.js
│   ├── translation.js
│   └── voice.js
├── server.js
├── services
│   ├── index.js
│   ├── textToSpeechService.js
│   ├── unifiedTranslationService.js
│   └── whisperService.js
├── utils
│   ├── cache.js
│   ├── fileCleanup.js
│   └── logger.js
└── websocket
    ├── clientManager.js
    ├── handlers.js
    └── index.js

7 directories, 24 files
➜  src git:(main) ✗ ls -la 
total 16
drwxr-xr-x@ 10 leanid  staff   320 Feb 15 20:50 .
drwxr-xr-x@  5 leanid  staff   160 Feb 15 20:50 ..
drwxr-xr-x@  5 leanid  staff   160 Feb 15 20:50 config
-rw-r--r--@  1 leanid  staff   666 Feb 15 20:50 dashkabot_config.json
drwxr-xr-x@  6 leanid  staff   192 Feb 15 20:50 middleware
drwxr-xr-x@  7 leanid  staff   224 Feb 15 20:50 routes
-rw-r--r--@  1 leanid  staff  2833 Feb 15 20:50 server.js
drwxr-xr-x@  6 leanid  staff   192 Feb 15 20:50 services
drwxr-xr-x@  5 leanid  staff   160 Feb 15 20:50 utils
drwxr-xr-x@  5 leanid  staff   160 Feb 15 20:50 websocket
➜  src git:(main) ✗ cd middleware 
➜  middleware git:(main) ✗ ls -la 
total 32
drwxr-xr-x@  6 leanid  staff   192 Feb 15 20:50 .
drwxr-xr-x@ 10 leanid  staff   320 Feb 15 20:50 ..
-rw-r--r--@  1 leanid  staff   425 Feb 15 20:50 errorHandler.js
-rw-r--r--@  1 leanid  staff   745 Feb 15 20:50 rateLimit.js
-rw-r--r--@  1 leanid  staff   333 Feb 15 20:50 requestLogger.js
-rw-r--r--@  1 leanid  staff  1232 Feb 15 20:50 validation.js
➜  middleware git:(main) ✗ cd ..        
➜  src git:(main) ✗ cd services 
➜  services git:(main) ✗ ls -la 
total 56
drwxr-xr-x@  6 leanid  staff    192 Feb 15 20:50 .
drwxr-xr-x@ 10 leanid  staff    320 Feb 15 20:50 ..
-rw-r--r--@  1 leanid  staff    265 Feb 15 20:50 index.js
-rw-r--r--@  1 leanid  staff  11242 Feb 15 20:50 textToSpeechService.js
-rw-r--r--@  1 leanid  staff   6635 Feb 15 20:50 unifiedTranslationService.js
-rw-r--r--@  1 leanid  staff   2860 Feb 15 20:50 whisperService.js
➜  services git:(main) ✗ tree
.
├── index.js
├── textToSpeechService.js
├── unifiedTranslationService.js
└── whisperService.js

1 directory, 4 files
➜  services git:(main) ✗ ls -la 
total 56
drwxr-xr-x@  6 leanid  staff    192 Feb 15 20:50 .
drwxr-xr-x@ 10 leanid  staff    320 Feb 15 20:50 ..
-rw-r--r--@  1 leanid  staff    265 Feb 15 20:50 index.js
-rw-r--r--@  1 leanid  staff  11242 Feb 15 20:50 textToSpeechService.js
-rw-r--r--@  1 leanid  staff   6635 Feb 15 20:50 unifiedTranslationService.js
-rw-r--r--@  1 leanid  staff   2860 Feb 15 20:50 whisperService.js
➜  services git:(main) ✗ 