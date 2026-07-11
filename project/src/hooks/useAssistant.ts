import { useState } from "react";
import { Message } from "../lib/assistant";
import { supabase } from "../lib/supabase";

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

    try {
  

  if (error) throw error;

  conconsole.log("Sending question:", text);

const { data, error } = await supabase.functions.invoke("assistant", {
  body: {
    question: text,
  },
});

console.log("Response:", data);
console.log("Error:", error);st reply: Message = {
    id: crypto.randomUUID(),
    role: "assistant",
    content: data.answer,
    timestamp: Date.now(),
  };

  setMessages((prev) => [...prev, reply]);
} catch (err) {
  const reply: Message = {
  id: crypto.randomUUID(),
  role: "assistant",
  content: data.answer,
  timestamp: Date.now(),
  whatsapp: data.whatsapp,
  url: data.url,
};

setMessages((prev) => [...prev, reply]);
} finally {
  setLoading(false);
      }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}
