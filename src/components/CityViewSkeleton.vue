<template>
  <div class="flex flex-col items-center">
    <!-- Weather Overview -->
    <div class="flex w-full max-w-screen-md flex-col items-center py-12">
      <AnimatedPlaceholder class="w-full max-w-[300px] mb-2" />
      <AnimatedPlaceholder class="w-full max-w-[300px] mb-12" />
      <AnimatedPlaceholder class="w-full max-w-[300px] mb-8 h-[100px]" />
      <AnimatedPlaceholder class="w-full max-w-[300px] mb-2" />
      <AnimatedPlaceholder class="w-full max-w-[300px] mb-2" />
      <AnimatedPlaceholder class="w-full max-w-[300px] h-[100px]" />
    </div>

    <!-- Hourly Weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8">
        <AnimatedPlaceholder class="h-[150px]" />
      </div>
    </div>

    <!-- Weekly Weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8">
        <AnimatedPlaceholder class="h-[100px]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
