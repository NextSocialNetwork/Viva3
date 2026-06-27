import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "VIVA Mobile 5G Network API" });
  });

  // AI Support Chatbot Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language = "English", history = [] } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in Server Secrets. Please add GEMINI_API_KEY in Settings > Secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });

      const systemInstruction = `You are "VIVA AI", the official 24/7 futuristic customer support AI assistant for VIVA Mobile (www.MyVivaMobile.Com), a premier next-generation 5G telecommunications carrier in the United States.
Key Company & Service Facts:
- VIVA Mobile offers ultra-low latency nationwide 5G coverage across all 50 US states on a futuristic high-speed network.
- Plans (No Contracts, Cancel Anytime, Instant Activation):
  * Starter Plan: $15/month (5GB High-Speed 5G, Unlimited Talk & Text, Free eSIM Instant Activation, Nationwide 5G).
  * Unlimited Plan (Most Popular): $30/month (Unlimited Ultra-Fast 5G Data, 15GB Mobile Hotspot, HD Streaming, International Roaming in Canada & Mexico).
  * Family Plan: $45/month per line (4 Lines Unlimited 5G, 40GB Hotspot per line, 4K UHD Streaming, Priority Network Access, Free Device upgrade credits).
- Store & Devices:
  * eSIM Card Kit ($0 Free with plan activation, instant QR code email delivery).
  * iPhone 16 Pro Max ($1,199 or $33.30/mo), iPhone 16 Plus ($899), iPhone SE 4 ($499).
  * Samsung Galaxy S25 Ultra ($1,299 or $36.10/mo), Galaxy Z Fold 6 ($1,799), Galaxy Z Flip 6 ($1,099).
  * All phones come unlocked and ready for instant eSIM activation.
- Network: Uptime is 99.999% across major US metropolitan hubs (NYC 11ms, LA 14ms, Chicago 12ms, Dallas 13ms, Miami 15ms).
- Response Language Requirement: Respond clearly, politely, and concisely in ${language}. If the user writes in Russian, Spanish, Lithuanian, or English, match their tone and language naturally.
Keep answers helpful, enthusiastic about futuristic 5G tech, and format with markdown bullets when listing plans or steps.`;

      const formattedHistory = history.map((item: any) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [...formattedHistory, { role: "user", parts: [{ text: message }] }],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error("AI Chat Error:", err);
      res.status(500).json({ error: "AI Assistant is momentarily recalibrating signal nodes. " + (err.message || "") });
    }
  });

  // Vite middleware for development or Static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VIVA Mobile 5G Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
