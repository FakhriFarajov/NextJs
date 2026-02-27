"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { Plus } from "lucide-react";

export function ReviewCrudModal({ isOpen, onOpenChange, initialData }: any) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl sm:rounded-2xl">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Review" : "Add New Review"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Profile Picture</Label>
                        <div className="relative group">
                            <div className="size-20 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center overflow-hidden bg-muted/30">
                                <ImagePlus className="size-6 text-muted-foreground" />
                                {/* Hidden Input would go here */}
                            </div>
                            <button className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                                <Plus className="size-3" />
                            </button>
                        </div>
                    </div>

                    {/* Name & Surname */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="John" className="bg-muted/30" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="surname">Surname</Label>
                            <Input id="surname" placeholder="Doe" className="bg-muted/30" />
                        </div>
                    </div>

                    {/* Email & Role */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" className="bg-muted/30" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" placeholder="CEO / Manager" className="bg-muted/30" />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Tech Solutions Inc." className="bg-muted/30" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="desc">Review Description</Label>
                        <Textarea 
                            id="desc" 
                            placeholder="Write the testimonial here..." 
                            className="min-h-[120px] bg-muted/30 resize-none" 
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button className="px-8 font-bold uppercase tracking-tight text-xs">
                        {initialData ? "Update Review" : "Save Review"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}