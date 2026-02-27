"use client";

import * as React from "react";
import gsap from "gsap";
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const statuses = [
    { key: 'new', label: 'New' },
    { key: 'interview', label: 'Interview' },
    { key: 'declined', label: 'Declined' },
    { key: 'hired', label: 'Hired' },
];

export function OfferDetailModal({ offer, isOpen, onOpenChange }: any) {
    const [selected, setSelected] = React.useState('new');
    const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const indicatorRef = React.useRef<HTMLDivElement | null>(null);

    // Sync internal status with offer status when modal opens
    React.useEffect(() => {
        if (offer) setSelected(offer.status);
    }, [offer]);

    React.useLayoutEffect(() => {
        if (!isOpen) return;
        const index = statuses.findIndex(s => s.key === selected);
        const activeBtn = buttonRefs.current[index];
        if (!activeBtn || !indicatorRef.current) return;

        const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeBtn;

        gsap.to(indicatorRef.current, {
            x: offsetLeft,
            y: offsetTop,
            width: offsetWidth,
            height: offsetHeight,
            duration: 0.4,
            ease: "power2.out",
        });
    }, [selected, isOpen]);

    if (!offer) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl border-none bg-card shadow-2xl">
                <DialogHeader className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Job Proposal</span>
                    <DialogTitle className="text-2xl font-bold">{offer.name}</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground font-medium">
                        Sent from {offer.company} • {offer.email}
                    </DialogDescription>
                </DialogHeader>

                <div className="my-4">
                    <div className="relative flex gap-1 bg-muted/50 rounded-full p-1 border border-border/50">
                        <div ref={indicatorRef} className="absolute top-0 left-0 bg-background shadow-sm rounded-full pointer-events-none" />
                        {statuses.map((s, idx) => (
                            <button
                                key={s.key}
                                ref={el => { buttonRefs.current[idx] = el; }}
                                onClick={() => setSelected(s.key)}
                                className="relative z-10 flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
                            >
                                <span className={selected === s.key ? 'text-foreground' : 'text-muted-foreground'}>
                                    {s.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 py-2">
                    <div className="rounded-2xl bg-muted/30 p-5 border border-dashed border-primary/20">
                        <Label className="text-[10px] uppercase font-bold text-primary tracking-tighter mb-2 block">Client Message</Label>
                        <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                            "{offer.message}"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 px-2">
                        <div className="space-y-1">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Preferred Engagement</Label>
                            <p className="text-sm font-semibold">{offer.type}</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">Received On</Label>
                            <p className="text-sm font-semibold">{offer.date}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <DialogFooter className="flex gap-2 sm:justify-between pt-2">
                    <Button variant="ghost" className="text-destructive hover:bg-destructive/10 text-xs font-bold uppercase" onClick={() => onOpenChange(false)}>
                        Archive
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-xs font-bold uppercase" onClick={() => window.location.href = `mailto:${offer.email}`}>
                            Reply via Mail
                        </Button>
                        <Button className="text-xs font-bold uppercase px-8">
                            Update Status
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}