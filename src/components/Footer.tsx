import React from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS } from "../data";
import { Bot, Shield, Globe, Radio } from "lucide-react";

interface FooterProps {
  lang: LanguageCode;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenChat }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="border-t border-[#1A1A1A] bg-[#050505] text-gray-400 py-12 px-4 sm:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="text-xl font-black tracking-tighter text-white flex items-center gap-1.5 mb-3">
            <div className="w-5 h-5 rounded bg-cyan-500 flex items-center justify-center text-black font-black text-[10px]">
              5G
            </div>
            <span>
              VIVA<span className="text-cyan-400 underline decoration-2 underline-offset-4">MOBILE</span>
            </span>
          </div>
          <p className="text-gray-500 text-[11px] leading-relaxed mb-4">
            Next-generation 5G telecommunication infrastructure providing ultra-low latency quantum connectivity across all 50 US states.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded w-fit border border-cyan-500/20">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>www.MyVivaMobile.Com</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-widest text-[10px] mb-4 text-cyan-500">
            Navigation
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#plans" className="hover:text-white transition-colors">{t.navPlans}</a></li>
            <li><a href="#store" className="hover:text-white transition-colors">{t.navDevices}</a></li>
            <li><a href="#coverage" className="hover:text-white transition-colors">{t.navCoverage}</a></li>
            <li><a href="#testimonials" className="hover:text-white transition-colors">{t.navTestimonials}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-widest text-[10px] mb-4 text-cyan-500">
            Futuristic Store
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#store" className="hover:text-white transition-colors">Free eSIM Card Kit ($0)</a></li>
            <li><a href="#store" className="hover:text-white transition-colors">iPhone 16 Pro Max</a></li>
            <li><a href="#store" className="hover:text-white transition-colors">Samsung Galaxy S25 Ultra</a></li>
            <li><a href="#store" className="hover:text-white transition-colors">Instant SIM Swap Shield</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white uppercase tracking-widest text-[10px] mb-4 text-cyan-500">
            24/7 AI Node Support
          </h4>
          <p className="text-gray-500 text-[11px] mb-4">
            Zero telephone wait times. Speak with VIVA AI assistant in English, Russian, Spanish, or Lithuanian.
          </p>
          <button
            onClick={onOpenChat}
            className="bg-white/10 hover:bg-cyan-500 hover:text-black text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{t.navSupport} Bot</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600">
        <div>{t.footerRights}</div>
        <div className="flex gap-4 uppercase tracking-wider font-semibold">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Network Quality Report</a>
        </div>
      </div>
    </footer>
  );
};
