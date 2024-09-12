import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const searchKeywords = ref("");

  function setSearchKeywords(str: string) {
    searchKeywords.value = str;
  }

  return {
    searchKeywords,
    setSearchKeywords,
  };
});
