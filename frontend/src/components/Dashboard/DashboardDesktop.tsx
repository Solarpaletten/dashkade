// src/components/Dashboard/DashboardDesktop.tsx
import React, { useState } from 'react';
import { useTranslator } from '../../hooks/useTranslator';
import { currentLanguageConfig } from '../../config/currentLanguage';

const DashboardDesktop: React.FC = () => {
  const {
    translationMode,        // ← ДОБАВИТЬ
    currentRole,
    currentMode,
    inputText,
    originalText,
    translatedText,
    isRecording,
    status,
    isTranslating,
    autoTranslate,
    connectionStatus,
    setCurrentMode,
    setInputText,
    setAutoTranslate,
    handleRoleChange,
    toggleRecording,
    translateText,
    clearText,
    pasteText,
    copyResult,
    performTranslation,
    toggleTranslationMode
  } = useTranslator();

  const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical');

  // Автоперевод при изменении текста
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);

    if (autoTranslate && text.trim()) {
      // Debounce для автоперевода
      setTimeout(() => {
        if (inputText === text && text.trim()) {
          performTranslation(text);
        }
      }, 1000);
    }
  };

  const toggleLayout = () => {
    setLayoutMode(prev => prev === 'vertical' ? 'horizontal' : 'vertical');
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 p-6">

      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-white text-3xl font-bold">
            {currentLanguageConfig.app.title}
          </h1>
          <span className="text-white/70 text-sm">
            💻 Desktop Mode
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Layout Toggle */}
          <button
            onClick={toggleLayout}
            className="px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
            title="Переключить раскладку"
          >
            {layoutMode === 'vertical' ? '↕️' : '↔️'}
          </button>

          {/* Auto-translate Toggle */}
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={autoTranslate}
              onChange={(e) => setAutoTranslate(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Автоперевод</span>
          </label>

          {/* Translation Mode Toggle - кнопка показывает что будет после клика */}
          <button
            onClick={toggleTranslationMode}
            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all font-semibold"
            title="Переключить режим перевода"
          >
            {translationMode === 'manual' ? '🤖 Включить Авто' : '🎯 Фиксировать языки'}
          </button>

          {/* Language Selector - показываем только в Manual режиме */}
          {translationMode === 'manual' && (
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentRole === 'user'
                  ? 'bg-white/90 text-gray-900'
                  : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                onClick={() => handleRoleChange('user')}
              >
                🇷🇺 {currentLanguageConfig.languageSelector.sourceLabel}
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentRole === 'steuerberater'
                  ? 'bg-white/90 text-gray-900'
                  : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                onClick={() => handleRoleChange('steuerberater')}
              >
                🇵🇱 {currentLanguageConfig.languageSelector.targetLabel}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mode Tabs */}
      <div className="flex mb-6 bg-black/20 rounded-xl p-1 w-fit">
        <button
          className={`py-2 px-6 rounded-lg text-sm font-medium transition-all ${currentMode === 'text'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white'
            }`}
          onClick={() => setCurrentMode('text')}
        >
          📝 Текст
        </button>
        <button
          className={`py-2 px-6 rounded-lg text-sm font-medium transition-all ${currentMode === 'voice'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white'
            }`}
          onClick={() => setCurrentMode('voice')}
        >
          🎤 Голос
        </button>
      </div>

      {/* Status Bar */}
      <div className="bg-white/20 p-3 rounded-xl mb-6 text-center text-white font-medium">
        {status}
      </div>

      {/* Main Content Area */}
      <main className={`flex flex-1 gap-6 ${layoutMode === 'vertical' ? 'flex-row' : 'flex-col'
        }`}>

        {/* Input Panel */}
        <div className={`bg-white/10 rounded-2xl p-6 flex flex-col shadow-lg backdrop-blur-sm ${layoutMode === 'vertical' ? 'w-1/2' : 'h-1/2'
          }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold text-lg">
              {currentMode === 'text' ? 'Исходный текст' : 'Голосовой ввод'}
            </h2>

            {/* Voice Mode Controls */}
            {currentMode === 'voice' && (
              <button
                className={`w-16 h-16 rounded-full border-none text-2xl cursor-pointer transition-all text-white shadow-lg ${isRecording
                  ? 'bg-gradient-to-br from-red-600 to-red-700 animate-pulse'
                  : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105'
                  }`}
                onClick={toggleRecording}
                title={isRecording ? 'Остановить запись' : 'Начать запись'}
              >
                {isRecording ? '⏹️' : '🎤'}
              </button>
            )}
          </div>

          {/* Text Input */}
          {currentMode === 'text' && (
            <div className="flex-1 relative">
              <textarea
                className="w-full h-full rounded-xl p-4 resize-none text-gray-900 text-lg border-none focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder={currentLanguageConfig.placeholders.inputText}
                value={inputText}
                onChange={handleInputChange}
              />

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                  className="w-8 h-8 bg-blue-500/80 hover:bg-blue-600 text-white rounded text-sm font-bold backdrop-blur-sm transition-all hover:scale-110"
                  onClick={pasteText}
                  title="Вставить"
                >
                  📋
                </button>
                <button
                  className="w-8 h-8 bg-gray-500/80 hover:bg-gray-600 text-white rounded text-sm font-bold backdrop-blur-sm transition-all hover:scale-110"
                  onClick={() => setInputText('')}
                  title="Очистить"
                >
                  ✖
                </button>
              </div>
            </div>
          )}

          {/* Voice Mode Display */}
          {currentMode === 'voice' && (
            <div className="flex-1 rounded-xl p-4 bg-white/5 text-white">
              <div className="text-lg font-medium mb-2">
                {isRecording ? 'Говорите...' : 'Нажмите микрофон для записи'}
              </div>
              <div className="text-white/80">
                {originalText}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all flex-1"
              onClick={translateText}
              disabled={isTranslating || (!inputText.trim() && currentMode === 'text')}
            >
              {isTranslating ? '⏳ Translating' : `🔄 ${currentLanguageConfig.buttons.translate}`}
            </button>

            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition-all"
              onClick={clearText}
            >
              🗑️ {currentLanguageConfig.buttons.clear}
            </button>
          </div>
        </div>

        {/* Translation Panel */}
        <div className={`bg-white/10 rounded-2xl p-6 flex flex-col shadow-lg backdrop-blur-sm ${layoutMode === 'vertical' ? 'w-1/2' : 'h-1/2'
          }`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold text-lg">
              {currentLanguageConfig.placeholders.outputLabel}
            </h2>

            <button
              className="px-3 py-1 bg-green-500/80 hover:bg-green-600 text-white rounded-lg text-sm font-bold transition-all"
              onClick={copyResult}
              title="Копировать результат"
            >
              📄 Копировать
            </button>
          </div>

          <div className="flex-1 rounded-xl p-4 bg-white text-gray-900 text-lg whitespace-pre-line overflow-auto">
            {translatedText || "Translation will appear here..."}
          </div>
        </div>
      </main>

      {/* Footer Status */}
      <footer className="flex justify-between items-center mt-6 text-white/90 text-sm">
        <div className="flex items-center gap-4">
          <span>Samsung Galaxy S24 | Подключено через Wi-Fi</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connectionStatus.ai ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span>AI Server</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connectionStatus.ws ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span>WebSocket</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connectionStatus.speech ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span>Speech API</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardDesktop;