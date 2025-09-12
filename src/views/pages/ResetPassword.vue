<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const resetPassword = ref({
    email: '',
    password: '',
    confirmPassword: ''
});

const isLoading = ref(false);

async function onResetPassword() {
    isLoading.value = true;
    try {
        const email = route.query.email;
        const otp = route.query.otp;

        //   const postResetPassword = await axios.post()

        setTimeout(() => {
            isLoading.value = false;
            router.push({
                name: 'login'
            });
        }, 1000);
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="flex justify-center md:items-center md:min-h-[100vh] animate-fade-right">
        <div class="card w-full max-w-[400px] md:max-w-[700px]">
            <div class="text-xl md:text-2xl font-semibold mb-8">เปลี่ยนรหัสผ่าน</div>

            <form @submit.prevent="onResetPassword()" class="">
                <div class="grid grid-cols-12 gap-y-8 md:gap-8">
                    <input type="text" name="username" autocomplete="username" style="display: none" readonly />
                    <FloatLabel class="col-span-12 md:col-span-6">
                        <Password id="password" class="w-full" :input-style="{ width: '100%' }" v-model="resetPassword.password" toggleMask :input-props="{ autocomplete: 'new-password' }" />
                        <label for="password">Password</label>
                    </FloatLabel>
                    <div class="col-span-12 md:col-span-6">
                        <FloatLabel>
                            <Password id="confirmPassword" class="w-full" :input-style="{ width: '100%' }" v-model="resetPassword.confirmPassword" toggleMask :input-props="{ autocomplete: 'new-password' }" />
                            <label for="confirmPassword">Confirm Password</label>
                        </FloatLabel>
                    </div>
                </div>
                <div class="flex justify-center mt-8">
                    <Button :disabled="isLoading" type="submit" class="submit-button w-full md:w-fit font-semibold">ยืนยัน</Button>
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
