import { create } from "zustand";
import { getStats } from "../service/api.stats";
import { DashboardStats } from "../types/stats";

interface StatsState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  getStats: () => Promise<void>;
}

export const useStatsStore = create<StatsState>((set) => ({
  stats: null,
  loading: false,
  error: null,
  getStats: async () => {
    set({ loading: true, error: null });
    try {
      const stats = await getStats();
      console.log("Fetched stats:", stats);
      set({ stats, loading: false });
    } catch (e: any) {
      set({ error: e?.message || "Failed to fetch stats", loading: false });
    }
  }
}));
