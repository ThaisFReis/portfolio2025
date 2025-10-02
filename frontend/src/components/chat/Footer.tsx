import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full py-3 px-4 bg-black/20 backdrop-blur-md border-t border-purple-500/20">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-400 font-mono flex items-center justify-center gap-2">
          Developed with{" "}
          <Heart className="w-4 h-4 text-purple-400 fill-purple-400 animate-pulse" />{" "}
          by{" "}
          <a
            href="https://github.com/ThaisFReis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-purple-500/50 hover:decoration-purple-400"
          >
            Thais Ferreira Reis
          </a>
        </p>
      </div>
    </footer>
  );
};
