<template>
  <header class="w-full sticky top-0 z-[100] shadow-sm">
    <div class="w-full h-[10.67vw] bg-white px-[5.33vw] relative">
      <div class="w-full h-full relative">
        <div class="absolute top-0 left-0 z-10 w-full h-full">
          <div class="w-full h-full flex items-center justify-between">
            <div
              class="shrink-0 w-[4.8vw] h-[2.93vw]"
              @click="handleShowMobileMenus"
            >
              <SvgClose v-if="showMobileMenus"></SvgClose>
              <SvgMobileMenu v-else></SvgMobileMenu>
            </div>
            <div v-if="!showMobileMenus" class="flex items-center">
              <NuxtLink to="/msearch" class="w-[3.73vw] h-[3.73vw] mr-[4.8vw]">
                <SvgSearch class="fill-[#666]"></SvgSearch>
              </NuxtLink>
              <NuxtLink to="/mall" class="w-[4vw] h-[4.53vw]">
                <SvgMall></SvgMall>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div
          class="absolute top-0 left-[50%] translate-x-[-50%] z-20 h-full flex items-center justify-center"
        >
          <NuxtLink to="/" z>
            <div class="w-[140px] h-[33px] cursor-pointer flex items-center">
              <img class="w-full h-full" src="/chicken.svg" alt="logo" />
              <span class="text-[18px] font-oPPOSansMFont text-nowrap ml-[4px]">
                今天吃什么呢
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <ul
        class="w-full overflow-y-auto absolute top-[10.67vw] left-0 bg-[#EDEDED] px-[5.33vw] transition-all duration-500 ease-in-out"
        :class="{
          'h-0': !showMobileMenus,
          'h-screen': showMobileMenus,
        }"
      >
        <li
          v-for="(optItem, optIndex) in HEADER_OPTIONS_MOBILE"
          :key="optIndex"
          class="w-full border-b border-[#999] first:pt-[5.33vw]"
          @click="handleGotoPage(optItem)"
        >
          <div
            class="w-full h-auto leading-[13.14vw] flex items-center justify-between text-[3.2vw] text-black pr-[1.87vw]"
          >
            <NuxtLink :to="optItem.href">{{ optItem.name }}</NuxtLink>

            <div class="w-[1.87vw] h-[3.2vw]">
              <SvgArrowsLeft class="fill-[#B3B3B3]"></SvgArrowsLeft>
            </div>
          </div>
        </li>

        <li
          class="pt-[13.33vw] w-full flex items-center justify-center font-oPPOSansRFont"
        >
          <span class="text-[3.73vw] leading-[4.80vw] text-[#999999]">E</span>
          <span
            class="w-[1px] h-[3.47vw] mx-[1.33vw] bg-[#D8D8D8] border border-[#979797]"
          ></span>
          <span class="text-[3.73vw] leading-[4.80vw] text-[#3370FF]">中</span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { navigateTo } from "#imports";

const HEADER_OPTIONS_MOBILE = computed(() => {
  return [
    { name: "首页", key: "home", href: "/" },
    { name: "随机点餐", key: "order", href: "/order" },
    { name: "食物类目", key: "category", href: "" },
    { name: "关于项目", key: "about", href: "" },
    { name: "进展资讯", key: "news", href: "" },
    {
      name: "项目地址",
      key: "project",
      href: "https://github.com/zuowendong/nuxt3template",
    },
    {
      name: "作者信息",
      key: "author",
      href: "",
      subMenus: [
        { name: "Github", href: "https://github.com/zuowendong" },
        { name: "掘金", href: "https://juejin.cn/user/342703359942776" },
        { name: "微信", href: "" },
        {
          name: "小红书",
          href: "https://www.xiaohongshu.com/user/profile/65d339df000000000401d58a",
        },
        { name: "微博", href: "https://weibo.com/u/7587359111" },
      ],
    },
  ];
});

const showMobileMenus = ref(false);
function handleShowMobileMenus() {
  showMobileMenus.value = !showMobileMenus.value;
}

function handleGotoPage(data) {
  navigateTo(data.href);
  showMobileMenus.value = false;
}
</script>
