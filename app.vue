<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNuxtApp } from "#app";

const { $aos } = useNuxtApp();
onMounted(() => {
  $aos().init({});
});
</script>
