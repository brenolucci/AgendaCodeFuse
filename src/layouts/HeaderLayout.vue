<script setup>
import CustomHeader from '@/components/CustomHeader.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <CustomHeader class="pb-20"/>
    <RouterView />
</template>