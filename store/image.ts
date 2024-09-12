import { defineStore } from "pinia";
import Images from "~/assets/json/images.json";
import ImagesMobile from "~/assets/json/images-mobile.json";

export const useImageStore = defineStore("image", () => {
  return {
    home: Images.home,
    homeMobile: ImagesMobile.home,
  };
});
