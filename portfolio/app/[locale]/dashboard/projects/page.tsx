"use client";
import { AppSidebar } from "../ui/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ProjectModal } from "../ui/modal-projects"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useProjectsStore } from "./store/use-projects";

export default function Projects() {
    const t = useTranslations("dashboard.projects");
    const translationLoading = useTranslations();
    const tDelete = useTranslations("dashboard.modalDelete");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const { projects, getProjects, deleteProject, loading } = useProjectsStore();

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    // Handler for edit
    const handleEdit = (projectId: string) => {
        const project = projects.find(p => p._id === projectId);
        setSelectedProject(project);
        setEditModalOpen(true);
    };

    // Handler for delete
    const handleDelete = (projectId: string) => {
        setSelectedProject(projectId);
        setDeleteModalOpen(true);
    };

    // Handler for closing modals
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="ml-auto">
                        <ProjectModal trigger={<Button variant="default">{t("add")}</Button>} />
                    </div>
                </header>
                <div className="flex flex-1 flex-col p-6 pt-4">
                    {/* Header Action */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">{t("title")}</h2>
                            <p className="text-muted-foreground text-xs">{t("total")}</p>
                        </div>
                    </div>

                    {/* Compact Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {loading ? (
                            <div className="col-span-full text-center py-10 text-muted-foreground">{translationLoading("dashboard.loading")}</div>
                        ) : (
                            projects.map((project) => (
                                <div key={project._id} className="group flex flex-col rounded-lg border bg-card shadow-sm transition-hover hover:border-primary/50">
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
                                                    {typeof project._id === 'string' && project._id && (
                                                        <DropdownMenuItem className="gap-2" onClick={() => handleEdit(project._id as string)}>
                                                            <Pencil className="size-3.5" /> {t("edit")}
                                                        </DropdownMenuItem>
                                                    )}
                                                    {typeof project._id === 'string' && project._id && (
                                                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={() => handleDelete(project._id as string)}>
                                                            <Trash2 className="size-3.5" /> {t("delete")}
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        {/* Placeholder for real image */}
                                        <div className="h-full w-full bg-gradient-to-br from-muted to-muted/20 flex items-center justify-center">
                                             <span className="text-[10px] text-muted-foreground font-mono">IMG_{project._id}.PNG</span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-3">
                                        <h3 className="truncate text-sm font-semibold leading-none">{project.titles?.[0]?.en || "Untitled"}</h3>
                                        <p className="mt-1.5 line-clamp-1 text-[11px] text-muted-foreground">
                                            {t("builtWith")}
                                        </p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium">{t("languages")}</span>
                                            <div className="flex gap-1">
                                                <div className="size-1.5 rounded-full bg-emerald-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Simple Pagination Footer */}
                    <div className="mt-auto flex items-center justify-between border-t py-4">
                        <p className="text-[11px] text-muted-foreground">
                            {t("showing")} <span className="font-medium">1</span> {t("to")} <span className="font-medium">5</span> {t("of")} <span className="font-medium">12</span> {t("results")}
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

                {/* Edit Modal */}
                {editModalOpen && selectedProject && (
                    <ProjectModal open={editModalOpen} onOpenChange={() => setEditModalOpen(false)} initialData={selectedProject} />
                )}

                {/* Delete Confirmation Modal */}
                {deleteModalOpen && (
                    <Dialog open={deleteModalOpen} onOpenChange={closeDeleteModal}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{t("delete")}</DialogTitle>
                            </DialogHeader>
                            <p>{tDelete("areYouSure")}</p>
                            <DialogFooter>
                                <Button variant="outline" onClick={closeDeleteModal}>{tDelete("cancel")}</Button>
                                <Button variant="destructive" onClick={async () => {
                                    // eslint-disable-next-line no-console
                                    if (selectedProject) {
                                        await deleteProject(selectedProject);
                                        await getProjects();
                                    }
                                    closeDeleteModal();
                                }}>{tDelete("confirmDelete")}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </SidebarInset>
        </SidebarProvider>
    )
}