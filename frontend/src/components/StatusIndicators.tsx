import { useState, useEffect } from 'react';

export function StatusIndicators() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-6 text-sm font-mono">
      {/* Status Lights */}
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400">ONLINE</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <span className="text-cyan-400">NEURAL</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        <span className="text-orange-400">SYNC</span>
      </div>

      {/* System Time */}
      <div className="text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded">
        {time.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })}
      </div>

      {/* System Info */}
      <div className="text-cyan-600 text-xs">
        V.3.1.0 | MEM: 2.3GB | CPU: 23%
      </div>
    </div>
  );
}