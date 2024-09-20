import About from "@/sections/About";
import Footer from "@/sections/Footer";
import Herosection from "@/sections/Herosection";
import Highlights from "@/sections/Highlights";
import Projects from "@/sections/Projects";
import Work from "@/sections/Work";

export default function Home() {
  return (
    <div className="px-8 space-y-16">
      <Herosection />
      <About />
      <Work />
      <Projects />
      <Highlights />
      <Footer />
    </div>
  );
}
