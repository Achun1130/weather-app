<template>
  <main class="container text-white">
    <div class="relative mb-8 pt-4">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="w-full border-b bg-transparent py-2 px-1 focus:border-weather-secondary focus:shadow-[0px_1px_0_0_#004E71] focus:outline-none"
      />
      <ul
        class="absolute top-[66px] w-full bg-weather-secondary py-2 px-1 text-white shadow-md"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError" class="py-2 px-1">
          Sorry, something went wrong, please try again.
        </p>

        <p
          v-if="!searchError && mapboxSearchResults.length === 0"
          class="py-2 px-1"
        >
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            @click="previewCity(searchResult)"
            class="cursor-pointer py-2 px-1"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const mapboxAPIKey =
  "pk.eyJ1IjoiYWNodW4xMTMwIiwiYSI6ImNsZjkwazY1dDFleWUzcm12MWJhOTRoNGgifQ.SFpSiwcYl5-nJUpJ5HVSzw";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);
const router = useRouter();

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );

        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }

    mapboxSearchResults.value = null;
  }, 300);
};

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  const [lng, lat] = searchResult.geometry.coordinates;

  router.push({
    name: "cityView",
    params: {
      city,
      state: state.replaceAll(" ", ""),
    },
    query: {
      lat,
      lng,
      preview: true,
    },
  });
};
</script>
