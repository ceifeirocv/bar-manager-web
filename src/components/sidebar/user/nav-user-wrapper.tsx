import { getUser } from "@/app/actions/auth";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

export async function NavUserWrapper() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <NavUser user={user} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
