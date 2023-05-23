import api from "@/services/Api.js";
import { defineStore } from "pinia";

export const useApiStore = defineStore({
    id: "api",
    state: () => ({
        user: null,
        notes: [],
        note: null,
        token: localStorage.getItem("token") || null,
        loggedIn: !!localStorage.getItem('token')
    }),
    actions: {
        async register(user) {
            try {
                const response = await api.register(user);
                return response;
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to register user");
            }
        },
        async login(credentials) {
            try {
                const response = await api.login(credentials);
                console.log(response)
                this.loggedIn = true;
                this.token = response.data.token;
                localStorage.setItem("token", response.data.token);
            } catch (error) {

                throw new Error(error.response?.data?.message || "Failed to login");
            }
        },
        async getUser() {
            try {
                const response = await api.getUser();
                this.user = response.data.user;
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to get user profile");
            }
        },
        async createNotes(note) {
            try {
                console.log(' await create note')
                const response = await api.createNotes(note);
                await this.getNotes();
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to create note");
            }
        },
        async getNotes() {
            try {
                const response = await api.getNotes();
                this.notes = response.data
                console.log(response)
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to get notes");
            }
        },
        async getNoteById(id) {
            try {
                const response = await api.getNoteById(id);
                this.note = response
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to get note");
            }
        },
        async updateNotes(id, note) {
            try {
                const response = await api.updateNoteById(id, note);
                return response
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to update note");
            }
        },
        async deleteNotes(id) {
            try {
                const response = await api.deleteNoteById(id);
                return response;
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to delete note");
            }
        },
        async logout() {
            try {
                // await api.logout();
                this.loggedIn = false;
                this.token = null;
                localStorage.removeItem("token");
                this.user = null;
                window.location.reload();
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to logout");
            }
        }
    }
});