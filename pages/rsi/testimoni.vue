<!-- Component base on directory /components/ppkc -->
<template>
  <div>
    <TestimonipageListTestimoni
      :path="path"
      :lists="lists"
      :loading="loading"
      :error="error"
      :end="end"
      @load-more-testi="LoadListTestimoni"
    />
  </div>
</template>

<script>
export default {
  name: "rsi-testimoni",
  layout: "default",

  data() {
    return {
      loading: null,
      error: false,
      end: false,
      lists: [],
      path: this.$route.name,
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
      this.loading = true;
      this.error = false;
      this.$axios
        .get(`${this.api_url}/web/testimoni/page?start=${this.lists.length}`)
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
