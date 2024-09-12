<template>
  <footer class="w-full">
    <section
      class="w-full xl:h-[187px] bg-[#3370FF] px-[5.33vw] py-[6.4vw] xl:py-0 xl:pl-[310px] xl:pr-[308px]"
    >
      <div
        class="pb-[2.13vw] xl:pt-[52px] xl:pb-[19px] flex items-center justify-between border-b border-white border-solid"
      >
        <div
          class="hidden xl:flex xl:w-[140px] xl:h-[33px] cursor-pointer items-center"
        >
          <img class="w-full h-full" src="/chicken.svg" alt="logo" />
          <span
            class="xl:text-[18px] font-oPPOSansMFont text-nowrap text-white xl:ml-[4px]"
          >
            今天吃什么呢
          </span>
        </div>

        <div class="flex items-center">
          <span
            class="text-[3.73vw] leading-[4.8vw] xl:leading-[0px] mr-[3.73vw] xl:mr-0 font-oPPOSansMFont xl:font-oPPOSansRFont xl:text-[14px] text-white xl:pr-[19px]"
          >
            民以食为天
          </span>
          <div class="grid grid-cols-4 gap-x-[3.2vw] xl:gap-x-[15px]">
            <div v-for="(item, index) in contactIcons" :key="index">
              <NuxtLink :to="item.href" external target="_blank">
                <div
                  class="w-[8vw] h-[8vw] xl:w-[34px] xl:h-[34px] flex items-center justify-center bg-transparent border border-white rounded-[1.6vw] xl:rounded-[6px] hover:bg-white group transition-all duration-300 ease-in"
                >
                  <!-- 抖音 -->
                  <SvgFooterIcon1
                    v-if="item.key == 1"
                    class="w-[4.53vw] h-[5.33vw] xl:w-[17px] xl:h-[20px] fill-white group-hover:fill-[#3370FF] transition-all duration-300 ease-in"
                  ></SvgFooterIcon1>

                  <!-- 微博 -->
                  <SvgFooterIcon2
                    v-if="item.key == 2"
                    class="w-[6.67vw] h-[5.33vw] xl:w-[25px] xl:h-[20px] fill-white group-hover:fill-[#3370FF] transition-all duration-300 ease-in"
                  ></SvgFooterIcon2>

                  <!-- 微信 -->
                  <SvgFooterIcon3
                    v-if="item.key == 3"
                    class="w-[6.67vw] h-[5.33vw] xl:w-[25px] xl:h-[20px] fill-white group-hover:fill-[#3370FF] transition-all duration-300 ease-in"
                  ></SvgFooterIcon3>

                  <!-- 小红书 -->
                  <SvgFooterIcon4
                    v-if="item.key == 4"
                    class="w-[6.93vw] h-[2.40vw] xl:w-[26px] xl:h-[9px] fill-white group-hover:fill-[#3370FF] transition-all duration-300 ease-in"
                  ></SvgFooterIcon4>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div
        class="pt-[2.66vw] xl:pt-[16px] flex flex-col xl:flex-row xl:items-center xl:justify-between font-oPPOSansRFont text-[2.4vw] xl:text-[14px] text-white"
      >
        <span class="mb-[1.6vw] xl:mb-0">
          版块所有© 宇宙科技无限公司 保留一切权利。宇ICP备20240527号-6
        </span>
        <span>如需风花雪月，可以发送邮件至zuoguguji@gmail.com</span>
      </div>
    </section>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const contactIcons = ref([
  {
    key: 1,
    href: "",
  },
  {
    key: 2,
    href: "",
  },
  {
    key: 3,
    href: "",
  },
  {
    key: 4,
    href: "",
  },
]);
</script>
