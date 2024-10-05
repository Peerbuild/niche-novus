import { Header, Sidebar } from "@/app/(dashboard)/_components";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./admin.css";
import SidebarProvider from "@/providers/SidebarProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row-reverse md:flex-row min-h-screen  leading-[1.2]">
      <SidebarProvider>
        <Sidebar />
        <div className="w-full px-4">
          <Header />
          <ReactQueryProvider>
            <div className="my-4 max-w-screen-2xl">{children}</div>
          </ReactQueryProvider>
        </div>
      </SidebarProvider>
    </div>
  );
}
