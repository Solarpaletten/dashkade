# D=>C | MOBILE TASK 1 — DashkaDE iOS + Android
# Solar Protocol v3.0 | Version target: v0.1.0-mobile-skeleton

---

## ☀️ КОНТЕКСТ

Берём рабочую веб-версию DashkaBot (React/TS + Node.js backend на Render).
Делаем нативные клиенты iOS (Swift) и Android (Kotlin).
Фокус: **German-first premium translator**.
Backend не трогаем. Только mobile клиенты.

Production API: `https://dashka-translate.onrender.com`

---

## 🎯 ЦЕЛЬ TASK 1

Создать полные скелеты проектов:
- iOS: Swift + SwiftUI
- Android: Kotlin + Jetpack Compose

С рабочими слоями:
1. Network (REST API)
2. Models (DE-only)
3. Voice (запись + TTS воспроизведение)
4. UI (главный экран)

---

## ❌ ЧТО УБИРАЕМ (в сравнении с веб)

- ❌ LanguageSelector (выбор target языка)
- ❌ Multi-language dropdown
- ❌ WebSocket / RoomJoin
- ❌ Dialect switcher
- ❌ `connectionStatus.ws` индикатор
- ❌ DashboardTablet / DashboardDesktop адаптивы

---

## ✅ ЧТО ОСТАВЛЯЕМ

- ✅ REST POST `/translate` — текстовый перевод
- ✅ REST POST `/voice-translate` — голосовой перевод
- ✅ GET `/health` — wake-up backend (Render free tier спит)
- ✅ Auto-detect source language
- ✅ target_language жёстко = "DE"
- ✅ TTS воспроизведение немецкого аудио

---

## 📡 API КОНТРАКТ (DE-only mobile)

### Wake Up Backend
```
GET https://dashka-translate.onrender.com/health
```
Response: `{ "status": "ok" }`

### Text Translation
```
POST https://dashka-translate.onrender.com/translate
Content-Type: application/json

{
  "text": "Привет, как дела?",
  "target_language": "DE"
}
```
Response:
```json
{
  "status": "success",
  "original_text": "Привет, как дела?",
  "translated_text": "Hallo, wie geht es dir?",
  "source_language": "ru",
  "target_language": "de",
  "confidence": 0.95,
  "processing_time": 234
}
```

### Voice Translation
```
POST https://dashka-translate.onrender.com/voice-translate
Content-Type: multipart/form-data

audio: <WAV/M4A file>
target_language: "DE"
```
Response:
```json
{
  "status": "success",
  "original_text": "распознанный текст",
  "translated_text": "Übersetzter Text",
  "audio_url": "/audio/result_xyz.mp3"
}
```

---

## 🍎 iOS — Swift / SwiftUI СТРУКТУРА

```
DashkaDE/
├── DashkaDEApp.swift
├── Core/
│   ├── Networking/
│   │   ├── APIClient.swift          ← URLSession wrapper
│   │   ├── APIEndpoints.swift       ← все эндпоинты константами
│   │   └── NetworkError.swift      ← enum ошибок
│   ├── Models/
│   │   ├── TranslationRequest.swift ← { text, target_language: "DE" }
│   │   ├── TranslationResponse.swift
│   │   └── VoiceTranslationResponse.swift
│   ├── Voice/
│   │   ├── AudioRecorder.swift      ← AVAudioRecorder
│   │   ├── AudioPlayer.swift        ← AVAudioPlayer
│   │   └── VoiceManager.swift       ← координатор запись/воспроизведение
│   └── Storage/
│       └── TranslationHistory.swift ← UserDefaults / последние переводы
├── Features/
│   └── GermanTranslator/
│       ├── GermanTranslatorView.swift      ← главный экран
│       ├── GermanTranslatorViewModel.swift ← @ObservableObject
│       └── Components/
│           ├── TranslationResultView.swift
│           ├── VoiceButton.swift
│           └── WakeUpBannerView.swift      ← показываем если backend спит
└── Resources/
    ├── Assets.xcassets
    └── Info.plist                          ← NSMicrophoneUsageDescription
```

### iOS — Ключевые файлы (скелеты)

#### APIClient.swift
```swift
import Foundation

final class APIClient {
    static let shared = APIClient()
    private let baseURL = "https://dashka-translate.onrender.com"
    
    func translate(text: String) async throws -> TranslationResponse {
        let request = TranslationRequest(text: text, targetLanguage: "DE")
        return try await post(endpoint: "/translate", body: request)
    }
    
    func wakeUp() async throws -> Bool {
        // GET /health — будим Render
        guard let url = URL(string: "\(baseURL)/health") else { throw NetworkError.invalidURL }
        let (_, response) = try await URLSession.shared.data(from: url)
        return (response as? HTTPURLResponse)?.statusCode == 200
    }
    
    private func post<T: Codable, R: Codable>(endpoint: String, body: T) async throws -> R {
        guard let url = URL(string: "\(baseURL)\(endpoint)") else { throw NetworkError.invalidURL }
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try JSONEncoder().encode(body)
        let (data, _) = try await URLSession.shared.data(for: req)
        return try JSONDecoder().decode(R.self, from: data)
    }
}
```

#### TranslationRequest.swift
```swift
struct TranslationRequest: Codable {
    let text: String
    let targetLanguage: String = "DE"  // ← жёстко DE
    
    enum CodingKeys: String, CodingKey {
        case text
        case targetLanguage = "target_language"
    }
}
```

#### GermanTranslatorViewModel.swift
```swift
import SwiftUI
import Combine

@MainActor
final class GermanTranslatorViewModel: ObservableObject {
    @Published var inputText = ""
    @Published var translatedText = ""
    @Published var isTranslating = false
    @Published var isRecording = false
    @Published var backendAwake = false
    @Published var errorMessage: String?
    
    private let api = APIClient.shared
    private let voice = VoiceManager()
    
    func wakeBackend() async {
        backendAwake = (try? await api.wakeUp()) ?? false
    }
    
    func translate() async {
        guard !inputText.isEmpty else { return }
        isTranslating = true
        defer { isTranslating = false }
        do {
            let result = try await api.translate(text: inputText)
            translatedText = result.translatedText
        } catch {
            errorMessage = error.localizedDescription
        }
    }
    
    func toggleRecording() {
        isRecording ? voice.stopRecording() : voice.startRecording()
        isRecording.toggle()
    }
    
    func playGerman() async {
        // воспроизведение TTS из audio_url
    }
}
```

#### GermanTranslatorView.swift
```swift
import SwiftUI

struct GermanTranslatorView: View {
    @StateObject private var vm = GermanTranslatorViewModel()
    
    var body: some View {
        ZStack {
            LinearGradient(colors: [.purple, .blue, .teal],
                          startPoint: .topLeading, endPoint: .bottomTrailing)
                .ignoresSafeArea()
            
            VStack(spacing: 16) {
                // Header
                Text("🇩🇪 Dashka DE")
                    .font(.title2.bold())
                    .foregroundColor(.white)
                
                // Wake Up banner (если Render спит)
                if !vm.backendAwake {
                    WakeUpBannerView {
                        Task { await vm.wakeBackend() }
                    }
                }
                
                // Input
                TextEditor(text: $vm.inputText)
                    .frame(height: 120)
                    .cornerRadius(12)
                
                // Translate Button
                Button {
                    Task { await vm.translate() }
                } label: {
                    Label(vm.isTranslating ? "Übersetze..." : "→ Deutsch",
                          systemImage: "arrow.right.circle.fill")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.green)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                }
                .disabled(vm.isTranslating || vm.inputText.isEmpty)
                
                // Result
                TranslationResultView(text: vm.translatedText)
                
                // Voice Button
                VoiceButton(isRecording: vm.isRecording) {
                    vm.toggleRecording()
                }
                
                Spacer()
            }
            .padding()
        }
        .task { await vm.wakeBackend() }
    }
}
```

---

## 🤖 Android — Kotlin / Jetpack Compose СТРУКТУРА

```
dashka-de/
├── app/
│   └── src/main/
│       ├── AndroidManifest.xml        ← RECORD_AUDIO permission
│       └── java/com/dashka/de/
│           ├── DashkaApp.kt
│           ├── core/
│           │   ├── network/
│           │   │   ├── ApiClient.kt          ← Retrofit / OkHttp
│           │   │   ├── ApiService.kt         ← интерфейс эндпоинтов
│           │   │   └── NetworkError.kt
│           │   ├── model/
│           │   │   ├── TranslationRequest.kt ← data class, target="DE"
│           │   │   └── TranslationResponse.kt
│           │   └── voice/
│           │       ├── AudioRecorder.kt      ← MediaRecorder
│           │       └── AudioPlayer.kt        ← MediaPlayer
│           └── feature/
│               └── german/
│                   ├── GermanScreen.kt       ← @Composable UI
│                   ├── GermanViewModel.kt    ← ViewModel + StateFlow
│                   └── components/
│                       ├── TranslationResult.kt
│                       ├── VoiceButton.kt
│                       └── WakeUpBanner.kt
├── build.gradle (app)
└── build.gradle (project)
```

### Android — Ключевые файлы (скелеты)

#### TranslationRequest.kt
```kotlin
data class TranslationRequest(
    val text: String,
    @SerializedName("target_language")
    val targetLanguage: String = "DE"  // ← жёстко DE
)
```

#### ApiService.kt
```kotlin
interface ApiService {
    @GET("/health")
    suspend fun wakeUp(): Response<Unit>

    @POST("/translate")
    suspend fun translate(@Body request: TranslationRequest): TranslationResponse

    @Multipart
    @POST("/voice-translate")
    suspend fun voiceTranslate(
        @Part audio: MultipartBody.Part,
        @Part("target_language") targetLanguage: RequestBody = "DE".toRequestBody()
    ): VoiceTranslationResponse
}
```

#### GermanViewModel.kt
```kotlin
@HiltViewModel
class GermanViewModel @Inject constructor(
    private val api: ApiService
) : ViewModel() {

    private val _state = MutableStateFlow(GermanUiState())
    val state = _state.asStateFlow()

    fun wakeBackend() = viewModelScope.launch {
        try {
            api.wakeUp()
            _state.update { it.copy(backendAwake = true) }
        } catch (e: Exception) {
            _state.update { it.copy(backendAwake = false) }
        }
    }

    fun translate(text: String) = viewModelScope.launch {
        _state.update { it.copy(isTranslating = true) }
        try {
            val result = api.translate(TranslationRequest(text = text))
            _state.update { it.copy(
                translatedText = result.translatedText,
                isTranslating = false
            )}
        } catch (e: Exception) {
            _state.update { it.copy(
                error = e.message,
                isTranslating = false
            )}
        }
    }
}

data class GermanUiState(
    val inputText: String = "",
    val translatedText: String = "",
    val isTranslating: Boolean = false,
    val isRecording: Boolean = false,
    val backendAwake: Boolean = false,
    val error: String? = null
)
```

#### GermanScreen.kt
```kotlin
@Composable
fun GermanScreen(vm: GermanViewModel = hiltViewModel()) {
    val state by vm.state.collectAsState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.linearGradient(listOf(Color(0xFF7C3AED), Color(0xFF2563EB), Color(0xFF0D9488)))
            )
    ) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            
            Text("🇩🇪 Dashka DE", style = MaterialTheme.typography.headlineMedium,
                color = Color.White, fontWeight = FontWeight.Bold)
            
            // Wake Up Banner
            if (!state.backendAwake) {
                WakeUpBanner(onWakeUp = { vm.wakeBackend() })
            }
            
            // Input
            OutlinedTextField(
                value = state.inputText,
                onValueChange = { vm.updateInput(it) },
                modifier = Modifier.fillMaxWidth().height(120.dp),
                placeholder = { Text("Введите текст...") }
            )
            
            // Translate Button
            Button(
                onClick = { vm.translate(state.inputText) },
                modifier = Modifier.fillMaxWidth(),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF22C55E)),
                enabled = !state.isTranslating && state.inputText.isNotEmpty()
            ) {
                Text(if (state.isTranslating) "Übersetze..." else "→ Deutsch")
            }
            
            // Result
            TranslationResult(text = state.translatedText)
            
            // Voice Button
            VoiceButton(
                isRecording = state.isRecording,
                onClick = { vm.toggleRecording() }
            )
        }
    }

    LaunchedEffect(Unit) { vm.wakeBackend() }
}
```

---

## 📦 ЗАВИСИМОСТИ

### iOS (Package.swift / SPM)
```
- нет внешних зависимостей для v1
- используем только: URLSession, AVFoundation, SwiftUI
```

### Android (build.gradle)
```groovy
dependencies {
    // Compose
    implementation "androidx.compose.ui:ui:1.6.0"
    implementation "androidx.compose.material3:material3:1.2.0"
    
    // ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0"
    
    // Retrofit + Gson
    implementation "com.squareup.retrofit2:retrofit:2.9.0"
    implementation "com.squareup.retrofit2:converter-gson:2.9.0"
    
    // Hilt (DI)
    implementation "com.google.dagger:hilt-android:2.50"
    kapt "com.google.dagger:hilt-compiler:2.50"
    
    // Coroutines
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3"
}
```

---

## 📋 PERMISSIONS

### iOS Info.plist
```xml
<key>NSMicrophoneUsageDescription</key>
<string>Нужен микрофон для голосового перевода на немецкий</string>
```

### Android Manifest
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

---

## 🚀 DELIVERABLES TASK 1

- [x] API контракт (DE-only) ← готов выше
- [ ] iOS Xcode проект со структурой выше
- [ ] Android Gradle проект со структурой выше
- [ ] Рабочий `/health` wake-up на обоих платформах
- [ ] Рабочий POST `/translate` на обоих платформах
- [ ] UI главного экрана (текстовый режим)

---

## 🔜 TASK 2 (следующий шаг)

- Voice recording → upload → German audio playback
- История переводов (локальный кеш)
- Offline режим (сохранённые переводы)
- App Store / Play Market подготовка

---

## ⚠️ АРХИТЕКТУРНЫЙ АКЦЕНТ (C=>L)

WS убран полностью из mobile v1.
Auto-detect source — оставлен (backend делает сам).
Target жёстко "DE" на уровне модели, не UI.
Wake-up логика сохранена — Render free tier спит через 15 мин.

**Version tag proposal:** `v0.1.0-mobile-skeleton`

---
Solar v3.0 | D=>C | C=>L готов к review архитектора
