import HighlightCarousel from "@/app/(site)/_components/HighlightCarousel";
import fs from "fs";
import path from "path";

const images = fs
  .readdirSync(path.join(process.cwd(), "/public/images/highlights"))
  .filter((image) => image.split(".")[1] === "jpg");

const Highlights = () => {
  return (
    <section className="py-40 md:py-60 absolute w-full  overflow-hidden">
      <HighlightCarousel images={images} />
    </section>
  );
};

export default Highlights;
