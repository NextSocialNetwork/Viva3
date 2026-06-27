import React, { useState } from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS, DEVICES } from "../data";
import { Smartphone, QrCode, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface StoreProps {
  lang: LanguageCode;
  onBuyItem: (deviceName: string) => void;
}

export const Store: React.FC<StoreProps> = ({ lang, onBuyItem }) => {
  const t = TRANSLATIONS[lang];
  const [filter, setFilter] = useState<"all" | "esim" | "phone">("all");
  const [brandFilter, setBrandFilter] = useState<"all" | "Apple" | "Samsung">("all");

  const filtered = DEVICES.filter((d) => {
    if (filter === "esim" && d.category !== "esim") return false;
    if (filter === "phone" && d.category !== "phone") return false;
    if (brandFilter !== "all" && d.brand !== brandFilter) return false;
    return true;
  });

  return (
    <section id="store" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#1A1A1A]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-2">
            VIVA Flagship Devices & eSIM
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            {t.storeTitle}
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            {t.storeSub}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0A0A0A] p-1.5 rounded-2xl border border-[#1A1A1A]">
          <button
            onClick={() => { setFilter("all"); setBrandFilter("all"); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "all" && brandFilter === "all"
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => { setFilter("esim"); setBrandFilter("all"); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === "esim"
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t.filterEsim}
          </button>
          <button
            onClick={() => { setFilter("phone"); setBrandFilter("Apple"); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              brandFilter === "Apple"
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t.filterApple}
          </button>
          <button
            onClick={() => { setFilter("phone"); setBrandFilter("Samsung"); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              brandFilter === "Samsung"
                ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {t.filterSamsung}
          </button>
        </div>
      </div>

      {/* Grid of Store Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 gap-4">
        {filtered.map((device) => (
          <div
            key={device.id}
            className="group bg-[#0A0A0A] border border-[#1A1A1A] hover:border-cyan-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
          >
            {device.badge && (
              <div className="absolute top-6 right-6 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase rounded-full tracking-wider">
                {device.badge}
              </div>
            )}

            <div>
              <div className="w-full h-48 sm:h-56 rounded-2xl bg-[#111] border border-[#222] mb-6 overflow-hidden flex items-center justify-center relative">
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                {device.category === "esim" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <QrCode className="w-16 h-16 text-cyan-400 animate-pulse" />
                  </div>
                )}
              </div>

              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                {device.brand} Flagship
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {device.name}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                {device.specs}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A] flex items-center justify-between gap-4">
              <div>
                {device.price === 0 ? (
                  <div className="text-2xl font-black text-cyan-400">
                    $0 FREE
                  </div>
                ) : (
                  <div>
                    <div className="text-xl font-black text-white">
                      ${device.price}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {t.orFinance} <span className="text-cyan-400 font-bold">${device.monthly}/mo</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => onBuyItem(device.name)}
                className="bg-white/10 hover:bg-cyan-500 hover:text-black text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>{device.price === 0 ? t.buyNowBtn : "Order Now"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
