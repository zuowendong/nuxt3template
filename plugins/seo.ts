import { unref, nextTick } from "vue";
import { defineNuxtPlugin } from "#app";
import { fetchSEOInfo } from "~/api/seo";

export default defineNuxtPlugin(() => {
  async function setSEOInfo(path: string) {
    const { data } = await fetchSEOInfo({
      match_url: path,
    });
    return unref(data)?.data;
  }

  return {
    provide: {
      seo: setSEOInfo,
    },
  };
});
