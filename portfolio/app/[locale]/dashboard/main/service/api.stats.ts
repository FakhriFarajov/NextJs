import axios from "axios";
import { DashboardStats } from "../types/stats";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

export const getStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get("/dashboard");
  return {
    projectsCount: data.projects,
    offersCount: data.offers,
    reviewsCount: data.reviews,
  };
};
