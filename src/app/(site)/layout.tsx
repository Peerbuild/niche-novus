import Header from "@/app/(site)/_components/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={``}>
      <Header />
      {children}
    </div>
  );
}
