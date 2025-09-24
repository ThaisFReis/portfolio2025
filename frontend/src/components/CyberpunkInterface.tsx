import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { CyberpunkAvatar } from './CyberpunkAvatar';
import { TerminalInterface } from './TerminalInterface';
import { NavButtons } from './NavButtons';
import { StatusIndicators } from './StatusIndicators';
import { CircuitBackground } from './CircuitBackground';

export function CyberpunkInterface() {
  const [terminalActive, setTerminalActive] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-950 overflow-hidden">
      {/* Circuit Pattern Background */}
      <CircuitBackground />

      {/* Main Border Frame */}
      <div className="absolute inset-4 border-2 border-gradient-cyberpunk rounded-lg overflow-hidden">
        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-cyan-400"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-cyan-400"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-orange-500"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-orange-500"></div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border-b border-cyan-400/30">
          <div className="flex items-center justify-between h-full px-8">
            <div className="text-cyan-400 font-mono text-2xl font-bold tracking-wider">
              NEO-NOMAD<br />
              <span className="text-sm text-cyan-300">NET_FOLIO</span>
            </div>

            <NavButtons currentSection={currentSection} onSectionChange={setCurrentSection} />

            <StatusIndicators />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="absolute top-20 left-0 right-0 bottom-0 flex">
          {/* Left Sidebar */}
          <div className="w-64 bg-gradient-to-b from-purple-900/20 to-indigo-900/20 backdrop-blur-sm border-r border-purple-400/30 p-6">
            <div className="space-y-6">
              <button
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-4 rounded border border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 transition-all font-mono"
                onClick={() => setCurrentSection('projects')}
              >
                PROJECTS
              </button>
              <button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded border border-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all font-mono"
                onClick={() => setCurrentSection('contact')}
              >
                CONTACT
              </button>
              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-3 px-4 rounded border border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 transition-all font-mono"
                onClick={() => setCurrentSection('data')}
              >
                DATA_LOGS
              </button>
            </div>

            {/* System Status */}
            <div className="mt-8 p-4 bg-black/40 rounded border border-green-500/30">
              <div className="text-green-400 font-mono text-sm">
                <div className="flex justify-between mb-2">
                  <span>CPU:</span>
                  <span className="text-cyan-400">87%</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>MEM:</span>
                  <span className="text-cyan-400">64%</span>
                </div>
                <div className="flex justify-between">
                  <span>NET:</span>
                  <span className="text-green-400">ONLINE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center - 3D Avatar */}
          <div className="flex-1 relative">
            <Canvas className="w-full h-full">
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
              />
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <CyberpunkAvatar />
            </Canvas>

            {/* Terminal Overlay */}
            {terminalActive && (
              <div className="absolute bottom-8 left-8 right-8">
                <TerminalInterface onClose={() => setTerminalActive(false)} />
              </div>
            )}
          </div>

          {/* Right Info Panel */}
          <div className="w-80 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border-l border-cyan-400/30 p-6">
            <div className="text-cyan-400 font-mono">
              <h3 className="text-lg mb-4 border-b border-cyan-400/30 pb-2">NEURAL INTERFACE</h3>

              <div className="space-y-4 text-sm">
                <div className="p-3 bg-black/40 rounded border border-purple-500/30">
                  <div className="text-purple-400 mb-1">CONSCIOUSNESS LEVEL</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="p-3 bg-black/40 rounded border border-green-500/30">
                  <div className="text-green-400 mb-1">NEURAL ACTIVITY</div>
                  <div className="text-xs text-green-300">
                    Processing... 47 active threads<br />
                    Memory allocation: 2.3GB<br />
                    Response time: 0.12ms
                  </div>
                </div>

                <div className="p-3 bg-black/40 rounded border border-orange-500/30">
                  <div className="text-orange-400 mb-1">SYSTEM STATUS</div>
                  <div className="text-xs text-orange-300">
                    All systems operational<br />
                    Last update: 23:47:12<br />
                    Uptime: 847 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}