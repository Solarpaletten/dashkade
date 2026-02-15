// ========================================
// MOBILE DASHBOARD - iPhone оптимизация
// ========================================
// src/components/Dashboard/DashboardMobile.tsx
import React from 'react';
import { useTranslator } from '../../hooks/useTranslator';
import { currentLanguageConfig } from '../../config/currentLanguage';

const DashboardMobile: React.FC = () => {
  const {
    currentRole,
    currentMode,
    inputText,
    originalText,
    translatedText,
    isRecording,
    status,
    isTranslating,
    connectionStatus,
    setCurrentMode,
    setInputText,
    handleRoleChange,
    toggleRecording,
    translateText,
    clearText,
    pasteText,
    copyResult
  } = useTranslator();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 p-3">
      <div className="max-w-sm mx-auto">
        
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-white text-xl font-bold mb-1">
            🚀 Dual Translator
          </h1>
          <p className="text-white/80 text-xs mb-3">
            📱 Mobile | Russian ⇄ Polish Voice Translator
          </p>
          
          {/* Language Selector - Compact */}
          <div className="flex gap-2">
            <button
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                currentRole === 'user' 
                  ? 'bg-white/90 text-gray-900' 
                  : 'bg-white/20 text-white'
              }`}
              onClick={() => handleRoleChange('user')}
            >
              🇷🇺 Russian
            </button>
            <button
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                currentRole === 'steuerberater' 
                  ? 'bg-white/90 text-gray-900' 
                  : 'bg-white/20 text-white'
              }`}
              onClick={() => handleRoleChange('steuerberater')}
            >
              🇵🇱 Polish
            </button>
          </div>
        </header>

        {/* Mode Tabs */}
        <div className="flex mb-4 bg-black/20 rounded-xl p-1">
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              currentMode === 'text'
                ? 'bg-white/20 text-white'
                : 'text-white/70'
            }`}
            onClick={() => setCurrentMode('text')}
          >
            📝 Текст
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              currentMode === 'voice'
                ? 'bg-white/20 text-white'
                : 'text-white/70'
            }`}
            onClick={() => setCurrentMode('voice')}
          >
            🎤 Голос
          </button>
        </div>

        {/* Status - Compact */}
        <div className="bg-white/20 p-2 rounded-xl mb-4 text-center text-white text-sm font-medium">
          {status}
        </div>

        {/* Input Section */}
        <div className="bg-white/10 rounded-2xl p-4 mb-4 shadow-lg backdrop-blur-sm">
          
          {/* Text Mode */}
          {currentMode === 'text' && (
            <div className="mb-4">
              <div className="relative">
                <textarea
                  className="w-full h-24 rounded-xl p-3 resize-none text-gray-900 text-sm border-none focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter text..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                
                {/* Quick Actions - Mobile */}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    className="w-6 h-6 bg-blue-500/80 text-white rounded text-xs font-bold transition-all"
                    onClick={pasteText}
                  >
                    v
                  </button>
                  <button
                    className="w-6 h-6 bg-gray-500/80 text-white rounded text-xs font-bold transition-all"
                    onClick={() => setInputText('')}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Voice Mode - Mobile */}
          {currentMode === 'voice' && (
            <div className="text-center mb-4">
              <button
                className={`w-20 h-20 rounded-full border-none text-2xl cursor-pointer transition-all text-white shadow-lg mb-3 ${
                  isRecording
                    ? 'bg-gradient-to-br from-red-600 to-red-700 animate-pulse'
                    : 'bg-gradient-to-br from-red-500 to-red-600 active:scale-95'
                }`}
                onClick={toggleRecording}
              >
                {isRecording ? '⏹️' : '🎤'}
              </button>
              
              <div className="bg-white/5 rounded-xl p-3 text-white text-sm">
                {originalText}
              </div>
            </div>
          )}

          {/* Control Buttons - Stack on Mobile */}
          <div className="space-y-2">
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl shadow-lg font-semibold transition-all"
              onClick={translateText}
              disabled={isTranslating}
            >
              {isTranslating ? '⏳ Translating' : '
            </button>
            
            <button
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl font-semibold transition-all"
              onClick={clearText}
            >
              🗑️ Очистить всё
            </button>
          </div>
        </div>

        {/* Translation Result */}
        <div className="bg-white/10 rounded-2xl p-4 mb-4 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold text-sm">Перевод:</h3>
            <button
              className="px-2 py-1 bg-green-500/80 text-white rounded text-xs font-bold transition-all"
              onClick={copyResult}
            >
              📄
            </button>
          </div>

          <div className="rounded-xl p-3 bg-white text-gray-900 text-sm min-h-[60px] whitespace-pre-line">
            {translatedText || "Translation will appear here..."}
          </div>
        </div>

        {/* Footer Status - Mobile */}
        <div className="bg-black/20 rounded-xl p-3 text-center text-white text-xs">
          <div className="font-bold mb-2">Samsung Galaxy S24</div>
          <div className="mb-2">Подключен через Wi-Fi</div>
          
          <div className="grid grid-cols-1 gap-1">
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connectionStatus.ai ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>AI Server</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connectionStatus.ws ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>WebSocket</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connectionStatus.speech ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>Speech API</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobile;
        