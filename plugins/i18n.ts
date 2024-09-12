import { createI18n } from "vue-i18n";
import { defineNuxtPlugin } from "#app";

import en from "../locales/en.json";
import zh from "../locales/zh.json";

export let t: (v: string) => string;

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "zh",
    messages: {
      en,
      zh,
    },
  });

  t = i18n.global.t;

  vueApp.use(i18n);
});
