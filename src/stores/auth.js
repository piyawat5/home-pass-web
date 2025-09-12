import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const accessToken = ref(null);

    function setAuth(u, token) {
        user.value = u;
        accessToken.value = token;

        localStorage.setItem('user', JSON.stringify(u));
        localStorage.setItem('accessToken', token);
    }

    function loadAuth() {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('accessToken');
        if (savedUser && savedToken) {
            user.value = JSON.parse(savedUser);
            accessToken.value = savedToken;
        }
    }

    function logout() {
        user.value = null;
        accessToken.value = null;
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
    }

    return { user, accessToken, setAuth, loadAuth, logout };
});
