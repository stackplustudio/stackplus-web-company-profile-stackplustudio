// --- DATA NAVBAR ---
export const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICE", href: "/service" },
  { name: "PORTOFOLIO", href: "/portfolio" },
  { name: "CONTACT", href: "/contact" },
];

// --- DATA FOOTER ---
export const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Service", href: "/service" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "UI/UX Design", href: "/service#uiux" },
    { name: "Logo & Branding", href: "/service#branding" },
    { name: "Web Development", href: "/service#webdev" },
    { name: "Mobile Development", href: "/service#mobiledev" },
    { name: "AI Chatbot", href: "/service#chatbot" },
  ],
};

// --- DATA EXPERTISE ---
export const expertiseData = [
  {
    title: "UI/UX Design",
    desc: "Crafting intuitive and aesthetically pleasing digital experiences that engage users.",
    isActive: true, // Card pertama warnanya biru
  },
  {
    title: "Web Development",
    desc: "Building scalable, high-performance web applications using cutting-edge technologies.",
    isActive: false,
  },
  {
    title: "Mobile Development",
    desc: "Developing cross-platform mobile apps that provide a seamless user experience.",
    isActive: false,
  },
  {
    title: "AI ChatBot",
    desc: "Building scalable, high-performance web applications using cutting-edge technologies.",
    isActive: false,
  },
  {
    title: "Branding Design",
    desc: "Developing cross-platform mobile apps that provide a seamless user experience.",
    isActive: false,
  },
];

// --- DATA PORTFOLIO ---
export const portfolioData = [
  {
    title: "Alvi Ardhi Publishing",
    tags: "#UI/UX Design #Web Development",
    image: "/images/alvi.png", // Nanti ganti dengan path gambar asli Anda
  },
  {
    title: "PT Jantara",
    tags: "UI/UX Design",
    image: "/images/Hexavue.png",
  },
  {
    title: "PT Jantara",
    tags: "UI/UX Design",
    image: "/images/arsicon.png",
  },
  {
    title: "Area Kerja",
    tags: "UI/UX Design",
    image: "/images/kerja.png",
  },
];
// --- DATA TEAM ---
export const teamData = [
  { 
    name: "Zauzan Adzani", 
    role: "UI/UX DESIGNER", 
    image: "/images/zauzan.png" // Hapus kata src, wajib pakai / di awal
  },
  { 
    name: "Valent Destra", 
    role: "UI/UX DESIGNER", 
    image: "/images/valen.png" // Disesuaikan dengan nama file di VS Code
  },
  { 
    name: "Budi Cahyono", 
    role: "DEVELOPER", 
    image: "/images/budi.png" // Disesuaikan dengan nama file di VS Code
  },
  { 
    name: "Raisha Nayyara", 
    role: "PRODUCT DEVELOPMENT", 
    image: "/images/raisa.png" // Disesuaikan dengan nama file di VS Code
  },
  { 
    name: "Rafael Kristanto", 
    role: "PRODUCT DEVELOPMENT", 
    image: "/images/rafael.jpeg" // Disesuaikan dengan nama file di VS Code
  },
  { 
    name: "Arief Rachman", 
    role: "SOCIAL MEDIA SPESIALIST", 
    image: "/images/arief.jpeg" // Disesuaikan dengan nama file di VS Code
  },
];
// --- DATA KATEGORI & DETAIL PORTFOLIO ---
export const portfolioCategories = [
  "UI/UX DESIGN",
  "WEB DEVELOPMENT",
  "APPS DEVELOPMENT",
  "AI CHATBOT",
  "BRANDING"
];

export const detailedPortfolioData = [
  // 1. Kategori: UI/UX DESIGN
  {
    year: "2026",
    title: "Faheema Academy",
    features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
    category: "UI/UX DESIGN",
    images: ["/images/arief.jpeg", "/images/arief.jpeg"] // Ganti dengan path asli
  },
  // 2. Kategori: WEB DEVELOPMENT
  {
    year: "2026",
    title: "StackPlus Corporate Web",
    features: ["Next.js Framework", "Responsive Design", "SEO Optimized", "Fast Loading"],
    category: "WEB DEVELOPMENT",
    images: ["/images/budi.png", "/images/budi.png"] 
  },
  // 3. Kategori: APPS DEVELOPMENT
  {
    year: "2025",
    title: "HRIS Mobile System",
    features: ["Cross-Platform (Flutter)", "Real-time Attendance", "Leave Management", "Push Notifications"],
    category: "APPS DEVELOPMENT",
    images: ["/images/raisa.png", "/images/raisa.png"] 
  },
  // 4. Kategori: AI CHATBOT
  {
    year: "2026",
    title: "Smart CS Assistant",
    features: ["LLM Integration", "Custom Knowledge Base", "Context Memory", "Dashboard Analytics"],
    category: "AI CHATBOT",
    images: ["/images/rafael.jpeg", "/images/rafael.jpeg"] 
  },
  // 5. Kategori: BRANDING
  {
    year: "2025",
    title: "Hexavue Identity",
    features: ["Logo Suite", "Color System", "Brand Guidelines", "Stationery Mockups"],
    category: "BRANDING",
    images: ["/images/valen.png", "/images/valen.png"] 
  }
];
// --- DATA PRICING WEB DEVELOPMENT ---
export const webDevPricingTabs = [
  "GENERAL", "COMPANY PROFILE", "E-COMMERCE", "CORPORATE", "LANDING PAGE", "LMS", "NEWS", "WEB APPS", "PERSONAL WEB", "BLOG"
];

// Template dasar untuk dipakai di tab yang belum di-custom
const baseWebDevPlans = [
  { name: "Lite", desc: "Basic plan tailored for this specific service.", benefits: ["Free Domain", "Basic Features", "Standard Design", "1x Revisi"], codeTypes: ["Wordpress"], techTools: ["Hostinger"], isPro: false },
  { name: "Pro", desc: "Advanced features to grow your digital presence.", benefits: ["Free Domain", "Advanced Features", "Custom Design", "Analytics", "3x Revisi"], codeTypes: ["Next.js", "TailwindCSS"], techTools: ["Vercel", "Cloudflare"], isPro: true },
  { name: "Advance", desc: "Full-scale solution for serious businesses.", benefits: ["High Performance", "API Integration", "SEO Optimized", "Priority Support"], codeTypes: ["Next.js", "Node.js"], techTools: ["AWS", "Vercel"], isPro: false },
  { name: "Custom", desc: "Enterprise-grade solution built from scratch.", benefits: ["Unlimited Revisions", "Dedicated Manager", "White-label", "24/7 Support"], codeTypes: ["Microservices", "Any Stack"], techTools: ["Custom Cloud", "CI/CD"], isPro: false }
];

// Data lengkap per kategori tab
export const webDevPricingData: Record<string, any[]> = {
  "GENERAL": [
    { name: "Lite", desc: "For solo creators or small teams launching their first site.", benefits: ["Free Domain (.com, .co.id, .id)", "Scope terbatas (fitur/halaman dasar)", "Template-based design", "Core functionality only", "Basic integration", "Basic SEO setup", "1x revisi", "Standard documentation", "Delivery cepat"], codeTypes: ["Wordpress", "Framer"], techTools: ["Hostinger", "Vercel", "Render", "Cloudflare R2"], isPro: false },
    { name: "Pro", desc: "For solo creators or small teams launching their first site.", benefits: ["Free Domain (.com, .co.id, .id)", "Scope menengah", "Semi / full custom design", "Advanced core features", "Third-party integration", "Analytics setup", "Performance improvement", "2-3x revisi", "Basic training", "Extended documentation"], codeTypes: ["Next.js", "React.js", "TailwindCSS"], techTools: ["Hostinger", "Vercel", "Render", "Cloudflare R2"], isPro: true },
    { name: "Advance", desc: "For solo creators or small teams launching their first site.", benefits: ["Scope luas", "Fully custom design", "Advanced feature set", "API integration", "Performance optimization", "Security enhancement", "Advanced analytics", "3-5x revisi", "1 bulan support", "Scalability-ready architecture"], codeTypes: ["Next.js", "React.js", "Node.js", "Laravel"], techTools: ["Hostinger", "Vercel", "Render", "Cloudflare R2"], isPro: false },
    { name: "Custom", desc: "For large-scale enterprises with specific, complex requirements.", benefits: ["Everything in Advance", "Tailored architecture design", "Dedicated project manager", "On-premise / Hybrid cloud deployment", "Advanced security auditing", "Custom API development", "White-label solution", "Priority 24/7 technical support", "Source code ownership", "Flexible maintenance & update plans"], codeTypes: ["Any Stack (Custom)", "Microservices", "Python/Django/Go"], techTools: ["AWS/GCP/Azure", "Docker/K8s", "Custom Database", "CI/CD Pipeline"], isPro: false }
  ],
  "COMPANY PROFILE": [
    { name: "Lite", desc: "Perfect for showcasing your business portfolio.", benefits: ["Free Domain", "Up to 5 Pages", "Contact Form", "Mobile Responsive", "Basic SEO"], codeTypes: ["Wordpress"], techTools: ["Hostinger", "cPanel"], isPro: false },
    { name: "Pro", desc: "Professional image with dynamic content management.", benefits: ["Free Domain", "Up to 15 Pages", "CMS Integration", "Custom UI/UX", "Google Analytics", "Speed Optimization"], codeTypes: ["Next.js", "TailwindCSS", "Sanity CMS"], techTools: ["Vercel", "Cloudflare"], isPro: true },
    { name: "Advance", desc: "Corporate standard with full-featured integrations.", benefits: ["Unlimited Pages", "Multilingual Support", "Career/Job Portal", "Investor Relations Page", "Advanced Security"], codeTypes: ["Next.js", "Node.js", "PostgreSQL"], techTools: ["Vercel", "AWS S3"], isPro: false },
    { name: "Custom", desc: "Enterprise company profile with complex needs.", benefits: ["Intranet Integration", "Custom API", "Dedicated Server", "Full Source Code"], codeTypes: ["Microservices", "React"], techTools: ["AWS EC2", "Docker"], isPro: false }
  ],
  "E-COMMERCE": [
    { name: "Lite", desc: "Start selling online quickly and easily.", benefits: ["Free Domain", "Up to 50 Products", "Standard Payment Gateway", "Basic Shopping Cart", "Order Management"], codeTypes: ["Wordpress", "WooCommerce"], techTools: ["Hostinger"], isPro: false },
    { name: "Pro", desc: "Robust online store for growing businesses.", benefits: ["Up to 1000 Products", "Custom Checkout Flow", "Multi-Payment Gateway", "Inventory Management", "Discount Engine", "Abandoned Cart Email"], codeTypes: ["Next.js", "Shopify Headless"], techTools: ["Vercel", "Stripe/Midtrans"], isPro: true },
    { name: "Advance", desc: "High-volume store with advanced marketing tools.", benefits: ["Unlimited Products", "Multi-Vendor Support", "Loyalty Program", "Advanced Analytics", "ERP Integration", "Auto-Scaling Server"], codeTypes: ["Next.js", "Node.js", "MedusaJS"], techTools: ["AWS", "Redis", "PostgreSQL"], isPro: false },
    { name: "Custom", desc: "Bespoke marketplace or massive e-commerce scale.", benefits: ["Custom Architecture", "Machine Learning Recs", "Global CDN", "24/7 SLA"], codeTypes: ["Custom Stack", "Go / Rust Backend"], techTools: ["Kubernetes", "GCP"], isPro: false }
  ],
  "CORPORATE": baseWebDevPlans,
  "LANDING PAGE": baseWebDevPlans,
  "LMS": baseWebDevPlans,
  "NEWS": baseWebDevPlans,
  "WEB APPS": baseWebDevPlans,
  "PERSONAL WEB": baseWebDevPlans,
  "BLOG": baseWebDevPlans
};
// --- DATA LIFECYCLE (WEB & APP DEVELOPMENT) ---
export const lifecycleData = [
  {
    title: "DELIVERY & CONSULTATION",
    desc: "We define the app vision, target users, core features, and platform strategy (Android, iOS, or cross-platform) to align business goals with product direction."
  },
  {
    title: "REQUIREMENT GATHERING",
    desc: "We identify user needs, map user journeys, and document functional and technical requirements as the foundation of development."
  },
  {
    title: "UI/UX DESIGN & SYSTEM ARCHITECTURE",
    desc: "We design intuitive interfaces and build scalable app architecture to ensure smooth performance and seamless user experience."
  },
  {
    title: "DEVELOPMENT",
    desc: "We develop the application using modern frameworks and best practices to ensure performance, security, and stability."
  },
  {
    title: "QA & TESTING",
    desc: "We perform functional, usability, and device compatibility testing to ensure the app runs properly across various screen sizes and OS versions."
  },
  {
    title: "DEPLOYMENT & LAUNCH",
    desc: "We deploy the website to the live server and ensure it runs smoothly, securely, and is accessible to users across devices and browsers."
  },
  {
    title: "MAINTENANCE & SUPPORT",
    desc: "We provide ongoing updates, bug fixes, performance optimization, and feature enhancements to keep the app competitive."
  }
];
// --- DATA PRICING UI/UX DESIGN ---
export const uiUxPricingPlans = [
  {
    name: "Basic",
    desc: "For solo creators or small teams launching their first site.",
    benefits: [
      "+5 Halaman",
      "Wireframing",
      "Design UI (High Fidelity)",
      "Prototype Sederhana (Non Interaktif)",
      "File PDF",
      "Source Figma"
    ],
    isPro: false
  },
  {
    name: "Pro",
    desc: "For solo creators or small teams launching their first site.",
    benefits: [
      "+10 - 20 Halaman",
      "Riset UX",
      "Userflow",
      "Style Guide",
      "Wireframing",
      "Design UI (High Fidelity)",
      "Prototype Sederhana (Non Interaktif)",
      "File PDF",
      "Source Figma"
    ],
    isPro: true
  },
  {
    name: "Custom",
    desc: "For solo creators or small teams launching their first site.",
    benefits: [
      "Jumlah Halaman Custom",
      "Riset UX",
      "Userflow",
      "User Persona & Journey Map",
      "Style Guide",
      "Design Systems",
      "Wireframing",
      "Design UI (High Fidelity)",
      "Prototype Interaktif",
      "Usability Testing",
      "File PDF",
      "Source Figma"
    ],
    isPro: false
  }
];

// --- DATA LIFECYCLE UI/UX DESIGN ---
export const uiUxLifecycleData = [
  {
    title: "RESEARCH",
    desc: "Gather user insights, business requirements, and competitor analysis to build a strong strategic foundation."
  },
  {
    title: "INFORMATION ARCHITECTURE",
    desc: "Structure content and navigation flows to ensure clarity, logic, and ease of use."
  },
  {
    title: "WIREFRAME",
    desc: "Create low-fidelity layouts to define structure, hierarchy, and core functionality without visual details."
  },
  {
    title: "VISUAL DESIGN",
    desc: "Develop the final visual interface, including typography, color system, and UI components aligned with brand identity."
  },
  {
    title: "PROTOTYPE",
    desc: "Build interactive simulations to validate user flows and overall experience before development."
  },
  {
    title: "USABILITY TESTING",
    desc: "Test the product with users to identify friction points and refine the experience based on real feedback."
  },
  {
    title: "HAND OFF",
    desc: "Deliver finalized design files, specifications, and assets to the development team for implementation."
  }
];
// --- DATA PRICING MOBILE DEVELOPMENT ---
export const mobileDevPricingTabs = [
  "GENERAL", "E-COMMERCE MOBILE APP", "LMS MOBILE APPS", "HRIS MOBILE APPS"
];

// Template dasar untuk Mobile Dev
const baseMobileDevPlans = [
  { name: "Lite", desc: "For simple utility apps or MVP launches.", benefits: ["Single Platform (Android/iOS)", "Standard UI Components", "Basic API Integration", "Up to 5 Screens", "1x Revisi", "Standard Support"], codeTypes: ["React Native", "Flutter"], techTools: ["Firebase", "REST API"], isPro: false },
  { name: "Pro", desc: "For growing businesses needing cross-platform presence.", benefits: ["Cross-platform (Android & iOS)", "Custom UI/UX Design", "Advanced API Integration", "Push Notifications", "Up to 15 Screens", "3x Revisi", "App Store Submission"], codeTypes: ["React Native", "Flutter"], techTools: ["Firebase", "GraphQL", "Redux"], isPro: true },
  { name: "Advance", desc: "For complex applications with high performance needs.", benefits: ["Native-like Performance", "Complex Animations", "Real-time Chat/Features", "Advanced Security", "Offline Mode Support", "5x Revisi", "1 Month Maintenance"], codeTypes: ["React Native", "Swift/Kotlin (Modules)"], techTools: ["AWS", "WebSockets", "SQLite"], isPro: false },
  { name: "Custom", desc: "Enterprise-grade mobile ecosystem built from scratch.", benefits: ["Everything in Advance", "Hardware Integration (IoT/Bluetooth)", "Custom CI/CD Pipeline", "White-label Solution", "Dedicated Team", "Source Code Ownership", "24/7 SLA Support"], codeTypes: ["Any Stack (Native/Hybrid)"], techTools: ["Custom Cloud", "Docker Backend"], isPro: false }
];

export const mobileDevPricingData: Record<string, any[]> = {
  "GENERAL": baseMobileDevPlans,
  "E-COMMERCE MOBILE APP": [
    { name: "Lite", desc: "Quick launch for your online store.", benefits: ["Product Catalog", "Basic Cart & Checkout", "Standard Payment Gateway", "Up to 50 Products", "1x Revisi"], codeTypes: ["Flutter"], techTools: ["Firebase", "Stripe"], isPro: false },
    { name: "Pro", desc: "Robust mobile commerce for growing brands.", benefits: ["Advanced Search & Filter", "Multi-Payment Integration", "Wishlist & User Profile", "Order Tracking", "Push Promo Notifications", "App Store Submission"], codeTypes: ["React Native", "Flutter"], techTools: ["Midtrans/Xendit", "Redux"], isPro: true },
    { name: "Advance", desc: "High-volume store with advanced retention tools.", benefits: ["Loyalty & Point System", "Multi-Vendor Capability", "AI Product Recommendations", "Advanced Analytics", "ERP/CRM Integration"], codeTypes: ["React Native"], techTools: ["AWS", "ElasticSearch"], isPro: false },
    { name: "Custom", desc: "Bespoke marketplace or massive retail scale.", benefits: ["Custom Architecture", "AR Product Try-on", "Global CDN", "Dedicated Support", "Full Source Code"], codeTypes: ["Custom Native/Hybrid"], techTools: ["GCP", "Kubernetes Backend"], isPro: false }
  ],
  "LMS MOBILE APPS": baseMobileDevPlans,
  "HRIS MOBILE APPS": baseMobileDevPlans
};
// --- DATA PRICING AI CHATBOT ---
export const aiChatbotPricingTabs = [
  "GENERAL", "CUSTOMER SERVICE", "SALES & MARKETING BOT", "KNOWLEDGE ASSISTANT RAG", "AGENTIC AUTOMATION SYSTEM"
];

// Template dasar untuk AI Chatbot
const baseAiChatbotPlans = [
  { name: "Lite", desc: "For small businesses starting with AI automation.", benefits: ["Single channel", "FAQ intelligent response", "Prompt engineering basic", "Dashboard monitoring", "1 knowledge source", "Deploy & setup"], codeTypes: ["Next.js", "Python"], techTools: ["Vercel", "OpenAI"], isPro: false },
  { name: "Pro", desc: "For growing businesses ready to automate interactions.", benefits: ["Multi-channel", "Basic RAG system", "Knowledge upload (PDF/Doc)", "Auto escalation", "Analytics basic", "Custom persona AI"], codeTypes: ["Next.js", "LangChain"], techTools: ["Vercel", "Pinecone"], isPro: true },
  { name: "Advance", desc: "For companies that need intelligent AI workflows.", benefits: ["Advanced RAG", "Multi knowledge base", "CRM integration", "Context memory", "Role-based dashboard", "Security layer"], codeTypes: ["Next.js", "LlamaIndex"], techTools: ["AWS", "Weaviate"], isPro: false },
  { name: "Custom", desc: "Enterprise-grade Agentic AI built from scratch.", benefits: ["Fine-tuned LLM models", "Omnichannel integration", "Custom Agentic Workflows", "On-premise deployment", "Unlimited knowledge sources", "24/7 SLA Support"], codeTypes: ["Custom Python Backend"], techTools: ["AWS/GCP", "Enterprise LLM"], isPro: false }
];

// Data Spesifik sesuai gambar
export const aiChatbotPricingData: Record<string, any[]> = {
  "GENERAL": baseAiChatbotPlans,
  "CUSTOMER SERVICE": [
    { name: "Lite", desc: "For small businesses starting with AI automation.", benefits: ["Single channel (Web / WhatsApp)", "FAQ intelligent response", "Prompt engineering basic", "Dashboard monitoring sederhana", "1 knowledge source (max 50 Q&A)", "Response template customization", "Deploy & setup", "2 weeks support"], codeTypes: ["Next.js", "Python"], techTools: ["Hostinger", "Vercel", "Render", "Cloudflare R2"], isPro: false },
    { name: "Pro", desc: "For growing businesses ready to automate customer interactions.", benefits: ["Multi-channel (Web + WA)", "Basic RAG system", "Knowledge upload (PDF/Doc)", "Auto escalation ke admin", "Lead capture system", "Analytics basic", "Custom persona AI", "1 bulan support"], codeTypes: ["Next.js", "LangChain"], techTools: ["Hostinger", "Vercel", "Render", "Cloudflare R2"], isPro: true },
    { name: "Advance", desc: "For companies that need intelligent AI integrated into their workflow.", benefits: ["Advanced RAG", "Multi knowledge base", "CRM integration", "Ticketing integration", "Context memory", "Role-based dashboard", "Security layer", "1-2 Months of Support"], codeTypes: ["Next.js", "LlamaIndex", "Python"], techTools: ["Hostinger", "Vercel", "Render", "Cloudflare R2"], isPro: false },
    { name: "Custom", desc: "Enterprise-grade customer service AI built for massive scale.", benefits: ["Bespoke AI architecture", "Fine-tuned LLM models", "Unlimited knowledge sources", "Omnichannel integration", "Custom Agentic Workflows", "On-premise / Private Cloud", "24/7 Priority Support"], codeTypes: ["Custom Python", "Microservices"], techTools: ["AWS/GCP", "Pinecone/Weaviate", "OpenAI/Anthropic Enterprise"], isPro: false }
  ],
  "SALES & MARKETING BOT": baseAiChatbotPlans,
  "KNOWLEDGE ASSISTANT RAG": baseAiChatbotPlans,
  "AGENTIC AUTOMATION SYSTEM": baseAiChatbotPlans
};

// --- DATA LIFECYCLE AI CHATBOT ---
export const aiChatbotLifecycleData = [
  { title: "REQUIREMENT & USE CASE", desc: "Identify business bottlenecks and define the primary use cases and goals for the AI Chatbot." },
  { title: "KNOWLEDGE GATHERING", desc: "Collect, clean, and structure data sources (PDFs, FAQs, docs) to build a robust foundation for the AI." },
  { title: "PERSONA & PROMPT DESIGN", desc: "Design the AI's persona, tone of voice, and craft precise system prompts to guide its behavior." },
  { title: "MODEL & RAG SETUP", desc: "Develop the conversational logic, implement Retrieval-Augmented Generation (RAG), and connect LLMs." },
  { title: "TESTING & REFINEMENT", desc: "Simulate conversations, test edge cases, and refine the model to prevent hallucinations and errors." },
  { title: "DEPLOYMENT & INTEGRATION", desc: "Launch the chatbot across selected channels (Web, WhatsApp) and integrate with existing CRMs." },
  { title: "MONITORING & OPTIMIZATION", desc: "Analyze chat logs, gather user feedback, and continuously update the knowledge base to improve accuracy." }
];
// --- DATA PRICING BRANDING ---
export const brandingPricingTabs = ["LOGO", "SOCIAL MEDIA DESIGN"];

export const brandingPricingData: Record<string, any[]> = {
  "LOGO": [
    { 
      name: "Launch", 
      desc: "For solo creators or small teams launching their first site.", 
      benefits: ["1 konsep logo", "1x revisi", "Primary logo saja", "File PNG (background transparan)", "File JPG", "1 mockup preview"], 
      isPro: false 
    },
    { 
      name: "Growth", 
      desc: "For solo creators or small teams launching their first site.", 
      benefits: ["2-3 konsep logo", "3x revisi", "Primary + Secondary logo", "Submark", "Color palette (HEX, RGB, CMYK)", "Font recommendation", "File AI + EPS + PNG + JPG", "3-4 mockup aplikasi"], 
      isPro: true 
    },
    { 
      name: "Scale", 
      desc: "For solo creators or small teams launching their first site.", 
      benefits: ["Logo suite lengkap", "Color system lengkap + kombinasi usage", "Typography system (heading, body, hierarchy)", "Clear space & minimum size", "Do & Don't logo usage", "Pattern / graphic element", "Basic layout system", "Brand guideline 15-20 halaman (PDF)", "5-6 mockup sesuai industri"], 
      isPro: false 
    }
  ],
  "SOCIAL MEDIA DESIGN": [
    { name: "Launch", desc: "For basic social media presence.", benefits: ["3 feeds design", "1x revisi", "Basic template", "File PNG/JPG"], isPro: false },
    { name: "Growth", desc: "For active brands needing consistent content.", benefits: ["12 feeds design", "3x revisi", "Custom template", "Story design", "Source file"], isPro: true },
    { name: "Scale", desc: "Full social media visual management.", benefits: ["30 feeds design", "Unlimited revisi", "Full social media template", "Video reels cover", "Brand guideline"], isPro: false }
  ]
};

// --- DATA LIFECYCLE BRANDING ---
// Karena branding biasanya lebih ringkas, kita buat 6 tahapan yang presisi
export const brandingLifecycleData = [
  { title: "DISCOVERY & BRIEF", desc: "Understand your brand values, target audience, and market positioning to build a solid foundation." },
  { title: "RESEARCH & STRATEGY", desc: "Analyze competitors and develop a creative visual direction that makes your brand stand out." },
  { title: "CONCEPT DEVELOPMENT", desc: "Drafting initial logo concepts, sketches, and visual identity explorations." },
  { title: "REFINEMENT", desc: "Polishing the chosen concept based on client feedback and perfecting typography and colors." },
  { title: "BRAND GUIDELINES", desc: "Creating a comprehensive rulebook for how to use the brand assets consistently." },
  { title: "FINAL HANDOFF", desc: "Delivering all final assets in various formats (AI, EPS, PNG, PDF) for web and print." }
];
// --- DATA WHY US ---
export const whyUsData = {
  imageOne: "/images/valen.png", // Ganti dengan nama file Foto Switch/Mixer kamu
  imageTwo: "/images/budi.png",  // Ganti dengan nama file Foto Tim Bekerja kamu
  // ... data lainnya seperti title atau desc jika ada
};