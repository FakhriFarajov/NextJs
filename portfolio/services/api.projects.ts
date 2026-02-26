import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});


export const servicesAPI = {
  getProjects: async () => {
    const response = await api.get("/");
    return response.data;
  },
  getProjectById: async (id: string) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },
  createProject: async (projectData: any) => {
    const response = await api.post("/", projectData);
    return response.data;
  },
  updateProject: async (id: string, projectData: any) => {
    const response = await api.put(`/${id}`, projectData);
    return response.data;
  },
  deleteProject: async (id: string) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  }
};