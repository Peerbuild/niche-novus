import HighlightCarousel from "@/app/(site)/_components/HighlightCarousel";
import fs from "fs";
import path from "path";

const images = fs
  .readdirSync(path.join(process.cwd(), "/public/images/highlights"))
  .filter((image) => image.split(".")[1] === "jpg");

const Highlights = () => {
  return (
    <section className="h-[44rem] overflow-x-hidden">
      <HighlightCarousel images={images} />
    </section>
  );
};

export default Highlights;
