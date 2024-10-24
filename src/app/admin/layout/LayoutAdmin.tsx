import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavComponentAdmin } from "../components/NavComponentAdmin";

export const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <NavComponentAdmin />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
