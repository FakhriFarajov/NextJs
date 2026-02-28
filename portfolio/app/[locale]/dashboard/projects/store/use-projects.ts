import projectsAPI from '../service/api.projects';
import { Project } from '../types/projects';
import { create } from 'zustand';

interface ProjectsStore {
    projects: Project[];
    error: string | null;
    loading: boolean;
    getProjects: () => Promise<void>;
    getProjectById: (id: string) => Promise<void>;
    createProject: (project: Project) => Promise<void>;
    updateProject: (id: string, project: Project) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
    projects: [],
    error: null,
    loading: false,
    getProjects: async () => {
        set({ loading: true });
        try {
            const data = await projectsAPI.getAllProjects();
            console.log("Fetched projects:", data);
            set({ projects: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    getProjectById: async (id) => {
        set({ loading: true });
        try {
            const project = await projectsAPI.getProjectById(id);
            set({ projects: [project] });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    createProject: async (project: Project) => {
        set({ loading: true, error: null });
        try {
            const newProject = await projectsAPI.createProject(project);
            set((state) => ({ projects: [...state.projects, newProject] }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    updateProject: async (id, project) => {
        set({ loading: true });
        try {
            const updatedProject = await projectsAPI.updateProject(id, project);
            set((state) => ({ projects: state.projects.map(p => p._id === id ? updatedProject : p) }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    deleteProject: async (id) => {
        set({ loading: true });
        try {
            await projectsAPI.deleteProject(id);
            set((state) => ({ projects: state.projects.filter(p => p._id !== id) }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
}));