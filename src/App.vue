<script setup>
import { useToast } from 'primevue/usetoast';
import { setErrorHandler } from './service/apiService';

const toast = useToast();
setErrorHandler((msg) => {
    toast.add({
        severity: 'error',
        summary: 'เกิดข้อผิดพลาด',
        detail: msg,
        life: 3000
    });
});
</script>

<template>
    <router-view />
</template>

<style scoped></style>
