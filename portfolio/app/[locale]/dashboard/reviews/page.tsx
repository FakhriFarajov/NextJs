"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "../ui/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Pencil, Trash2, User, Mail, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReviewCrudModal } from "../ui/modal-reviews";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useReviewsStore } from "./store/use-reviews";

export default function ReviewsManagement() {
    const t = useTranslations();
    const tDelete = useTranslations("dashboard.modalDelete");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<any>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingReview, setDeletingReview] = useState<any>(null);

    const { reviews, getReviews, loading } = useReviewsStore();

    useEffect(() => {
        getReviews();
    }, [getReviews]);

    const handleEdit = (review: any) => {
        setEditingReview(review);
        setIsModalOpen(true);
    };
    const handleDelete = (review: any) => {
        setDeletingReview(review);
        setDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeletingReview(null);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 px-4 border-b">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-sm font-medium">{t("dashboard.reviews.title")}</h1>
                </header>

                <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold">{t("dashboard.reviews.heading")}</h2>
                            <p className="text-xs text-muted-foreground">{t("dashboard.reviews.desc")}</p>
                        </div>
                        <Button size="sm" className="gap-2" onClick={() => { setEditingReview(null); setIsModalOpen(true); }}>
                            <Plus className="size-4" /> {t("dashboard.reviews.add")}
                        </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {loading ? (
                            <div className="col-span-full text-center py-10 text-muted-foreground">{t("dashboard.loading")}</div>
                        ) : (
                            reviews.map((review) => (
                                <div key={review._id} className="group relative rounded-xl border bg-card p-5 shadow-sm hover:border-primary/50 transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <Avatar className="h-12 w-12 border">
                                            <AvatarImage src={review.imageObjectName || ""} />
                                            <AvatarFallback><User className="size-6 text-muted-foreground" /></AvatarFallback>
                                        </Avatar>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="size-8" onClick={() => handleEdit(review)}>
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="size-8 text-destructive" onClick={() => handleDelete(review)}>
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-sm font-bold">{review.name} {review.surname}</h3>
                                        <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                                            <Building2 className="size-3" /> {review.role} / {review.company}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <ReviewCrudModal 
                    isOpen={isModalOpen} 
                    onOpenChange={setIsModalOpen} 
                    initialData={editingReview} 
                />
                {/* Delete Confirmation Modal */}
                {deleteModalOpen && (
                    <Dialog open={deleteModalOpen} onOpenChange={closeDeleteModal}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{tDelete("confirmDelete")}</DialogTitle>
                            </DialogHeader>
                            <p>{tDelete("areYouSure")}</p>
                            <DialogFooter>
                                <Button variant="outline" onClick={closeDeleteModal}>{tDelete("cancel")}</Button>
                                <Button variant="destructive" onClick={async () => {
                                    if (deletingReview && deletingReview._id) {
                                        await useReviewsStore.getState().deleteReview(deletingReview._id);
                                        await getReviews();
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