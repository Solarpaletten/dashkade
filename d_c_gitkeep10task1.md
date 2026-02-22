Leanid.
Принято.
Переходим в режим инженерного контракта.

---

# 🧠 DASHKA API v1 — ENGINEERING CONTRACT

**Дата фиксации:** 22.02.2026
**Версия:** v1.0.1
**Статус:** Frozen Contract

С этого момента mobile и web строятся вокруг этого документа.

---

# 🌐 BASE URL

```text
https://api-dashka-chat.onrender.com
```

---

# 📦 VERSIONING STRATEGY

Вводим namespace:

```text
/api/v1/
```

⚠ Сейчас endpoints без `/api/v1`.
В v1.1 делаем мягкую миграцию:

* оставить старые
* добавить новые `/api/v1/*`
* deprecated notice

---

# 📘 ENDPOINTS v1

---

## 1️⃣ Health

### GET `/api/v1/health`

### Response

```json
{
  "status": "ok",
  "version": "1.0.1",
  "timestamp": "ISO-8601"
}
```

### Contract Rules

* Минимальный JSON
* Без memory usage
* Без internal state

---

## 2️⃣ Translate (Text)

### POST `/api/v1/translate`

### Request

```json
{
  "text": "string (1–5000 chars)",
  "target_language": "DE"
}
```

### Response

```json
{
  "status": "success",
  "original_text": "string",
  "translated_text": "string",
  "detected_language": "string",
  "processing_time_ms": number
}
```

### Error Response

```json
{
  "status": "error",
  "message": "string"
}
```

### Contract Rules

* `translated_text` — snake_case (frozen)
* всегда string
* HTTP 200 при success
* HTTP 400 при validation error
* HTTP 503 если OPENAI не настроен
* HTTP 429 при rate limit

---

## 3️⃣ Voice Translate

### POST `/api/v1/voice-translate`

### Content-Type

```
multipart/form-data
```

### Fields

| Field           | Type   | Required |
| --------------- | ------ | -------- |
| audio           | file   | yes      |
| target_language | string | yes      |

---

### Response

```json
{
  "status": "success",
  "original_text": "string",
  "translated_text": "string",
  "detected_language": "string",
  "processing_time_ms": number
}
```

⚠ snake_case зафиксирован
⚠ camelCase только как backward alias (можно удалить в v2)

---

# 🔐 SECURITY CONTRACT

* Rate limit active
* Helmet active
* CORS restricted
* No user text in logs
* No stack traces in production

---

# ⛔ BREAKING CHANGE POLICY

Любое изменение:

* удаление поля
* rename поля
* изменение типа

= 🚨 Breaking Change

Требует:

```text
/api/v2/
```

---

# 📱 MOBILE DATA MODELS (FROZEN)

## Swift

```swift
struct TranslateResponse: Decodable {
    let status: String
    let original_text: String?
    let translated_text: String?
    let detected_language: String?
    let processing_time_ms: Int?
}
```

---

## Kotlin

```kotlin
data class TranslateResponse(
    val status: String,
    val original_text: String?,
    val translated_text: String?,
    val detected_language: String?,
    val processing_time_ms: Int?
)
```

---

# 🧠 DEPLOYMENT GUARANTEE

v1 endpoints:

* не удаляются
* не ломаются
* не меняют структуру

До появления v2.

---

# 🚀 NEXT STEP (PROPER ENGINEERING MOVE)

В v1.1:

1. Добавить `/api/v1/*` маршруты
2. Оставить старые `/translate` временно
3. Добавить response header:

```
X-Dashka-API-Version: 1.0.1
```

---

# 📊 Что мы сделали сегодня

* Production backend
* Stable contract
* Versioning foundation
* Mobile-ready structure
* Release discipline
* Deployment pipeline

Это уже уровень SaaS архитектуры.

---

Leanid.

Сегодня мы не “переводчик запустили”.

Мы:

* сделали стабильный backend
* зафиксировали контракт
* подготовили мобильную платформу
* построили версионирование

Это фундамент.

Если даёшь следующий сигнал —
делаем v1 namespace migration без downtime. 🚀
