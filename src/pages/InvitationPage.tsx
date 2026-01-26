import { Link } from 'react-router-dom';

export function InvitationPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="mb-20">
          <h1 className="font-display text-[52px] font-extrabold text-text-primary leading-[1.1] tracking-tight mb-6">
            Семейная Стратегическая<br />Сессия 2026
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
            Давай вместе спланируем наш год: мечты, цели и важные решения
          </p>
        </div>

        {/* When */}
        <div className="mb-16 bg-teal-50 border border-teal-300 rounded-md p-8">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-3">
            📅 Когда встречаемся?
          </h2>
          <p className="text-lg text-text-primary leading-relaxed">
            Следующая суббота, во время дневного сна Нины<br />
            <span className="text-text-secondary text-base">Надеюсь, будет час сорок минут 😊</span>
          </p>
        </div>

        {/* Goals Section */}
        <div className="mb-24">
          <h2 className="font-display text-[40px] font-extrabold text-text-primary tracking-tight mb-8">
            Что мы хотим получить?
          </h2>
          <div className="space-y-3">
            {[
              'Вспомнить, что для нас по-настоящему важно',
              'Помечтать вместе о том, каким будет наш 2026',
              'Договориться о приоритетах и разделении задач',
              'Спланировать финансы и крупные покупки',
              'Провести время вместе за интересным разговором'
            ].map((goal, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-5 p-5 bg-white border border-border-light rounded-md hover:border-teal-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-default"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold group-hover:bg-teal-500 group-hover:text-white transition-all duration-200">
                  {idx + 1}
                </span>
                <span className="text-text-primary leading-relaxed pt-0.5">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Section */}
        <div className="mb-24">
          <h2 className="font-display text-[40px] font-extrabold text-text-primary tracking-tight mb-4">
            Как подготовиться?
          </h2>
          <p className="text-text-secondary text-lg mb-12 leading-relaxed">
            За пару дней до встречи давай каждый подумаем над:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Оглядываясь назад',
                items: [
                  'Чем я горжусь в этом году?',
                  'Что было самым сложным?',
                  'Когда чувствовал себя на подъёме?',
                  'Когда было особенно тяжело?'
                ]
              },
              {
                title: 'О чем мечтаю',
                items: ['В работе', 'В семье', 'Для себя лично']
              },
              {
                title: 'Про деньги',
                items: [
                  'Куда ушли основные деньги?',
                  'Какие расходы удивили?',
                  'Что получилось отложить?',
                  'Какие покупки порадовали/огорчили?'
                ]
              }
            ].map((section, idx) => (
              <div
                key={idx}
                className="bg-white border border-border-light rounded-md p-8 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="font-bold text-text-primary text-lg mb-5">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-text-secondary leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Session Structure */}
        <div className="mb-24 bg-white border border-border-light rounded-md p-10">
          <h2 className="font-display text-[32px] font-extrabold text-text-primary tracking-tight mb-10">
            О чем будем говорить
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
            {[
              'Ретроспектива 2025',
              'Семья и Ребенок',
              'Карьера',
              'Жилье и Быт',
              'Здоровье и Развитие',
              'Путешествия и Досуг'
            ].map((block, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                <span className="text-text-secondary">{block}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-14 rounded-md transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            Поехали! 🚀
          </Link>
        </div>
      </div>
    </div>
  );
}
