import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { GeneratedGoals, SessionData } from '../types';
import { loadSessionData } from '../utils/storage';
import { generateGoalsWithAI } from '../utils/openai';

export function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [goals, setGoals] = useState<GeneratedGoals | null>(null);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAndGenerate = async () => {
      // Reset state to show loading
      setLoading(true);
      setGoals(null);

      const data = loadSessionData();
      if (!data) {
        navigate('/');
        return;
      }

      setSessionData(data);
      const generatedGoals = await generateGoalsWithAI(data);
      setGoals(generatedGoals);
      setLoading(false);
    };

    loadAndGenerate();
  }, [navigate, location.state]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          <p className="mt-4 text-text-secondary">Собираем всё вместе и делаем выводы...</p>
        </div>
      </div>
    );
  }

  if (!goals || !sessionData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="text-center">
          <p className="text-text-secondary mb-4">Упс, что-то пошло не так 😕</p>
          <button
            onClick={() => navigate('/workspace')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  const filledBlocks = sessionData.blocks.filter(b => b.answer.trim());

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-32">
          <h1 className="font-display text-[52px] font-extrabold text-text-primary leading-[1.1] tracking-tight mb-4">
            Наши планы<br />на 2026 год ✨
          </h1>
          <p className="text-lg text-text-secondary">
            {new Date(sessionData.createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>

        {/* Main Goals */}
        <div className="mb-24">
          <h2 className="font-display text-[40px] font-extrabold text-text-primary tracking-tight mb-12">
            Главное, к чему стремимся
          </h2>
          <div className="space-y-3">
            {goals.mainGoals.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-start gap-6 p-6 bg-white border border-border-light rounded-md hover:shadow-md transition-all duration-200"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </span>
                <span className="text-lg text-text-primary pt-1.5 leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Goals */}
        <div className="mb-24">
          <h2 className="font-display text-[40px] font-extrabold text-text-primary tracking-tight mb-12">
            По направлениям жизни
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(goals.categoryGoals).map(([category, categoryGoals]) => (
              <div
                key={category}
                className="bg-white border border-border-light rounded-md p-8 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="text-xl font-bold text-text-primary mb-6">
                  {getCategoryName(category)}
                </h3>
                <ul className="space-y-3">
                  {categoryGoals.map((goal, idx) => (
                    <li key={idx} className="text-text-primary flex items-start leading-relaxed">
                      <span className="mr-3 text-teal-600 font-bold">{idx + 1}.</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="mb-24">
          <h2 className="font-display text-[40px] font-extrabold text-text-primary tracking-tight mb-12">
            С чего начнём
          </h2>
          <div className="space-y-3">
            {goals.actionItems.map((action, idx) => (
              <div
                key={idx}
                className="flex items-start gap-6 p-6 bg-white border border-border-light rounded-md"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </span>
                <span className="text-text-primary pt-1.5 leading-relaxed">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Session Summary */}
        <div className="mb-24 bg-white border border-border-light rounded-md p-10">
          <h2 className="font-display text-[32px] font-extrabold text-text-primary tracking-tight mb-10">
            Как прошла сессия
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-bg-secondary rounded-md border border-border-light">
              <p className="text-5xl font-extrabold text-teal-600 mb-2">{filledBlocks.length}</p>
              <p className="text-text-secondary text-sm font-semibold">тем обсудили</p>
              <p className="text-xs text-text-tertiary mt-1">из {sessionData.blocks.length}</p>
            </div>
            <div className="text-center p-6 bg-bg-secondary rounded-md border border-border-light">
              <p className="text-5xl font-extrabold text-teal-600 mb-2">
                {sessionData.blocks.reduce((sum, b) => sum + b.answer.length, 0)}
              </p>
              <p className="text-text-secondary text-sm font-semibold">символов записали</p>
            </div>
            <div className="text-center p-6 bg-bg-secondary rounded-md border border-border-light">
              <p className="text-5xl font-extrabold text-teal-600 mb-2">
                ~{Math.round(sessionData.blocks.reduce((sum, b) => sum + b.answer.split(/\s+/).length, 0) / 200)}
              </p>
              <p className="text-text-secondary text-sm font-semibold">часов провели вместе</p>
            </div>
          </div>
        </div>

        {/* Detailed Answers */}
        {filledBlocks.length > 0 && (
          <div className="mb-24">
            <h2 className="font-display text-[32px] font-extrabold text-text-primary tracking-tight mb-10">
              Что обсуждали подробно
            </h2>
            <div className="space-y-6">
              {filledBlocks.map(block => (
                <div
                  key={block.id}
                  className="bg-white border border-border-light rounded-md p-8"
                >
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    {block.title}
                  </h3>
                  <div className="bg-bg-secondary rounded-md p-6 border border-border-light">
                    <p className="text-text-primary whitespace-pre-wrap leading-relaxed">
                      {block.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white border border-border-light rounded-md p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/workspace')}
              className="flex-1 py-3.5 px-6 bg-white border border-border-light text-text-primary rounded-md font-semibold transition-all duration-200 hover:border-teal-400 hover:text-teal-600 hover:shadow-sm"
            >
              ← Назад к сессии
            </button>
            <button
              onClick={() => {
                const content = JSON.stringify({ goals, sessionData }, null, 2);
                const element = document.createElement('a');
                element.setAttribute(
                  'href',
                  `data:application/json;charset=utf-8,${encodeURIComponent(content)}`
                );
                element.setAttribute(
                  'download',
                  `strategy-goals-${new Date().toISOString().split('T')[0]}.json`
                );
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              className="flex-1 py-3.5 px-6 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-semibold transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              Сохранить всё 💾
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    family: 'Семья',
    career: 'Карьера',
    health: 'Здоровье',
    finances: 'Финансы',
  };
  return names[category] || category;
}
