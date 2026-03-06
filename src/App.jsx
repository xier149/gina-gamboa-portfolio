import { Navbar } from "./layout/Navbar";
import { Home } from "./sections/Home";
import { About } from "./sections/About";
import { Projects } from "./sections/Project";
import { Contact } from "./sections/Contact";
import { Footer } from "./layout/Footer";
import { TechStack } from "./sections/TechStack";
import { Certifications } from "./sections/Certifications";


function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Home />
        <About />
        <Projects />
        <TechStack />
        <Certifications />
       
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
