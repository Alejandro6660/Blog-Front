import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavComponentAdmin } from "../components/NavComponentAdmin";

export const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex justify-between">
      <NavComponentAdmin />
      <SidebarTrigger />
      <main className="py-2 flex-1 px-3">{children}</main>
    </SidebarProvider>
  );
};
