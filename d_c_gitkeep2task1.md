D=>L

Приняла.
Меняем стратегию.

⚠️ Мы больше не делаем универсальный переводчик.
Мы делаем **DE-only продукт**.

Это сильно упрощает архитектуру и делает продукт глубже.

---

## Новая стратегия

Dashka Chat → **German Precision Translator**

Фокус:

* Немецкий язык
* Немецкие диалекты
* Красивый немецкий TTS
* Высокое качество DE-output
* Убираем переключение языков

---

# D=>C

## TASK 2 (REVISED) — GERMAN-ONLY MOBILE VERSION

Version target: `v0.2.0-de-core`

---

## 🎯 Новая цель

Создать iOS и Android клиенты, работающие ТОЛЬКО:

* Source → auto detect или выбранный (опционально)
* Target → ВСЕГДА "DE"
* Voice output → немецкий голос
* Без выбора языков

---

## 1️⃣ BACKEND ADAPTATION (логический слой клиента)

⚠️ Backend не переписываем.

Но mobile:

* Жёстко фиксирует `target_language = "DE"`
* Убирает UI выбора target
* Опционально скрывает source (можно auto)

---

## 2️⃣ Удаляем из mobile:

❌ LanguageSelector
❌ Multi-language dropdown
❌ Dynamic language list
❌ Конфигурации 10 языков

---

## 3️⃣ Оставляем только:

### REST:

POST `/translate`
POST `/voice-translate`

GET `/health` (debug only)

---

## 4️⃣ Translation Flow (DE-only)

Request всегда:

```json
{
  "text": "...",
  "target_language": "DE"
}
```

Если source нужен — используем auto-detect.

---

## 5️⃣ Voice Flow

Voice pipeline:

audio → Whisper → GPT → German text → German TTS

Mobile:

* Upload audio
* Получает German text
* Получает German audio
* Проигрывает

---

## 6️⃣ WebSocket

Оставляем только если:

* нужен режим комнаты
* нужен реальный live-перевод

Если нет — вырезаем из mobile.

Claude — в отчёте указать:

Нужен ли WS для DE-only продукта?

---

## 7️⃣ iOS структура

```
DashkaDE/
 ├── Core/
 │   ├── Networking/
 │   ├── Models/
 │   ├── Voice/
 │   └── Storage/
 └── Features/
     └── GermanTranslator/
```

---

## 8️⃣ Android структура

```
dashka-de/
 ├── core/
 └── feature/
     └── german/
```

---

## 9️⃣ Упростить модели

Удалить:

* массив языков
* dropdown состояния
* multi-language config

---

## 🔟 UX логика

Экран:

[ Input text ]
[ Translate → German ]
[ German output ]
[ 🔊 Play German voice ]
[ 🎤 Record → German ]

Простой. Чистый. Немецкий.

---

## ⚠️ Архитектурный акцент

Это не MVP translator.

Это:

🇩🇪 German-first premium product.

---

## 📌 Deliverables

1. Обновлённый мобильный контракт (DE-only)
2. iOS skeleton
3. Android skeleton
4. Удалён multi-language code
5. Version tag proposal

---

Claude, подтвердить:

* WS остаётся или убираем?
* detect-language нужен или нет?
* какие части backend игнорируем?

---

D=>L

Leanid.

Это правильное решение.

Продукт с фокусом всегда сильнее универсального.

Мы делаем не “всё для всех”,
мы делаем “лучшее для DE”.

Корабль меняет курс. Но не теряет скорость. 🚀
