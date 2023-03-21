<template>
  <div class="flex flex-col items-center text-white">
    <!-- Banner -->
    <div
      class="w-full bg-weather-secondary p-4 text-center"
      v-if="route.query.preview"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>

    <!-- Weather Overview -->
    <div class="flex flex-col items-center py-12">
      <h1 class="mb-2 text-4xl">{{ route.params.city }}</h1>
      <p class="mb-12 text-sm">
        {{ transDate(weatherData.currentTime) }}
        {{ transTime(weatherData.currentTime) }}
      </p>
      <p class="mb-8 text-8xl">
        {{ transTemp(weatherData.current.temp) }}&deg;
      </p>
      <p>
        體感溫度
        {{ transTemp(weatherData.current.feels_like) }}&deg;
      </p>
      <p>
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        :alt="weatherData.current.weather[0].description"
      />
    </div>

    <hr class="w-full border border-white border-opacity-10" />

    <!-- Hourly Weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8">
        <h2 class="mb-4">每小時天氣</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col items-center gap-4"
          >
            <p class="whitespace-nowrap">
              {{ transHour(hourData.currentTime) }}
            </p>
            <img
              class="h-[50px]"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              :alt="hourData.weather[0].description"
            />
            <p class="text-xl">{{ transTemp(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="w-full border border-white border-opacity-10" />

    <!-- Weekly Weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8">
        <h2 class="mb-4">1週預報</h2>
        <div
          v-for="(day, i) in weatherData.daily"
          :key="day.dt"
          class="flex items-center justify-between gap-4"
        >
          <p>
            {{ i === 0 ? "今天" : transWeek(day.dt * 1000) }}
          </p>
          <img
            class="h-[50px]"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            :alt="day.weather[0].description"
          />
          <div class="flex justify-end gap-2">
            <p class="whitespace-nowrap">
              最高 {{ transTemp(day.temp.max) }}&deg;
            </p>
            <p class="whitespace-nowrap">
              最低 {{ transTemp(day.temp.min) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex cursor-pointer items-center gap-2 py-12 duration-150 hover:text-red-500"
      @click="removeCity"
      v-if="!route.query.preview"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const getWeatherData = async () => {
  const { lat, lng } = route.query;

  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric&lang=zh_tw&exclude=minutely`
    );

    // cal current date & time
    // getTimezoneOffset() 回傳與格林威治標準時間相差(分鐘)，ex: UTC+8 => -8 * 60 = -480(mins)
    // * 60000 換算毫秒
    const localOffset = new Date().getTimezoneOffset() * 60000;

    // weatherData.data.current.dt 為現在時間戳
    // utc 格林威治標準時間
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    // weatherData.data.timezone_offset 為該地區與格林威治標準時間相差(秒)
    // * 1000 換算毫秒
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();

const router = useRouter();

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  // const index = cities.findIndex((city) => city.id === route.query.id);
  // cities.splice(index, 1);
  const updatedCity = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCity));
  router.push({
    name: "home",
  });
};

const transDate = (currentTime) =>
  new Date(currentTime).toLocaleDateString("zh-Hant-TW", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });

const transTime = (currentTime) =>
  new Date(currentTime).toLocaleTimeString("zh-Hant-TW", {
    timeStyle: "short",
  });

const transHour = (currentTime) =>
  new Date(currentTime).toLocaleTimeString("zh-Hant-TW", {
    hour: "numeric",
  });

const transWeek = (currentTime) =>
  new Date(currentTime).toLocaleDateString("zh-Hant-TW", {
    weekday: "short",
  });

const transTemp = (temp) => Math.round(temp);
</script>
