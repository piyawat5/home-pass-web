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
        shortName: 'APP',
        nameTh: 'ระบบอนุมัติรายการต่างๆภายในบ้าน',
        nameEng: 'Approve Online',
        bgColor: '#FFF4B4',
        borderColor: 'rgba(255, 191, 0, 0.3)',
        url: 'https://app.family-sivarom.com/bypasslogin/',
        delay: '200'
    },
    {
        shortName: 'MA',
        nameTh: 'ระบบแจ้งซ่อมบำรุง',
        nameEng: 'Maintenance System',
        bgColor: '#D4ECFF',
        borderColor: 'rgba(0, 106, 255, 0.3)',
        url: 'https://ma.family-sivarom.com/bypasslogin/',
        delay: '400'
    },
    {
        shortName: 'AC',
        nameTh: 'ระบบบันทึกกิจกรรม และแลกเปลี่ยนความบันเทิง',
        nameEng: 'Activity Management System',
        bgColor: '#FFC5B6',
        borderColor: 'rgba(255, 0, 0, 0.3)',
        url: 'https://ma.family-sivarom.com/bypasslogin/',
        delay: '600'
    },
    {
        shortName: 'FAC',
        nameTh: 'ระบบเงินกองกลาง',
        nameEng: 'Financial Accounting Center',
        bgColor: '#CEFFE7',
        borderColor: 'rgba(0, 246, 119, 0.3)',
        url: 'https://ma.family-sivarom.com/bypasslogin/',
        delay: '800'
    },
    {
        shortName: 'NEWS',
        nameTh: 'ระบบจัดการข่าวสาร และแจ้งเพื่อทราบ',
        nameEng: 'News Management System',
        bgColor: '#D6C3FF',
        borderColor: 'rgba(85, 0, 255, 0.3)',
        url: 'https://ma.family-sivarom.com/bypasslogin/',
        delay: '1000'
    },
    {
        shortName: 'INS',
        nameTh: 'ระบบติดตามของใช้ และจัดการเวรภายในบ้าน',
        nameEng: 'Inventory and Shift System',
        bgColor: '#FEBEF9',
        borderColor: 'rgba(255, 0, 246, 0.3)',
        url: 'https://ma.family-sivarom.com/bypasslogin/',
        delay: '1200'
    },
    {
        shortName: 'HMS',
        nameTh: 'ระบบติดตามสุขภาพ',
        nameEng: 'Healthy Management System',
        bgColor: '#BEFFB6',
        borderColor: 'rgba(22, 188, 0, 0.3)',
        url: 'https://ma.family-sivarom.com/bypasslogin/',
        delay: '1400'
    },
    {
        shortName: 'PET',
        nameTh: 'ระบบติดตามพัฒนาการสัตว์เลี้ยง',
        nameEng: 'Pet Management System',
        bgColor: '#DCDCDC',
        borderColor: '',
        url: 'https://ma.family-sivarom.com/bypasslogin/',
        delay: '1600'
    },
    {
        shortName: 'UNI',
        nameTh: 'ระบบวางแผนชีวิตน้องยูนีค',
        nameEng: 'N’Unique System',
        bgColor: '#FFD6B7',
        borderColor: 'rgba(255, 119, 0, 0.3)',
        url: 'https://ma.family-sivarom.com/bypasslogin/',
        delay: '1800'
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
        <div class="mt-8 grid grid-cols-12 gap-6">
            <SystemItem
                :style="{ animationDelay: `${system.delay}ms` }"
                v-for="(system, index) in systemList"
                :key="index"
                v-model="systemList[index]"
                :class="`animate-fade-up`"
                class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2"
            >
            </SystemItem>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
