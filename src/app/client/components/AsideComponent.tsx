import { navItemsGuest } from "@/app/constants/NavItems";
import { Link } from "react-router-dom";

export const AsideComponent = () => {
  const navItems = navItemsGuest;
  return (
    <aside className="w-full md:w-64 hidden md:flex bg-accent rounded-sm">
      <div className="py-4 w-full">
        <div className="">
          <div className="flex flex-col w-full ">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:bg-blue-500 hover:bg-opacity-15  py-2 px-3 rounded-sm text-sm font-normal w-full flex items-center gap-3 group"
              >
                <item.icon />{" "}
                <span className="group-hover:text-sky-900 group-hover:text-opacity-80 group-hover:underline">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
