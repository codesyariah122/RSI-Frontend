<template>
  <div class="visi__misi" :style="`background-image: url(${bg_image});`">
    <mdb-container>
      <mdb-row class="justify-content-center visi-misi__header">
        <mdb-col lg="12">
          <h1 class="mt-5 mb-5">Tentang Kami</h1>
        </mdb-col>
      </mdb-row>

      <mdb-row class="row visi-misi__content">
        <mdb-col class="mb-5" sm="8" md="8" lg="8">
          <h1>Visi</h1>
          <p v-if="context.visi">{{ context.visi }}</p>
          <br />
          <h1>Misi</h1>
          <ol v-if="context.misi">
            <li v-for="n in context.misi.length" v-if="n % 2 == 1">
              {{ context.misi[n] }}
            </li>
          </ol>
          <br />
          <h1>Motto</h1>
          <p>Mencintai Allah Menyayangi Sesama</p>
          <br />
          <h1>Makna Kerja</h1>
          <p>Berkhidmat Menyelamatkan Umat</p>
          <br />
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import { FetchData } from "@/helpers";
import BgImage from "~/assets/images/homepage/visi-misi-bg.jpg";

export default {
  data() {
    return {
      bg_image: BgImage,
      context: {
        visi: [],
        misi: [],
      },
    };
  },

  beforeMount() {
    this.ConfigApiUrl();
  },

  mounted() {
    this.ContextData();
  },

  methods: {
    ConfigApiUrl() {
      const url = process.env.NUXT_ENV_API_URL;
      this.$store.dispatch("config/storeConfigApiUrl", url);
    },
    ContextData() {
      FetchData(`${this.api_url}/web/home`)
        .then((res) => {
          this.context.visi = res.visi_misi.visi;
          // console.log(res.visi_misi.misi.split(".").length)
          const split = res.visi_misi.misi.split(
            ".",
            res.visi_misi.misi.split(".").length - 1
          );
          this.context.misi = [...split];
        })
        .catch((err) => console.error(err));
    },
  },

  computed: {
    api_url() {
      return this.$store.getters["config/ConfigApiUrl"];
    },
  },
};
</script>

<style scoped>
.visi__misi .visi-misi__content h1 {
  margin-left: 45px !important;
  text-align: left;
}

.visi__misi .visi-misi__content p {
  width: 100%;
}

.col-lg-8 {
  flex: 0 0 100%;
  max-width: 100%;
}

.visi__misi:before {
  background-color: #004899;
}
</style>
