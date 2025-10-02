import type { ProjectData } from "../types/chat";

export const projects: ProjectData[] = [
  {
    id: "jaspr",
    title: "Jaspr",
    description: "Conversational AI chatbot for the hotel industry, designed to reduce operational costs and improve customer satisfaction.",
    image: "/jaspr.png",
    technologies: ["React", "TypeScript", "AI APIs", "NLP"],
    achievement: "🥇 1st Place - Morro Makers Hackathon",
    whatIdid: "Developed the front-end of the onboarding flow for hotel registration on the platform.",
  },
  {
    id: "cria",
    title: "CRI.A",
    description: "AI agent system for creating personalized social media content for CazéTV. Built with n8n workflow automation, integrating Google Gemini API for content generation and SerpAPI for real-time data enrichment.",
    image: "/cria3.png",
    link: "https://github.com/ThaisFReis",
    technologies: ["n8n", "Google Gemini API", "SerpAPI", "React", "TypeScript", "Tailwind CSS"],
    achievement: "🥈 2nd Place - LiveMode Hackathon",
    whatIdid: "Developed all the tech stack for the project",
  },
  {
    id: "gaba-bank",
    title: "Gaba Bank",
    description: "DeFi platform built for Meridian Hackathon. Features smart contracts for decentralized banking operations and financial services. (Mock demonstration)",
    image: "/gaba-bank.png",
    technologies: ["React", "Solidity", "Web3", "DeFi", "Smart Contracts"],
    achievement: "🌐 Meridian Web3 Hackathon",
    link: "https://gaba-bank.vercel.app/",
    whatIdid: "Developed the front-end.",
  },
  {
    id: "sentinela",
    title: "Sentinela",
    description: "Autonomous AI agent that reacts in real-time to payment failures, automating recovery through intelligent and empathetic interactions. Features live chat, LangChain integration.",
    image: "/sentinela.png",
    technologies: ["React", "TypeScript", "Node.js", "Express", "LangChain", "Tailwind CSS", "Vite", "Jest"],
    achievement: "🤖 Bemobi Hackathon",
    link: "https://github.com/ThaisFReis/sentinela.git",
    whatIdid: "Developed all the tech stack for the project"
  },
  {
    id: "eventhorizon",
    title: "Event Horizon",
    description: "Decentralized NFT ticketing marketplace built with React, Solidity, and Hardhat. Eliminates fraud through blockchain-verified ERC721 tickets with MetaMask integration.",
    image: "/eventhorizon.png",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Solidity",
      "Hardhat",
      "Ethers.js",
      "OpenZeppelin",
      "ERC721",
      "MetaMask",
      "Blockchain",
      "NFTs",
      "Smart Contracts",
      "Web3",
      "Vitest",
      "React Testing Library"
    ],
    link: "https://tickets-jue9.vercel.app/",
    achievement: "💻 Web3",
    whatIdid: "Developed all the tech stack for the project"
  },
];
