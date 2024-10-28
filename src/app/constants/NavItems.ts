import { Hash, Home, Info, Mail } from "lucide-react";

interface INavBarLinks {
  name: string;
  href: string;
  icon: any;
}

export const navItemsGuest: INavBarLinks[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tags", href: "/articles", icon: Hash },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
];
