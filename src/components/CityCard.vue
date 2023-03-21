<template>
  <div
    class="flex cursor-pointer items-center rounded-md bg-weather-secondary py-6 px-3 shadow-md"
  >
    <div class="flex flex-col gap-2">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="ml-auto flex flex-col items-end gap-2">
      <p class="text-3xl">{{ transTemp(city.weather.main.temp) }}&deg;</p>
      <div class="flex gap-2">
        <span class="text-xs">
          最高：{{ transTemp(city.weather.main.temp_max) }}&deg;
        </span>
        <span class="text-xs">
          最低：{{ transTemp(city.weather.main.temp_min) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

const transTemp = (temp) => Math.round(temp);
</script>
