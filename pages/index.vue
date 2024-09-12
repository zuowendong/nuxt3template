<template>
  <main class="w-full h-full flex flex-col items-center justify-center">
    <h1 class="text-[16px] xl:text-[22px] mb-[20px] xl:mb-[22px]">Box Width</h1>
    <section
      ref="sectionRef"
      class="w-[100px] h-[100px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[300px] text-[16px] md:text-[20px] xl:text-[24px] text-blue-500 md:text-red-500 xl:text-green-600 text-center leading-[100px] md:leading-[200px] xl:leading-[300px] border border-[#333]"
      data-aos="fade-up"
      data-aos-offset="0"
      data-aos-duration="1500"
      data-aos-delay="300"
      data-aos-once="true"
    >
      {{ sectionWidth }}
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const sectionWidth = ref(0);
const sectionRef = ref();
onMounted(() => {
  sectionWidth.value = sectionRef.value.getBoundingClientRect().width;
  window.addEventListener("resize", () => {
    sectionWidth.value = sectionRef.value.getBoundingClientRect().width;
  });
});
</script>
