export default function TypingIndicator() {
  return (
    <div className="flex gap-1 p-3">
      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></span>
      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-100"></span>
      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-200"></span>
    </div>
  );
}
