<script setup>
import { useAuthStore } from '@/stores/auth';
import api from '@/service/apiService';
import { onMounted, ref } from 'vue';
const authStore = useAuthStore();
const isLoading = ref(false);
const data = defineModel({
    required: false,
    default: {
        shortName: 'system',
        nameTh: 'system',
        nameEng: 'system',
        bgColor: '',
        borderColor: '',
        url: ''
    }
});

const accessSystem = async () => {
    isLoading.value = true;
    try {
        const res = await api.post('/access/system', {
            system: 'MA',
            user: authStore.user,
            apiKey: import.meta.env.VITE_API_KEY
        });
        if (res.status !== 200) {
            isLoading.value = false;
            return;
        }
        window.location.href = data.value.url + res.data.accessTokenSystem;
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

onMounted(() => {
    console.log(42);
});
</script>

<template>
    <div class="w-full rounded-xl p-2" :style="{ backgroundColor: data?.bgColor, border: `1px solid ${data?.borderColor}` }" @click="accessSystem">
        <div class="font-bold text-xl">
            {{ data.shortName }}
        </div>
        <div class="">
            {{ data.nameEng }}
        </div>
        <div class="">
            {{ data.nameTh }}
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
