<script setup>
import SystemItem from '@/components/SystemItem.vue';
import api from '@/service/apiService';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const isLoading = ref(false);
const systemList = ref([
    {
        shortName: 'MAI',
        nameTh: 'ระบบแจ้งซ่อมบำรุง และจัดการอะไหล่ภายในบ้าน',
        nameEng: 'Maintenance And Inventory Management',
        bgColor: '#D4ECFF',
        borderColor: '#83B7FF',
        url: 'https://www.google.com'
    }
]);

const checkVerify = async () => {
    isLoading.value = true;
    try {
        await api.post('auth/verify');
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

onMounted(() => {
    checkVerify();
});
</script>

<template>
    <div class="animate-fade-up card mt-[100px] min-h-[100vh]">
        <div class="font-bold text-xl">เลือกระบบ</div>
        <div class="mt-3 grid grid-cols-12">
            <SystemItem v-for="(system, index) in systemList" :key="index" v-model="systemList[index]" class="col-span-12 md:col-span-4"> </SystemItem>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
