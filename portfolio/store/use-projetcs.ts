import { create } from 'zustand';
import { servicesAPI } from '../services/api.projects';
import { Project } from '../types/project';

interface ProjectsStore {
    projects: Project[];
    loading: boolean;
    error: string | null;
    getProjects: () => Promise<void>;
    addProject: (projectData: Project) => Promise<void>;
    updateProject: (id: string, projectData: Project) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    getProjectById: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
    projects: [],
    loading: false,
    error: null,

    getProjects: async () => {
        set({ loading: true, error: null });
        try {
            const data = await servicesAPI.getProjects();
            set({ projects: data, loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch projects', loading: false });
        }
    },

    getProjectById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const data = await servicesAPI.getProjectById(id);
            set({ projects: [data], loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch project by ID', loading: false });
        }
    },

    addProject: async (projectData) => {
        set({ loading: true, error: null });
        try {
            await servicesAPI.createProject(projectData);
            await useProjectsStore.getState().getProjects();
            set({ loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to add project', loading: false });
        }
    },

    updateProject: async (id, projectData) => {
        set({ loading: true, error: null });
        try {
            await servicesAPI.updateProject(id, projectData);
            await useProjectsStore.getState().getProjects();
            set({ loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to update project', loading: false });
        }
    },

    deleteProject: async (id) => {
        set({ loading: true, error: null });
        try {
            await servicesAPI.deleteProject(id);
            await useProjectsStore.getState().getProjects();
            set({ loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to delete project', loading: false });
        }
    },

}));
