<template>
  <div class="h-full w-full">
    <div class="flex h-fit min-h-screen flex-col items-center relative">
      <NavbarPc class="hidden xl:block"></NavbarPc>
      <NavbarMobile class="xl:hidden"></NavbarMobile>

      <div class="flex w-full flex-1">
        <div class="mx-auto flex w-full flex-1">
          <slot></slot>
        </div>
      </div>
      <Footer />

      <ClientOnly>
        <div
          class="fixed right-[5.33vw] bottom-[20.27vw] xl:right-[52px] xl:bottom-[46px] z-10 cursor-pointer w-[7.73vw] h-[7.73vw] xl:w-[44px] xl:h-[44px]"
          @click="toTop"
        >
          <SvgBackTop />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const scrollTop = ref(0);

function toTop() {
  let timer = setInterval(() => {
    let isPeed = Math.floor(-scrollTop.value / 5);
    document.documentElement.scrollTop = document.body.scrollTop =
      scrollTop.value + isPeed;
    if (scrollTop.value === 0) {
      clearInterval(timer);
    }
  }, 16);
}
const showToTop = ref(false);
function scrollToTop() {
  let _scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  scrollTop.value = _scrollTop;
  if (scrollTop.value > 0) {
    showToTop.value = true;
  } else {
    showToTop.value = false;
  }
}

onMounted(() => {
  window.addEventListener("scroll", scrollToTop);
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollToTop);
});
</script>
