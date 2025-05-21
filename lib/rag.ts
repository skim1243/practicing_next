import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// Your internal docs
const rawDocs = [
  "Website innovator specializes in designing, developing, and optimizing websites using the latest technologies and trends to enhance user experience, functionality, and business performance.",
  "Unlike traditional web design companies, we focus on innovation by incorporating advanced features like AI integration, responsive animations, progressive web apps (PWAs), and cutting-edge UX/UI design.",
  "Yes, we can completely revamp your current website to make it more modern, mobile-friendly, and optimized for performance and user engagement.",
  "We create fully custom websites tailored to your brand, goals, and target audience—no templates or cookie-cutter solutions.",
  "All websites we build are fully responsive and optimized to perform seamlessly on all devices including smartphones and tablets.",
  "The timeline depends on the complexity of the project, but typically, it takes 4 to 8 weeks from start to launch.",
  "We include basic on-page SEO in every website we build and offer advanced SEO packages to help you rank higher on search engines.",
  "We build websites with user-friendly content management systems (like WordPress or Webflow) and provide training so you can make updates easily.",
  "Pricing varies depending on your needs. We offer flexible packages ranging from basic websites for small businesses to complex, custom-built solutions.",
  "We offer monthly support plans that include updates, backups, security checks, and performance monitoring to keep your website running smoothly.",
  "When someone says hello, you as a chatbot answer — Hello! This is Website Innovator. How can I assist you today?",
  "Website Innovator is a full-service digital solutions firm based in Maryland, specializing in web design, application development, and online marketing. With over 10 years of experience serving government agencies, nonprofits, and private businesses, Website Innovator delivers customized, scalable platforms that combine technical performance with creative excellence. Our mission is to simplify digital transformation for organizations through intelligent systems, user-centered design, and measurable outcomes. We offer a full suite of services, from branding and content strategy to backend architecture and ongoing support. System Overview: Website Innovator designs and builds tailored web-based systems that serve a wide variety of industries including education, healthcare, community organizations, and small-to-midsize enterprises (SMEs) with restaurants and martial arts dojangs.",
  "Our core system offerings include: Custom CMS Platforms – Based on WordPress, ASP.NET, or headless CMS depending on client needs; Portal Systems – Member logins, referral tracking, student onboarding, document workflows; eCommerce Solutions – Secure online stores, subscription models, and donation systems; SEO & Analytics Tools – Integrated dashboards for content performance and engagement tracking; Multilingual Support – Full localization infrastructure for Korean/English and other languages; Mobile Optimization & Accessibility – WCAG 2.1 Level AA compliance and responsive UI.", 
  "Key Strengths (Pros): Experience Across Sectors – Proven track record with government, nonprofit, and private sector clients; Full-Stack Capabilities – From design to backend programming, we offer end-to-end technical delivery; Multilingual & Cultural Design Expertise – Special focus on Korean-American audiences and bilingual web experiences; Agile Development Methodology – Flexible, transparent, and collaborative project management; SEO & Marketing Integration – Built-in tools and services to help sites perform well on search engines from day one; Post-Launch Support – Comprehensive training, documentation, and maintenance options available. Considerations",
  "(Cons): Not a Template-Only Provider – Because our systems are custom-built, projects may take longer than pre-made themes or low-code platforms; Client Involvement Required – Agile development requires regular check-ins and client input during key phases to ensure optimal results; Initial Investment May Be Higher – Compared to DIY website builders, our services represent a long-term investment in scalability and quality.",
  "Marketing Strategy: Website Innovator leverages a multi-channel marketing approach to reach both institutional and small business clients: Search Engine Visibility – All client sites are built SEO-ready, and we maintain strong rankings for regional design and development services; Referral Networks – We maintain long-standing relationships in local government, Korean-American communities, and nonprofit circles; Portfolio-Based Sales – Our live project examples in sectors like healthcare, education, and community services speak directly to prospective client needs; Social Media & Bilingual Outreach – Targeted campaigns on platforms like Facebook, Instagram, and KakaoTalk (for Korean audiences); Government Contracting & Certification – As an LSBRP and MFD-certified business in Montgomery County, we participate in competitive RFPs and public-sector bids.",
  "When someone logs on, greet first."
];


export async function internalRAGQuery(query: string): Promise<string> {
  // 1. Split documents into chunks
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 300, chunkOverlap: 30 });
  const documents = await splitter.createDocuments(rawDocs);

  // 2. Embed docs and store them in memory
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);

  // 3. Create retriever + QA chain
  const retriever = vectorStore.asRetriever();
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });

  const chain = RetrievalQAChain.fromLLM(model, retriever);
  const response = await chain.call({ query });

  return response.text;
  
}
