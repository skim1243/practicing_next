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
  "We offer monthly support plans that include updates, backups, security checks, and performance monitoring to keep your website running smoothly."
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
