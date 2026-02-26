"use client";

import * as React from "react";
import gsap from "gsap";
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const reviewTypes = [
    { key: 'google', label: 'Google' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'freelance', label: 'Upwork' },
    { key: 'personal', label: 'Direct' },
];

export function ReviewModal({ trigger }: { trigger: React.ReactNode }) {
    const [selected, setSelected] = React.useState(reviewTypes[0].key);
    const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const indicatorRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
        const index = reviewTypes.findIndex(r => r.key === selected);
        const activeBtn = buttonRefs.current[index];
        if (!activeBtn || !indicatorRef.current) return;

        const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeBtn;

        gsap.to(indicatorRef.current, {
            x: offsetLeft,
            y: offsetTop,
            width: offsetWidth,
            height: offsetHeight,
            duration: 0.5,
            ease: "expo.out",
        });
    }, [selected]);

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-md sm:rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center">New Review</DialogTitle>
                </DialogHeader>

                {/* GSAP Selector - Adapted for Modal */}
                <div className="flex justify-center w-full my-4">
                    <div className="relative flex gap-1 bg-muted rounded-xl p-1 border">
                        <div
                            ref={indicatorRef}
                            className="absolute top-0 left-0 bg-background shadow-sm rounded-lg pointer-events-none"
                            style={{ height: 0, width: 0 }}
                        />
                        {reviewTypes.map((type, idx) => (
                            <button
                                key={type.key}
                                ref={el => { buttonRefs.current[idx] = el; }}
                                onClick={() => setSelected(type.key)}
                                className="relative z-10 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
                            >
                                <span className={selected === type.key ? 'text-foreground' : 'text-muted-foreground'}>
                                    {type.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label className="text-[10px] uppercase font-bold tracking-widest opacity-70">Client Name</Label>
                        <Input placeholder="Enter name..." className="bg-muted/30" />
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-[10px] uppercase font-bold tracking-widest opacity-70">Role / Company</Label>
                        <Input placeholder="e.g. CEO at Microsoft" className="bg-muted/30" />
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-[10px] uppercase font-bold tracking-widest opacity-70">Review Content</Label>
                        <Textarea 
                            placeholder="What did they say about your work?" 
                            className="min-h-[120px] bg-muted/30 resize-none" 
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
                        <span className="text-xs font-medium">Rating Score</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className={`size-4 cursor-pointer ${s <= 5 ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button className="w-full bg-primary font-bold uppercase tracking-tighter text-xs h-10">
                        Publish Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}