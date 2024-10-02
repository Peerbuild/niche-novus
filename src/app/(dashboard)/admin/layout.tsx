import { Header, Sidebar } from "@/app/(dashboard)/_components";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex gap-8 min-h-screen bg-neutral-900/50 leading-[1.2]">
      <Sidebar />
      <div className="w-full">
        <Header />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </div>
    </div>
  );
}
