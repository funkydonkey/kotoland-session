import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SessionData } from '../types';
import { saveSessionData, loadSessionData, createEmptySessionData, exportSessionAsJson, downloadFile } from '../utils/storage';
import { SessionBlockComponent } from '../components/SessionBlock';

export function WorkspacePage() {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const loadedData = loadSessionData();
    if (loadedData) {
      setSessionData(loadedData);
    } else {
      setSessionData(createEmptySessionData());
    }
  }, []);

  const handleAnswerChange = (blockId: string, answer: string) => {
    if (!sessionData) return;

    const updatedData = {
      ...sessionData,
      blocks: sessionData.blocks.map(block =>
        block.id === blockId ? { ...block, answer } : block
      ),
      updatedAt: new Date().toISOString(),
    };
    setSessionData(updatedData);
    saveSessionData(updatedData);
  };

  const handleExport = () => {
    if (!sessionData) return;
    const json = exportSessionAsJson(sessionData);
    downloadFile(json, `strategy-session-${new Date().toISOString().split('T')[0]}.json`);
  };

  const handleContinueToResults = () => {
    if (!sessionData) return;
    saveSessionData(sessionData);
    navigate('/results', { state: { timestamp: Date.now() } });
  };

  if (!sessionData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          <p className="mt-4 text-text-secondary">Загрузка сессии...</p>
        </div>
      </div>
    );
  }

  const completedBlocks = sessionData.blocks.filter(b => b.answer.trim()).length;
  const totalBlocks = sessionData.blocks.length;
  const progress = Math.round((completedBlocks / totalBlocks) * 100);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-display text-[52px] font-extrabold text-text-primary leading-[1.1] tracking-tight mb-4">
            Наша стратегическая сессия
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Записывай сюда главные мысли и решения. Всё сохраняется автоматически 💾
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white border border-border-light rounded-md p-8 mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-text-primary">
              Готово: {completedBlocks} из {totalBlocks} блоков
            </span>
            <span className="text-sm font-bold text-teal-600">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-border-light rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Session blocks */}
        <div className="mb-12">
          {sessionData.blocks.map(block => (
            <SessionBlockComponent
              key={block.id}
              block={block}
              onAnswerChange={handleAnswerChange}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="bg-white border border-border-light rounded-md p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExport}
              className="flex-1 py-3.5 px-6 bg-white border border-border-light text-text-primary rounded-md font-semibold transition-all duration-200 hover:border-teal-400 hover:text-teal-600 hover:shadow-sm"
            >
              Скачать бэкап
            </button>
            <button
              onClick={handleContinueToResults}
              className="flex-1 py-3.5 px-6 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-semibold transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              Смотреть итоги →
            </button>
          </div>
          <p className="text-xs text-text-tertiary mt-5 text-center">
            Последнее обновление: {new Date(sessionData.updatedAt).toLocaleString('ru-RU')}
          </p>
        </div>
      </div>
    </div>
  );
}
