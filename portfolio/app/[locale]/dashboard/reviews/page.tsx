"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/ui/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Pencil, Trash2, User, Mail, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReviewCrudModal } from "@/components/dashboard/ui/modal-reviews";

export default function ReviewsManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<any>(null);

    const handleEdit = (review: any) => {
        setEditingReview(review);
        setIsModalOpen(true);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 px-4 border-b">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-sm font-medium">Review Management</h1>
                </header>

                <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold">Client Reviews</h2>
                            <p className="text-xs text-muted-foreground">Manage testimonials shown on your portfolio.</p>
                        </div>
                        <Button size="sm" className="gap-2" onClick={() => { setEditingReview(null); setIsModalOpen(true); }}>
                            <Plus className="size-4" /> Add Review
                        </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="group relative rounded-xl border bg-card p-5 shadow-sm hover:border-primary/50 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <Avatar className="h-12 w-12 border">
                                        <AvatarImage src="" />
                                        <AvatarFallback><User className="size-6 text-muted-foreground" /></AvatarFallback>
                                    </Avatar>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="size-8" onClick={() => handleEdit({ id: i })}>
                                            <Pencil className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="size-8 text-destructive">
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold">Name Surname</h3>
                                    <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                                        <Building2 className="size-3" /> Role @ Company
                                    </p>
                                </div>

                                <p className="mt-4 text-xs italic text-muted-foreground line-clamp-3 leading-relaxed">
                                    "This is a sample description of the client's experience working with you..."
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <ReviewCrudModal 
                    isOpen={isModalOpen} 
                    onOpenChange={setIsModalOpen} 
                    initialData={editingReview} 
                />
            </SidebarInset>
        </SidebarProvider>
    )
}