import Header from "@/app/(site)/_components/Header";
import Contact from "./_components/Contact";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={``}>
      <Header />
      <Contact />
      {children}
    </div>
  );
}
