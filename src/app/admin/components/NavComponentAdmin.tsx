import {
  BookUser,
  ChartArea,
  ChevronUp,
  Home,
  LogOut,
  Settings,
  StickyNote,
  User2,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { startLogout } from "@/store/auth/thunks";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Rol Users",
    url: "/rolUsers",
    icon: BookUser,
  },
  {
    title: "Post",
    url: "#",
    icon: StickyNote,
  },
  {
    title: "Stats",
    url: "#",
    icon: ChartArea,
  },
];

export function NavComponentAdmin() {
  const dispatch: AppDispatch = useDispatch();

  const onLogoutBtn = () => {
    dispatch(startLogout());
  };
  const getUserById = () => {};

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarGroupLabel className="text-md">Panel</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings />
                  <span>Settings</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <SidebarMenuButton onClick={() => getUserById()}>
                  <User2 />
                  <span>Account</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => onLogoutBtn()}>
                  <LogOut />
                  <span>Sign out</span>
                </SidebarMenuButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
