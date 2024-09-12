import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  imports: {
    autoImport: false,
  },
  devtools: {
    enabled: false,
  },
  app: {
    baseURL: "/nuxt3template/",
    head: {
      htmlAttrs: {
        lang: "zh-CN",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/beer.svg" }],
    },
  },
  css: [
    "~/assets/css/global.css",
    "aos/dist/aos.css",
    "swiper/css",
    "~/assets/font/OPPOSans-B/result.css",
    "~/assets/font/OPPOSans-M/result.css",
    "~/assets/font/OPPOSans-R/result.css",
  ],

  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@vant/nuxt", "@nuxt/image"],

  plugins: ["~/plugins/aos.client.ts", "~/plugins/seo.ts", "~/plugins/i18n.ts"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {
        overrideBrowserslist: ["last 5 version", ">1%", "ie >=8"],
      },
      "postcss-px-to-viewport-tailwind": {
        unitToConvert: "px", // 要转化的单位
        viewportWidth: 375,
        viewportWidthPaid: 750,
        viewportWidthPc: 1920,
        width2Tailwind: {
          viewportWidthPaid: "md",
          viewportWidthPc: "xl",
        },
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: [], // 指定不转换为视窗单位的类名,例如van-（vantUI组件），
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配，最好不要排除node_modules 文件，排除后在项目中会发现字体不能跟随页面放大
        landscape: false, // 是否处理横屏情况
      },
    },
  },
  experimental: {
    // @ts-ignore
    inlineSSRStyles: false,
  },
  image: { provider: "none" },
});
