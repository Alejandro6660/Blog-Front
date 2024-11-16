import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { NavListComponent } from "./ui/NavListComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const HOME = "Home";
export const LOGIN = "Login";
export const REGISTER = "Register";
export const ACOUNT = "Acount";

export const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user: boolean = false;
  return (
    <header className="bg-sidebar border-b">
      <nav className="max-w-full mx-auto  m-auto w-full md:w-[80%] px-4 md:px-1">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Blog Logo</span>
            </Link>
          </div>
          <div className="hidden md:block "></div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage
                          className="w-9 h-9 rounded-full"
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom">
                      <DropdownMenuLabel>Alejandro Fuentes</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to={"/auth/register"}>
                    <Button variant={"blue"}>Get Started</Button>
                  </Link>
                  <Link to={"/auth/login"}>
                    <Button variant={"blueOutline"}>Login</Button>
                  </Link>
                </>
              )}
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
