D=>C

# 🧠 ТЗ: Аудит Production v1.0.0 (Dashka German Wrapper)

## Контекст

Репозиторий:
`Solarpaletten/dashka-chat`
Tag: `v1.0.0-de-production`
Branch: `main`

Архитектура:

```
backend/  → Node.js (Render Web Service)
web/      → Vite + React (Render Static Site)
docs/     → mobile reference implementations
```

Backend live:
[https://api-dashka-chat.onrender.com/health](https://api-dashka-chat.onrender.com/health)

Frontend live:
[https://dashka-chat.onrender.com](https://dashka-chat.onrender.com)

---

# 🎯 Цель анализа

Провести **полный production readiness audit**:

1. Backend boot safety
2. Environment config safety
3. CORS correctness
4. API client correctness (web → backend)
5. Build reproducibility
6. Render compatibility
7. Dependency integrity
8. Security review
9. Deployment validation
10. Mobile API compatibility (docs/web/ios + android)

---

# 🔍 Задачи Claude

## 1️⃣ Backend Audit

Проверить:

* server.js entry correctness
* PORT handling (process.env.PORT fallback)
* NODE_ENV handling
* CORS origin logic
* Missing env fail safety (если OPENAI_API_KEY отсутствует — как ведёт себя?)
* Error handling middleware coverage
* Rate limiting presence
* Health route lightweight response
* Whisper service lazy load?
* Memory leak risks
* Console logging production hygiene

Выдать:

```
Backend Status: SAFE / WARN / CRITICAL
```

---

## 2️⃣ Web Frontend Audit

Проверить:

* VITE_API_URL usage
* Hardcoded URLs?
* SpeechRecognition fallback safety
* Production build reproducibility
* dist exclusion via .gitignore
* API error handling in apiClient
* Loading states
* Crash handling
* CORS compatibility

Выдать:

```
Web Status: SAFE / WARN / CRITICAL
```

---

## 3️⃣ Render Deployment Audit

Проверить:

* backend/package.json scripts
* render.yaml correctness
* Static Site root correctness (web)
* dist publish directory correctness
* No secret leakage
* No .env committed
* No API keys committed

Выдать:

```
Render Status: SAFE / WARN / CRITICAL
```

---

## 4️⃣ Dependency Review

* Outdated packages?
* Security risks?
* Dev dependencies safe?
* Any unnecessary heavy dependency?

Выдать список оптимизаций.

---

## 5️⃣ Architecture Integrity

Проверить:

* web → backend API consistency
* Route naming alignment
* Response contract consistency
* Mobile API alignment (docs/web)

Выдать:

```
Architecture Integrity: OK / MISALIGNED
```

---

## 6️⃣ Финальный вывод

Сформировать отчёт в формате:

```
Production Readiness Score: XX / 100

Backend: ...
Frontend: ...
Deployment: ...
Security: ...
Architecture: ...
Recommendations (Priority Ordered)
```

---

# 🚫 ВАЖНО

* Не изменять код
* Только анализ
* Никаких предположений — только конкретные выводы
* Если есть потенциальный production crash — отметить явно

---

D=>L

Leanid, это правильный senior шаг.
Сначала аудит, потом развитие.

Если хочешь — можем после отчёта:

* перейти в v1.1 evolution roadmap
* или начать подготовку к App Store release alignment

Даю сигнал Claude?
