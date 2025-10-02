import type { ProjectData } from "../types/chat";

export const projects: ProjectData[] = [
  {
    id: "eventhorizon",
    title: "Event Horizon",
    description: "A decentralized concert ticket marketplace built on blockchain technology. EventHorizon revolutionizes event ticketing by minting tickets as ERC721 NFTs, ensuring verifiable ownership, eliminating fraud, and enabling secure peer-to-peer transfers. Features include MetaMask wallet integration, multi-tier ticket systems, interactive venue seat selection, and a comprehensive user dashboard for managing NFT tickets.",
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
    link: "https://tickets-jue9.vercel.app/"
  },
  {
    id: "jaspr",
    title: "Jaspr",
    description: "AI-powered chatbot that won 1st place at Morro Makers Hackathon. Advanced conversational AI with natural language processing capabilities.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    technologies: ["React", "TypeScript", "AI APIs", "NLP"],
    achievement: "🥇 1st Place - Morro Makers Hackathon",
  },
  {
    id: "cria",
    title: "CRI.A",
    description: "AI content assistant for CazéTV that streamlines content creation. Integrated with Google Gemini API for intelligent suggestions.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
    link: "https://github.com/ThaisFReis",
    technologies: ["React", "TypeScript", "Google Gemini API", "Content AI"],
    achievement: "🥈 2nd Place - LiveMode Hackathon",
  },
  {
    id: "meridian-defi",
    title: "Decentralized Digital Bank",
    description: "DeFi platform built for Meridian Hackathon. Features smart contracts for decentralized banking operations and financial services.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
    technologies: ["React", "Solidity", "Web3", "DeFi", "Smart Contracts"],
    achievement: "🌐 Meridian Web3 Hackathon",
  },
  {
    id: "bemobi-churn",
    title: "AI Churn Prevention Agent",
    description: "Intelligent agent leveraging AI to predict and prevent customer churn. Analyzes user behavior patterns and provides proactive interventions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    technologies: ["React", "AI/ML", "Data Analytics", "TypeScript"],
    achievement: "🤖 Bemobi Hackathon",
  },
];
