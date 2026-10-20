export const PORTFOLIO_CATEGORIES = [
  { value: "UI_UX", label: "UI/UX Design" },
  { value: "WEB", label: "Web Development" },
  { value: "APPS", label: "Apps Development" },
  { value: "AI_CHATBOT", label: "AI Chatbot" },
  { value: "BRANDING", label: "Branding" },
] as const;

export type PortfolioCategoryValue = (typeof PORTFOLIO_CATEGORIES)[number]["value"];
export const portfolioCategoryLabel = (value: string) =>
  PORTFOLIO_CATEGORIES.find((c) => c.value === value)?.label ?? value;
export const isPortfolioCategory = (v: unknown): v is PortfolioCategoryValue =>
  PORTFOLIO_CATEGORIES.some((c) => c.value === v);

export const SERVICE_TYPES = [
  { value: "WEB_DEVELOPMENT", label: "Web Development",
    categories: ["GENERAL", "COMPANY PROFILE", "E-COMMERCE", "CORPORATE", "LANDING PAGE", "LMS", "NEWS", "WEB APPS", "PERSONAL WEB", "BLOG"] },
  { value: "MOBILE_DEVELOPMENT", label: "Mobile Development",
    categories: ["GENERAL", "E-COMMERCE MOBILE APP", "LMS MOBILE APPS", "HRIS MOBILE APPS"] },
  { value: "AI_CHATBOT", label: "AI Chatbot",
    categories: ["GENERAL", "CUSTOMER SERVICE", "SALES & MARKETING BOT", "KNOWLEDGE ASSISTANT RAG", "AGENTIC AUTOMATION SYSTEM"] },
  { value: "BRANDING", label: "Branding", categories: ["LOGO", "SOCIAL MEDIA DESIGN"] },
  { value: "UI_UX_DESIGN", label: "UI/UX Design", categories: ["GENERAL"] },
] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPES)[number]["value"];
export const isServiceType = (v: unknown): v is ServiceTypeValue =>
  SERVICE_TYPES.some((s) => s.value === v);
export const serviceTypeLabel = (value: string) =>
  SERVICE_TYPES.find((s) => s.value === value)?.label ?? value;

export const MAX_PORTFOLIO_IMAGES = 4;

export const STAT_ICONS = [
  { value: "calendar", label: "Calendar" },
  { value: "rocket", label: "Rocket" },
  { value: "handshake", label: "Handshake" },
  { value: "users", label: "People" },
  { value: "star", label: "Star" },
  { value: "award", label: "Award" },
  { value: "globe", label: "Globe" },
  { value: "code", label: "Code" },
] as const;

export const STAT_SOURCES = [
  { value: "MANUAL", label: "Manual number" },
  { value: "YEARS_SINCE_FOUNDING", label: "Auto: years since January 2026" },
] as const;