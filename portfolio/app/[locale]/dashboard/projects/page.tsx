import { AppSidebar } from "@/components/dashboard/ui/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ProjectModal } from "@/components/dashboard/ui/modal"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft, ChevronRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Projects() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="ml-auto">
                        <ProjectModal trigger={<Button variant="default">Add Project</Button>} />
                    </div>
                </header>
                <div className="flex flex-1 flex-col p-6 pt-4">
                    {/* Header Action */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Portfolio Projects</h2>
                            <p className="text-muted-foreground text-xs">Total: 12 projects found</p>
                        </div>
                    </div>

                    {/* Compact Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="group flex flex-col rounded-lg border bg-card shadow-sm transition-hover hover:border-primary/50">
                                {/* Compact Image Wrapper */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-muted">
                                    <div className="absolute right-2 top-2 z-10">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="secondary" size="icon" className="size-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="gap-2">
                                                    <Pencil className="size-3.5" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                                                    <Trash2 className="size-3.5" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    {/* Placeholder for real image */}
                                    <div className="h-full w-full bg-gradient-to-br from-muted to-muted/20 flex items-center justify-center">
                                         <span className="text-[10px] text-muted-foreground font-mono">IMG_0{i}.PNG</span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-3">
                                    <h3 className="truncate text-sm font-semibold leading-none">Project Title {i}</h3>
                                    <p className="mt-1.5 line-clamp-1 text-[11px] text-muted-foreground">
                                        Built with React, Next.js, and Tailwind CSS
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium">EN/AZ/RU</span>
                                        <div className="flex gap-1">
                                            <div className="size-1.5 rounded-full bg-emerald-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Simple Pagination Footer */}
                    <div className="mt-auto flex items-center justify-between border-t py-4">
                        <p className="text-[11px] text-muted-foreground">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> results
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="size-8" disabled>
                                <ChevronLeft className="size-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="size-8">
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}