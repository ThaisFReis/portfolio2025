import { useState, useEffect, useRef } from 'react';

interface TerminalInterfaceProps {
  onClose: () => void;
}

export function TerminalInterface({ onClose }: TerminalInterfaceProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    'CYBER-CHAT 3.1 INITIALIZED...',
    'NEURAL LINK ESTABLISHED',
    'GREETINGS, USER. HOW CAN I ASSIST YOUR [PORTFOLIO] QUERY?',
    ''
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const newOutput = [...output, `> ${command}`];

    switch (cmd) {
      case 'help':
        newOutput.push(
          'AVAILABLE COMMANDS:',
          '• help - Show this help',
          '• about - About this portfolio',
          '• projects - List projects',
          '• contact - Contact information',
          '• skills - Technical skills',
          '• clear - Clear terminal',
          ''
        );
        break;
      case 'about':
        newOutput.push(
          'NEO-NOMAD PORTFOLIO SYSTEM',
          'A cyberpunk-themed interactive portfolio',
          'Built with React, Three.js, and Tailwind CSS',
          'Version: 3.1.0',
          ''
        );
        break;
      case 'projects':
        newOutput.push(
          'ACTIVE PROJECTS:',
          '• Neural Network Visualizer',
          '• Quantum Data Processing',
          '• Holographic Interface Design',
          '• AI Avatar System',
          ''
        );
        break;
      case 'contact':
        newOutput.push(
          'CONTACT PROTOCOLS:',
          '• Email: contact@neo-nomad.dev',
          '• GitHub: /neo-nomad',
          '• LinkedIn: /in/neo-nomad',
          '• Matrix: @neo:matrix.org',
          ''
        );
        break;
      case 'skills':
        newOutput.push(
          'TECHNICAL CAPABILITIES:',
          '• Frontend: React, TypeScript, Three.js',
          '• Backend: Node.js, Python, Go',
          '• Cloud: AWS, Docker, Kubernetes',
          '• AI/ML: TensorFlow, PyTorch',
          ''
        );
        break;
      case 'clear':
        setOutput(['TERMINAL CLEARED', '']);
        setInput('');
        return;
      case 'exit':
        onClose();
        return;
      default:
        newOutput.push(
          `ERROR: Command '${command}' not recognized`,
          'Type "help" for available commands',
          ''
        );
    }

    setOutput(newOutput);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="bg-black/90 border-2 border-cyan-400 rounded-lg p-4 font-mono text-sm backdrop-blur-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-400/30">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-cyan-400 font-bold">CYBER-CHAT 3.1</span>
        </div>
        <button
          onClick={onClose}
          className="text-cyan-400 hover:text-red-400 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Terminal Output */}
      <div className="h-48 overflow-y-auto mb-4 text-green-400">
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center space-x-2">
        <span className="text-cyan-400">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent text-green-400 outline-none placeholder-green-600"
          placeholder="TYPE_COMMAND..."
          autoComplete="off"
        />
        <div className="text-cyan-400 animate-pulse">█</div>
      </div>

      {/* Status Bar */}
      <div className="mt-2 pt-2 border-t border-cyan-400/30 text-xs text-cyan-600">
        NEURAL INTERFACE ACTIVE | MEM: 47% | CPU: 23% | LATENCY: 12ms
      </div>
    </div>
  );
}