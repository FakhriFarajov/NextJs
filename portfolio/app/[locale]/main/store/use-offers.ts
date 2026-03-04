import offersAPI from '../service/api.offers';
import { Offer } from '../types/offers';
import { create } from 'zustand';

interface OffersStore {
    offers: Offer[];
    error: string | null;
    loading: boolean;
    getOffers: () => Promise<void>;
    getOfferById: (id: string) => Promise<void>;
    createOffer: (offer: Offer) => Promise<void>;
    updateOffer: (id: string, offer: Offer) => Promise<void>;
    deleteOffer: (id: string) => Promise<void>;
}

export const useOffersStore = create<OffersStore>((set) => ({
    offers: [],
    error: null,
    loading: false,
    getOffers: async () => {
        set({ loading: true });
        try {
            const data = await offersAPI.getAllOffers();
            set({ offers: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    getOfferById: async (id) => {
        set({ loading: true });
        try {
            const offer = await offersAPI.getOfferById(id);
            set({ offers: [offer] });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    createOffer: async (offer: Offer) => {
        set({ loading: true, error: null });
        try {
            const newOffer = await offersAPI.createOffer(offer);
            set((state) => ({ offers: [...state.offers, newOffer] }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    updateOffer: async (id, offer) => {
        set({ loading: true });
        try {
            const updatedOffer = await offersAPI.updateOffer(id, offer);
            set((state) => ({ offers: state.offers.map(o => o._id === id ? updatedOffer : o) }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    deleteOffer: async (id) => {
        set({ loading: true });
        try {
            await offersAPI.deleteOffer(id);
            set((state) => ({ offers: state.offers.filter(o => o._id !== id) }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
}));