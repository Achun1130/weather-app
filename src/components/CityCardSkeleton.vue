<template>
  <div
    class="flex items-center rounded-md bg-weather-secondary py-6 px-3 shadow-md"
  >
    <div class="flex flex-1 flex-col gap-2">
      <AnimatedPlaceholder class="max-w-[50%]" />
      <AnimatedPlaceholder class="max-w-[40%]" />
    </div>

    <div class="flex flex-1 flex-col items-end gap-2">
      <AnimatedPlaceholder class="w-full max-w-[50px]" />
      <AnimatedPlaceholder class="w-full max-w-[75px]" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
