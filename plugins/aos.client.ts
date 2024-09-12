import AOS from "aos";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      aos: () => AOS,
    },
  };
});
