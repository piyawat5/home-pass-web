<script setup>
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

const selectSystem = () => {
    // window.open(data.url);
};
</script>

<template>
    <div class="w-full rounded-xl p-2" :style="{ backgroundColor: data?.bgColor, border: `1px solid ${data?.borderColor}` }" @click="selectSystem">
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
