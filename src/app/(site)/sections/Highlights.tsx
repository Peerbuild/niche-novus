import HighlightCarousel from "@/app/(site)/_components/HighlightCarousel";
import { getGallery } from "@/app/actions/gallery";

const Highlights = async () => {
  const gallery = await getGallery();
  return (
    <section className="pt-40 pb-20 md:pt-20 md:pb-60   w-full  overflow-hidden">
      <HighlightCarousel images={gallery} />
    </section>
  );
};

export default Highlights;
