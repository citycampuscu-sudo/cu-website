import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#2E3E87] text-white shadow-xl flex items-center justify-center"
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[92vw] rounded-2xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#2E3E87] p-4 text-white">
              <h2 className="text-lg font-semibold">
                CU AI Assistant
              </h2>

              <p className="text-sm opacity-90">
                Online • Ask me anything
              </p>
            </div>

            {/* Messages */}
            <div className="h-[420px] overflow-y-auto p-5 bg-gray-50">

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="font-semibold text-[#2E3E87] mb-2">
                  👋 Welcome!
                </p>

                <p className="text-gray-700 text-sm leading-relaxed">
                  I'm the Maseno City Campus Christian Union Assistant.
                  <br /><br />

                  I can help you with:
                </p>

                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• Fellowships</li>
                  <li>• Ministries</li>
                  <li>• Leadership</li>
                  <li>• Events</li>
                  <li>• Membership</li>
                  <li>• Contact Information</li>
                </ul>
              </div>

            </div>

            {/* Input */}
            <div className="border-t p-3 flex items-center gap-2 bg-white">

              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 rounded-full border px-4 py-2 outline-none focus:border-[#2E3E87]"
              />

              <button
                className="h-10 w-10 rounded-full bg-[#2E3E87] text-white flex items-center justify-center"
              >
                <Send size={18} />
              </button>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
