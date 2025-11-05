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
            system: data.value.shortName,
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
</script>

<template>
    <div
        class="shadow-container w-full rounded-xl p-2 bg-[var(--bg-color)] dark:bg-[var(--bg-color-dark)]"
        :style="{
            '--bg-color': data?.bgColor,
            '--bg-color-dark': data?.borderColor
        }"
        @click="accessSystem"
    >
        <div class="flex gap-3 items-center">
            <img style="position: relative; top: -25px; left: -5px" width="60px" :src="`/demo/images/${data.shortName}.png`" alt="" />
            <div class="">
                <div class="flex gap-1 items-center">
                    <div class="font-bold text-xl">
                        {{ data.shortName }}
                    </div>
                    <div class="text-sm truncate w-[150px]">({{ data.nameEng }})</div>
                </div>
                <div class="text-sm">
                    {{ data.nameTh }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.shadow-container {
    box-shadow: 0.5px 2px 12px 0px rgba(0, 0, 0, 0.25);
}
</style>
