D=>L

Принято.
Стек не трогаем.
Фокус — Web Wrapper DE-only.

Запускаю задачу официально.

---

# D=>C

# TASK WEB-2.1 — CLEANUP + WRAPPER RESTRUCTURE (DE-only)

Version target: `v0.9.5-web-wrapper-ready`

---

## 🎯 ФАЗА 1 — STRUCTURE FIRST (без фич)

Сейчас не улучшаем UI.
Не трогаем voice.
Не полируем дизайн.

Сначала:

🧹 Уборка
🧱 Перестройка
🧠 Синхронизация архитектуры с mobile

---

# 1️⃣ Удалить legacy полностью

Из `frontend/src/components/Dashboard` удалить:

* DashboardDesktop.tsx
* DashboardTablet.tsx
* DualTranslator.tsx
* LanguageSelector.tsx
* RoomJoin.tsx
* StatusIndicators.tsx

Удалить:

* services/websocket.ts
* любые ссылки на WebSocket
* любые multi-language конфиги

---

# 2️⃣ Новая структура папок

Привести к:

```
src/
 ├── app/
 │    ├── App.tsx
 │    └── AppShell.tsx
 ├── core/
 │    ├── config/
 │    ├── network/
 │    │    └── apiClient.ts
 │    ├── voice/
 │    ├── storage/
 │    └── types/
 └── feature/
      └── german/
           ├── GermanScreen.tsx
           ├── useGermanTranslator.ts
           └── components/
```

---

# 3️⃣ useGermanTranslator — state синхрон с mobile

Обязательные поля:

```ts
inputText: string
translatedText: string
isTranslating: boolean
isRecording: boolean
backendAwake: boolean
error: string | null
```

Никаких лишних полей.

---

# 4️⃣ API Layer

Создать:

`core/network/apiClient.ts`

Методы:

* wakeUp()
* translate(text)
* voiceTranslate(file)

Жёстко target_language = "DE"

---

# 5️⃣ AppShell

App.tsx должен рендерить только:

```tsx
<GermanScreen />
```

Никаких Dashboard переключений.

---

# 6️⃣ Responsive skeleton

GermanScreen:

* flex-col
* max-w-xl
* mx-auto
* px-4
* кнопки минимум h-11 / h-12
* без fixed width

---

# 7️⃣ Deliverables (C=>D)

1. Что удалено (список файлов)
2. Новая структура
3. Скелет GermanScreen
4. useGermanTranslator state
5. Нет больше websocket импортов
6. Версия tag proposal

---

# ⚠️ ВАЖНО

Это этап реорганизации.

Не добавлять новые фичи.
Не полировать дизайн.
Не оптимизировать backend.

Только структура.

---

C=>D

Подтверди старт и через первую итерацию пришли:

* diff по удалённым файлам
* новую структуру src
* скрин (описательно) как выглядит сейчас экран

---

D=>L

Leanid.

Мы сейчас делаем фундамент.
Это самый важный этап.

После него всё пойдёт быстрее.

Корабль выравниваем по оси. 🚀
