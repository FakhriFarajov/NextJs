"use client";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useOffersStore } from "../offers/store/use-offers";
import { useState } from "react";

export function OfferDetailModal({ offer, isOpen, onOpenChange, jobTypes }: any) {
    const t = useTranslations();
    const { updateOffer, deleteOffer, getOffers } = useOffersStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    if (!offer) return null;

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteOffer(offer._id);
            await getOffers();
            onOpenChange(false);
        } catch (e: any) {
            setError(e?.message || "Delete failed");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        setError(null);
        try {
            await updateOffer(offer._id, offer);
            await getOffers();
            onOpenChange(false);
        } catch (e: any) {
            setError(e?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl border-none bg-card shadow-2xl">
                <DialogHeader className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{t("dashboard.modalOffers.jobProposal")}</span>
                    <DialogTitle className="text-2xl font-bold">{offer.name}</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground font-medium">
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    <div className="rounded-2xl bg-muted/30 p-5 border border-dashed border-primary/20">
                        <Label className="text-[10px] uppercase font-bold text-primary tracking-tighter mb-2 block">{t("dashboard.modalOffers.clientMessage")}</Label>
                        <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                            "{offer.message}"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 px-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("dashboard.modalOffers.jobType")}</Label>
                            <p className="text-sm font-semibold">
                                <span className="inline-block rounded bg-primary/10 px-2 py-1 text-primary text-xs font-bold uppercase">{offer.jobType}</span>
                            </p>
                        </div>
                        <div className="space-y-1 text-right">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("dashboard.modalOffers.receivedOn")}</Label>
                            <p className="text-sm font-semibold">{new Date(offer.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="px-2">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("dashboard.modalOffers.updatedOn")}</Label>
                        <p className="text-sm font-semibold">{new Date(offer.updatedAt).toLocaleString()}</p>
                    </div>
                    {error && <div className="text-destructive text-xs font-bold px-2">{error}</div>}
                </div>

                <Separator />

            </DialogContent>
        </Dialog>
    );
}