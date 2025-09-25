import { ChatInterface } from "./components/ChatInterface";
import { Avatar } from "./components/Avatar";

function App() {

  return (
    <>
      {/* Main Viewport */}
      <div className="main-viewport">
        <Avatar />
      </div>

      {/* Chat System */}

      <ChatInterface />
    </>
  );
}

export default App;
