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
          @click.prevent="toggleModal"
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

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h2 class="mb-1 text-2xl">About:</h2>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>

          <h2 class="text-2xl">How it works:</h2>
          <ol class="mb-4 list-inside list-decimal">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import BaseModal from "./BaseModal.vue";

const modalActive = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
