import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { NavListComponent } from "./ui/NavListComponent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { startLogout } from "@/store/auth/thunks";
import { ESTATUS } from "@/store/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const HOME = "Home";
export const LOGIN = "Login";
export const REGISTER = "Register";
export const ACOUNT = "Acount";

export const NavbarComponent = () => {
  const { status, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onLogaut = async () => {
    await dispatch(startLogout());
    navigate("/");
  };

  const onViewMyAccount = async () => {
    navigate(`/user/${user.id}`);
  };

  return (
    <header className="bg-sidebar border-b z-[1000]">
      <nav className="max-w-full mx-auto  m-auto w-full md:w-[80%] px-4 md:px-1">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Blog Logo</span>
            </Link>
          </div>
          <div className="hidden md:block">
            {status === ESTATUS.AUTHENTICATED ? (
              <div className=" flex items-baseline space-x-4 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        className="w-9 h-9 rounded-full"
                        src={user.imgAvatar}
                        alt="@shadcn"
                      />
                      <AvatarFallback className="bg-sky-300 font-semibold">
                        {user.name[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    className="md:w-72 z-[1100]"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer flex justify-between items-center"
                      onClick={onViewMyAccount}
                    >
                      <span className="text-2xl">{user.userName}</span>
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      privacity
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={onLogaut}
                      className="cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className=" flex items-baseline space-x-4">
                <Link to={"/auth/register"}>
                  <Button variant={"blue"}>Get Started</Button>
                </Link>
                <Link to={"/auth/login"}>
                  <Button variant={"blueOutline"}>Login</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden ">
            <Sheet>
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
