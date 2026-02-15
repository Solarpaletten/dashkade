# DashkaBot API Reference

**Version:** 3.0.0  
**Base URL:** `http://localhost:8080` (development)  
**Production URL:** `https://dashka-chat-api.onrender.com`  
**WebSocket:** `ws://localhost:8080/ws` (development)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Text Translation](#text-translation)
3. [Voice Translation](#voice-translation)
4. [Language Detection](#language-detection)
5. [Supported Languages](#supported-languages)
6. [Health Check](#health-check)
7. [Statistics](#statistics)
8. [WebSocket Protocol](#websocket-protocol)
9. [Error Handling](#error-handling)

---

## Authentication

Currently, the API does not require authentication. In production, consider implementing:
- API Keys
- JWT tokens
- Rate limiting per client

---

## Text Translation

Translate text from one language to another using AI-powered translation.

### Endpoint
```
POST /translate
```

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "text": "Hello, how are you?",
  "source_language": "EN",
  "target_language": "DE"
}
```

**Alternative parameter names (for compatibility):**
- `source_language` | `fromLang` | `from`
- `target_language` | `toLang` | `to`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| text | string | Yes | Text to translate (1-5000 characters) |
| source_language | string | No | Source language code (2 letters, uppercase). Default: RU |
| target_language | string | No | Target language code (2 letters, uppercase). Default: DE |

### Response

**Success (200 OK):**
```json
{
  "status": "success",
  "original_text": "Hello, how are you?",
  "translated_text": "Hallo, wie geht es dir?",
  "source_language": "en",
  "target_language": "de",
  "confidence": 0.95,
  "timestamp": "2025-10-03T10:30:00.000Z",
  "processing_time": 234,
  "provider": "openai-gpt4o-mini",
  "from_cache": false
}
```

**Error (400 Bad Request):**
```json
{
  "status": "error",
  "message": "Текст для перевода не указан"
}
```

**Error (500 Internal Server Error):**
```json
{
  "status": "error",
  "message": "Ошибка сервера: Translation failed",
  "timestamp": "2025-10-03T10:30:00.000Z"
}
```

### cURL Examples

**Basic translation:**
```bash
curl -X POST http://localhost:8080/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello world",
    "source_language": "EN",
    "target_language": "DE"
  }'
```

**Using alternative parameter names:**
```bash
curl -X POST http://localhost:8080/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Привет мир",
    "from": "RU",
    "to": "DE"
  }'
```

**Long text translation:**
```bash
curl -X POST http://localhost:8080/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is a longer text that needs to be translated. It contains multiple sentences and should maintain the original tone and style.",
    "fromLang": "EN",
    "toLang": "ES"
  }'
```

### Rate Limits

- **Development:** 100 requests per minute
- **Production:** 20 requests per minute

---

## Voice Translation

Upload an audio file, transcribe it, translate the text, and generate speech in the target language.

### Endpoint
```
POST /voice-translate
```

### Request Headers
```
Content-Type: multipart/form-data
```

### Request Body (multipart/form-data)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| audio | file | Yes | Audio file (max 10MB, audio/* MIME types only) |
| fromLang | string | No | Source language code. Default: RU |
| toLang | string | No | Target language code. Default: DE |

**Alternative parameter names:**
- `fromLang` | `source_language`
- `toLang` | `target_language`

### Response

**Success (200 OK):**
```json
{
  "status": "success",
  "originalText": "Привет, как дела?",
  "translatedText": "Hallo, wie geht es dir?",
  "audioUrl": "/audio/translated_1696234567890.mp3",
  "fromLanguage": "RU",
  "toLanguage": "DE",
  "processingTime": 1856,
  "confidence": 0.92,
  "provider": "Whisper+OpenAI+TTS"
}
```

**Error (400 Bad Request):**
```json
{
  "status": "error",
  "message": "Аудио файл не загружен"
}
```

**Error (500 Internal Server Error):**
```json
{
  "status": "error",
  "message": "Voice translation failed: ..."
}
```

### cURL Examples

**Upload audio file for translation:**
```bash
curl -X POST http://localhost:8080/voice-translate \
  -F "audio=@/path/to/recording.mp3" \
  -F "fromLang=RU" \
  -F "toLang=DE"
```

**With alternative parameter names:**
```bash
curl -X POST http://localhost:8080/voice-translate \
  -F "audio=@/path/to/voice.wav" \
  -F "source_language=EN" \
  -F "target_language=PL"
```

**Download translated audio:**
```bash
# After getting audioUrl from response
curl -O http://localhost:8080/audio/translated_1696234567890.mp3
```

### Supported Audio Formats

- MP3
- WAV
- M4A
- OGG
- FLAC

### Processing Pipeline

1. **Speech Recognition** - Whisper API transcribes audio to text
2. **Translation** - GPT-4o-mini translates the text
3. **Speech Synthesis** - TTS generates audio in target language

---

## Language Detection

Automatically detect the language of a given text.

### Endpoint
```
POST /detect-language
```

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "text": "Bonjour le monde"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| text | string | Yes | Text to analyze (1-5000 characters) |

### Response

**Success (200 OK):**
```json
{
  "status": "success",
  "detected_language": "FR",
  "confidence": 0.98,
  "provider": "openai-detection"
}
```

**Error (400 Bad Request):**
```json
{
  "status": "error",
  "message": "Текст не указан"
}
```

### cURL Examples

**Detect language:**
```bash
curl -X POST http://localhost:8080/detect-language \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Buenos días, ¿cómo estás?"
  }'
```

**Detect from mixed text:**
```bash
curl -X POST http://localhost:8080/detect-language \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Здравствуйте! Меня зовут Иван."
  }'
```

---

## Supported Languages

Get a list of all supported languages.

### Endpoint
```
GET /languages
```

### Response

**Success (200 OK):**
```json
{
  "status": "success",
  "count": 9,
  "languages": [
    {
      "code": "EN",
      "name": "English",
      "flag": "🇺🇸",
      "nativeName": "English"
    },
    {
      "code": "DE",
      "name": "Deutsch",
      "flag": "🇩🇪",
      "nativeName": "Deutsch"
    },
    {
      "code": "PL",
      "name": "Polski",
      "flag": "🇵🇱",
      "nativeName": "Polski"
    },
    {
      "code": "RU",
      "name": "Русский",
      "flag": "🇷🇺",
      "nativeName": "Русский"
    },
    {
      "code": "FR",
      "name": "Français",
      "flag": "🇫🇷",
      "nativeName": "Français"
    },
    {
      "code": "ES",
      "name": "Español",
      "flag": "🇪🇸",
      "nativeName": "Español"
    },
    {
      "code": "CS",
      "name": "Čeština",
      "flag": "🇨🇿",
      "nativeName": "Čeština"
    },
    {
      "code": "LT",
      "name": "Lietuvių",
      "flag": "🇱🇹",
      "nativeName": "Lietuvių"
    },
    {
      "code": "LV",
      "name": "Latviešu",
      "flag": "🇱🇻",
      "nativeName": "Latviešu"
    },
    {
      "code": "NO",
      "name": "Norsk",
      "flag": "🇳🇴",
      "nativeName": "Norsk"
    }
  ],
  "service": "UnifiedTranslationService"
}
```

### cURL Example

```bash
curl http://localhost:8080/languages
```

---

## Health Check

Check the server status and get system metrics.

### Endpoint
```
GET /health
```

### Response

**Success (200 OK):**
```json
{
  "status": "healthy",
  "service": "DashkaBot Cloud Server",
  "version": "3.0.0",
  "websocket_clients": 2,
  "requests_processed": 1523,
  "supported_languages": 9,
  "openai_configured": true,
  "uptime": 86400.5,
  "memory_usage": {
    "rss": 104857600,
    "heapTotal": 83886080,
    "heapUsed": 62914560,
    "external": 1234567,
    "arrayBuffers": 123456
  }
}
```

### cURL Example

```bash
curl http://localhost:8080/health
```

**Pretty-print JSON:**
```bash
curl http://localhost:8080/health | jq
```

**Watch health status (every 5 seconds):**
```bash
watch -n 5 'curl -s http://localhost:8080/health | jq'
```

---

## Statistics

Get detailed server statistics.

### Endpoint
```
GET /stats
```

### Response

**Success (200 OK):**
```json
{
  "status": "success",
  "stats": {
    "requests_processed": 1523,
    "cache_size": 847,
    "websocket_clients": 2,
    "supported_languages": 9,
    "openai_configured": true,
    "service_stats": {
      "supportedLanguages": 9,
      "features": [
        "text-translation",
        "voice-translation",
        "language-detection",
        "real-time-processing"
      ],
      "provider": "SOLAR v2.0 + OpenAI",
      "status": "ready"
    },
    "uptime": 86400.5,
    "memory_usage": {
      "rss": 104857600,
      "heapTotal": 83886080,
      "heapUsed": 62914560
    },
    "version": "3.0.0"
  }
}
```

### cURL Example

```bash
curl http://localhost:8080/stats | jq
```

---

## WebSocket Protocol

Real-time bidirectional communication for live translation.

### Connection URL

```
ws://localhost:8080/ws
```

### Connection Example (JavaScript)

```javascript
const ws = new WebSocket('ws://localhost:8080/ws');

ws.onopen = () => {
  console.log('Connected to DashkaBot');
  
  // Set role
  ws.send(JSON.stringify({
    type: 'set_role',
    role: 'translator'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('Disconnected');
};
```

### Events: Client → Server

#### Set Role
```json
{
  "type": "set_role",
  "role": "translator"
}
```

Possible roles: `translator`, `listener`, `admin`, `client`

#### Send Translation
```json
{
  "type": "translation",
  "text": "Hello world",
  "translatedText": "Hallo Welt",
  "from": "EN",
  "to": "DE"
}
```

#### Generic Message
```json
{
  "type": "message",
  "content": "Any custom data",
  "metadata": {}
}
```

### Events: Server → Client

#### Welcome Message
```json
{
  "type": "welcome",
  "client_id": "client_1696234567890_abc123",
  "message": "Подключение к DashkaBot Cloud успешно!",
  "timestamp": "2025-10-03T10:30:00.000Z"
}
```

#### Role Confirmed
```json
{
  "type": "role_confirmed",
  "role": "translator",
  "timestamp": "2025-10-03T10:30:00.000Z"
}
```

#### Translation Broadcast
```json
{
  "type": "translation",
  "text": "Hello world",
  "translatedText": "Hallo Welt",
  "from": "EN",
  "to": "DE",
  "sender_role": "translator",
  "sender_id": "client_1696234567890_abc123",
  "timestamp": "2025-10-03T10:30:00.000Z"
}
```

### WebSocket Testing with wscat

**Install wscat:**
```bash
npm install -g wscat
```

**Connect and interact:**
```bash
wscat -c ws://localhost:8080/ws

# After connection, send messages:
{"type":"set_role","role":"translator"}
{"type":"translation","text":"Hello","translatedText":"Hallo"}
```

---

## Error Handling

### Error Response Format

All errors follow this structure:

```json
{
  "status": "error",
  "message": "Error description",
  "timestamp": "2025-10-03T10:30:00.000Z"
}
```

### HTTP Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid parameters, missing required fields |
| 404 | Not Found | Endpoint doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error, API failure |

### Common Error Messages

**Translation Errors:**
- `"Текст для перевода не указан"` - Missing text parameter
- `"Unsupported language pair"` - Invalid language codes
- `"Translation failed"` - OpenAI API error

**File Upload Errors:**
- `"Аудио файл не загружен"` - No audio file in request
- `"Только аудио файлы разрешены"` - Invalid file type
- `"File too large"` - Exceeds 10MB limit

**Rate Limit Errors:**
- `"Слишком много запросов"` - Too many API requests
- `"Слишком много запросов перевода"` - Too many translations

---

## Testing Workflow

### 1. Check Server Health
```bash
curl http://localhost:8080/health
```

### 2. Get Supported Languages
```bash
curl http://localhost:8080/languages | jq
```

### 3. Test Text Translation
```bash
curl -X POST http://localhost:8080/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello","from":"EN","to":"DE"}' | jq
```

### 4. Test Language Detection
```bash
curl -X POST http://localhost:8080/detect-language \
  -H "Content-Type: application/json" \
  -d '{"text":"Hola mundo"}' | jq
```

### 5. Test Voice Translation
```bash
# Record audio first, then:
curl -X POST http://localhost:8080/voice-translate \
  -F "audio=@test.mp3" \
  -F "fromLang=EN" \
  -F "toLang=DE" | jq
```

### 6. Monitor Stats
```bash
watch -n 5 'curl -s http://localhost:8080/stats | jq ".stats | {requests: .requests_processed, cache: .cache_size, clients: .websocket_clients}"'
```

---

## Production Considerations

### Base URL
Update all requests to production URL:
```
https://dashka-chat-api.onrender.com
```

### WebSocket URL
```
wss://dashka-chat-api.onrender.com/ws
```

### Rate Limits
Production rate limits are stricter:
- API: 100 requests per 15 minutes
- Translation: 20 requests per minute

### CORS
Configure allowed origins in production:
```javascript
// Only allow specific domains
CORS_ORIGIN=https://your-frontend.com,https://api.your-domain.com
```

---

## Support

For issues or questions:
- GitHub Issues: [repository-link]
- Email: [contact-email]
- Documentation: [docs-link]

---

**Last Updated:** October 3, 2025  
**API Version:** 3.0.0