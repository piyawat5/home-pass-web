// src/services/apiService.js
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.family-sivarom.com/',
    withCredentials: true // ส่ง cookie jid ไปด้วย (ใช้ตอน refresh)
});

let onError;

export function setErrorHandler(fn) {
    onError = fn;
}

// Interceptor: แนบ accessToken ทุก request
api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
});

// Interceptor: ถ้า accessToken หมดอายุ → ขอ refresh token
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (onError) {
            const msg = error.response?.data?.message || 'เกิดข้อผิดพลาด';
            onError(msg);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // ยิง refresh → backend จะอ่าน cookie.jid เอง
                const res = await api.post('/auth/refresh');
                const authStore = useAuthStore();

                // เก็บ token ใหม่ใน store
                authStore.setAuth(authStore.user, res.data.accessToken);

                // ยิง API เดิมซ้ำ
                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return api(originalRequest);
            } catch (err) {
                // ถ้า refresh fail → logout
                const authStore = useAuthStore();
                authStore.logout();
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export default api;
