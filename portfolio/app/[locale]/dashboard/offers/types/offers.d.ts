export type JobType = 'full-time' | 'part-time' | 'freelance' | 'contract' | 'internships';

export interface Offer {
    _id: string | null;
    name: string | null;
    email: string | null;
    message: string | null;
    jobType: JobType | null;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
}