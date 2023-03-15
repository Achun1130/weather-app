<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const { lat, lng } = route.query;

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );

    // cal current date & time
    // getTimezoneOffset() 回傳分鐘
    // * 60000 換算毫秒
    const localOffset = new Date().getTimezoneOffset() * 60000;

    // weatherData.data.current.dt 為時間戳
    const utc = weatherData.data.current.dt * 1000 + localOffset;
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
</script>
