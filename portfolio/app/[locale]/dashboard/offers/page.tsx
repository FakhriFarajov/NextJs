"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/dashboard/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Briefcase, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OfferDetailModal } from "@/components/dashboard/ui/modal-offers";

// Sample data mirroring your "Talk" form fields
const offers = [
    { 
        id: 1, 
        name: "Elon Musk", 
        email: "elon@tesla.com",
        company: "Tesla", 
        type: "Full-time", 
        status: "new", 
        date: "2h ago",
        message: "We need a lead developer for our new Mars interface project. Your GSAP skills are exactly what we are looking for. Let's talk ASAP."
    },
    { 
        id: 2, 
        name: "Mark Zuck", 
        email: "zuck@meta.com",
        company: "Meta", 
        type: "Freelance", 
        status: "interview", 
        date: "1d ago",
        message: "Building the metaverse requires high-performance dashboards. Can you help us optimize our Turbopack implementation?"
    }
];

export default function OffersPage() {
    const [selectedOffer, setSelectedOffer] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (offer: any) => {
        setSelectedOffer(offer);
        setIsModalOpen(true);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 px-4 border-b">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1 className="text-sm font-medium text-muted-foreground">Job Offers</h1>
                </header>

                <div className="flex flex-1 flex-col p-6 pt-4">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold tracking-tight">Incoming Opportunities</h2>
                        <p className="text-muted-foreground text-xs">Direct inquiries from your "Talk" form.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {offers.map((offer) => (
                            <div key={offer.id} className="group relative flex flex-col rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/5 text-primary">
                                            <Briefcase className="size-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold">{offer.name}</h3>
                                            <p className="text-[11px] text-muted-foreground">{offer.company}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter">
                                        {offer.type}
                                    </Badge>
                                </div>

                                <div className="mt-6 flex items-center gap-2">
                                    <StatusIndicator status={offer.status} />
                                    <span className="text-xs font-medium capitalize">{offer.status}</span>
                                    <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="size-3" /> {offer.date}
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <Button 
                                        onClick={() => handleViewDetails(offer)}
                                        className="w-full h-8 text-[11px] font-bold uppercase tracking-tight bg-primary text-primary-foreground hover:opacity-90"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The Modal */}
                <OfferDetailModal 
                    offer={selectedOffer} 
                    isOpen={isModalOpen} 
                    onOpenChange={setIsModalOpen} 
                />
            </SidebarInset>
        </SidebarProvider>
    );
}

function StatusIndicator({ status }: { status: string }) {
    if (status === "hired") return <CheckCircle2 className="size-4 text-emerald-500" />;
    if (status === "declined") return <XCircle className="size-4 text-destructive" />;
    return <div className="size-2 rounded-full bg-blue-500 animate-pulse" />;
}