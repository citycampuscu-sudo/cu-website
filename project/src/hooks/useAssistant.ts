import { useState } from "react";
import { Message } from "../types/assistant";

export function useAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "👋 Welcome to Maseno City Campus Christian Union!\n\nHow can I help you today?",
      timestamp: Date.now(),
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    // Temporary fake response
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "I'm still being trained. In the next step I'll answer using your website content.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, reply]);

      setLoading(false);
    }, 1000);
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}
