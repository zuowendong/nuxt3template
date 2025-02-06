<template>
  <main class="w-full h-full flex flex-col items-center justify-center bg-primary">
    <h1 id="box-header" class="text-primary text-[16px] xl:text-[22px] mb-[20px] xl:mb-[22px]">
      Box Width
    </h1>

    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>


    <section id="box-content" ref="sectionRef"
      class="w-[100px] h-[100px] md:w-[200px] md:h-[200px] xl:w-[300px] xl:h-[300px] text-[16px] md:text-[20px] xl:text-[24px] text-primary border border-theme"
      data-aos="fade-up" data-aos-offset="0" data-aos-duration="1500" data-aos-delay="300" data-aos-once="true"
      @click="isShow = true">
      {{ sectionWidth }}
    </section>

    <div id="box-content-inner" v-show="isShow">这是需要点击才能显示的内容</div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { driver } from "driver.js";
import { useRenderDriver } from "~/composables/useRenderDriver";

const colorMode = useColorMode()

console.log(colorMode.preference)

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

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}

.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}

/* 添加主题相关的样式类 */
.text-primary {
  @apply text-gray-900 dark:text-white sepia:text-[#433422];
}

.bg-primary {
  @apply bg-white dark:bg-[#091a28] sepia:bg-[#f1e7d0];
}

.border-theme {
  @apply border-gray-200 dark:border-gray-700 sepia:border-[#433422];
}
</style>