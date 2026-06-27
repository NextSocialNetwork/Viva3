export type LanguageCode = "en" | "es" | "ru" | "lt";

export interface TranslationDictionary {
  brandSub: string;
  navPlans: string;
  navCoverage: string;
  navDevices: string;
  navSupport: string;
  navTestimonials: string;
  getEsimBtn: string;
  heroBadge1: string;
  heroBadge2: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSub: string;
  shopPlansBtn: string;
  exploreMapBtn: string;
  trust1: string;
  trust2: string;
  trust3: string;
  trust4: string;
  plansTitle: string;
  plansSub: string;
  mostPopular: string;
  starterName: string;
  unlimitedName: string;
  familyName: string;
  perMonth: string;
  selectPlanBtn: string;
  planFeat1: string;
  planFeat2: string;
  planFeat3: string;
  planFeat4: string;
  storeTitle: string;
  storeSub: string;
  filterAll: string;
  filterEsim: string;
  filterApple: string;
  filterSamsung: string;
  buyNowBtn: string;
  orFinance: string;
  coverageTitle: string;
  coverageSub: string;
  signalStrength: string;
  latency: string;
  uptime: string;
  avgSpeed: string;
  searchCity: string;
  whyTitle: string;
  why1Title: string;
  why1Desc: string;
  why2Title: string;
  why2Desc: string;
  why3Title: string;
  why3Desc: string;
  why4Title: string;
  why4Desc: string;
  testimonialsTitle: string;
  testimonialsSub: string;
  verifiedUser: string;
  chatTitle: string;
  chatSub: string;
  chatPlaceholder: string;
  sendBtn: string;
  preset1: string;
  preset2: string;
  preset3: string;
  footerRights: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  isPopular?: boolean;
  features: string[];
}

export interface Device {
  id: string;
  name: string;
  brand: "Apple" | "Samsung" | "eSIM";
  category: "phone" | "esim";
  price: number;
  monthly: number;
  image: string;
  specs: string;
  badge?: string;
}

export interface CityCoverage {
  id: string;
  city: string;
  state: string;
  stateCode: string;
  lat: number;
  lng: number;
  latencyMs: number;
  uptime: string;
  speedGbps: number;
  signalQuality: "Ultra 5G+" | "5G Extended" | "Peak Fiber Wireless";
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  plan: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: string;
}
