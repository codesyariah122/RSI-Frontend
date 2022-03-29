<!-- Component base on directory /components/ppkc -->
<template>
  <div>
    <DireksipageListDireksi
      :path="path"
      :lists="lists"
      :loading="loading"
      @load-more-fasilitator="ListDireksi"
    />
  </div>
</template>

<script>
export default {
  name: "rsi-yayasan_direksi",
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
    this.ListDireksi();
  },

  methods: {
    async ListDireksi() {
      this.loading = true;
      this.error = false;
      const url = `${this.api_url}/web/direksi`;
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
