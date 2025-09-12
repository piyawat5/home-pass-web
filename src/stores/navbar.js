import { defineStore } from 'pinia';

export const useNavbarStore = defineStore('navbar', {
    // State
    state: () => ({
        isLogin: false
    }),

    // Getters (เหมือน computed properties)
    // getters: {
    //     notificationCount: (state) => state.notifications.length,
    //     userName: (state) => state.userInfo?.name || 'Guest',
    //     isDarkTheme: (state) => state.theme === 'dark'
    // },

    // Actions (methods สำหรับเปลี่ยน state)
    actions: {
        verificationLoginStatus(status) {
            if (status) {
                this.isLogin = true;
            } else {
                this.isLogin = false;
            }
        }
    }
});
