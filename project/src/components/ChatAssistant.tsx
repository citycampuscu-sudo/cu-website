import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAssistant } from "../hooks/useAssistant";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const { messages, loading, sendMessage } = useAssistant();
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
    const { supabase } = await import("../lib/supabase");

    const { data, error } = await supabase.functions.invoke("assistant", {
      body: {
        message: text,
      },
    });

    if (error) throw error;

    const reply: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        data?.reply ??
        "Sorry, I couldn't generate a response.",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, reply]);
  } catch (err) {
    console.error(err);

    const reply: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Sorry, I couldn't reach the AI assistant.",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, reply]);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* Floating Button */}

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#2E3E87] text-white shadow-2xl flex items-center justify-center"
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[94vw] h-[620px] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}

            <div className="bg-[#2E3E87] text-white px-5 py-4">

              <h2 className="text-lg font-semibold">
                CU AI Assistant
              </h2>

              <p className="text-sm opacity-90">
                Online • Ask me anything
              </p>

            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
                            {/* Welcome Card */}

              {messages.length === 1 && (
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">

                  <h3 className="text-[#2E3E87] font-semibold text-lg mb-2">
                    👋 Welcome!
                  </h3>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    I'm the Maseno City Campus Christian Union AI Assistant.
                  </p>

                  <p className="text-gray-600 text-sm mt-3">
                    I can answer questions about:
                  </p>

                  <ul className="mt-3 text-sm text-gray-600 space-y-1">
                    <li>• Fellowships</li>
                    <li>• Ministries</li>
                    <li>• Leadership</li>
                    <li>• Events</li>
                    <li>• Membership</li>
                    <li>• Alumni</li>
                    <li>• Contact Information</li>
                  </ul>

                  <div className="mt-5">
                    <SuggestedQuestions
                      onSelect={(question) => {
                        sendMessage(question);
                      }}
                    />
                  </div>

                </div>
              )}

              {/* Conversation */}

              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}

              {/* Typing */}

              {loading && <TypingIndicator />}

              {/* Auto Scroll */}

              <div ref={messagesEndRef} />

            </div>
                        {/* Input */}

            <div className="border-t bg-white p-3">

              <div className="flex items-center gap-2">

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question..."
                  className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2E3E87] focus:ring-2 focus:ring-[#2E3E87]/20"
                />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="h-11 w-11 rounded-full bg-[#2E3E87] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </motion.button>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
              }
