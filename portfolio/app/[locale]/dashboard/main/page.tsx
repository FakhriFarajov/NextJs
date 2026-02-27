import { AppSidebar } from "../ui/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { 
    Briefcase, 
    MessageSquare, 
    Star, 
    TrendingUp, 
    ArrowUpRight 
} from "lucide-react"
import { useTranslations } from "next-intl"

export default function Main() {
    const t = useTranslations();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header - No Breadcrumbs, just the toggle */}
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-sm font-semibold text-muted-foreground">{t("dashboard.main.overview")}</h1>
                </header>

                <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Projects Card */}
                        <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">{t("dashboard.main.totalProjects")}</p>
                                    <p className="text-2xl font-bold">24</p>
                                </div>
                                <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
                                    <Briefcase className="size-5" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-emerald-500">
                                <TrendingUp className="mr-1 size-3" />
                                <span>{t("dashboard.main.projectsGrowth")}</span>
                            </div>
                        </div>

                        {/* Reviews Card */}
                        <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">{t("dashboard.main.clientReviews")}</p>
                                    <p className="text-2xl font-bold">4.9</p>
                                </div>
                                <div className="rounded-full bg-amber-500/10 p-2 text-amber-500">
                                    <Star className="size-5" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                <span>{t("dashboard.main.reviewsBasedOn")}</span>
                            </div>
                        </div>

                        {/* Messages Card */}
                        <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">{t("dashboard.main.newMessages")}</p>
                                    <p className="text-2xl font-bold">12</p>
                                </div>
                                <div className="rounded-full bg-purple-500/10 p-2 text-purple-500">
                                    <MessageSquare className="size-5" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-purple-500 underline cursor-pointer">
                                <span>{t("dashboard.main.viewAllInquiries")}</span>
                                <ArrowUpRight className="ml-1 size-3" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area: Recent Projects/Activity */}
                    <div className="flex-1 rounded-xl border bg-card shadow-sm overflow-hidden">
                        <div className="border-b p-6">
                            <h2 className="text-lg font-semibold tracking-tight">{t("dashboard.main.recentActivityTitle")}</h2>
                            <p className="text-sm text-muted-foreground">{t("dashboard.main.recentActivityDesc")}</p>
                        </div>
                        <div className="p-6">
                           {/* Placeholder for a Table or List */}
                           <div className="flex flex-col gap-4">
                               {[1, 2, 3].map((i) => (
                                   <div key={i} className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                                       <div className="flex items-center gap-4">
                                           <div className="h-10 w-10 rounded bg-muted animate-pulse" />
                                           <div>
                                               <p className="font-medium text-sm">{t("dashboard.main.projectTitle", { number: i })}</p>
                                               <p className="text-xs text-muted-foreground">{t("dashboard.main.projectUpdated")}</p>
                                           </div>
                                       </div>
                                       <div className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                                           {t("dashboard.main.projectStatus")}
                                       </div>
                                   </div>
                               ))}
                           </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}