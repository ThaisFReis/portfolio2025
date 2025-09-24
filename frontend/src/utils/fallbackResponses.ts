// Fallback responses for when Gemini API is not available
export const fallbackResponses: Record<string, string | string[]> = {
  // Skills and technologies
  'react': 'Ah, React! Thais é especialista nessa lib. Ela domina React 18+, hooks, context, e já construiu mais de 20 projetos com essa tecnologia durante o bootcamp da Driven Education.',
  'typescript': 'TypeScript é uma das principais armas no arsenal da Thais. Ela usa TS em todos os projetos front-end e tem experiência sólida com tipagem estática e interfaces.',
  'javascript': 'JavaScript ES6+ é fundamental no stack da Thais. Ela conhece bem promises, async/await, destructuring, modules e todas as features modernas.',
  'tailwind': 'Tailwind CSS é o framework de escolha da Thais para styling. Ela usa extensivamente em projetos como o Jaspr e tem expertise em responsive design.',

  // Experience and projects
  'hackathon': 'Os hackathons são onde Thais brilha! 1º lugar no Morro Makers com o Jaspr (chatbot para hotéis) e 2º lugar no LiveMode com CRI.A (assistente para CazéTV). Pura skills de netrunner!',
  'jaspr': 'Jaspr foi o projeto vencedor do Hackathon Morro Makers. Thais desenvolveu o front-end completo de um chatbot para hotéis usando React, TypeScript e Tailwind CSS.',
  'projeto': 'Thais tem vários projetos no portfolio: Jaspr (1º lugar hackathon), CRI.A (2º lugar), mais de 20 projetos durante o bootcamp, e pipelines ETL no CAPGov.',

  // Professional experience
  'experiencia': 'Thais tem experiência como Desenvolvedora Front-End na Beplauze e Pesquisadora em Engenharia de Dados no CAPGov. Stack diversificado entre front-end e dados.',
  'beplauze': 'Na Beplauze (07/2023-03/2025), Thais criou interfaces com React, TypeScript, Tailwind CSS, otimizou performance com Vite e Astro, e integrou APIs.',
  'capgov': 'No CAPGov (06/2023-08/2025), Thais projetou pipelines ETL com Python e Talend, desenvolveu scripts para limpeza de dados e trabalhou com Docker.',

  // Contact and general
  'contato': 'Você pode conectar com Thais através do email reis.thaisf@gmail.com, WhatsApp +55 (21) 98571-2371, GitHub github.com/ThaisFReis ou LinkedIn linkedin.com/in/thaisfreis',
  'github': 'O GitHub da Thais é github.com/ThaisFReis - lá você encontra os repositórios dos projetos e contribuições open source.',
  'linkedin': 'LinkedIn da Thais: linkedin.com/in/thaisfreis - rede profissional e conexões do ecossistema tech.',

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