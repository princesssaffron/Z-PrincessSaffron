import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface ChatBotProps {
  externalOpen?: boolean;
  onClose?: () => void;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Namaste! 🌸 I'm your saffron guide. How may I help you discover the golden treasure of Kashmir today?",
    isBot: true,
  },
];

const quickReplies = [
  'What makes Z Princess special?',
  'How to use saffron?',
  'Check product quality',
  'Shipping information',
];

export const ChatBot = ({ externalOpen, onClose }: ChatBotProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

  const setIsOpen = (value: boolean) => {
    if (externalOpen !== undefined) {
      if (!value && onClose) onClose();
    } else {
      setInternalOpen(value);
    }
  };
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔹 CALL BACKEND (Gemini)
  const fetchBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      return data.reply || "I'm here to help 🌸 Please try again.";
    } catch (error) {
      return "Our saffron guide is momentarily resting 🌙 Please try again shortly.";
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const botReply = await fetchBotResponse(messageText);

    const botMessage: Message = {
      id: Date.now() + 1,
      text: botReply,
      isBot: true,
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Button */}
      {externalOpen === undefined && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-24 right-8 z-50 w-14 h-14 rounded-full bg-gradient-royal flex items-center justify-center shadow-lg glow-royal ${isOpen ? 'hidden' : ''
            }`}
        >
          <MessageCircle className="w-6 h-6 text-ivory" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-50 w-[380px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gold/20"
          >
            {/* Header */}
            <div className="bg-gradient-royal p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="font-display text-ivory">Saffron Guide</h4>
                  <p className="text-xs text-ivory/60">Powered by Open Router AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-ivory/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-ivory" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[320px] overflow-y-auto p-4 bg-cream space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${message.isBot
                      ? 'bg-ivory rounded-tl-none shadow-sm'
                      : 'bg-gradient-royal text-ivory rounded-tr-none'
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-ivory p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-royal-purple/40 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-royal-purple/40 rounded-full animate-bounce delay-150" />
                      <span className="w-2 h-2 bg-royal-purple/40 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="p-2 bg-cream border-t border-border/50 flex gap-2 overflow-x-auto">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="flex-shrink-0 px-3 py-1.5 bg-ivory rounded-full text-xs hover:bg-gold/20 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-ivory border-t border-border/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about saffron..."
                className="flex-1 px-4 py-2 bg-cream border rounded-full text-sm focus:outline-none focus:border-gold/50"
              />
              <button
                onClick={() => handleSend()}
                className="w-10 h-10 rounded-full bg-gradient-royal flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-ivory" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
