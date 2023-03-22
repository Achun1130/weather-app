<template>
  <div class="bg-weather-primary flex min-h-screen flex-col font-Roboto-Mono">
    <SiteNavigation />

    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <div :key="route.path">
          <component :is="Component"></component>
        </div>
      </Transition>
    </RouterView>

  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>