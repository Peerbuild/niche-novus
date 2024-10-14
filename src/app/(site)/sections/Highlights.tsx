import HighlightCarousel from "@/app/(site)/_components/HighlightCarousel";
import fs from "fs";
import path from "path";

const images = fs
  .readdirSync(path.join(process.cwd(), "/public/images/highlights"))
  .filter((image) => image.split(".")[1] === "jpg");

const Highlights = () => {
  return (
    <section className="pt-10 pb-40 md:pt-40 md:pb-60 absolute  w-full  overflow-hidden">
      <HighlightCarousel images={images} />
    </section>
  );
};

export default Highlights;
