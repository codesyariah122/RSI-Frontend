<template>
  <div>
    <Profilepage
      :profiles="profiles"
      :genders="genders"
      :jobs="jobs"
      :studs="studs"
      :works="works"
      :maritals="maritals"
      :pelatihans="pelatihans"
      :categories="categories"
      :api_url="api_url"
      @load-event-follow="EventYangDiikuti"
      :empty_filter="empty_filter"
      :loading="loading"
    />
  </div>
</template>

<script>
import { FetchData } from "@/helpers";

export default {
  name: "profile",
  layout: "profile",

  data() {
    return {
      profiles: {},
      genders: [],
      jobs: {},
      studs: {},
      works: [],
      maritals: [],
      pelatihans: [],
      categories: [],
      empty_filter: false,
      loading: null,
    };
  },

  beforeMount() {
    this.ConfigApiUrl(),
    this.UserProfileData(),
    this.EventYangDiikuti(),
    this.EventCategories()
  },

  mounted() {
    this.CheckToken(), this.IsLoggedIn();
  },

  methods: {
    IsLoggedIn() {
      if (!this.token.accessToken) {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Sesi login telah habis!",
        });
        setTimeout(() => {
          this.$router.push({
            name: "auth-login",
          });
        }, 900);
      }
    },

    CheckToken() {
      this.$store.dispatch("config/checkAuthLogin", "token");
    },
    ConfigApiUrl() {
      const api_url = process.env.NUXT_ENV_API_URL;
      this.$store.dispatch("config/storeConfigApiUrl", api_url);
    },

    UserProfileData() {
      if (this.token) {
        const url = `${this.api_url}/web/user`;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
          .get(url)
          .then(({ data }) => {
            this.profiles = data.user;
            this.works = data.pekerjaan;
            this.studs = data.pendidikan;
            this.genders = data.jenisKelamins;
            this.jobs = data.statusPekerjaans;
            this.maritals = data.statusPernikahan;
          })
          .catch((err) => console.log(err.response ? err.response : ""));
      }
    },

    EventYangDiikuti(page = 0, category = "", month = "") {
      // console.log(month)
      this.loading = true;
      const url = `${this.api_url}/web/kegiatan/saya/list/page?start=${page}&jenis_pelatihan=${category}&bulan_pelatihan=${month}`;
      this.$axios
        .get(url)
        .then(({ data }) => {
          // console.log(data.list_data)
          if (data.list_data.length > 0) {
            this.pelatihans = data.list_data;
          } else {
            this.empty_filter = false;
            this.pelatihans = [];
          }
        })

        .catch((err) => console.log(err))

        .finally(() => {
          this.loading = false;
        });
    },

    EventCategories(page = 1, keyword = "", category = "", month = "") {
      const url = `${this.api_url}/web/event/paging?keyword=${
        keyword ? keyword : ""
      }&page=${page ? page : 1}&jenis_pelatihan=${
        category ? category : ""
      }&bulan_pelatihan=${month ? month : ""}`;

      FetchData(url)
        .then((data) => {
          // console.log(data)
          // Ambil categories event
          this.categories = data.list_jenis_kegiatan;
        })
        .catch((err) => console.log(err));
    },
  },

  computed: {
    token() {
      return this.$store.getters["config/ConfigCheckLogin"];
    },
    api_url() {
      return this.$store.getters["config/ConfigApiUrl"];
    }
  }
}
</script>
