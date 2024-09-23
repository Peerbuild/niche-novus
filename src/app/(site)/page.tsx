import About from "@/app/(site)/sections/About";
import Footer from "@/app/(site)/sections/Footer";
import Herosection from "@/app/(site)/sections/Herosection";
import Highlights from "@/app/(site)/sections/Highlights";
import Projects from "@/app/(site)/sections/Projects";
import Work from "@/app/(site)/sections/Work";

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
