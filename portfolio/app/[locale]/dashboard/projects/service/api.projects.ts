import { Project } from "../types/projects";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/projects`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// Converts a Blob to a base64 string (always prefixed with data:image/jpeg;base64)
const toBase64 = (file: Blob, type: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            let result = reader.result as string;
            // Use correct prefix for images/videos
            if (type === 'image') {
                if (result && !result.startsWith('data:image')) {
                    result = `data:image/png;base64,${result}`;
                }
            } else if (type === 'video') {
                if (result && !result.startsWith('data:video')) {
                    result = `data:video/mp4;base64,${result}`;
                }
            }
            resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const projectsAPI = {
    getAllProjects: async () => {
        const response = await api.get("");
        return response.data;
    },
    getProjectById: async (id: string) => {
        const response = await api.get(`/${id}`);
        return response.data;
    },
    createProject: async (project: Project) => {
        // Convert each image Blob or object URL to base64 if present
        if (project.images && Array.isArray(project.images)) {
            project.images = await Promise.all(project.images.map(async (img: any) => {
                if (img.src instanceof Blob) {
                    return {
                        ...img,
                        src: await toBase64(img.src, 'image')
                    };
                }
                if (typeof img.src === 'string' && img.src.startsWith('blob:')) {
                    const response = await fetch(img.src);
                    const blob = await response.blob();
                    return {
                        ...img,
                        src: await toBase64(blob, 'image')
                    };
                }
                return img;
            }));
        }
        // No video conversion needed, video is a string (URL)
        // No changes needed for githubURL and linkedIn
        const response = await api.post("/", project);
        return response.data;
    },
    updateProject: async (id: string, project: Project) => {
        // Convert each image Blob or object URL to base64 if present
        if (project.images && Array.isArray(project.images)) {
            project.images = await Promise.all(project.images.map(async (img: any) => {
                if (img.src instanceof Blob) {
                    return {
                        ...img,
                        src: await toBase64(img.src, 'image')
                    };
                }
                if (typeof img.src === 'string' && img.src.startsWith('blob:')) {
                    const response = await fetch(img.src);
                    const blob = await response.blob();
                    return {
                        ...img,
                        src: await toBase64(blob, 'image')
                    };
                }
                return img;
            }));
        }
        // No video conversion needed, video is a string (URL)
        // No changes needed for githubURL and linkedIn
        const response = await api.patch(`/${id}`, project);
        return response.data;
    },
    deleteProject: async (id: string) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};

export default projectsAPI;