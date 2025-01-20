<template>
  <main class="w-full h-full flex flex-col items-center justify-center">
    <h1
      id="box-header"
      class="text-[16px] xl:text-[22px] mb-[20px] xl:mb-[22px]"
    >
      Box Width
    </h1>
    <section
      id="box-content"
      ref="sectionRef"
      class="w-[100px] h-[100px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[300px] text-[16px] md:text-[20px] xl:text-[24px] text-blue-500 md:text-red-500 xl:text-green-600 text-center leading-[100px] md:leading-[200px] xl:leading-[300px] border border-[#333]"
      data-aos="fade-up"
      data-aos-offset="0"
      data-aos-duration="1500"
      data-aos-delay="300"
      data-aos-once="true"
      @click="isShow = true"
    >
      {{ sectionWidth }}
    </section>

    <div id="box-content-inner" v-show="isShow">这是需要点击才能显示的内容</div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { driver } from "driver.js";
import { useRenderDriver } from "~/composables/useRenderDriver";

const isShow = ref(false);

const driverObj = driver({
  popoverClass: "fox-theme",
  stagePadding: 0,
  allowClose: false,
  showProgress: false,
  showButtons: ['next'],
  nextBtnText: "下一步", 
  doneBtnText: "完成",
  onPopoverRender: (popover, { config, state }) => {
    useRenderDriver(popover, {
      onClose: () => {
        driverObj.destroy();
      }
    })
  },
  
  steps: [
    {
      element: "#box-header",
      popover: {
        title:
          "在“创作大纲”中生成的世界观设定、故事梗概存放在这里，可以随时查看和编辑",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: "#box-content",
      popover: { title: "这是个盒子", side: "bottom", align: "center" },
      onDeselected: () => {
        isShow.value = true;
      },
    },
    {
      element: "#box-content-inner",
      popover: {
        title: "这是个隐藏的盒子内容",
        description: "这是个隐藏的盒子内容",
      },
    },
  ],
});

onMounted(() => {
  driverObj.drive();
});

const sectionWidth = ref(0);
const sectionRef = ref();

onMounted(() => {
  sectionWidth.value = sectionRef.value.getBoundingClientRect().width;
  window.addEventListener("resize", () => {
    sectionWidth.value = sectionRef.value.getBoundingClientRect().width;
  });
});
</script>
 