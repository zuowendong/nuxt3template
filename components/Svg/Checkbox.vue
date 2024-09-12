<template>
  <svg
    v-if="isActive"
    width="100%"
    height="100%"
    viewBox="0 0 12 12"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-281.000000, -1146.000000)">
        <g id="选中" transform="translate(281.000000, 1146.000000)">
          <rect
            fill="#3370FF"
            x="0"
            y="0"
            width="12"
            height="12"
            rx="1.5"
          ></rect>
          <polygon
            id="路径"
            fill="#FFFFFF"
            fill-rule="nonzero"
            points="5.23193197 8.80029524 5.09231537 8.93181346 4.95269877 8.80029524 2 5.81189704 2.96273079 4.83738772 5.09208666 6.99274368 9.03726921 3 10 3.97465486"
          ></polygon>
        </g>
      </g>
    </g>
  </svg>

  <svg
    v-else
    width="100%"
    height="100%"
    viewBox="0 0 12 12"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g
      id="页面-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        transform="translate(-281.000000, -1162.000000)"
        stroke="#B3B3B3"
        stroke-width="0.5"
      >
        <g id="默认状态" transform="translate(281.000000, 1162.000000)">
          <rect
            id="矩形"
            x="0.25"
            y="0.25"
            width="11.5"
            height="11.5"
            rx="1.5"
          ></rect>
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>
