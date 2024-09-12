<template>
  <div
    class="w-full bg-[#EDEDED] pt-[7.2vw] px-[5.33vw] pb-[10.67vw] md:pt-[102px] md:px-[312px] md:pb-[194px]"
  >
    <div
      class="w-full flex justify-center mb-[5.07vw] md:mb-[90px] px-[2.67vw] md:px-0"
    >
      <div
        class="w-full md:w-[674px] h-[9.6vw] md:-[54px] rounded-[4.8vw] md:rounded-[27px] bg-white pl-[10.4vw] px-[2.67vw] md:pl-[63px] md:pr-[22px] md:py-[16px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0,15)] flex items-center relative"
      >
        <div
          class="w-[4vw] md:w-[23px] absolute left-[3.73vw] md:left-[22px] h-full flex items-center"
        >
          <div class="w-[4vw] h-[4vw] md:w-[23px] md:h-[23px]">
            <SvgSearch class="fill-[#666]"></SvgSearch>
          </div>
        </div>
        <input
          v-model="productKeywords"
          type="text"
          placeholder=""
          class="w-full h-full focus:outline-0 text-[3.2vw] md:text-[14px] text-[#808080] font-oPPOSansMFont bg-white"
          @keyup.enter="handleSearch"
        />
        <div
          v-if="hasSearchProduct"
          class="w-[3.2vw] md:w-[20px] absolute right-[3.73vw] md:right-[22px] h-full flex items-center cursor-pointer"
          @click="handleCleanSearch"
        >
          <div class="w-[3.2vw] h-[3.2vw] md:w-[20px] md:h-[20px]">
            <SvgClose></SvgClose>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full pl-[18.13vw]">
      <div
        class="text-[#B3B3B3] text-[2.67vw] leading-[5.33vw] mb-[2.40vw] font-oPPOSansRFont"
      >
        大家都在搜
      </div>

      <ul>
        <li
          v-for="(item, index) in searchItems"
          :key="index"
          class="text-[2.67vw] leading-[3.47vw] text-black font-oPPOSansMFont mb-[2.40vw] last:mb-0"
          @click="handleToSearch(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { navigateTo } from "#imports";
import { useSearchStore } from "~/store/search";

const productKeywords = ref("");
const hasSearchProduct = computed(() => !!productKeywords.value);

const searchStore = useSearchStore();

function handleCleanSearch() {
  productKeywords.value = "";
}

function handleSearch() {
  navigateTo("/search");
  searchStore.setSearchKeywords(productKeywords.value);
}

function handleToSearch(str: string) {
  navigateTo("/search");
  searchStore.setSearchKeywords(str);
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
</script>

<style scoped></style>
