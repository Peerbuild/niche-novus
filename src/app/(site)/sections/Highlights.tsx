import HighlightCarousel from "@/app/(site)/_components/HighlightCarousel";
import { getGallery } from "@/app/actions/gallery";

const Highlights = async () => {
  const gallery = await getGallery();
  return (
    <section className="pt-10 pb-40 md:pt-40 md:pb-60 absolute  w-full  overflow-hidden">
      <HighlightCarousel images={gallery} />
    </section>
  );
};

export default Highlights;
