import type { SessionData } from '../types';

const STORAGE_KEY = 'strategySessionData';

export const saveSessionData = (data: SessionData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving session data:', error);
  }
};

export const loadSessionData = (): SessionData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsedData: SessionData = JSON.parse(data);

    // Migration: add missing blocks if they don't exist
    const emptyData = createEmptySessionData();
    const existingBlockIds = parsedData.blocks.map(b => b.id);
    const missingBlocks = emptyData.blocks.filter(b => !existingBlockIds.includes(b.id));

    if (missingBlocks.length > 0) {
      parsedData.blocks = [...parsedData.blocks, ...missingBlocks];
      parsedData.updatedAt = new Date().toISOString();
      // Save migrated data back to localStorage
      saveSessionData(parsedData);
    }

    return parsedData;
  } catch (error) {
    console.error('Error loading session data:', error);
    return null;
  }
};

export const createEmptySessionData = (): SessionData => {
  return {
    blocks: [
      {
        id: 'retrospective',
        title: 'Ретроспектива 2025',
        duration: '40 мин',
        questions: [
          'Что было главным достижением года для каждого?',
          'Какой момент был самым сложным?',
          'Что дало больше всего энергии/радости?',
          'Где чувствовали выгорание или перегруз?',
        ],
        answer: '',
      },
      {
        id: 'family',
        title: 'Семья и Ребенок',
        duration: '45 мин',
        questions: [
          'Какие главные события ожидаются в 2026?',
          // 'Нужен ли детский сад/Tagesmutter?',
          'Какие навыки/ценности хотим заложить?',
          'Как распределить обязанности по уходу?',
          'Как часто планируем наше время?',
        ],
        answer: '',
      },
      {
        id: 'career',
        title: 'Карьера и Профессиональное Развитие',
        duration: '40 мин',
        questions: [
          'Какие цели у каждого в 2026?',
          'Нужны ли курсы/сертификации?',
          'Планируешь ли смену работы/повышение?',
          'Как поддержать карьерные цели друг друга?',
          'Какой ожидаемый доход на 2026?',
        ],
        answer: '',
      },
      {
        id: 'home',
        title: 'Жилье и Быт',
        duration: '30 мин',
        questions: [
          'Устраивает ли квартира по размеру/району?',
          'Нужен ли переезд?',
          'Какие улучшения хотим сделать?',
          'Как распределить домашние дела?',
        ],
        answer: '',
      },
      {
        id: 'health',
        title: 'Здоровье и Личное Развитие',
        duration: '35 мин',
        questions: [
          'Какие цели по спорту/активности?',
          'Регулярные чекапы и анализы?',
          // 'Как улучшить режим сна?',
          'Что хотим изменить в питании?',
          'Какие личные интересы развивать?',
        ],
        answer: '',
      },
      {
        id: 'travel',
        title: 'Путешествия и Досуг',
        duration: '30 мин',
        questions: [
          // 'Прага в апреле - детали планирования?',
          'Какие поездки планируем?',
          'Хотим ли отпуск без ребенка?',
          'Какой общий бюджет на путешествия?',
        ],
        answer: '',
      },
      {
        id: 'finance',
        title: 'Финансовая Стратегия',
        duration: '40 мин',
        questions: [
          'Общий доход семьи на 2026?',
          'Обязательные расходы (жилье, сад, еда, транспорт)?',
          'Какой % хотим откладывать?',
          'Emergency fund - есть ли, нужно ли создать?',
          'Долгосрочные цели (покупка жилья, образование ребенка)?',
          'Топ-3 финансовые цели года?',
        ],
        answer: '',
      },
      {
        id: 'implementation',
        title: 'Система Реализации',
        duration: '20 мин',
        questions: [
          'Главная цель года для семьи?',
          'Топ-3 личных цели каждого?',
          'От чего готовы отказаться ради главного?',
          'Как часто делаем check-in (ежемесячно)?',
          'Кто отвечает за tracking?',
          'Что делаем, если планы не работают?',
        ],
        answer: '',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const exportSessionAsJson = (data: SessionData): string => {
  return JSON.stringify(data, null, 2);
};

export const downloadFile = (content: string, filename: string): void => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
