import { Review } from "../types/reviews";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

const reviewsAPI = {
    getAllReviews: async () => {
        const response = await api.get("/");
        return response.data;
    },
    getReviewById: async (id: string) => {
        const response = await api.get(`/${id}`);
        return response.data;
    },
    createReview: async (review: Review) => {
        const response = await api.post("/", review);
        return response.data;
    },
    updateReview: async (id: string, review: Review) => {
        const response = await api.put(`/${id}`, review);
        return response.data;
    },
    deleteReview: async (id: string) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};

export default reviewsAPI;