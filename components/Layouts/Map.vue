<template>
  <div
    :style="`${
      $device.isMobile
        ? 'height: 300px; width: 100%;margin-bottom:2rem;'
        : 'height: 300px; width: 100%;'
    }`"
  >
    <client-only>
      <div v-if="loading">
        <div class="d-flex justify-content-center mt-5">
          <div
            class="spinner-grow text-primary"
            style="width: 5rem; height: 5rem"
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      <l-map v-else ref="myMap" :zoom="zoom" :center="center">
        <div v-for="(item, index) in coordinates">
          <l-marker
            v-for="coordinate in item.maps"
            :lat-lng="coordinate"
            :key="coordinate.id"
          >
            <l-icon
              :icon-size="iconSize"
              :icon-anchor="staticAnchor"
              :icon-url="icons[coordinate.id]"
              :shadow-url="icons[2]"
            />
            <l-popup>
              <center class="container">
                <span class="font-weight-bold bd-highlight">
                  {{ coordinate.title }} </span
                ><br />
                <small class="text-success">
                  {{ coordinate.region }}
                </small>
                <br />
                <!-- <pre>
										{{coordinate.id}}
									</pre> -->
                <img :src="icons[3]" width="155" />
                <br /><br />
                <a
                  :href="coordinate.external_link"
                  class="btn btn-primary btn-sm text-white rounded-pill"
                  >View Location</a
                >
              </center>
            </l-popup>
          </l-marker>
          <!-- <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"/> -->
          <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>
        </div>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: null,
      coordinates: [],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">RSI Sultan Agung Map</a> contributors',
      zoom: this.$device.isMobile ? 17 : 21,
      center: {
        lat: "",
        lng: "",
      },
      bounds: null,
      regionCenter: [],
      address: {
        long: "",
        display: "",
      },
      polyline: {
        latlngs: [],
        color: "green",
      },
      circle: {
        center: "",
        radius: 2500,
        color: "red",
      },
      icons: {
        1: require("assets/leaflet/marker-custom/building-icon.png"),
        2: require("assets/leaflet/marker-custom/marker-shadow.png"),
        3: require("assets/leaflet/marker-custom/building-office-icon.png"),
      },
      staticAnchor: [10, 15],
      iconSize: [70, 80],
    };
  },

  mounted() {
    this.SetCoordinates();
  },

  methods: {
    SetCoordinates() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.coordinates = [
          {
            id: 1,
            category_name: "RSI Sultan Agung",
            maps: [
              {
                id: 1,
                title: "RSI Sultan Agung",
                lat: "-6.192373181219588",
                lng: "106.85215349999545",
                region: "Jakarta City",
                external_link:
                  "https://www.google.com/maps/place/PPKC+CAROLUS/@-6.1935038,106.8521535,15z/data=!4m5!3m4!1s0x0:0x3517379d92f3f299!8m2!3d-6.1935018!4d106.8521586",
              },
            ],
          },
        ];
        this.coordinates.map((d) => {
          d.maps.map((m) => {
            this.center.lat = m.lat;
            this.center.lng = m.lng;
            this.regionCenter.push(m.lat);
            this.regionCenter.push(m.lng);
          });
        });
      }, 1500);
    },
  },
};
</script>
