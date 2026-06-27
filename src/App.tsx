import React, { useState } from "react";
import { LanguageCode } from "./types";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Plans } from "./components/Plans";
import { Store } from "./components/Store";
import { CoverageMap } from "./components/CoverageMap";
import { Testimonials } from "./components/Testimonials";
import { ChatModal } from "./components/ChatModal";
import { OrderModal } from "./components/OrderModal";
import { Footer } from "./components/Footer";
import { Bot, Sparkles } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<LanguageCode>("en");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [orderItem, setOrderItem] = useState<string | null>(null);

  const handleOpenOrder = (itemName: string) => {
    setOrderItem(itemName);
  };

  return (
    <div id="top" className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black flex flex-col">
      {/* Top sticky navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenOrder={handleOpenOrder}
      />

      {/* Main Content Sections */}
      <main className="flex-1 space-y-4">
        <Hero
          lang={lang}
          setLang={setLang}
          onShopPlans={() => {
            const el = document.getElementById("plans");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onExploreMap={() => {
            const el = document.getElementById("coverage");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          onGetEsim={() => handleOpenOrder("eSIM Starter Kit ($0 Free)")}
        />

        <Plans
          lang={lang}
          onSelectPlan={handleOpenOrder}
        />

        <Store
          lang={lang}
          onBuyItem={handleOpenOrder}
        />

        <CoverageMap
          lang={lang}
          onSelectCity={() => {}}
        />

        <Testimonials
          lang={lang}
          onOpenChat={() => setIsChatOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Floating AI Chat Support Button on Right Side */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center justify-between gap-4 bg-gradient-to-r from-[#0a0f14] via-[#111823] to-[#0a0f14] border-2 border-cyan-500 hover:border-cyan-300 text-white px-7 sm:px-9 py-4 rounded-full shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:shadow-[0_0_55px_rgba(6,182,212,0.8)] transition-all duration-300 cursor-pointer hover:scale-105 min-w-[240px] sm:min-w-[280px]"
        >
          <div className="relative flex items-center justify-center shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 via-cyan-400 to-cyan-200 flex items-center justify-center text-black shadow-[0_0_15px_#22d3ee] group-hover:rotate-12 transition-transform">
              <Bot className="w-6 h-6 fill-black" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-[#0A0A0A]"></span>
            </span>
          </div>
          <div className="text-left flex-1 pr-2">
            <div className="text-sm font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-white to-cyan-200 bg-clip-text text-transparent flex items-center gap-1.5">
              <span>VIVA AI Support</span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
            </div>
            <div className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span className="text-green-400 font-black animate-pulse">●</span> Online 24/7 Assistant
            </div>
          </div>
        </button>
      </div>

      {/* Modals */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        lang={lang}
      />

      <OrderModal
        isOpen={Boolean(orderItem)}
        onClose={() => setOrderItem(null)}
        itemName={orderItem || "VIVA eSIM Kit"}
      />
    </div>
  );
}

