import type { SessionData, GeneratedGoals } from '../types';

export const generateGoalsWithAI = async (sessionData: SessionData): Promise<GeneratedGoals | null> => {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('OpenAI API key not found. Using mock generation.');
      return generateMockGoals(sessionData);
    }

    const sessionSummary = sessionData.blocks
      .map(block => `${block.title}:\n${block.answer}`)
      .join('\n\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a family strategy coach. Analyze the session notes and generate main goals and detailed action items for 2026. 
            Respond in Russian with JSON format:
            {
              "mainGoals": ["goal1", "goal2", "goal3"],
              "categoryGoals": {
                "family": ["goal1", "goal2"],
                "career": ["goal1", "goal2"],
                "health": ["goal1", "goal2"],
                "finances": ["goal1", "goal2"]
              },
              "actionItems": ["action1", "action2", "action3"]
            }`,
          },
          {
            role: 'user',
            content: `Analyze these session notes and generate family strategic goals for 2026:\n\n${sessionSummary}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.statusText);
      return generateMockGoals(sessionData);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return generateMockGoals(sessionData);
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return generateMockGoals(sessionData);
    }

    return JSON.parse(jsonMatch[0]) as GeneratedGoals;
  } catch (error) {
    console.error('Error generating goals:', error);
    return generateMockGoals(sessionData);
  }
};

const generateMockGoals = (sessionData: SessionData): GeneratedGoals => {
  const hasAnswers = sessionData.blocks.filter(b => b.answer.trim()).length > 0;

  if (!hasAnswers) {
    return {
      mainGoals: [
        'Провести сессию и заполнить все блоки обсуждения',
        'Определить совместные ценности семьи',
        'Спланировать основные вехи года',
      ],
      categoryGoals: {
        family: ['Обсудить семейные планы'],
        career: ['Определить карьерные приоритеты'],
        health: ['Спланировать здоровье семьи'],
        finances: ['Спланировать бюджет'],
      },
      actionItems: [
        'Заполните оставшиеся блоки сессии',
        'Обсудите каждый вопрос в семье',
        'Запишите договоренности',
      ],
    };
  }

  return {
    mainGoals: [
      'Укреплять семейные связи через совместное планирование',
      'Сбалансировать карьеру, семью и личное развитие',
      'Достичь финансовой стабильности',
    ],
    categoryGoals: {
      family: [
        'Развивать ребенка согласно плану',
        'Сохранять качество отношений',
        'Регулярно проводить время вдвоем',
      ],
      career: [
        'Развивать профессиональные навыки',
        'Достичь баланса между работой и семьей',
        'Инвестировать в обучение',
      ],
      health: [
        'Поддерживать физическое здоровье',
        'Заботиться о ментальном здоровье',
        'Развивать личные интересы',
      ],
      finances: [
        'Планировать расходы по категориям',
        'Откладывать регулярно',
        'Инвестировать в будущее',
      ],
    },
    actionItems: [
      'Создать детальный бюджет на каждый месяц',
      'Запланировать ежемесячные семейные встречи',
      'Определить ответственность каждого',
      'Создать систему отслеживания целей',
    ],
  };
};
