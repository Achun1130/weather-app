<template>
  <CityCard
    v-for="city in savedCities"
    :key="city.id"
    :city="city"
    @click="goToCityView(city)"
  />

  <p v-if="savedCities.length === 0">No locations added. To start tracking a location, search in the field above.</p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);
const getCities = async () => {
  const localStorageSavedCities = localStorage.getItem("savedCities");

  if (localStorageSavedCities) {
    savedCities.value = JSON.parse(localStorageSavedCities);
  }

  const requests = [];
  savedCities.value.forEach((city) => {
    const { lat, lng } = city.coords;

    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric&lang=zh_tw`
      )
    );
  });

  const weatherData = await Promise.all(requests);
  // 將API 取得資料併入現有資料
  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};

await getCities();

const router = useRouter();
const goToCityView = (el) => {
  const { city, state, coords, id } = el;
  const { lng, lat } = coords;

  router.push({
    name: "cityView",
    params: {
      city,
      state,
    },
    query: {
      lat,
      lng,
      id
    },
  });
};
</script>
