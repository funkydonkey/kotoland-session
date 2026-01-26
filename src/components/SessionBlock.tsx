import type { SessionBlock } from '../types';

interface SessionBlockComponentProps {
  block: SessionBlock;
  onAnswerChange: (blockId: string, answer: string) => void;
}

export function SessionBlockComponent({ block, onAnswerChange }: SessionBlockComponentProps) {
  return (
    <div className="bg-white border border-border-light rounded-md p-10 mb-6 hover:border-teal-300 transition-colors duration-200">
      <div className="mb-8">
        <h3 className="font-display text-3xl font-extrabold text-text-primary tracking-tight mb-2">
          {block.title}
        </h3>
        <p className="text-sm text-text-tertiary">{block.duration}</p>
      </div>

      {/* Questions */}
      {block.questions.length > 0 && (
        <div className="mb-8 bg-bg-secondary rounded-md p-6 border border-border-light">
          <p className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-5">
            Подсказки для разговора
          </p>
          <ul className="space-y-4">
            {block.questions.map((question, idx) => (
              <li key={idx} className="text-text-primary flex items-start leading-relaxed">
                <span className="mr-4 text-teal-600 font-bold flex-shrink-0">{idx + 1}.</span>
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Answer textarea */}
      <div>
        <label className="block text-xs font-bold text-text-secondary uppercase tracking-wide mb-3">
          Наши мысли и решения
        </label>
        <textarea
          value={block.answer}
          onChange={(e) => onAnswerChange(block.id, e.target.value)}
          placeholder="Записывай сюда всё важное, что обсудили..."
          className="w-full h-48 px-5 py-4 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none text-text-primary placeholder-text-tertiary transition-all duration-200 leading-relaxed"
          style={{ lineHeight: '1.6' }}
        />
      </div>
    </div>
  );
}
