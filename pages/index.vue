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

      <!-- berita -->
      <mdb-row class="justify-content-center mt-2">
        <HomepageBerita :lists="lists.list_berita" :news="news" />
      </mdb-row>
    </mdb-container>
    
    
    <!-- visi misi content -->
    <HomepagePanelFooterTarget />
    <!-- End Homepage Content -->
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
          this.events = data.list_kegiatan_terdekat
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
          src: "https://mukisi.com/wp-content/uploads/2018/10/27-okt-MUKISI-RSISA-Bangun-Rumah-Tahfidz-di-Rumah-Sakit.jpg",
        },
        {
          img: true,
          src: "https://unissula.ac.id/wp-content/uploads/2020/08/fti-robot-covid-19-1024x683.jpg",
        },
        {
          img: true,
          src: "https://kampusnesia.com/data/uploads/2017/12/RSI-Sultan-Agung.jpg",
        },
        ]
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
