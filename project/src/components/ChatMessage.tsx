import { Message } from "../../lib/assistant";

interface Props {
  message: Message;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? "bg-[#2E3E87] text-white"
            : "bg-white shadow"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
