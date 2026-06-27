import React from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS, PLANS } from "../data";
import { Check, Sparkles, Shield, Zap } from "lucide-react";

interface PlansProps {
  lang: LanguageCode;
  onSelectPlan: (planName: string) => void;
}

export const Plans: React.FC<PlansProps> = ({ lang, onSelectPlan }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="plans" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase rounded-full tracking-widest mb-3">
          No Contracts • Instant Activation
        </div>
        <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
          {t.plansTitle}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          {t.plansSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {PLANS.map((plan) => {
          const isPop = plan.isPopular;
          return (
            <div
              key={plan.id}
              className={`relative bg-[#0A0A0A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                isPop
                  ? "border-2 border-cyan-500 shadow-[0_0_35px_rgba(6,182,212,0.25)] md:-translate-y-2 bg-gradient-to-b from-[#12181d] to-[#0A0A0A]"
                  : "border border-[#1A1A1A] hover:border-[#333]"
              }`}
            >
              {isPop && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-black" />
                  <span>{t.mostPopular}</span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {plan.id === "starter" ? t.starterName : plan.id === "unlimited" ? t.unlimitedName : t.familyName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {plan.id === "starter" ? "Great for backup or light users" : plan.id === "unlimited" ? "Max quantum 5G speeds & hotspot" : "Save $75/mo with 4 connected lines"}
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#1A1A1A]">
                  <span className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 text-sm font-semibold">
                    {t.perMonth}
                  </span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-cyan-400" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan(`${plan.name} ($${plan.price}/mo)`)}
                className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                  isPop
                    ? "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-black hover:brightness-110 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    : "bg-[#1A1A1A] hover:bg-white hover:text-black text-white border border-[#333]"
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{t.selectPlanBtn}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
