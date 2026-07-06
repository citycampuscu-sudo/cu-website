const suggestions = [
  "When are fellowships?",
  "Upcoming events",
  "How do I join CU?",
  "Who are the leaders?",
  "Prayer requests",
];

interface Props {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="rounded-full border border-[#2E3E87] px-3 py-2 text-sm text-[#2E3E87] hover:bg-[#2E3E87] hover:text-white transition"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
