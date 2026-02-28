import { Offer } from "../types/offers";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/offers`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

const offersAPI = {
    getAllOffers: async () => {
        const response = await api.get("/");
        return response.data;
    },
    getOfferById: async (id: string) => {
        const response = await api.get(`/${id}`);
        return response.data;
    },
    createOffer: async (offer: Offer) => {
        const response = await api.post("/", offer);
        return response.data;
    },
    updateOffer: async (id: string, offer: Offer) => {
        const response = await api.put(`/${id}`, offer);
        return response.data;
    },
    deleteOffer: async (id: string) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};

export default offersAPI;