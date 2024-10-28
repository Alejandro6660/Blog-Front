import { navItemsGuest } from "@/app/constants/NavItems";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NavListComponent } from "./ui/NavListComponent";

export const HOME = "Home";
export const LOGIN = "Login";
export const REGISTER = "Register";
export const ACOUNT = "Acount";

export const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = navItemsGuest;
  return (
    <header className="bg-sidebar border-b">
      <nav className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Blog Logo</span>
            </Link>
          </div>
          <div className="hidden md:block "></div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button variant={"blue"}>Get Startet</Button>
            </div>
          </div>
          <div className="md:hidden ">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="px-2">
                  <span className="sr-only">Open menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <NavListComponent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};
