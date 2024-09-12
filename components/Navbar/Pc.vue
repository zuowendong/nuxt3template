<template>
  <header class="w-full sticky top-0 z-[100] shadow-sm">
    <div class="w-full xl:h-[76px] bg-white relative">
      <div class="w-full h-0 relative">
        <div
          class="absolute left-0 z-[1000] flex items-center xl:w-[140px] xl:h-[76px] xl:ml-[184px]"
        >
          <NuxtLink to="/">
            <div
              class="xl:w-[140px] xl:h-[33px] cursor-pointer flex items-center"
            >
              <img class="w-full h-full" src="/chicken.svg" alt="logo" />
              <span
                class="xl:text-[18px] font-oPPOSansMFont text-nowrap xl:ml-[4px]"
              >
                今天吃什么呢
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="h-full relative xl:px-[184px]">
        <div ref="NavRef" class="h-full relative xl:mx-[140px]">
          <nav class="hidden xl:block h-full xl:m-[0_85px_0_79px]">
            <ul
              class="font-oPPOSansMFont flex items-center justify-between h-full"
            >
              <li
                v-for="(optItem, optIndex) in HEADER_OPTIONS"
                :key="optIndex"
                class="xl:text-[18px] text-black h-full flex items-center"
                @mouseover="handleMouseoverMenu(optItem.subMenus)"
                @mouseout="(e) => handleMouseoutMenu(e, optItem.key)"
              >
                <NuxtLink
                  class="transition-all duration-300 hover:cursor-pointer hover:text-[#3370ff]"
                  :to="optItem.href"
                >
                  {{ optItem.name }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>

        <div
          ref="SubMenusRef"
          class="w-full flex items-center justify-center absolute xl:top-[76px] left-0"
          :class="{
            'xl:h-[60px] bg-white opacity-100 transition-all duration-300':
              isShowSubMenus,
            'h-0 transition-all duration-300': !isShowSubMenus,
          }"
          @mouseover="handleMouseoverSubmenu"
          @mouseout="handleMouseoutSubmenu"
        >
          <div
            v-for="(subMenu, index) in sub_options"
            :key="index"
            class="xl:text-[18px] xl:leading-[24px] text-[#999] font-oPPOSansRFont xl:px-[35px] border-r border-solid border-[#B3B3B3] last:border-r-0 hover:text-[#3370FF] hover:cursor-pointer transition-all duration-300"
            :class="{
              'opacity-100': isShowSubMenus,
              'opacity-0': !isShowSubMenus,
            }"
          >
            <NuxtLink :to="subMenu.href" external target="_blank">
              {{ subMenu.name }}
            </NuxtLink>
          </div>
        </div>

        <div
          ref="searchBoxRef"
          class="w-full bg-white absolute top-0 left-0 z-[999]"
          :class="{
            'xl:h-[566px] transition-all duration-700': isShowSearchBox,
            'h-0 transition-all duration-500': !isShowSearchBox,
          }"
        >
          <div
            class="w-full flex flex-col items-center justify-center"
            :class="{
              'xl:h-[76px]': isShowSearchBox,
              'h-0 transition-all duration-500': !isShowSearchBox,
            }"
          >
            <div
              class="xl:w-[660px] relative xl:inputBox xl:after:h-[2px] xl:after:absolute xl:after:bottom-[10px] xl:after:bg-[#ccc]"
              :class="{
                'after:w-full h-full opacity-100 transition-all duration-[0.5s] ease-in-out delay-200':
                  isShowSearchBox,
                'after:w-0 h-0 opacity-0 transition-all duration-200 ease-in-out':
                  !isShowSearchBox,
              }"
            >
              <input
                v-model="searchKeywords"
                type="text"
                :placeholder="searchPlaceholder"
                class="w-full h-full font-oPPOSansMFont focus:outline-0 xl:text-[14px] text-black placeholder:text-[#ccc] xl:leading-[18px] xl:pr-[50px] bg-white"
                @keyup.enter="handleSearch"
              />

              <div
                class="xl:mt-[38px] w-full font-oPPOSansMFont"
                :class="{
                  block: isShowSearchBox,
                  hidden: !isShowSearchBox,
                }"
              >
                <div
                  class="text-[#B3B3B3] xl:text-[12px] xl:leading-[13px] xl:mb-[8px]"
                >
                  大家都在搜
                </div>
                <div
                  v-for="(item, index) in searchItems"
                  :key="index"
                  class="xl:text-[14px] xl:leading-[28px] text-[#808080] hover:text-[#3370FF] duration-500 ease-in-out"
                >
                  <NuxtLink to="/search" @click="handleToSearch(item.name)">
                    {{ item.name }}</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-0 relative">
        <div
          ref="MallRef"
          class="absolute right-0 flex items-center xl:mr-[184px] xl:h-[76px] xl:top-[-76px]"
        >
          <div class="shrink-0 cursor-pointer xl:w-[23px] h-full relative">
            <div
              class="w-full h-full flex items-center absolute left-0 top-0 z-[1000]"
              :class="{
                'opacity-100 transition-[opacity] duration-500 ease-in-out delay-100':
                  isShowSearchBox,
                'opacity-0 transition-[opacity] duration-500 ease-in-out delay-100':
                  !isShowSearchBox,
              }"
              @click="isShowSearchBox = false"
            >
              <div class="xl:w-[20px] xl:h-[20px]">
                <SvgClose class="fill-[#666] hover:fill-[#3370ff]"></SvgClose>
              </div>
            </div>
            <div
              class="w-full h-full flex items-center absolute left-0 top-0 z-[1000]"
              :class="{
                'xl:translate-x-[-350px] transition-all duration-[0.6s] ease-in-out delay-100':
                  isShowSearchBox,
                'translate-x-0 transition-all duration-[0.6s] ease-in-out delay-100':
                  !isShowSearchBox,
              }"
              @click="isShowSearchBox = true"
            >
              <div class="xl:w-[23px] xl:h-[23px]">
                <SvgSearch class="fill-[#666] hover:fill-[#3370ff]"></SvgSearch>
              </div>
            </div>
          </div>

          <div
            class="bg-[#3370FF] flex items-center justify-center cursor-pointer xl:w-[76px] xl:h-[32px] xl:ml-[18px] xl:rounded-[16px]"
            @click="handleToMallPage"
          >
            <div class="shrink-0 h-full flex items-center justify-center">
              <div class="xl:w-[13px] xl:h-[15px]">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 13 15"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(-1590.000000, -30.000000)"
                      stroke="#FFFFFF"
                    >
                      <g transform="translate(1590.000000, 30.000000)">
                        <path
                          d="M6.5,0.5 C7.2504885,0.5 7.9366481,0.775526509 8.46271725,1.23106267 C8.9958661,1.69272934 9.3649395,2.33907667 9.46959952,3.07084142 C10.53441,3.50003021 11.0004959,3.64435383 11.3316123,3.90369382 C11.6491231,4.15237756 11.8316066,4.50597299 11.8569704,4.90479759 L11.8569704,4.90479759 L12.3657424,12.9047976 C12.3920318,13.318176 12.2482777,13.7030759 11.9946066,13.9912035 C11.7439312,14.2759284 11.3859197,14.4661532 10.9785934,14.4959754 L10.9785934,14.4959754 L2.12570079,14.5 C1.71148722,14.5 1.33648722,14.3321068 1.06504061,14.0606602 C0.796667462,13.792287 0.629516007,13.4226922 0.625765264,13.0140546 L0.625765264,13.0140546 L1.11641986,4.90868154 C1.14055728,4.51293498 1.31662072,4.1607646 1.58577031,3.90753085 C1.8549199,3.65429711 2.21715562,3.5 2.6136376,3.5 C3.38905469,2.39132589 3.88803441,1.6925953 4.52056883,1.20432296 C5.08714717,0.7669641 5.76197149,0.5 6.5,0.5 Z"
                        ></path>
                        <path
                          d="M10.3599947,3.5 C10.7557263,3.5 11.117412,3.65373251 11.386444,3.90619846 C11.6554759,4.15866441 11.831854,4.50986381 11.8569704,4.90479759 L11.8569704,4.90479759 L12.3657424,12.9047976 C12.3920318,13.318176 12.2482777,13.7030759 11.9946066,13.9912035 C11.7439312,14.2759284 11.3859197,14.4661532 10.9785934,14.4959754 L10.9785934,14.4959754 L2.12570079,14.5 C1.71148722,14.5 1.33648722,14.3321068 1.06504061,14.0606602 C0.796667462,13.792287 0.629516007,13.4226922 0.625765264,13.0140546 L0.625765264,13.0140546 L1.11641986,4.90868154 C1.14055728,4.51293498 1.31662072,4.1607646 1.58577031,3.90753085 C1.8549199,3.65429711 2.21715562,3.5 2.6136376,3.5 L2.6136376,3.5 Z"
                        ></path>
                        <path
                          d="M10,7.11294981 L10,7.5 C10,9.43299662 8.43299662,11 6.5,11 C4.56700338,11 3,9.43299662 3,7.5 L3,7.11294981 L3,7.11294981"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div class="shrink-0 h-full flex items-center xl:pl-[6px]">
              <span class="font-oPPOSansRFont text-white xl:text-[16px]">
                地图
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute top-0 xl:right-[100px] h-full flex items-center">
        <span class="font-oPPOSansRFont text-[#999] xl:text-[16px]"> 中 </span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import { navigateTo } from "#imports";
import { useRoute } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { useSearchStore } from "~/store/search";

interface Menu {
  name: string;
  key?: string;
  href: string;
  subMenus?: Menu[];
}

const searchStore = useSearchStore();

const HEADER_OPTIONS = computed(() => {
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

const sub_options = ref<Menu[]>([]);
const SubMenusRef = ref<HTMLElement>();
const isShowSubMenus = ref(false);
const searchBoxRef = ref(null);
const isShowSearchBox = ref(false);

onClickOutside(SubMenusRef, (event) => {
  isShowSubMenus.value = false;
});
onClickOutside(searchBoxRef, (event) => {
  isShowSearchBox.value = false;
});

const route = useRoute();

function handleToMallPage() {
  if (route.path !== "/mall") {
    navigateTo("/mall");
  }
}

function handleMouseoverMenu(menus) {
  if (menus) {
    sub_options.value = menus;
    isShowSubMenus.value = true;
  }
}

const NavRef = ref<HTMLElement>();
const MallRef = ref<HTMLElement>();

function handleMouseoutMenu(e, key) {
  const relatedTarget = e.relatedTarget;

  if (key === "about") {
    // 判断鼠标是否进入了子菜单
    if (!SubMenusRef.value?.contains(relatedTarget)) {
      isShowSubMenus.value = false;
    }
  }

  if (key === "mall") {
    if (
      !MallRef.value?.contains(relatedTarget) ||
      !NavRef.value?.contains(relatedTarget)
    ) {
      isShowSubMenus.value = false;
    }
  }
}

function handleMouseoverSubmenu() {
  isShowSubMenus.value = true;
}
function handleMouseoutSubmenu() {
  isShowSubMenus.value = false;
}

const searchItems = ref([
  { name: "黄焖鸡" },
  { name: "锅烧海参" },
  { name: "油爆肚仁儿" },
  { name: "锅烧猪蹄儿" },
  { name: "黄花鱼" },
  { name: "野鸡锅子" },
  { name: "炒蟹肉" },
  { name: "三鲜丸子" },
  { name: "烤肉" },
  { name: "水晶肘子" },
  { name: "五香羊肉" },
  { name: "三鲜鱼翅" },
  { name: "筒子鸡" },
  // { name: "线下商城" },
]);
const searchPlaceholder = ref("大家都在搜");
const intervalTimer = ref();
function setPlaceholder() {
  let i = 0;
  intervalTimer.value = setInterval(() => {
    if (i === searchItems.value.length) {
      i = 0;
    }
    searchPlaceholder.value = searchItems.value[i].name;
    i++;
  }, 3000);
}

watch(isShowSearchBox, (val) => {
  if (val) {
    setPlaceholder();
  } else {
    clearInterval(intervalTimer.value);
  }
});

onUnmounted(() => {
  clearInterval(intervalTimer.value);
});

const searchKeywords = ref("");
function handleSearch() {
  navigateTo("/search");
  searchStore.setSearchKeywords(searchKeywords.value);
  isShowSearchBox.value = false;
}
function handleToSearch(str: string) {
  searchStore.setSearchKeywords(str);
  isShowSearchBox.value = false;
}
</script>

<style scoped>
.inputBox::after {
  content: "";
  position: absolute;
  bottom: 10px;
  height: 2px;
  background-color: #cccccc;
  right: 0;
}
</style>
