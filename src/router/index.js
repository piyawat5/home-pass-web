import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'login',
                    component: () => import('@/views/pages/Login.vue')
                },
                {
                    path: '/auth/register',
                    name: 'register',
                    component: () => import('@/views/pages/Register.vue')
                },
                {
                    path: '/reset-password',
                    name: 'resetPassword',
                    component: () => import('@/views/pages/ResetPassword.vue')
                },
                {
                    path: '/verify-otp',
                    name: 'verifyOTP',
                    component: () => import('@/views/pages/VerifyOTP.vue')
                },
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/pages/Dashboard.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); // หรือวิธีตรวจสอบ auth ของคุณ

    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedIn = user && accessToken; // หรือ localStorage.getItem('token')

    // ถ้า user login แล้วและพยายามไป login page
    if ((to.name === 'login' || to.name === 'register' || to.name === 'resetPassword' || to.name === 'verfifyOTP') && isLoggedIn) {
        next({ name: 'dashboard' }); // redirect ไปหน้าหลัก
        return;
    }

    // ไม่ต้องทำ เพราะ apiService มีส่วนที่จัดการตรงนี้อยู่
    // if (to.meta.requiresAuth && !isLoggedIn) {
    //     next({ name: 'Login' });
    //     return;
    // }

    next(); // อนุญาตให้ผ่าน
});

export default router;
