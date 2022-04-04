<template>
  <div class="panel__footer" :style="`background-image: url(${bg_image});`">
    <div class="panel__footer-content">
      <mdb-container>
        <mdb-row class="row justify-content-center panel__context">
          <mdb-col col="12" md="6" xs="12" sm="12">
            <h1>Tentang Kami</h1>
            <p class="text-justify">
              Buat akun dan dapatkan akses kelas-kelas terbaik di berbagai bidang kesehatan atau hubungi admin kami untuk konsultasi pilihan kelas terbaik sesuai kompetensi yang Anda miliki.
            </p>

            <div class="button">                
              <b-button
              :class="`my__btn-secondary rounded-pill ${$device.isMobile ? 'btn-block btn-sm mt-3' : ''}`"
              @click="$router.push({ name: 'auth-registrasi' })"
              >Hubungi Kami</b-button>

              <b-button
              :class="`my__btn-primary rounded-pill ${$device.isMobile ? 'btn-block btn-sm' : ''}`"
              @click="$router.push({ name: 'auth-registrasi' })"
              >Daftar Sekarang</b-button
              >
            </div>

          </mdb-col>

          <mdb-col col="12" md="6" xs="12" sm="12" class="panel__art">
            <!-- <img :src="require('~/assets/images/homepage/footer-info-img.svg')"> -->
            <mdb-row class="d-flex justify-content-center">
              <mdb-col sm="3" class="art-1">
                <img :src="require('~/assets/art/vector-art-footer-2.png')">
              </mdb-col>
              <mdb-col sm="4" class="pic-1">
                <img :src="require('~/assets/images/homepage/profile-panel-footer.svg')">
              </mdb-col>
              <mdb-col sm="3" class="art-2">
                <img :src="require('~/assets/art/vector-art-footer-1.png')">
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>

        <!-- <mdb-row class="row justify-content-start mt-1 panel__context">
           <mdb-col col="12" md="12" xs="12" sm="10" class="visi__misi-context">
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
        </mdb-row> -->

      </mdb-container>
    </div>
  </div>
</template>

<script>
import { FetchData } from "@/helpers";
import BgImage from "~/assets/images/bg/vector-bg.svg";

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
.panel__footer .panel__footer-content h1 {
  margin-left: 45px !important;
  text-align: left;
}
.panel__footer .panel__footer-content p {
  width: 100%;
}
.col-lg-8 {
  flex: 0 0 100%;
  max-width: 100%;
}
/*.panel__footer:before {
  background-color: #004899;
}*/
</style>
