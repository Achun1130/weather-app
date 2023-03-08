<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col items-center gap-3 py-6 text-2xl text-white sm:flex-row"
    >
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3">
        <i class="fa-solid fa-sun"></i>
        <h1>The Local Weather</h1>
      </RouterLink>

      <div class="flex gap-3 sm:ml-auto">
        <a
          href="javascript: void(0)"
          class="duration-150 hover:text-weather-secondary"
        >
          <i class="fa-solid fa-circle-info"></i>
        </a>
        <a
          href="javascript: void(0)"
          class="duration-150 hover:text-weather-secondary"
        >
          <i class="fa-solid fa-plus"></i>
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
