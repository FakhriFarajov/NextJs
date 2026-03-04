import reviewsAPI from '../service/api.reviews';
import { Review } from '../types/reviews';
import { create } from 'zustand';

interface ReviewsStore {
    reviews: Review[];
    error: string | null;
    loading: boolean;
    getReviews: () => Promise<void>;
    getReviewById: (id: string) => Promise<void>;
    createReview: (review: Review) => Promise<void>;
    updateReview: (id: string, review: Review) => Promise<void>;
    deleteReview: (id: string) => Promise<void>;
}

export const useReviewsStore = create<ReviewsStore>((set) => ({
    reviews: [],
    error: null,
    loading: false,
    getReviews: async () => {
        set({ loading: true });
        try {
            const data = await reviewsAPI.getAllReviews();
            set({ reviews: data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    getReviewById: async (id) => {
        set({ loading: true });
        try {
            const review = await reviewsAPI.getReviewById(id);
            set({ reviews: [review] });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    createReview: async (review: Review) => {
        set({ loading: true, error: null });
        try {
            const newReview = await reviewsAPI.createReview(review);
            set((state) => ({ reviews: [...state.reviews, newReview] }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
            throw error;
        } finally {
            set({ loading: false });
        }
    },
    updateReview: async (id, review) => {
        set({ loading: true });
        try {
            const updatedReview = await reviewsAPI.updateReview(id, review);
            set((state) => ({ reviews: state.reviews.map(r => r._id === id ? updatedReview : r) }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
    deleteReview: async (id) => {
        set({ loading: true });
        try {
            await reviewsAPI.deleteReview(id);
            set((state) => ({ reviews: state.reviews.filter(r => r._id !== id) }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred', loading: false });
        } finally {
            set({ loading: false });
        }
    },
}));