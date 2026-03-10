// Fallback responses for when the AI API is not available
export const fallbackResponses: Record<string, string | string[]> = {
  // Skills and technologies
  'react': 'Thais é especialista em React — usou profissionalmente na Beplauze por quase 2 anos, onde construiu 40+ componentes com Storybook e liderou migração para micro-frontends com Astro. Todos os projetos de hackathon usam React.',
  'typescript': 'TypeScript é a linguagem principal da Thais. Ela publicou o SDK @karn_lat/protocol-sdk em TypeScript, usa TS em todos os projetos frontend, e tem experiência com tipagem avançada, generics e desenvolvimento de SDKs.',
  'javascript': 'JavaScript ES6+ é fundamental no stack da Thais. Ela conhece bem promises, async/await, destructuring, modules e todas as features modernas.',
  'tailwind': 'Tailwind CSS é o framework de escolha da Thais para styling. Ela usa em projetos como Jaspr, CRI.A e Mise, com expertise em responsive design.',
  'rust': 'Sim! Thais escreve contratos inteligentes em Rust/Soroban na blockchain Stellar. Ela desenvolveu 3 contratos para o Karn Protocol: Valocracy (identidade), Governor (votação) e Treasury (custódia de ativos).',
  'soroban': 'Thais tem experiência profunda com Soroban (Stellar). Ela escreveu 3 smart contracts em Rust para o Karn Protocol e implementou Zero-Knowledge Proofs no jogo Proof of Life.',
  'stellar': 'Thais desenvolve na blockchain Stellar/Soroban. É fundadora do Karn Protocol (3 contratos Soroban) e criou o Proof of Life (jogo com ZK proofs). Também publicou o SDK TypeScript @karn_lat/protocol-sdk.',
  'solidity': 'Thais tem experiência com Solidity no ecossistema Ethereum. Construiu o Event Horizon (NFT ticketing com ERC721/OpenZeppelin) e o MintWork (recrutamento descentralizado no Scroll L2).',
  'docker': 'Thais é proficiente em Docker. Implementou containerização no CAPGov, reduzindo onboarding em 40%, e usa Docker nos projetos Karn e Mise.',
  'python': 'Thais usa Python para data engineering. No CAPGov, construiu pipelines ETL de alto desempenho processando grandes datasets públicos.',
  'node': 'Node.js é central no backend da Thais. Ela construiu o backend completo do Karn (Node/TypeScript/Prisma/Supabase) com criptografia AES-256-GCM.',

  // Projects
  'karn': 'Karn Protocol é o ecossistema open-source de governança blockchain que Thais fundou na Stellar/Soroban. Inclui 3 contratos inteligentes em Rust, SDK TypeScript, e backend full-stack. O Karn Institute foca em inclusão de mulheres em tech na América Latina.',
  'proof of life': 'Proof of Life é um jogo thriller assimétrico para 2 jogadores na blockchain Stellar. Usa Zero-Knowledge Proofs (UltraHonk) para validar a posição do assassino on-chain sem revelar as coordenadas.',
  'mintwork': 'MintWork é um protocolo de recrutamento descentralizado — 2º lugar na Ethereum Argentina Hackathon. Transforma entregas em microtarefas verificadas no Scroll L2 com reputação on-chain.',

  // Experience and hackathons
  'hackathon': 'Thais tem 3 prêmios internacionais em hackathons! 1º lugar no Morro Makers (Jaspr), 1º lugar na Nola (Mise), 2º no LiveMode (CRI.A), e 2º na Ethereum Argentina (MintWork). Plus participações no Game Zk Stellar e Bemobi.',
  'jaspr': 'Jaspr é o ecossistema de concierge inteligente para hotéis — 1º lugar no Morro Makers Hackathon. Usa RAG (LangChain + ChromaDB + OpenAI), backend NestJS com WebSocket e arquitetura multi-tenant.',
  'mise': 'Mise é uma plataforma de analytics para restaurantes — 1º lugar na competição da Nola. Usa DeepSeek AI para recomendações inteligentes, com dashboards customizáveis e análise multi-loja.',
  'projeto': 'Thais tem um portfólio impressionante: Karn Protocol (governança Stellar), Proof of Life (jogo ZK), Event Horizon (NFT ticketing), Jaspr (1º lugar), Mise (analytics com IA), MintWork (Scroll L2), e mais!',

  // Professional experience
  'experiencia': 'Thais tem 5 anos de experiência profissional: Fundadora do Karn Protocol (2025-atual), Full Stack Developer na Nola (2025), Front-End Developer na Beplauze (2023-2025), e Pesquisadora de Dados no CAPGov (2023-2025).',
  'beplauze': 'Na Beplauze (07/2023-03/2025), Thais liderou migração para micro-frontends com Astro, construiu biblioteca com 40+ componentes React/Storybook, e gerenciou estado com Redux Toolkit + React Query + GraphQL.',
  'capgov': 'No CAPGov (06/2023-12/2025), Thais arquitetou pipelines ETL com Python e SQL, implementou Docker para o ambiente de desenvolvimento, e criou scripts de validação que eliminaram quase 100% dos erros manuais.',
  'nola': 'Na Nola (10/2025-12/2025), Thais construiu infraestrutura de testes para Frontend (React), Backend (Node.js) e Mobile (React Native) usando Jest, Vitest e Cypress E2E.',

  // Web3 and blockchain
  'web3': 'Thais é especialista em Web3 com experiência em dois ecossistemas: Stellar/Soroban (Rust — Karn Protocol, Proof of Life) e Ethereum/EVM (Solidity — Event Horizon, MintWork, Gaba Bank).',
  'blockchain': 'Thais desenvolve em duas blockchain: Stellar (Rust/Soroban — 3 smart contracts, ZK proofs) e Ethereum (Solidity — NFTs, DeFi, Scroll L2). É fundadora do Karn Protocol.',

  // Contact and general
  'contato': 'Você pode conectar com Thais através do email reis.thaisf@gmail.com, WhatsApp +55 (21) 98571-2371, GitHub github.com/ThaisFReis ou LinkedIn linkedin.com/in/thaisfreis',
  'github': 'O GitHub da Thais é github.com/ThaisFReis — lá você encontra os repositórios do Karn Protocol, Proof of Life, Event Horizon e outros projetos.',
  'linkedin': 'LinkedIn da Thais: linkedin.com/in/thaisfreis — rede profissional e conexões do ecossistema tech.',

  // Default responses
  'default': [
    'Hmm, essa informação está em um setor protegido do mainframe. Pode reformular sua consulta?',
    'Dados não encontrados nos arquivos principais. Tente uma busca mais específica sobre skills, projetos ou experiência.',
    'Sistema de busca retornou zero resultados. Acesso negado a esse setor de dados.',
    'Essa query não retornou resultados válidos. O firewall pode estar bloqueando essa informação.',
    'Arquivo não localizado no banco de dados. Tente perguntar sobre tecnologias, projetos ou experiência profissional.'
  ]
};

export function getFallbackResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  // Check for specific keywords
  for (const [keyword, response] of Object.entries(fallbackResponses)) {
    if (keyword !== 'default' && input.includes(keyword)) {
      return Array.isArray(response) ? response[0] : response;
    }
  }

  // Return random default response
  const defaultResponses = fallbackResponses.default;
  if (Array.isArray(defaultResponses)) {
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
  return defaultResponses;
}
