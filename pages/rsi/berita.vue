<!-- Component base on directory /components/ppkc -->
<template>
  <div>
    <!-- List berita page content -->
    <BeritapageListBerita
    :path="path"
    :lists="lists"
    :loading="loading"
    :error="error"
    :end="end"
    @load-more-berita="LoadMoreBerita"
    :listToShow="listToShow" :loading_more="loading_more"
    />
  </div>
</template>

<script>
  import {SampleNews} from '@/helpers'
  
  export default {
    name: "rsi-berita",
    layout: "default",

    data() {
      return {
        loading: null,
        loading_more: null,
        error: false,
        end: false,
        lists: [],
        listToShow: 6,
        repeat: 0,
        path: this.$route.name,
      };
    },

    beforeMount() {
      this.ConfigApiUrl(),
      this.ListBerita()
    },

    methods: {
      ListBerita() {
        this.loading = true;
        this.error = false;
        const url = `${this.api_url}/web/berita/page?start=${this.lists.length}`;
        this.$axios
        .get(url)
        .then((res) => {
          if (res.data.list_data.length > 0) {
            this.lists.push(...res.data.list_data);
          } else {
            this.end = true;
            SampleNews.map(d => {
              this.lists.push(d)
            })
            // this.lists.push(...SampleNews)
          }
        })
        .catch((err) => {
          console.log(err.message);
          this.error = true;
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      },

      LoadMoreBerita(){
        window.scrollTo(0,document.body.scrollHeight);
        this.loading_more=true
        setTimeout(() => {
          this.listToShow = (this.lists.length - this.listToShow) + this.listToShow
          this.loading_more=false
        }, 1500)
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
