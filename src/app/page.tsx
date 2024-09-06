import About from "@/sections/About";
import Herosection from "@/sections/Herosection";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <div className="px-8 space-y-16">
      <Herosection />
      <About />
      <Projects />
    </div>
  );
}
