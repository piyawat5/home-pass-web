<script setup>
import api from '@/service/apiService';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const registerForm = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const isLoading = ref(false);

async function onRegister() {
    isLoading.value = true;
    try {
        const { confirmPassword, ...registerFormWithoutConfirmPass } = registerForm.value;
        await api.post('auth/sendOTP', registerFormWithoutConfirmPass);
        isLoading.value = false;
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'สมัครสมาชิกสำเร็จ', life: 3000 });
        router.push({
            name: 'verifyOTP',
            query: { action: 'register', email: registerForm.value.email }
        });
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="flex justify-center md:items-center mt-[100px] md:mt-0 md:min-h-[100vh] animate-fade-right">
        <div class="card w-full max-w-[400px] md:max-w-[700px]">
            <div class="text-xl md:text-2xl font-semibold mb-8">สมัครสมาชิก</div>

            <form @submit.prevent="onRegister()" class="">
                <div class="grid grid-cols-12 gap-y-8 md:gap-8">
                    <FloatLabel class="col-span-12 md:col-span-6">
                        <InputText autocomplete="given-name" autofocus id="firstName" class="w-full" v-model="registerForm.firstName" :placeholder="'ชื่อ'"></InputText>
                        <label for="firstName">ชื่อ</label>
                    </FloatLabel>
                    <div class="col-span-12 md:col-span-6">
                        <FloatLabel>
                            <InputText autocomplete="family-name" id="lastName" class="w-full" v-model="registerForm.lastName" :placeholder="'ชื่อ'"></InputText>
                            <label for="lastName">นามสกุล</label>
                        </FloatLabel>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <FloatLabel>
                            <InputText autocomplete="email" id="email" class="w-full" v-model="registerForm.email" :placeholder="'ชื่อ'"></InputText>
                            <label for="email">Email</label>
                        </FloatLabel>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <FloatLabel>
                            <Password id="password" class="w-full" :input-style="{ width: '100%' }" v-model="registerForm.password" toggleMask :input-props="{ autocomplete: 'new-password' }" />
                            <label for="password">Password</label>
                        </FloatLabel>
                    </div>
                    <div class="col-span-12 md:col-span-6">
                        <FloatLabel>
                            <Password id="confirmPassword" class="w-full" :input-style="{ width: '100%' }" v-model="registerForm.confirmPassword" toggleMask :input-props="{ autocomplete: 'new-password' }" />

                            <label for="confirmPassword">ยืนยัน Password</label>
                        </FloatLabel>
                    </div>
                </div>
                <div class="flex justify-center mt-8">
                    <Button :disabled="isLoading" type="submit" class="submit-button w-full md:w-fit font-semibold">สมัครสมาชิก</Button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.submit-button {
    background: linear-gradient(90deg, #ff6b6b 0%, #feca57 100%);
    border: none;
}
</style>
