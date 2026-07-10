import { Message } from "../lib/assistant";

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
        <p className="whitespace-pre-line">
          {message.content}
        </p>

        {message.url && (
          <a
            href={message.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[#2E3E87] font-medium underline"
          >
            Learn More →
          </a>
        )}

        {message.whatsapp && (
          <a
            href={message.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition"
          >
            📱 Chat on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
          }
