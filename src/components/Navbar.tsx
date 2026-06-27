import React from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS } from "../data";
import { Smartphone, MapPin, MessageSquare, Star, Zap, Shield, Bot, Sparkles } from "lucide-react";

interface NavbarProps {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  onOpenChat: () => void;
  onOpenOrder: (item: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  activeTab,
  setActiveTab,
  onOpenChat,
  onOpenOrder,
}) => {
  const t = TRANSLATIONS[lang];

  const langs: { code: LanguageCode; label: string }[] = [
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
    { code: "es", label: "Español" },
    { code: "lt", label: "Lietuvių" },
  ];

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-[#1A1A1A] flex items-center justify-between px-4 sm:px-8 bg-black/80 backdrop-blur-md text-gray-200">
      <div className="flex items-center gap-6 lg:gap-8">
        <a 
          href="#top" 
          onClick={() => setActiveTab("all")}
          className="text-xl sm:text-2xl font-black tracking-tighter text-white flex items-center gap-1.5 cursor-pointer"
        >
          <div className="w-6 h-6 rounded bg-cyan-500 flex items-center justify-center text-black font-black text-xs shadow-[0_0_12px_#06b6d4]">
            5G
          </div>
          <span>
            VIVA<span className="text-cyan-400 underline decoration-2 underline-offset-4">MOBILE</span>
          </span>
        </a>

        {/* Language switcher */}
        <div className="hidden sm:flex items-center gap-3 md:gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-500 border-l border-[#222] pl-6">
          {langs.map((l) => {
            const isActive = lang === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`transition-colors cursor-pointer py-1 ${
                  isActive
                    ? "text-cyan-400 border-b border-cyan-400"
                    : "hover:text-white"
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <div className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-semibold">
          <a
            href="#plans"
            onClick={() => setActiveTab("plans")}
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {t.navPlans}
          </a>
          <a
            href="#store"
            onClick={() => setActiveTab("store")}
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {t.navDevices}
          </a>
          <a
            href="#coverage"
            onClick={() => setActiveTab("coverage")}
            className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {t.navCoverage}
          </a>
          <a
            href="#testimonials"
            className="text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {t.navTestimonials}
          </a>
          <button
            onClick={onOpenChat}
            className="group relative bg-gradient-to-r from-[#0d151c] to-[#121c26] hover:from-cyan-500 hover:to-cyan-400 text-cyan-300 hover:text-black font-bold px-4 py-1.5 rounded-full border border-cyan-500/50 hover:border-cyan-300 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Bot className="w-4 h-4 text-cyan-400 group-hover:text-black transition-colors" />
            <span>{t.navSupport}</span>
            <Sparkles className="w-3 h-3 text-cyan-400 group-hover:text-black animate-pulse" />
          </button>
        </div>

        <button
          onClick={() => onOpenOrder("eSIM Starter Kit ($0 Free)")}
          className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-4 sm:px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-black" />
          <span>{t.getEsimBtn}</span>
        </button>
      </div>
    </nav>
  );
};
