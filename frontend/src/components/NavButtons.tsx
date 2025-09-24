interface NavButtonsProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function NavButtons({ currentSection, onSectionChange }: NavButtonsProps) {
  const buttons = [
    { id: 'projects', label: 'PROJECTS' },
    { id: 'gendelo', label: 'GENDELO' },
    { id: 'hec', label: 'HEC' },
  ];

  return (
    <div className="flex space-x-4">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => onSectionChange(button.id)}
          className={`px-6 py-2 font-mono text-sm border rounded transition-all ${
            currentSection === button.id
              ? 'bg-cyan-400 text-black border-cyan-400'
              : 'text-cyan-400 border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10'
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}