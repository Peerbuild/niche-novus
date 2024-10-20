import About from "@/app/(site)/sections/About";
import Footer from "@/app/(site)/sections/Footer";
import Herosection from "@/app/(site)/sections/Herosection";
import Highlights from "@/app/(site)/sections/Highlights";
import Projects from "@/app/(site)/sections/Projects";
import Work from "@/app/(site)/sections/Work";

export default function Home() {
  return (
    <div className="space-y-8">
      <Herosection />
      <div className="space-y-10 md:space-y-40">
        <About />
        <Work />
        <Projects />
      </div>
      <Footer />
    </div>
  );
}
