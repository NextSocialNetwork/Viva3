import React, { useState, useRef, useEffect } from "react";
import { LanguageCode, ChatMessage } from "../types";
import { TRANSLATIONS } from "../data";
import { Bot, X, Send, Sparkles, User, RefreshCw, ShieldCheck, Zap } from "lucide-react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, lang }) => {
  const t = TRANSLATIONS[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome: Record<string, string> = {
        en: "👋 Hello! I am **VIVA AI**, your futuristic 24/7 telecommunication assistant. How can I help you today with our $0 eSIM kit, iPhone/Samsung flagships, or 5G coverage?",
        ru: "👋 Здравствуйте! Я **VIVA AI**, ваш умный помощник 24/7. Как я могу помочь вам с бесплатной eSIM, тарифами или покрытием США?",
        es: "👋 ¡Hola! Soy **VIVA AI**, tu asistente futurista 24/7. ¿En qué puedo ayudarte hoy sobre nuestra eSIM gratis, teléfonos o red 5G?",
        lt: "👋 Sveiki! Aš esu **VIVA DI**, jūsų futuristinis 24/7 asistentas. Kaip galiu padėti dėl nemokamos eSIM aktyvacijos ar 5G ryšio?"
      };
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: welcome[lang] || welcome.en,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen, lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const langName = lang === "ru" ? "Russian" : lang === "es" ? "Spanish" : lang === "lt" ? "Lithuanian" : "English";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          language: langName,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await res.json();
      if (data.error && !data.reply) {
        throw new Error(data.error);
      }

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: data.reply || "Connection nodes active. How else may I assist your 5G setup?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: `⚠️ **Signal Interference**: ${err.message || "Please verify GEMINI_API_KEY is added in AI Studio Settings > Secrets."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A0A0A] border border-[#222] rounded-3xl w-full max-w-lg h-[620px] max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#141414] via-[#111] to-[#141414] border-b border-[#222] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black shadow-[0_0_15px_#06b6d4]">
                <Bot className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0A] animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <span>{t.chatTitle}</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </h3>
              <p className="text-[10px] text-cyan-400 font-mono tracking-tight">{t.chatSub}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Questions Bar */}
        <div className="px-4 py-2 bg-black/40 border-b border-[#1A1A1A] flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar">
          {[t.preset1, t.preset2, t.preset3].map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-full border border-cyan-500/30 whitespace-nowrap transition-all cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div key={msg.id} className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isUser ? "bg-white text-black" : "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-cyan-500 text-black font-medium rounded-tr-none shadow-[0_4px_15px_rgba(6,182,212,0.25)]"
                    : "bg-[#141414] text-gray-200 border border-[#222] rounded-tl-none"
                }`}>
                  <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                  <div className={`text-[9px] mt-1.5 font-mono text-right ${isUser ? "text-black/70" : "text-gray-500"}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-[#141414] border border-[#222] rounded-2xl rounded-tl-none p-3 text-xs text-cyan-400 flex items-center gap-2 animate-pulse">
                <Zap className="w-3.5 h-3.5" />
                <span>VIVA Neural Node calculating optimal quantum transmission...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#111] border-t border-[#222]">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t.chatPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-[#0A0A0A] border border-[#222] focus:border-cyan-500 text-white text-xs px-4 py-3 rounded-xl focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black p-3 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0"
            >
              <Send className="w-4 h-4 fill-black" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[9px] text-gray-500 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-cyan-500" />
            <span>Encrypted Quantum AI Link • www.MyVivaMobile.Com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
