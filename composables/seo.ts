import { unref, nextTick } from "vue";
import { useHead } from "#app";
import { fetchSEOInfo } from "~/api/seo";

export function useSEOInfo() {
  async function setSEOInfo(resData: any) {
    if (resData && resData.seos) {
      setSEO({
        title: resData.seos.title,
        meta: [
          ...resData.seos.meat_arr,
          {
            name: "description",
            content: resData.seos.description,
          },
          {
            name: "keywords",
            content: resData.seos.keywords,
          },
        ],
        script: resData.seos.scripts_arr,
      });
    } else {
      setDefaultSEO();
    }
  }

  function setSEO(data: any) {
    const { title, meta, script } = data;
    useHead({ title, meta, script });
  }

  function setDefaultSEO() {
    // tkd
    setSEO({
      title: "吃什么咧",
      meta: [
        {
          name: "description",
          content: "吃什么是其次，主要是该项目是Nuxt3集成模板，便于私活生产。",
        },
        {
          name: "keywords",
          content: "nuxt3,tailwindcss",
        },
      ],
      script: [],
    });
  }

  return {
    setSEOInfo,
  };
}
