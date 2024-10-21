import { Header, Sidebar } from "@/app/(dashboard)/_components";
import "../../admin.css";
import SidebarProvider from "@/providers/SidebarProvider";
import SyncProvider from "@/providers/SyncProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row-reverse md:flex-row min-h-screen  leading-[1.2]">
      <SidebarProvider>
        <SyncProvider>
          <Sidebar />
          <div className="w-full px-4">
            <Header />
            <div className="my-4 max-w-screen-2xl">{children}</div>
          </div>
        </SyncProvider>
      </SidebarProvider>
    </div>
  );
}
