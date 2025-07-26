import { NavLink, useLocation } from "react-router-dom"
import { 
  Mail, 
  Building2, 
  Settings, 
  User,
  LogOut,
  Menu
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import interviewCopilotLogo from "@/assets/interview-copilot-logo.png"

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Mail },
  { title: "Company Insights", url: "/insights", icon: Building2 },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-accent/50"

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-subtle">
        {/* Logo Section */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <img 
              src={interviewCopilotLogo} 
              alt="Interview Co-Pilot" 
              className="w-8 h-8"
            />
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">Interview Co-Pilot</h2>
                <p className="text-xs text-muted-foreground">Prep with confidence</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}