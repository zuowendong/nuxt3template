<template>
  <div class="relative w-full h-full">
    <swiper
      class="w-full h-full"
      :modules="modules"
      :slides-per-view="slidesViewNum"
      :space-between="spaceBetween"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
      :loop="isLoop"
      :direction="direction"
      :pagination="paginationData"
      @swiper="handleSwiper"
      @slideChange="handleSlideChange"
    >
      <swiper-slide v-for="(item, index) in slideList" :key="index">
        <slot name="swiper-slide" :item="item"></slot>
      </swiper-slide>
    </swiper>

    <div
      class="pagination-wrapper w-full absolute left-0 bottom-0 z-10"
      :ref="paginationWrapperRef"
    >
      <slot name="pagination" :currentPage="currentPage"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";

interface SwiperSlide {
  [k: string]: any;
}

const props = withDefaults(
  defineProps<{
    slideList: SwiperSlide[];
    isLoop?: boolean;
    isAutoplay?: boolean;
    slidesViewNum?: number;
    isVertical?: boolean;
    spaceBetween?: number;
  }>(),
  {
    isLoop: false,
    isAutoplay: false,
    slidesViewNum: 1,
    isVertical: false,
    spaceBetween: 0,
  }
);

const modules = computed(() => (props.isAutoplay ? [Autoplay] : []));

const direction = computed(() => {
  return props.isVertical ? "vertical" : "horizontal";
});

const paginationWrapperRef = ref<any>(null);
const paginationData = ref<any>({
  el: paginationWrapperRef.value,
  clickable: true,
  type: "custom",
});

const controlledSwiper = ref<any>(null);
function handleSwiper(swiper: any) {
  controlledSwiper.value = swiper;
}

const currentPage = ref(0);
function handleSlideChange(swiper: any) {
  currentPage.value = swiper.realIndex;
}

function handleChoosePage(index: number) {
  if (props.isLoop) {
    controlledSwiper.value.slideToLoop(index, 500, false);
  } else {
    controlledSwiper.value.slideTo(index, 500, false);
  }

  currentPage.value = index;
}

defineExpose({
  choose: handleChoosePage,
  currentPage,
});
</script>

<style scoped></style>
