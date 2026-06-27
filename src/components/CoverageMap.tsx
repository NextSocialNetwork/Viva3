import React, { useState } from "react";
import { LanguageCode, CityCoverage } from "../types";
import { TRANSLATIONS, COVERAGE_CITIES, ALL_US_STATES } from "../data";
import { MapPin, Search, Zap, Activity, CheckCircle2, ShieldCheck, Wifi } from "lucide-react";

interface CoverageMapProps {
  lang: LanguageCode;
  onSelectCity: (city: CityCoverage) => void;
}

export const CoverageMap: React.FC<CoverageMapProps> = ({ lang, onSelectCity }) => {
  const t = TRANSLATIONS[lang];
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityCoverage>(COVERAGE_CITIES[0]); // NYC default

  const filteredCities = COVERAGE_CITIES.filter((c) =>
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase()) ||
    c.stateCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="coverage" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#1A1A1A]">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Map Visualization Container (Immersive Theme) */}
        <div className="flex-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl relative overflow-hidden flex flex-col shadow-2xl min-h-[520px]">
          {/* Header Bar */}
          <div className="p-6 flex flex-wrap justify-between items-start gap-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
            <div>
              <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Wifi className="w-3.5 h-3.5 animate-pulse" />
                <span>Futuristic T-Mobile 5G Architecture</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t.coverageTitle}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {t.coverageSub}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black rounded-full border border-[#222] text-xs font-bold text-gray-200 shadow-md">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                <span>UPTIME: 99.999%</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black rounded-full border border-[#222] text-xs font-bold text-cyan-400 shadow-md">
                <Activity className="w-3.5 h-3.5" />
                <span>AVG LATENCY: 12ms</span>
              </div>
            </div>
          </div>

          {/* Stylized US Map Canvas */}
          <div className="flex-1 relative flex items-center justify-center p-4 min-h-[340px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08)_0%,transparent_75%)] pointer-events-none" />
            
            {/* Outline SVG representing United States contour */}
            <svg className="w-full h-full max-h-[380px] opacity-30 select-none" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M150,180 Q220,100 350,120 T580,110 T820,130 T920,240 T880,440 L780,520 L680,480 L520,530 L380,490 L240,530 L110,430 L80,310 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="text-cyan-500/60"
              />
              <path
                d="M170,200 Q240,130 360,140 T570,135 T800,150 T890,250 T850,420 L760,490 L670,450 L520,500 L390,460 L260,500 L140,410 L100,300 Z"
                fill="rgba(255,255,255,0.02)"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-700"
              />
            </svg>

            {/* Simulated Grid lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* City Nodes */}
            <div className="absolute inset-0 max-w-4xl mx-auto">
              {COVERAGE_CITIES.map((city) => {
                const isSelected = selectedCity.id === city.id;
                // Map lat/lng roughly to percentage positions inside the box
                // US Lat bounding: ~25 (South) to ~49 (North). Lng: -125 (West) to -67 (East)
                const leftPct = ((city.lng - (-125)) / (-67 - (-125))) * 84 + 8;
                const topPct = ((49 - city.lat) / (49 - 25)) * 75 + 12;

                return (
                  <button
                    key={city.id}
                    onClick={() => { setSelectedCity(city); onSelectCity(city); }}
                    style={{ left: `${Math.min(92, Math.max(8, leftPct))}%`, top: `${Math.min(88, Math.max(12, topPct))}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-2 z-20 focus:outline-none"
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <div className="absolute -inset-2 bg-cyan-400 rounded-full animate-ping opacity-75" />
                      )}
                      <div
                        className={`transition-all duration-300 rounded-full ${
                          isSelected
                            ? "w-4 h-4 bg-cyan-400 shadow-[0_0_20px_#22d3ee] border-2 border-white scale-125 z-30"
                            : "w-2.5 h-2.5 bg-cyan-500/80 hover:bg-cyan-300 shadow-[0_0_10px_#06b6d4]"
                        }`}
                      />
                    </div>

                    {/* Tooltip on hover or selected */}
                    <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 pointer-events-none transition-all ${isSelected ? "opacity-100 scale-100 z-40" : "opacity-0 group-hover:opacity-100 scale-95"}`}>
                      <div className="bg-black/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-cyan-500/40 shadow-xl whitespace-nowrap backdrop-blur">
                        <span className="text-cyan-400">{city.city}</span> ({city.stateCode}) • <span className="text-green-400">{city.latencyMs}ms</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* City Indicators Bar at bottom (Immersive Theme) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-4 border-t border-[#1A1A1A] bg-black/40 backdrop-blur">
            {COVERAGE_CITIES.slice(0, 4).map((c, i) => (
              <div
                key={c.id}
                onClick={() => setSelectedCity(c)}
                className={`p-2.5 text-center rounded-xl cursor-pointer transition-all ${
                  selectedCity.id === c.id ? "bg-cyan-500/15 border border-cyan-500/40" : "hover:bg-white/5"
                } ${i > 0 ? "sm:border-l border-[#1A1A1A]" : ""}`}
              >
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{c.city}</div>
                <div className="text-xs font-black text-white mt-0.5 flex items-center justify-center gap-1">
                  <span className="text-cyan-400">{c.latencyMs}ms</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-green-400">Stable</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Live Signal Telemetry Panel & State Explorer */}
        <div className="w-full lg:w-[380px] bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A] mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <span className="text-xs font-black uppercase text-white tracking-widest">Active Node Telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                LIVE 5G+
              </span>
            </div>

            {/* Selected City Telemetry Card */}
            <div className="bg-gradient-to-br from-[#141414] to-[#0A0A0A] border border-[#222] rounded-2xl p-5 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-black text-white">{selectedCity.city}</h4>
                  <span className="text-xs text-gray-400">{selectedCity.state} ({selectedCity.stateCode})</span>
                </div>
                <span className="px-2.5 py-1 bg-cyan-500 text-black font-black text-[10px] uppercase rounded-full">
                  {selectedCity.signalQuality}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#222]">
                <div className="bg-black/50 p-2.5 rounded-xl border border-[#1a1a1a]">
                  <div className="text-[10px] text-gray-500 uppercase">{t.latency}</div>
                  <div className="text-sm font-black text-cyan-400 mt-0.5">{selectedCity.latencyMs} ms</div>
                </div>
                <div className="bg-black/50 p-2.5 rounded-xl border border-[#1a1a1a]">
                  <div className="text-[10px] text-gray-500 uppercase">{t.uptime}</div>
                  <div className="text-sm font-black text-green-400 mt-0.5">{selectedCity.uptime}</div>
                </div>
                <div className="bg-black/50 p-2.5 rounded-xl border border-[#1a1a1a]">
                  <div className="text-[10px] text-gray-500 uppercase">{t.avgSpeed}</div>
                  <div className="text-sm font-black text-purple-400 mt-0.5">{selectedCity.speedGbps} Gbps</div>
                </div>
              </div>
            </div>

            {/* City/State Search Box */}
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Explore All 50 US States & Cities
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t.searchCity}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#111] border border-[#222] focus:border-cyan-500 text-white text-xs pl-10 pr-4 py-3 rounded-xl focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Scrollable list of cities */}
            <div className="max-h-[190px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
              {filteredCities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCity(c)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    selectedCity.id === c.id ? "bg-cyan-500/20 text-white border border-cyan-500/40" : "bg-white/5 hover:bg-white/10 text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${selectedCity.id === c.id ? "text-cyan-400" : "text-gray-500"}`} />
                    <span className="font-bold">{c.city}, {c.stateCode}</span>
                  </div>
                  <span className="font-mono font-bold text-green-400">{c.latencyMs}ms</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1A1A1A] flex items-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Futuristic quantum nodes auto-reroute packet traffic during solar anomalies.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
