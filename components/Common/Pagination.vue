<template>
  <div class="flex items-center">
    <div
      class="shrink-0 w-[9px] h-[15px] cursor-pointer rotate-180"
      @click="handlePagePrev"
    >
      <SvgArrowsLeft class="fill-[#808080]"></SvgArrowsLeft>
    </div>

    <ul class="flex-1 px-[46px] flex items-center justify-center">
      <li
        v-for="num in paginationCount"
        :key="num"
        class="text-[18px] p-1 hover:text-[#3370FF] font-oPPOSansRFont w-[28px] h-[28px] flex items-center justify-center mr-[30px] last:mr-0 cursor-pointer"
        :class="{
          'text-[#3370FF]': currentPage == num,
        }"
        @click="handleSwitchPage(num)"
      >
        {{ num }}
      </li>
    </ul>

    <div
      class="shrink-0 w-[9px] h-[15px] cursor-pointer"
      @click="handlePageNext"
    >
      <SvgArrowsLeft class="fill-[#808080]"></SvgArrowsLeft>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  paginationCount: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:currentPage"]);

function handleSwitchPage(num: number) {
  emit("update:currentPage", num);
}

function handlePagePrev() {
  if (props.currentPage === 1) return;
  let num = props.currentPage;
  emit("update:currentPage", num - 1);
}
function handlePageNext() {
  if (props.currentPage === props.paginationCount) return;
  let num = props.currentPage;
  emit("update:currentPage", num + 1);
}
</script>
