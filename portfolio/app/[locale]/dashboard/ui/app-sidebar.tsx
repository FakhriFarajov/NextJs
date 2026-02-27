import * as React from "react"
import { 
  GalleryVerticalEnd, 
  LayoutDashboard, 
  Briefcase, 
  Star, 
  MessageSquare,
  ChevronRight 
} from "lucide-react"
import { useTranslations } from "next-intl";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Updated data structure for your specific dashboard needs
const data = {
  user: {
    name: "Admin",
    role: "Portfolio Manager",
  },
  navMain: [
    {
      title: "Main",
      url: "/dashboard/main",
      icon: LayoutDashboard,
      description: "Statistics & Overview",
    },
    {
      title: "Project Management",
      url: "/dashboard/projects",
      icon: Briefcase,
    },
    {
      title: "Review Management",
      url: "/dashboard/reviews",
      icon: Star,
    },
    {
      title: "Offers",
      url: "/dashboard/offers",
      icon: MessageSquare,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{t("dashboard.sidebar.admin")}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={t(`dashboard.sidebar.${item.title.toLowerCase().replace(/\s+/g, "_")}`)} className="py-6">
                  <a href={item.url} className="flex items-center gap-3">
                    <item.icon className="size-5" />
                    <div className="flex flex-col">
                      <span className="font-medium">{t(`dashboard.sidebar.${item.title.toLowerCase().replace(/\s+/g, "_")}`)}</span>
                    </div>
                    <ChevronRight className="ml-auto size-4 opacity-50" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}