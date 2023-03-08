<template>
  <div class="bg-weather-primary flex min-h-screen flex-col font-Roboto-Mono">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>
