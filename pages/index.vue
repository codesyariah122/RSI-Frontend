<template>
  <div>
    <!-- Homepage Content -->
    <!-- Banner Header -->
    <mdb-container>
      <mdb-row class="justify-content-center mt-5">
        <mdb-col lg="12" sm="12" xs="12">
          <div v-if="$device.isDesktop" class="banner">
            <mdb-carousel 
            :interval="8000"
            slide
            :items="items"
            controlls
            indicators
            fade
            dark
            class="mb-2"
            customClass="rounded"
            >
          </mdb-carousel>
        </div>
        <HomepageHeaderCard :items="items" :token="token" />

        <div v-if="$device.isMobile" class="banner mt-1" style="margin-bottom:10rem!important;">
            <mdb-carousel 
            :interval="8000"
            slide
            :items="items"
            controlls
            indicators
            fade
            dark
            class="mb-2"
            customClass="rounded"
            >
          </mdb-carousel>
        </div>

      </mdb-col>
    </mdb-row>

    <!-- List events -->
    <mdb-row class="justify-content-center">
      <mdb-col lg="12" sm="12" xs="12">
        <HomepageEventList  :events="events" :loading="loading"/>
      </mdb-col>
    </mdb-row>

    <mdb-row class="justify-content-center mt-5">
      <HomepagePanelTarget />
    </mdb-row>

    <!-- Testimoni -->
    <mdb-row class="justify-content-center mt-3">
      <HomepageTestimoni :testimonis="testimonis"/>
    </mdb-row>
  </mdb-container>

  <!-- parallax homepage -->
  <HomepageParallaxHome />

  <mdb-container>
    <!-- berita -->
    <mdb-row class="justify-content-center">
      <HomepageBerita :lists="lists.list_berita" :news="news" />
    </mdb-row>

  </mdb-container>



  <!-- panel footer -->
  <HomepagePanelFooterTarget />
  <!-- End panel footer -->

  <HomepageVisiMisi/>

</div>
</template>

<script>
//Image base on assets directory
export default {
  name: "IndexPage",
  layout: "default",

  data() {
    return {
      loading: null,
      items: [],
      events: [],
      testimonis: [],
      news: []
    }
  },

  head:{
    script: [

    ]
  },

  async asyncData({ $axios }) {
    const lists = await $axios.$get("/web/home");
    return {
      lists
    }
  },
  beforeMount(){
    this.CheckToken(),
    this.ConfigApiUrl()
  },
  mounted() {
    this.CarouselItem(),
    this.EventLists(),
    this.TestimoniLists(),
    this.NewsLists()
  },

  methods: {
    EventLists(keyword='', page=1, category='', month=''){
      this.loading = true
      const url = `${this.api_url}/web/event/paging?keyword=${keyword ? keyword : ''}&page=${page ? page : 1}&jenis_pelatihan=${category ? category : ''}&bulan_pelatihan=${month ? month : ''}`
      this.$axios.get(url)
      .then(({data}) => {
        this.events = data.list_kegiatan_terdekat
      })
      .catch(err => console.log(err.response))
      .finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 1500)
      })
    },

    TestimoniLists(start=0){
      this.loading = true
      const url = `${this.api_url}/web/testimoni/page?start=${start}`
      this.$axios.get(url)
      .then(({data}) => {
        this.testimonis = data.list_data
      })
      .catch(err => console.log(err.response))
      .finally(() => {
        this.loading = false
      }, 1500)
    },

    NewsLists(start=0){
      this.loading = true
      const url = `${this.api_url}/web/berita/page?start=${start}`
      this.$axios.get(url)
      .then(({data}) => {
        this.news = data.list_data
      })
      .catch(err => console.log(err.response))
      .finally(() => {
        setTimeout(() => {
          this.loading=false
        }, 1500) 
      })
    },

    CheckToken(){
      this.$store.dispatch('config/checkAuthLogin', 'token')
    },

    CarouselItem() {
      this.items = [
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/7.jpeg",
      },
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/8.jpeg",
      },
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/9.jpeg",
      },
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/1.jpeg",
      },
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/2.jpeg",
      },
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/3.jpeg",
      },
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/4.jpeg",
      },
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/5.jpeg",
      },
      {
        img: true,
        src: "https://apisultanagung.halomedika.com/image-banner/6.jpeg",
      },
      ];
    },


    ConfigApiUrl() {
      const api_url = process.env.NUXT_ENV_API_URL;
      this.$store.dispatch("config/storeConfigApiUrl", api_url);
    }

  },

  computed: {
    token(){
      return this.$store.getters['config/ConfigCheckLogin']
    },

    api_url() {
      return this.$store.getters["config/ConfigApiUrl"];
    }
  }
}
</script>
