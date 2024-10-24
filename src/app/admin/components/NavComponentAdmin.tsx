import {
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

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Users",
    url: "#",
    icon: Users,
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
                  <button>
                    <item.icon />
                    <span>{item.title}</span>
                  </button>
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
                <SidebarMenuButton>
                  <User2 />
                  <span>Account</span>
                </SidebarMenuButton>
                <SidebarMenuButton>
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
