export interface LocalizedReview {
    az: string;
    ru: string;
    en: string;
}

export interface Review {
    _id: string | null;
    name: string | null;
    surname: string | null;
    imageObjectName: string | null;
    company: string | null;
    role: string | null;
    review: LocalizedReview | null;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
}