import Header from "@/app/(site)/_components/Header";
import Contact from "./_components/Contact";
import SmoothScroll from "@/providers/SmoothScroll";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={``}>
      <Header />
      <Contact />
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}
