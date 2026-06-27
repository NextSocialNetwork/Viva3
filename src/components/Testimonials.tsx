import React from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS, TESTIMONIALS } from "../data";
import { Star, CheckCircle2, Bot, MessageSquare } from "lucide-react";

interface TestimonialsProps {
  lang: LanguageCode;
  onOpenChat: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang, onOpenChat }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="testimonials" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#1A1A1A]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-2">
            Subscriber Love Across America
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            {t.testimonialsTitle}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {t.testimonialsSub}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0A0A0A] px-4 py-2 rounded-2xl border border-[#1A1A1A]">
          <div className="flex text-yellow-500 tracking-tighter text-sm">★★★★★</div>
          <span className="text-xs font-black text-white">4.98 / 5.0 Rating</span>
          <span className="text-[10px] text-gray-500">(14,200+ Reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            className="bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#333] rounded-3xl p-6 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-yellow-500 text-sm">★★★★★</div>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                  {review.plan}
                </span>
              </div>

              <p className="text-xs sm:text-sm italic text-gray-300 leading-relaxed mb-6">
                "{review.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#1A1A1A]">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border border-[#333]"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{review.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                </div>
                <div className="text-[11px] text-gray-500">{review.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Immersive Theme Reference Bottom Bar */}
      <div className="bg-gradient-to-r from-[#0A0A0A] via-[#111] to-[#0A0A0A] border border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center text-black shadow-[0_0_25px_rgba(6,182,212,0.5)] shrink-0">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Have questions before switching?
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Chat live with VIVA AI Support or check eSIM compatibility for your specific device.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenChat}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 shrink-0"
        >
          <MessageSquare className="w-4 h-4 fill-black" />
          <span>Launch VIVA AI Chat</span>
        </button>
      </div>
    </section>
  );
};
