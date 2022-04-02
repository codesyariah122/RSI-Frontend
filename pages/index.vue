<template>
  <div>
    <!-- Homepage Content -->
    <!-- Banner Header -->
    <mdb-container>
      <mdb-row class="justify-content-center mt-5">
        <mdb-col lg="12" sm="12" xs="12">
          <HomepageHeaderCard :items="items" :token="token" />
        </mdb-col>
      </mdb-row>

      <!-- List events -->
      <mdb-row class="justify-content-center mt-5">
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

      <div class="banner">
        <mdb-carousel
          :interval="8000"
          slide
          :items="items"
          controlls
          indicators
          fade
          dark
          class="jumbotron__home"
          customClass="rounded"
          >
        </mdb-carousel>
      </div>

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

  </div>
</template>

<script>
  import {SampleEvents} from '@/helpers'
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
      news: [],
      listToShow: 3
    }
  },

  head:{
    script: [
      // {
      //   src: 'https://widget.tochat.be/bundle.js?key=93ba0156-969f-4e9c-b1c8-0c25aafde170',
      //   defer: true
      // }
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
      this.TestimoniLists(3)
    },

    methods: {
      EventLists(keyword='', page=1, category='', month=''){
        this.loading = true
        const url = `${this.api_url}/web/event/paging?keyword=${keyword ? keyword : ''}&page=${page ? page : 1}&jenis_pelatihan=${category ? category : ''}&bulan_pelatihan=${month ? month : ''}`
        this.$axios.get(url)
        .then(({data}) => {
          this.events = data.list_kegiatan_terdekat.slice(0,3)
        })
        .catch(err => console.log(err.response))
        .finally(() => {
          setTimeout(() => {
            this.loading = false
          }, 1500)
        })
      },

      TestimoniLists(listToShow){
        this.loading = true
        const url = `${this.api_url}/web/testimoni/page?start=${listToShow}`
        this.$axios.get(url)
        .then(({data}) => {
          this.testimonis = data.list_data
        })
        .catch(err => console.log(err.response))
        .finally(() => {
          this.loading = false
        }, 1500)
      },

      NewsLists(start){
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
