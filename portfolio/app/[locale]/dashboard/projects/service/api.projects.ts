import { Project } from "../types/projects";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/projects`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

const projectsAPI = {
    getAllProjects: async () => {
        const response = await api.get("/");
        return response.data;
    },
    getProjectById: async (id: string) => {
        const response = await api.get(`/${id}`);
        return response.data;
    },
    createProject: async (project: Project) => {
        const response = await api.post("/", project);
        return response.data;
    },
    updateProject: async (id: string, project: Project) => {
        const response = await api.put(`/${id}`, project);
        return response.data;
    },
    deleteProject: async (id: string) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};

export default projectsAPI;