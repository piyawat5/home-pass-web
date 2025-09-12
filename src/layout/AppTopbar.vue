<script setup>
import { useLayout } from '@/layout/composables/layout';
import api from '@/service/apiService';
import { useAuthStore } from '@/stores/auth';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(false);
const confirm = useConfirm();
const toast = useToast();

onMounted(() => {
    authStore.loadAuth();
});

const confirmLogout = () => {
    confirm.require({
        message: 'คุณต้องการ Logout หรือไหม่',
        header: 'กรุณายืนยัน',
        icon: 'pi pi-sign-out',
        rejectProps: {
            label: 'ยกเลิก',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'ยืนยัน'
        },
        accept: () => {
            handleLogout();
        }
    });
};

async function handleLogout() {
    isLoading.value = true;
    try {
        await api.post('auth/logout');

        toast.add({ severity: 'success', summary: 'Success Message', detail: 'ท่านได้ทำการ Logout เรียบร้อย', life: 3000 });

        router.push({ name: 'login' });
        authStore.logout();
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="layout-topbar">
        <div class="font-bold text-2xl md:text-3xl">Home Pass</div>

        <div class="layout-topbar-actions">
            <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
            </button>
            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <template v-if="!authStore.user">
                        <Button severity="contrast" @click="router.push({ name: 'register' })" type="button" class="">
                            <i class="pi pi-user-plus"></i>
                            <span>สมัครสมาชิก</span>
                        </Button>
                        <Button severity="info" @click="router.push({ name: 'login' })" type="button" class="">
                            <i class="pi pi-sign-in"></i>
                            <span>เข้าสู่ระบบ</span>
                        </Button>
                    </template>
                    <template v-else>
                        <div class="flex gap-2 items-center">
                            <Button class="!bg-[#00000033]" style="border: 1px solid #ffffff33">
                                <i class="pi pi-user"></i>
                                <div>
                                    {{ authStore.user.firstName }}
                                </div>
                            </Button>
                            <Button @click="confirmLogout" class="">
                                <i class="pi pi-sign-out"></i>
                                <div class="">Logout</div>
                            </Button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <ConfirmDialog></ConfirmDialog>
</template>

<style lang="scss" scoped>
.menu-button {
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border: 1px solid hsla(0, 0%, 88%, 0.25);
}
</style>
