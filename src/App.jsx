import { Navbar } from "./layout/Navbar";
import { Home } from "./sections/Home";
import { About } from "./sections/About";
import { Projects } from "./sections/Project";
import { Contact } from "./sections/Contact";
import { Footer } from "./layout/Footer";
import { TechStack } from "./sections/TechStack";
import { Certifications } from "./sections/Certifications";
import { HexagonalVault } from "./components/HexagonalVault";
import { AIChat } from "./components/AIChat";


function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <HexagonalVault />
      <Navbar />
      <main className="relative z-10">
        <Home />
        <About />
        <Projects />
        <TechStack />
        <Certifications />
       
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <AIChat />
    </div>
  );
}

export default App;
