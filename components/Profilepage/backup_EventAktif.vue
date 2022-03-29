<template>
  <div>
    <hr class="mt-5">
    <mdb-container  v-if="status_pendaftaran !== 'Menunggu Konfirmasi' &&status_pendaftaran !== 'Daftar'" :class="`${$device.isDesktop ? 'mt-5' : ''}`">
      <mdb-row lg="12" class="justify-content-center mt-2 mb-5">
        <mdb-col col="12">
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
        <mdb-row class="row justify-content-center">
          <mdb-col col="4" md="4" class="nav__event-pelatihan">
            <div v-for="(item, index) in pelatihans" :key="item.id">
              <b-button v-b-toggle="`collapse-${item.id}`" class="btn__pelatihan shadow-none" @click="ToggleFile">
                <mdb-row class="row justify-content-between">
                  <mdb-col md="8">  
                    {{item.title}}
                  </mdb-col>
                  <mdb-col md="1">
                    <mdb-icon icon="plus-circle" size="lg"/>
                  </mdb-col>
                </mdb-row>
              </b-button>

              <b-collapse :id="`collapse-${item.id}`" class="collapse__category-event mb-3 shadow-none">
                <b-card class="shadow-none">
                  <div v-for="(c, index) in item.categories"  :key="c.id">
                    <div v-for="(d, index) in c.details" :key="d.id">
                      <b-list-group class="list__modul">
                        <b-list-group-item id="navbar__event-detail">
                          <a class="font-weight-bold" :href="`#item-${d.kategori}`" @click="ShowField(d, d.kategori == 3 || d.kategori == 4 || d.kategori == 6 ? d.id : d.kategori, d.kategori)">
                            <mdb-icon :icon="FilterIcon(d.kategori)"/> {{d.title}}
                          </a>
                        </b-list-group-item>
                      </b-list-group>
                    </div>
                  </div>
                </b-card>
              </b-collapse>
            </div>
          </mdb-col>

          <mdb-col  md="8" class="content__event-pelatihan">
            <div v-if="loading">
              <div class="text-center">
                <div class="spinner-border text-primary" role="status" style="width:120px; height:120px; margin-top: 10rem;">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <!-- Show file event -->
            <div v-else>
              <mdb-row>
                <mdb-col md="12" class="column__content">
                  <mdb-tooltip v-if="show_close" trigger="hover" :options="{placement: 'bottom'}" class="float-right">
                    <span slot="tip"> Close {{type == 3 || type == 4 ? 'Test' : 'File'}} </span>
                    <a slot="reference" class="icon__close" @click="ToggleFile">
                      <mdb-icon  icon="times-circle" size="lg" />
                    </a>
                  </mdb-tooltip>
                  <div v-if="show_file" data-spy="scroll" data-target="#navbar__event-detail" data-offset="0">

                    <div v-if="type == 1" class="embed__file">
                      <h5 class="type__name">{{type_name}}</h5>
                      <h2>{{detailed_data.title}}</h2>
                      <EventpageVideoSection :video="detailed.video"/>
                    </div>

                    <div v-else-if="type == 2" class="embed__file">
                      <h5 class="type__name">{{type_name}}</h5>
                      <h2>{{detailed_data.title}}</h2>
                      <object :data="detailed.file_pdf" type="application/pdf" width="100%" :height="`${$device.isDesktop ? '800px' : '500px'}`">
                      </object>
                    </div>

                    <div v-else-if="type == 3" class="embed__file">
                      <h5 class="type__name">{{type_name}}</h5>
                      <h2>{{detailed_data.title}}</h2>
                      <EventTestPreTest :id_test="id_test" :type_name="type_name" :token="token" :api_url="api_url"/>
                    </div>

                    <div v-else-if="type == 4" class="embed__file">
                      <h5 class="type__name">{{type_name}}</h5>
                      <h2>{{detailed_data.title}}</h2>
                      <EventTestPostTest :id_test="id_test" :type_name="type_name" :token="token" :api_url="api_url"/>
                    </div>

                    <div v-else-if="type == 5" class="embed__file">
                      <h5 class="type__name">{{type_name}}</h5>
                      <h2>{{detailed_data.title}}</h2>
                      <object :data="detailed.file_pdf" type="application/pdf" width="100%" :height="`${$device.isDesktop ? '700px' : '500px'}`">
                      </object>
                    </div>

                    <div v-else-if="type == 6" class="embed__file">
                      <h5 class="type__name">{{type_name}}</h5>
                      <h2>{{detailed_data.title}}</h2>
                      <EventWebinar :id_webinar="id_webinar" :token="token" :api_url="api_url"/>
                    </div>
                  </div>
                </mdb-col>

              </mdb-row>
            </div>
          </mdb-col>
        </mdb-row>
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
