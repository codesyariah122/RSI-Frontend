<template>
  <div>
    <mdb-row class="d-flex justify-content-start" col="12">
      <mdb-col class="glow" md="3">
        <h4>{{ time }}</h4>
      </mdb-col>

      <mdb-col v-if="apiKey" md="6" class="weather">
        <mdb-badge gradient="blue" :color="color_badge" class="rounded-pill">
          {{ city.city
          }}<img
            :src="`http://openweathermap.org/img/wn/${weathers.icon}@2x.png`"
          />
          {{ weathers.description }} {{ temp }}&#8451;
        </mdb-badge>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
// Time Docs : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
import { FetchData, CheckWeather } from "@/helpers";
export default {
  data() {
    return {
      interval: null,
      time: null,
      ip: "",
      city: localStorage.getItem("your-city")
        ? JSON.parse(localStorage.getItem("your-city"))
        : "",
      apiKey: process.env.NUXT_ENV_WEATHER_KEY
        ? process.env.NUXT_ENV_WEATHER_KEY
        : "",
      temp: "",
      weathers: [],
      fdays: [],
      color_badge: "",
    };
  },

  beforeMount() {},
  beforeDestroy() {
    clearInterval(this.interval);
  },
  created() {
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(["id"], {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format();
    }, 1000);
  },

  mounted() {},

  methods: {
    YourIp() {
      const url = "https://api.ipify.org/?format=json";
      FetchData(url)
        .then((res) => {
          this.ip = res.ip;
        })
        .catch((err) => console.log(err));
    },

    YourCity() {
      const url = `https://ipapi.co/${this.ip}/json/`;
      FetchData(url)
        .then((res) => {
          localStorage.setItem(
            "your-city",
            JSON.stringify({
              city: res.city,
            })
          );
        })
        .catch((err) => console.log(err));
    },

    // convert celcius
    getCelcius(num) {
      num = parseFloat(num);
      return Math.ceil((num - 32) / 1.8);
    },

    WeatherByCity() {
      CheckWeather(this.city.city, this.apiKey)
        .then((res) => {
          console.log(res);
          this.weathers = res.weather[0];
          this.temp = this.getCelcius(res.main.temp);
          this.DetectColor(this.weathers.description);
        })
        .catch((err) => console.log(err));
    },

    DetectColor(color) {
      switch (color) {
        case "moderate rain":
          this.color_badge = "success";
          break;
        case "light rain":
          this.color_badge = "info";
          break;
        case "heavy intensity rain":
          this.color_badge = "secondary";
          break;
        case "shower rain":
          this.color_badge = "indigo";
          break;
        default:
          this.color_badge = "primary";
      }
    },
  },
};
</script>

<style lang="scss">
.weather {
  margin-bottom: 1rem;
  .badge {
    // color:$default-black!important;
    // font-weight: 600;
    img {
      filter: drop-shadow(0 0 0.75rem yellow);
      width: 45px;
    }
  }
}
@media (min-width: 992px) {
  .glow {
    // filter: drop-shadow(9px 9px 11px black);
  }
  .weather {
    margin-top: -1rem !important;
    margin-left: -2rem;
    .badge {
      // color:$default-black!important;
      // font-weight: 600;
      img {
        filter: drop-shadow(1px 11px 9px powderblue);
        width: 45px;
      }
    }
  }
}
</style>
