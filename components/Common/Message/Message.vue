<template>
  <Transition name="down">
    <div
      v-if="isShow"
      class="fixed left-1/2 top-20 z-[99999] flex md:[8vw] h-[60px] -translate-x-1/2 items-center justify-center rounded-md bg-opacity-90 px-[3.20vw] md:px-[24px] py-0 text-center leading-[8vw] md:leading-[60px] shadow-md"
      :class="type"
      :style="style[type]"
    >
      <span class="text-[1.87vw] md:text-[14px] font-medium">{{ text }}</span>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import { Type } from "./useMessage";

const { type = Type.SUCCESS, duration = 2000 } = defineProps<{
  type?: Type;
  text: string;
  duration?: number;
}>();
const isShow = ref(false);

const style = {
  warning: {
    color: "#E6A23C",
    backgroundColor: "rgb(253, 246, 236)",
    borderColor: "rgb(250, 236, 216)",
  },
  error: {
    color: "#F56C6C",
    backgroundColor: "rgb(254, 240, 240)",
    borderColor: "rgb(253, 226, 226)",
  },
  success: {
    color: "#67C23A",
    backgroundColor: "rgb(240, 249, 235)",
    borderColor: "rgb(225, 243, 216)",
  },
};

onMounted(() => {
  isShow.value = true;

  setTimeout(() => {
    isShow.value = false;
  }, duration);
});
</script>

<style scoped>
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
.down-enter-active,
.down-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.down-enter-to,
.down-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
