import Header from "@/app/(site)/_components/Header";
import Contact from "./_components/Contact";
import SmoothScroll from "@/providers/SmoothScroll";
import Loader from "./_components/Loader";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={``}>
      <Loader />
      <Header />
      <Contact />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
