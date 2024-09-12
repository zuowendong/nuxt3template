<template>
  <section class="w-full h-full flex flex-col items-center justify-center">
    <div class="text-[20px] xl:text-[24px]">{{ food }}</div>

    <button class="btn" @click="handleOrder">
      {{ isOrder ? "确定" : "点餐" }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import FoodMenu from "~/assets/json/food.json";

const foods = computed(() => FoodMenu.foods);
const food = ref("今天吃什么");

const isOrder = ref(false);
const intervalId = ref();
function handleOrder() {
  if (isOrder.value) {
    finishOrder();
  } else {
    let i = 0;
    isOrder.value = true;
    intervalId.value = setInterval(() => {
      food.value = foods.value[i];
      i = (i + 1) % foods.value.length;
    }, 100);
  }
}

function finishOrder() {
  clearInterval(intervalId.value);
  const finalFood = foods.value[Math.floor(Math.random() * foods.value.length)];
  food.value = finalFood;
  isOrder.value = false;
}

onUnmounted(() => {
  finishOrder();
});
</script>
