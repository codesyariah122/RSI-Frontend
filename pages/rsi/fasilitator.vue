<template>
  <div>
    <FasilitatorpageListFasilitator
      :path="path"
      :lists="lists"
      :loading="loading"
      :error="error"
      :end="end"
      @load-more-fasilitator="ListFasilitator"
    />
  </div>
</template>

<script>
export default {
  name: "rsi-fasilitator",
  layout: "default",
  data() {
    return {
      loading: null,
      lists: [],
      path: this.$route.name,
      error: false,
      end: false,
    };
  },

  beforeMount() {
    this.ConfigApiUrl();
  },

  mounted() {
    this.ListFasilitator();
  },

  methods: {
    async ListFasilitator() {
      this.loading = true;
      this.error = false;
      const url = `${this.api_url}/web/fasilitator/page?start=${this.lists.length}`;
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.list_data.length > 0) {
            this.lists.push(...res.data.list_data);
          } else {
            this.end = true;
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.error = true;
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 800);
        });
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
