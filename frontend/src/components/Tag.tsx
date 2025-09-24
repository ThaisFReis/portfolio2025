import codebar from "../assets/code.svg";

const GithubIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export const Tag = () => {
  return (
    <div className="bg-black border border-[#FF0000] px-[6.5px] py-1 max-w-[278px] h-[98.25px] mx-auto text-[#FF0000] font-mono space-y-2">
      {/* Header */}
      <div>
        <div className="text-sm font-normal tracking-widest text-left">
          THAIS FERREIRA REIS
        </div>
        <hr className="border-[#FF0000]" />
      </div>

      {/* Container do Conteúdo Principal - Usando Flexbox para as colunas */}
      <div className="flex">
        {/* Coluna Esquerda */}
        <div className="flex flex-col w-full md:w-2/5 gap-[5px]">
          {/* Caixa 1 - Info */}
          <div className="border border-[#FF0000] flex flex-col justify-center text-center w-[84.25px] h-[28px] py-[3px] px-[12px]">
            <p className="text-[5px]">FRONT-END DEVELOPER</p>
            <p className="text-[3px]">SOFTWARE TYPE: CREATIVE</p>
            <p className="text-[3.25px]">INPUT: 00001 OUTPUT: 11110</p>
            <p className="text-[3.5px]">EST. 1999</p>
          </div>

          {/* Caixa 2 - Barcode */}
          <div className="border border-[#FF0000] w-[84.25px] h-[21px] flex items-center justify-center overflow-hidden relative py-[3px] px-[6.75px]">
            <img src={codebar} className="w-full" />
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="flex flex-col gap-[5px]">
          {/* Caixa 3 - Links/Ícones */}
          <div className="border border-[#FF0000] p-4 flex-grow flex justify-evenly items-center w-[174px] h-[33.25px]">
            <a href="https://github.com/ThaisFReis">
              <div className="text-center flex flex-col items-center justify-center cursor-pointer">
                <GithubIcon />
                <p className="text-[4.25px] mt-[1.25px]">GITHUB</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/thaisfreis/">
              <div className="text-center flex flex-col items-center justify-center cursor-pointer">
                <LinkedinIcon />
                <p className="text-[4.25px] mt-[1.25px]">LINKEDIN</p>
              </div>
            </a>

            <a href="">
              <div className="text-center flex flex-col items-center justify-center cursor-pointer">
                <DownloadIcon />
                <p className="text-[4.25px] mt-[1.25px]">DOWNLOAD CV</p>
              </div>
            </a>
          </div>

          {/* Caixa 4 - Identificação */}
          <div className="border border-[#FF0000] flex items-center justify-center text-center w-[174px] h-[15.75px]">
            <p className="text-[4.75px]">
              IDENTIFICATION: TFR-2025-BR-RJ-DEV-01
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
