import { useState } from "react";
import { Starfield, ParticleSystem } from "./components/Starfield";
import { WireframeAvatar } from "./components/WireframeAvatar";
import { Sidebar } from "./components/Sidebar";
import { ChatInterface } from "./components/ChatInterface";
import { ChatToggle } from "./components/ChatToggle";
import { DottedWaveBackground } from "./components/DottedWaveBackground";
import { useNotificationSystem } from "./hooks/useNotificationSystem";
import { Background } from "./components/Background";

function App() {
  const { showMessage } = useNotificationSystem();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/*Background */}
      <Background />
      

      {/* Dotted Wave Background */}
      {/*<DottedWaveBackground />*/}

      {/* Starfield */}
      {/*<Starfield />*/}

      {/* Blue Particle System */}
      {/*<ParticleSystem />*/}



      {/* Main Viewport */}
      <div className="main-viewport">
        {/* Left Sidebar */}
        {/*<Sidebar onIconClick={handleSidebarClick} />*/}

        {/* Central Avatar Area */}
        <div className="avatar-section">
          {/*<WireframeAvatar />*/}

          {/* Circuit Patterns */}
         {/* <div className="circuit-overlay">
            <div className="circuit-line horizontal" style={{top: '20%', left: '10%', width: '80%'}}></div>
            <div className="circuit-line vertical" style={{left: '20%', top: '10%', height: '80%'}}></div>
            <div className="circuit-line horizontal" style={{top: '80%', left: '10%', width: '80%'}}></div>
            <div className="circuit-line vertical" style={{right: '20%', top: '10%', height: '80%'}}></div>
            <div className="circuit-node" style={{top: '20%', left: '20%'}}></div>
            <div className="circuit-node" style={{top: '80%', right: '20%'}}></div>
          </div>*/}
        </div>
        

      </div>
      
      {/* Chat System */}
      {/* {isChatOpen ? (
        <ChatInterface
          isVisible={isChatOpen}
          onToggle={() => setIsChatOpen(false)}
        />
      ) : (
        <ChatToggle onClick={() => setIsChatOpen(true)} />
      )} */}
    </>
  );
}

export default App;
