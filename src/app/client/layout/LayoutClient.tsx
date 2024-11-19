import { Toaster } from "@/components/ui/toaster";
import { NavbarComponent } from "../components/NavbarComponent";

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col gap-2 ">
      <NavbarComponent />
      <div className="flex-1 flex flex-col md:flex-row  m-auto w-full md:w-[80%] ">
        <main className="flex-1 py-4 overflow-auto w-full">{children}</main>
      </div>
      <Toaster />
    </div>
  );
};
