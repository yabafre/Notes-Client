import axios from 'axios';

const API_BASE_URL = `https://notes-api-jfd5.onrender.com/api`;

axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.common['Accept'] = 'application/json';

const baseApi = axios.create({
    baseURL: API_BASE_URL,
});

const authApi = axios.create({
    baseURL: `${API_BASE_URL}/auth`,
});

const token = localStorage.getItem('token');

export default {
    async register(user) {
        try {
            const response = await authApi.post('/register', user);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to register user');
        }
    },
    async login(credentials) {
        try {
            const response = await authApi.post('/login', credentials);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to login');
        }
    },
    async logout() {
        try {
            const response = await authApi.post('/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to logout');
        }
    },
    async getUser() {
        try {
            const response = await authApi.get('/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get user profile');
        }
    },
    async createNotes(note) {
        try {
            console.log('api create note')
            const response = await baseApi.post('/notes', note, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create note');
        }
    },
    async getNotes() {
        try {
            const response = await baseApi.get('/notes', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get notes');
        }
    },
    async getNoteById(id) {
        try {
            const response = await baseApi.get(`/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get note');
        }
    },
    async updateNoteById(id, note) {
        try {
            const response = await baseApi.put(`/notes/${id}`, note, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
            throw new Error(error.response?.data?.message || 'Failed to update note');
        }
    },
    async deleteNoteById(id) {
        try {
            const response = await baseApi.delete(`/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete note');
        }
    }
}




