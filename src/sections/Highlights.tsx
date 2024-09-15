import HighlightCarousel from "@/components/HighlightCarousel";
import fs from "fs";
import path from "path";

const images = fs
  .readdirSync(path.join(process.cwd(), "/public/images/highlights"))
  .filter((image) => image.split(".")[1] === "jpg");

const Highlights = () => {
  return (
    <section>
      <HighlightCarousel images={images} />
    </section>
  );
};

export default Highlights;
