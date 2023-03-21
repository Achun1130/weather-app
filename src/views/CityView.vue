<template>
  <Suspense>
    <AsyncCityView />
    <template #fallback>
      <p class="py-4 text-center text-white">Loading...</p>
    </template>
  </Suspense>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>
