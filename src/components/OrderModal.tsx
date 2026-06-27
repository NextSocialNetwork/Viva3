import React, { useState } from "react";
import { X, Check, QrCode, ShieldCheck, Zap, ArrowRight, Smartphone } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, itemName }) => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A0A0A] border border-[#222] rounded-3xl w-full max-w-md p-6 sm:p-8 flex flex-col relative shadow-[0_0_50px_rgba(6,182,212,0.25)]">
        <button
          onClick={() => { setIsSuccess(false); setEmail(""); onClose(); }}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/40 text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mb-2">
              Quantum Node Dispatched!
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              We have dispatched your instant secure eSIM QR Kit & receipt for <span className="text-cyan-400 font-bold">{itemName}</span> to <span className="text-white font-mono">{email}</span>.
            </p>
            <div className="bg-[#111] p-4 rounded-2xl border border-[#222] mb-6 text-left">
              <div className="text-[10px] uppercase text-gray-500 mb-1">Next Step</div>
              <div className="text-xs text-gray-300">Open your email on any phone or laptop and scan the QR code to connect to VIVA 5G instantly.</div>
            </div>
            <button
              onClick={() => { setIsSuccess(false); setEmail(""); onClose(); }}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-black text-xs uppercase tracking-widest cursor-pointer shadow-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              <Zap className="w-4 h-4 fill-cyan-400" />
              <span>Express eSIM Checkout</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
              Secure Order
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              You are selecting: <span className="text-white font-bold">{itemName}</span>
            </p>

            <div className="bg-[#111] rounded-2xl p-4 border border-[#222] mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{itemName}</div>
                <div className="text-[10px] text-green-400 font-mono">Instant Digital QR Email Delivery</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">
                  Destination Email for QR Activation
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-[#222] focus:border-cyan-500 text-white text-xs px-4 py-3.5 rounded-xl focus:outline-none transition-colors"
                />
              </div>

              <div className="text-[11px] text-gray-500 flex items-start gap-2 pt-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>No contract binding. Unlocked SIM-swap guard active on all lines.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:brightness-110 text-black py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
              >
                <span>Confirm & Send QR Kit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
