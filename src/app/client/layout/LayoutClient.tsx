import { NavbarComponent } from "../components/NavbarComponent";
import { AsideComponent } from "../components/AsideComponent";

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col gap-2">
      <NavbarComponent />
      <div className="flex-1 flex flex-col md:flex-row  m-auto w-full md:w-[80%] space-x-4">
        <AsideComponent />
        <main className="flex-1 py-4 overflow-auto w-full">{children}</main>
      </div>
    </div>
  );
};
