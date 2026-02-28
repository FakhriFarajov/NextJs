"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useReviewsStore } from "../reviews/store/use-reviews";

export function ReviewCrudModal({ isOpen, onOpenChange, initialData }: any) {
    const t = useTranslations("dashboard.modalReviews");
    const { createReview, updateReview, getReviews } = useReviewsStore();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setSurname(initialData.surname || "");
            setEmail(initialData.email || "");
            setRole(initialData.role || "");
            setCompany(initialData.company || "");
            setDescription(initialData.description || "");
            setProfileImage(initialData.profileImage || "");
        } else {
            setName("");
            setSurname("");
            setEmail("");
            setRole("");
            setCompany("");
            setDescription("");
            setProfileImage("");
        }
    }, [initialData]);

    const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const removeProfileImage = () => {
        setProfileImage("");
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const reviewData = {
            name,
            surname,
            email,
            role,
            company,
            imageObjectName: profileImage,
            review: { en: description, ru: description, az: description }, // You may want to localize this
            createdAt: initialData?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            _id: initialData?._id || null
        };
        try {
            if (initialData && initialData._id) {
                await updateReview(initialData._id, reviewData);
            } else {
                await createReview(reviewData);
            }
            await getReviews();
            onOpenChange(false);
        } catch (e: any) {
            setError(e?.message || "Save failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl sm:rounded-2xl">
                <DialogHeader>
                    <DialogTitle>{initialData ? t("editTitle") : t("addTitle")}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSave}>
                <div className="grid gap-6 py-4">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t("fields.profilePicture")}</Label>
                        <div className="relative group">
                            <div className="size-20 rounded-full border-2 border-dashed border-muted-foreground/20 flex items-center justify-center overflow-hidden bg-muted/30">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
                                ) : (
                                    <ImagePlus className="size-6 text-muted-foreground" />
                                )}
                                <input type="file" accept="image/*" className="hidden" id="profile-upload" onChange={handleProfileImageUpload} />
                            </div>
                            {profileImage ? (
                                <button className="absolute -bottom-1 -right-1 bg-destructive text-white rounded-full p-1.5 shadow-lg" onClick={removeProfileImage}>
                                    <Plus className="size-3 rotate-45" />
                                </button>
                            ) : (
                                <label htmlFor="profile-upload" className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg cursor-pointer">
                                    <Plus className="size-3" />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Name & Surname */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t("fields.name")}</Label>
                            <Input id="name" placeholder={t("placeholders.name")}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="bg-muted/30" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="surname">{t("fields.surname")}</Label>
                            <Input id="surname" placeholder={t("placeholders.surname")}
                                value={surname}
                                onChange={e => setSurname(e.target.value)}
                                className="bg-muted/30" />
                        </div>
                    </div>

                    {/* Email & Role */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("fields.email")}</Label>
                            <Input id="email" type="email" placeholder={t("placeholders.email")}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="bg-muted/30" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">{t("fields.role")}</Label>
                            <Input id="role" placeholder={t("placeholders.role")}
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                className="bg-muted/30" />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                        <Label htmlFor="company">{t("fields.company")}</Label>
                        <Input id="company" placeholder={t("placeholders.company")}
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            className="bg-muted/30" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="desc">{t("fields.description")}</Label>
                        <Textarea 
                            id="desc" 
                            placeholder={t("placeholders.description")}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="min-h-[120px] bg-muted/30 resize-none" 
                        />
                    </div>
                </div>
                {error && <div className="text-destructive text-xs font-bold px-2">{error}</div>}
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>{t("actions.cancel")}</Button>
                    <Button className="px-8 font-bold uppercase tracking-tight text-xs" type="submit" disabled={loading}>
                        {initialData ? t("actions.update") : t("actions.save")}
                    </Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}