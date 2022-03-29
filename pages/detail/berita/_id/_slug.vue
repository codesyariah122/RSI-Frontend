<template>
  <div class="berita__detail" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center berita__detail-content">
        <mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
          <h2 class="text-capitalize">{{detail.judul}}</h2>
          <p>{{$moment(detail.created_at).format("LLLL")}}</p>
          <!-- Image content -->
            <img :src="detail.foto_url"  />
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="col__berita-2">
          <article class="content-desc">
            {{ detail.konten }}
          </article>
        </mdb-col>
        
        <mdb-col lg="12" xs="12" sm="12" class="mt-5">
          <b-dropdown-divider class="line"></b-dropdown-divider>
        </mdb-col>
      </mdb-row>

    </mdb-container>
  </div>
</template>

<script>
import { SampleNews } from '@/helpers'

export default {
  name: "detail-berita-id-slug",
  layout: "default",

  data() {
    return {
      berita__list_style: this.$device.isDesktop
      ? "margin-top: 8rem;"
      : "margin-top: 6rem;",
      id: this.$route.params.id,
      path: this.$route.name,
      berita: null,
      id_berita: this.$route.params.id,
      detail: {}
    }
  },

  beforeMount(){
    this.ConfigApiUrl()
  },

  mounted(){
    this.DetailBeritaSample()
  },

  methods: {
    ConfigApiUrl() {
      const api_url = process.env.NUXT_ENV_API_URL;
      this.$store.dispatch("config/storeConfigApiUrl", api_url);
    },

    DetailBeritaSample(){
      this.detail = SampleNews.filter(d => d.id == this.id_berita)[0]
    }
  },

  computed: {
    api_url() {
      return this.$store.getters["config/ConfigApiUrl"];
    }
  }
}
</script>

