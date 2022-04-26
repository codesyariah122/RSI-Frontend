<!-- Component base on directory /components/ppkc -->
<template>
  <div>
    
      <mdb-container>
        <!-- header -->
        <mdb-row v-if="loading" class="row justify-content-center">
          <mdb-col lg="12" xs="12" sm="12">
            <div class="d-flex justify-content-center mt-5 mb-5">
              <div
                class="spinner-grow text-primary"
                role="status"
                style="width: 3rem; height: 3rem"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </mdb-col>
        </mdb-row>
        <div v-else ref="testimoni_square" class="card__list testimoni__list" :style="berita__list_style">
          <div v-if="status == 1">
            <mdb-row class="row justify-content-center header__ppkc-list-page">
            <mdb-col lg="12" xs="12" sm="12" style="">
              <h2 style="color: #004899 !important; font-weight: 700">
                Akun Telah Diverifikasi
              </h2>
            </mdb-col>
            <mdb-col lg="6" xs="6" sm="6" style="margin-top: 8px">
              <span style="color: #666666 !important; font-size: 14px">
                Proses pendaftaran telah selesai. Anda dapat memulai mengakses akun Anda dengan cara masuk menggunakan alamat email dan kata sandi yang telah terdaftar.
              </span>
            </mdb-col>
          </mdb-row>
          </div>
          <div v-else>
            <mdb-row class="row justify-content-center header__ppkc-list-page">
            <mdb-col lg="12" xs="12" sm="12" style="">
              <h2 style="color: #004899 !important; font-weight: 700">
                Akun gagal Diverifikasi
              </h2>
            </mdb-col>
            <mdb-col lg="6" xs="6" sm="6" style="margin-top: 8px">
              <span style="color: #666666 !important; font-size: 14px">
                {{this.message}}
              </span>
            </mdb-col>
          </mdb-row>
          </div>
        </div>
      </mdb-container>
  </div>
</template>

<script>
export default {
  name: "verifikasi",
  layout: "default",

  data() {
    return {
      loading: null,
      error: false,
      end: false,
      lists: [],
      path: this.$route.name,
      message:"",
      status: 0,
      berita__list_style:
        this.$router.path == "/ppkc/berita" && this.$device.isDeskktop
          ? "margin-top: 15rem;"
          : "margin-top: 7rem;",
    };
  },

  beforeMount() {
    this.ConfigApiUrl();
  },

  mounted() {
    this.ListTestimoni();
  },

  methods: {
    ListTestimoni() {
      console.log(this.$route.params.slug);
      this.loading = true;
      this.error = false;
      this.$axios
        .get(`${this.api_url}/web/verifikasi-email?verifikasi_code=${this.$route.params.slug}`)
        .then((res) => {
          console.log(res.data);
          this.message = res.data.message;
          this.status = res.data.status;
        })
        .catch((err) => {
          this.error = true;
        })
        .finally(() => {
            this.loading = false;
        });
    },

    LoadListTestimoni() {
      this.ListTestimoni();
    },

    ConfigApiUrl() {
      const api_url = process.env.NUXT_ENV_API_URL;
      this.$store.dispatch("config/storeConfigApiUrl", api_url);
    },
  },
  computed: {
    api_url() {
      return this.$store.getters["config/ConfigApiUrl"];
    },
  },
};
</script>
