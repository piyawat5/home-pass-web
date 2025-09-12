<script setup>
import api from '@/service/apiService';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const toast = useToast();

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);

const verifyOTPForm = ref({
    email: '',
    otp: ''
});

const isRegister = ref(true);

async function onSubmit() {
    isLoading.value = true;
    try {
        if (isRegister.value) {
            await api.post('auth/verifyOTP', verifyOTPForm.value);
            isLoading.value = false;
            router.push({ name: 'login' });
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
        } else {
            isLoading.value = false;
            router.push({
                name: 'resetPassword',
                query: {
                    email: verifyOTPForm.value.email,
                    otp: verifyOTPForm.value.otp
                }
            });
        }
    } catch (error) {
        isLoading.value = false;
        console.log(error);
    }
}

async function resendOTP() {
    isLoading.value = true;
    try {
        await api.post('auth/resendOTP', {
            email: verifyOTPForm.value.email
        });
        isLoading.value = false;
        router.push({
            name: 'verifyOTP',
            query: { action: 'register', email: registerForm.value.email }
        });
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
}

function checkAction() {
    let action = route.query.action;
    let email = route.query.email;
    if (email) {
        verifyOTPForm.value.email = email;
    }
    if (action && action === 'register') {
        isRegister.value = true;
    } else {
        isRegister.value = false;
    }
}

onMounted(() => {
    checkAction();
});
</script>

<template>
    <div class="flex justify-center md:items-center md:min-h-[100vh] animate-fade-right">
        <div class="card w-full max-w-[400px]">
            <div class="text-xl md:text-2xl font-semibold mb-8">{{ !isRegister ? 'รีเซ็ต Password ' : '' }}กรุณายืนยันตัวตนด้วย OTP</div>

            <div class="">ระบบได้ทำการส่งรหัส OTP ไปยัง Email ของท่านแล้ว กรุณาตรวจสอบ</div>

            <div class="text-[red]">*** หากไม่พบกรุณาดูใน Junk mail</div>

            <div class="flex justify-center mt-6">
                <InputOtp integerOnly v-model="verifyOTPForm.otp" :length="6" />
            </div>

            <button :disabled="isLoading" @click="resendOTP" class="cursor-pointer flex justify-center items-center gap-2 mt-5">
                <div class="">
                    <i class="pi pi-refresh" style="font-size: 2rem"></i>
                </div>
                <div class="">ขอรหัส OTP ใหม่</div>
            </button>

            <div class="flex justify-center mt-8">
                <Button :disabled="isLoading" @click="onSubmit" class="submit-button w-full md:w-fit font-semibold">ยืนยัน</Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.submit-button {
    background: linear-gradient(90deg, #ff6b6b 0%, #feca57 100%);
    border: none;
}
</style>
