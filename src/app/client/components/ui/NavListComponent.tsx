import { navItemsGuest } from "@/app/constants/NavItems";
import React from "react";
import { Link } from "react-router-dom";

export const NavListComponent = () => {
  const navList = navItemsGuest;
  return (
    <div>
      {navList.map((item) => (
        <Link to={item.href} key={item.name}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};
