<template>
  <div>
    <div
      class="parallax overlay"
      :style="`background-image: url(${parallax.data.bg});`"
    >
      <div class="caption">
        <b-container class="mt-5">
          <b-row class="justify-content-between">
            <b-col md="8">
              <h2>{{ parallax.data.context.heading }}</h2>
              <blockquote class="text-justify">
                {{ parallax.data.context.text }}
              </blockquote>
            </b-col>
            <b-col md="4">
              <a
                href="#!"
                target="_blank"
                style="cursor: pointer"
              >
                <img
                  :src="
                    require('~/assets/images/homepage/google-play-badge.svg')
                  "
                  class="img-fluid"
                />
              </a>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import ParallaxImage from "~/assets/images/homepage/new-parallax.svg";

export default {
  data() {
    return {
      parallax: {
        data: {
          context: {
            heading: "Unduh Aplikasi RSI Sultan Agung",
            text: "Dapatkan informasi pelatihan aktual dan berdiskusi sesama peserta pelatihan",
          },
          bg: ParallaxImage,
        },
      },
    };
  },
};
</script>
