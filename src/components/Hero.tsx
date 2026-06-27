import React from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS } from "../data";
import { Zap, CheckCircle2, ShieldCheck, QrCode, ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  onShopPlans: () => void;
  onExploreMap: () => void;
  onGetEsim: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  setLang,
  onShopPlans,
  onExploreMap,
  onGetEsim,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="relative pt-6 pb-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Background glowing particles */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Mobile Language Bar */}
      <div className="flex sm:hidden justify-center items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 bg-[#111] p-2 rounded-xl border border-[#222]">
        {(["en", "ru", "es", "lt"] as LanguageCode[]).map((c) => (
          <button
            key={c}
            onClick={() => setLang(c)}
            className={`px-2 py-0.5 rounded ${lang === c ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30" : ""}`}
          >
            {c === "en" ? "EN" : c === "ru" ? "RU" : c === "es" ? "ES" : "LT"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Hero Card */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#111] via-[#0A0A0A] to-[#050505] border border-[#222] rounded-3xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/0 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>{t.heroBadge1}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-medium rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span>{t.heroBadge2}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight mb-4">
              {t.heroTitle1} <br />
              <span className="font-black bg-gradient-to-r from-cyan-400 via-cyan-200 to-purple-400 bg-clip-text text-transparent">
                {t.heroTitle2}
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
              {t.heroSub}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1A1A1A]">
            <button
              onClick={onShopPlans}
              className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-black px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider hover:brightness-110 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>{t.shopPlansBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreMap}
              className="bg-[#1A1A1A] hover:bg-[#222] text-white px-6 py-3.5 rounded-2xl font-bold text-sm border border-[#333] transition-colors cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{t.exploreMapBtn}</span>
            </button>
          </div>
        </div>

        {/* Side Promo Card: Instant eSIM QR Box */}
        <div className="lg:col-span-4 bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-cyan-500/50 transition-colors">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-black uppercase rounded-full tracking-widest">
                Instant QR
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              VIVA eSIM Card Kit
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Skip the plastic card. Activate your line on any unlocked iPhone or Samsung flagship directly from your email inbox in 60 seconds.
            </p>

            <div className="bg-[#111] rounded-2xl p-4 border border-[#222] mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-gray-400">Activation Kit</span>
                <span className="font-black text-cyan-400">$0.00 FREE</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">5G Quantum Speed</span>
                <span className="font-bold text-white">Up to 2.1 Gbps</span>
              </div>
            </div>
          </div>

          <button
            onClick={onGetEsim}
            className="w-full bg-white/10 hover:bg-cyan-500 hover:text-black text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t.getEsimBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Trust Bar Banner */}
      <div className="mt-8 bg-[#0A0A0A]/80 backdrop-blur border border-[#1A1A1A] rounded-2xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t.trust1, sub: "All 50 US States", icon: <Zap className="w-4 h-4 text-cyan-400" /> },
          { label: t.trust2, sub: "Taxes included", icon: <CheckCircle2 className="w-4 h-4 text-green-400" /> },
          { label: t.trust3, sub: "Sent via email", icon: <QrCode className="w-4 h-4 text-purple-400" /> },
          { label: t.trust4, sub: "No contracts", icon: <ShieldCheck className="w-4 h-4 text-cyan-400" /> },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#141414] border border-[#222]">
              {item.icon}
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">{item.label}</div>
              <div className="text-[11px] text-gray-500">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
