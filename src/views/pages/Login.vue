<script setup>
import api from '@/service/apiService';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const isInWebView = ref(false);
const userAgent = ref('');

const loginForm = ref({
    email: '',
    password: ''
});

const isLoading = ref(false);

// Google Login Handler
const handleGoogleLogin = async (response) => {
    isLoading.value = true;
    try {
        // response.credential จะเป็น JWT idToken
        const res = await api.post('auth/googleLogin', {
            idToken: response.credential
        });

        toast.add({ severity: 'success', summary: 'Success Message', detail: 'login สำเร็จ', life: 3000 });
        authStore.setAuth(res.data.user, res.data.accessToken);

        isLoading.value = false;
        router.push({ name: 'dashboard' });
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

const handleLogin = async () => {
    isLoading.value = true;
    try {
        const res = await api.post('auth/login', { email: loginForm.value.email, password: loginForm.value.password });

        toast.add({ severity: 'success', summary: 'Success Message', detail: 'login สำเร็จ', life: 3000 });
        authStore.setAuth(res.data.user, res.data.accessToken);
        isLoading.value = false;
        router.push({ name: 'dashboard' });
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

const forgetPassword = () => {
    // TODO: reset password
    toast.add({
        severity: 'error',
        summary: 'กรุณาติดต่อ Admin',
        detail: 'ยังไม่สามารถใช้งาน reset password ได้ในขณะนี้',
        life: 5000
    });
    // router.push({ name: 'verifyOTP', query: { action: 'forgetPassword', email: loginForm.value.email } });
};

const loginGoogle = () => {
    window.location.href = 'https://family-sivarom.com/auth/google';
};

onMounted(() => {
    userAgent.value = navigator.userAgent;
    isInWebView.value = /Line|WebView|wv/.test(navigator.userAgent);
});

const openInBrowser = () => {
    const currentUrl = window.location.href;

    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        // iOS - ลองหลายวิธี
        window.location.href = currentUrl.replace(/^https?:\/\//, 'x-safari-https://');
        // window.location.href = `x-web-search://?${encodeURIComponent(currentUrl)}`;
    } else if (/Android/i.test(navigator.userAgent)) {
        // Android - ใช้ Intent
        const intent = `intent://${currentUrl.replace(/https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(currentUrl)};end`;
        window.location.href = intent;
    } else {
        // Fallback
        window.open(currentUrl, '_blank');
    }
};
</script>

<template>
    <div class="animate-fade-right flex mt-[100px] md:mt-0 justify-center md:items-center md:min-h-[100vh]">
        <div class="card w-full max-w-[400px]">
            <div class="text-xl md:text-2xl font-semibold mb-8">เข้าสู่ระบบ</div>

            <form @submit.prevent="handleLogin()" class="">
                <div class="grid grid-cols-12 gap-y-8 md:gap-8">
                    <div class="col-span-12">
                        <FloatLabel>
                            <InputText id="email" class="w-full" v-model="loginForm.email" autocomplete="email"></InputText>
                            <label for="email">Email</label>
                        </FloatLabel>
                    </div>
                    <div class="col-span-12">
                        <FloatLabel>
                            <Password toggleMask id="password" class="w-full" v-model="loginForm.password" :feedback="false" :input-style="{ width: '100%' }" :input-props="{ autocomplete: 'new-password' }" />

                            <label for="password">Password</label>
                        </FloatLabel>
                    </div>
                    <div class="col-span-12">
                        <Button :disabled="isLoading" type="submit" class="submit-button w-full font-semibold">เข้าสู่ระบบ</Button>
                        <div class="flex justify-end mt-1">
                            <div @click="forgetPassword" class="text-[blue] cursor-pointer">ลืมรหัสผ่าน?</div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="w-full flex justify-center mt-4">
                <!-- <button @click="loginGoogle" class="w-full">Login with Google</button> -->
                <!-- :auto-login="false" :one-tap="false" -->
                <button class="w-full" @click="openInBrowser" v-if="isInWebView" style="background: red; border-radius: 6px; color: white; padding: 10px">
                    <i class="pi pi-google ml-3"></i>
                    เปิด browser เพื่อลงชื่อเข้าใช้ด้วย GOOGLE
                </button>
                <GoogleLogin v-else ux_mode="popup" class="w-full" :callback="handleGoogleLogin" />
            </div>

            <!-- Debug info เพื่อดูก่อน -->
            <!-- <p>UserAgent: {{ userAgent }}</p>
            <p>Is WebView: {{ isInWebView }}</p> -->

            <!-- ปุ่มที่จะแสดงเฉพาะใน WebView -->
            <!-- <button @click="openInBrowser" v-if="isInWebView" style="background: red; color: white; padding: 10px">WebView Button - คุณอยู่ใน WebView!</button> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.submit-button {
    background: linear-gradient(90deg, #ff6b6b 0%, #feca57 100%);
}
</style>
