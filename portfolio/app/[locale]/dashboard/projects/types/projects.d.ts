export interface LocalizedField {
    en: string;
    ru: string;
    az: string;
}

export interface ProjectImage {
    src: string;
    alt: string;
}

export interface Project {
    _id: string | null;
    titles: LocalizedField[];
    description: LocalizedField[];
    role: LocalizedField[];
    techStack: string[];
    images: ProjectImage[];
    video: string; // Cloudinary URL
    githubURL: string;
    linkedIn: string;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
}