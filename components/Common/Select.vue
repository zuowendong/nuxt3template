<template>
  <div class="relative">
    <div
      class="w-[44vw] h-[8.53vw] md:w-[222px] md:h-[40px] bg-white md:bg-transparent border border-[#ccc] rounded-[5.33vw] md:rounded-[20px] px-[3.73vw] md:px-[17px] flex items-center justify-between"
      @click="handleSelected"
    >
      <span
        class="text-[3.73vw] md:text-[16px] text-[#4D4D4D] font-oPPOSansRFont"
      >
        {{ selectValueName }}
      </span>

      <div class="w-[3.47vw] h-[2.13vw] md:w-[17px] md:h-[17px]">
        <SvgArrowsLeft
          v-if="isShowBox"
          class="fill-[#4D4D4D] -rotate-90"
        ></SvgArrowsLeft>
        <SvgArrowsLeft v-else class="fill-[#4D4D4D] rotate-90"></SvgArrowsLeft>
      </div>
    </div>
    <div class="hidden md:block">
      <ul
        ref="OptionBoxRef"
        v-if="isShowBox"
        class="absolute top-[40px] left-0 w-[222px] rounded-[10px] bg-white shadow py-[20px] max-h-[200px] overflow-auto"
      >
        <li
          v-for="(item, index) in list"
          :key="index"
          class="w-full h-[32px] text-[14px] leading-[32px] pl-[20px] hover:text-white hover:bg-[#3370FF]"
          :class="{
            'text-white bg-[#3370FF]': item.value == value,
            'text-black bg-white': item.value != value,
          }"
          @click="handleChoose(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  list: {
    type: Array<any>,
    default: () => [],
  },
});

const emit = defineEmits(["update:value", "change"]);

const isShowBox = ref(false);
const OptionBoxRef = ref();

onClickOutside(OptionBoxRef, (event) => {
  isShowBox.value = false;
});

const selectValueName = computed(() => {
  const index = props.list.findIndex((item) => item.value == props.value);
  return index !== -1 ? props.list[index].label : "请选择";
});

function handleSelected() {
  isShowBox.value = true;
}
function handleChoose(data) {
  if (data.value == props.value) return;

  isShowBox.value = false;
  emit("update:value", data.value);
  emit("change");
}
</script>

<style scoped></style>
