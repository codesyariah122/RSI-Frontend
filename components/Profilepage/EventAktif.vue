<template>
  <div>
    <hr class="mt-5">
    <mdb-container  v-if="status_pendaftaran !== 'Menunggu Konfirmasi' &&status_pendaftaran !== 'Daftar'" :class="`${$device.isDesktop ? 'mt-5' : ''}`">
      <mdb-row col="12" class="justify-content-center mt-2 mb-5">
        <mdb-col lg="12">
          <mdb-tooltip trigger="hover" :options="{placement: 'top'}">
            <span slot="tip"> Kembali ke halaman profile</span>
            <nuxt-link :to="`/profile/${profiles}`" class="btn__tooltip" slot="reference">
              <mdb-icon icon="arrow-left" />
              Kembali ke profile
            </nuxt-link>
          </mdb-tooltip>
        </mdb-col>
      </mdb-row>

      <!-- Detail pelatihan boxed -->
      <div class="pelatihan__box">
        <MoleculesProfilePageBoxesEvent :pelatihans="pelatihans" :ToggleFile="ToggleFile" :FilterIcon="FilterIcon" :ShowField="ShowField"/>
      </div>
    </mdb-container>

    <!-- <pre>
      {{pelatihans}}
    </pre> -->

  </div>
</template>


<script>
  export default{
    props: ['token', 'api_url', 'status_pendaftaran'],

    data(){
      return {
        loading: null,
        profiles: [],
        pelatihans: [],
        kegiataan: [],
        categories:'',
        category_title: '',
        detailed_data: {},
        category_name: '',
        detailed: '',
        type: '',
        tgl: '',
        start: '',
        end: '',
        visible: true,
        show_file:false,
        id_test: '',
        id_webinar: '',
        type_name: '',
        show_close: false,
        show_collapse: null
      }
    },

    mounted(){
      this.EventAktif(),
      this.UserProfileData()
    },

  
    methods: {
     
      // Event Aktif Yang Diikuti
      EventAktif(){
        this.loading = true
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
        this.$axios.get(`${this.api_url}/web/event/${this.$route.params.id}`)
        .then(({data}) => {
          // console.log(data)
          this.kegiatan = data.kegiatan
          this.pelatihans = data.pelatihans
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.loading=false
        }, 900)
      },


      ToggleFile(){
        if(this.show_file || this.show_close){
          this.show_file = false
          this.show_close = false
        }
      }, 

      FilterIcon(type){
        switch(type){
          case 1:
          return 'video'
          break;
          case 2:
          return 'file-pdf'
          break;
          case 3:
          return 'file-alt'
          break;
          case 4:
          return 'file-archive'
          break;
          case 5:
          return 'file-pdf'
          break;
          case 6:
          return 'file-video'
          break;
          default:
          return 'No type here'
        }
      },

      FileType(type){
        switch(type){
          case 1:
          this.type_name = 'Video Materi';
          break;
          case 2:
          this.type_name = 'File Materi'
          break;
          case 3:
          this.type_name = 'Pre Test'
          break;
          case 4:
          this.type_name = 'Post Test'
          break;
          case 5:
          this.type_name = 'File'
          break;
          case 6:
          this.type_name = 'Video Webinar'
          break;
          default:
          this.type_name = 'No type here'
        }
      },

      ShowCategory(id){
        console.log(id)
        const filter = this.pelatihans.filter(d => d.id == id)
        this.categories = filter.map(c => {
          return c.categories.map(d => {
            this.category_name = d.title
            return d
          })
        })
      },

      ShowField(raw, id_kategori='', type){
        this.loading = true
        this.show_file = true
        this.show_close = true
        this.detailed_data = raw
        let field = ''
        switch(type){
          case 1:
          field = 'video'
          break;
          case 2:
          field = 'file_pdf'
          break;
          case 3:
          field = 'pre_test'
          break;
          case 4:
          field = 'post_test'
          break;
          case 5:
          field = 'file_pdf'
          break;
          case 6:
          field = 'video'
          break;
          default:
          field = 'No field here'
        }
        this.detailed = Object.keys(raw)
        .filter(key => field.includes(key))
        .reduce((obj, key) => {
          obj[key] = raw[key];
          // console.log(obj)
          return obj;
        }, {});

        const format_yt  = this.detailed.video ? this.$ytString(this.detailed.video) : ''

        this.type = type

        this.FileType(type)

        this.id_test = id_kategori
        this.id_webinar = id_kategori

        setTimeout(() => {
          this.loading = false
        }, 900)


        // console.log(this.detailed);
      },

      UserProfileData(){
        if(this.token){         
          const url = `${this.api_url}/web/user`
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
          this.$axios.get(url)
          .then(({data}) => {
            this.profiles = this.$username(data.user.nama)
          })
          .catch(err => console.log(err.response ? err.response : ''))
        }
      }
    }
  }
</script>
