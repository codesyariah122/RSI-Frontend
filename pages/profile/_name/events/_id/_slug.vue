<template>
  <div>
    <div class="docs-wrapper">
      <ProfilepageEventDashboardSidebar
      :loading="loading"
      :username="username"
      :pelatihans="pelatihans"
      :scrolledToBottom="scrolledToBottom"
      @show-field="ShowField"
      @toggle-file="ToggleFile"
      :profiles="profiles"
      :details="details"
      />

      <div class="docs-content">
        <div class="container">
          <!-- Sidebar Toggler -->
          <!-- <MoleculesProfilePageTogglerSidebar /> -->

          <!-- <ColorModePicker/> -->

          <article v-if="!show_file" class="docs-article">
            <header class="docs-header">
              <section class="docs-section mt-2" id="item-1-1">
                <div v-if="loading" class="mb-5">
                  <b-card>
                    <b-skeleton animation="wave" width="85%"></b-skeleton>
                    <b-skeleton animation="wave" width="55%"></b-skeleton>
                    <b-skeleton animation="wave" width="70%"></b-skeleton>
                  </b-card>
                </div>
                <div v-else class="callout-block callout-block-success">
                  <div class="content">
                    <h2 class="callout-title">
                      <span class="callout-icon-holder me-1">
                        <i class="fas fa-info-circle"></i>
                      </span>
                      {{ ucapan }} {{ profiles.nama }}
                    </h2>
                    <p>
                      <strong
                        >Selamat Datang di Dashboard Pelatihan RSI Sultan Agung</strong
                      >
                    </p>
                  </div>
                  <div class="time mt-2 mb-3">
                    <GlobalsTime />
                  </div>
                </div>
              </section>
              <!--//section-->
              <section class="docs-intro mt-5" id="section-1">
                <!-- <ProfilepageEventDashboardDetailEvent
                :details="details"
                :loading="loading"
                :status_pendaftaran="status_pendaftaran"
                /> -->
              </section>
              <!--//docs-intro-->
            </header>
          </article>

          <article v-else class="docs-article mt-5" id="section-2">
            <div v-if="loading_file">
              <div v-if="type_name !== 'Pre Test' && type_name !== 'Post Test'">
                <b-progress
                :max="max"
                height="2rem"
                :striped="true"
                show-progress
                :animated="true"
                class="mb-3"
                >
                <b-progress-bar :value="value" variant="success">
                  <h5 v-if="value > 0" class="text-white">Loading</h5>
                </b-progress-bar>
              </b-progress>
            </div>
            <b-card>
              <b-skeleton animation="throb" width="85%"></b-skeleton>
              <b-skeleton animation="throb" width="55%"></b-skeleton>
              <b-skeleton animation="throb" width="70%"></b-skeleton>
            </b-card>
          </div>

          <!-- Konten utama -->
          <div v-else>
            <ProfilepageEventDashboardShowContent
            :type_name="type_name"
            :type="type"
            :detailed_data="detailed_data"
            :link_yt="link_yt"
            :max="max"
            :value="value"
            :detailed="detailed"
            :token="token"
            :api_url="api_url"
            :pelatihans="pelatihans"
            :details="details"
            :id_test="id_test"
            :id_webinar="id_webinar"
            :profiles="profiles"
            :username="username"
            :kegiatan_id="kegiatan_id"
            :pelatihan_id="pelatihan_id"
            :evaluasi="evaluasi"
            />
          </div>
        </article>

        <ProfilepageEventDashboardFooterDashboard />
      </div>
    </div>
  </div>
  <!--//docs-wrapper-->
</div>
</template>

<script>
  import ColorModePicker from "@/components/Globals/ColorModePicker";

  export default {
    name: "profile-events-id-slug",
    layout: "profile-event",
    components: {
      ColorModePicker,
    },
    data() {
      return {
        profiles: {},
        username: "",
        details: [],
        works: [],
        maritals: [],
        pelatihans: [],
        categories: [],
        status_pendaftaran: "",
        empty_filter: false,
        loading: null,
        loading_file: null,
        pelatihans: [],
        kegiataan: [],
        kegiatan_id: "",
        pelatihan_id: "",
        evaluasi: [],
        categories: "",
        category_title: "",
        detailed_data: {},
        category_name: "",
        detailed: "",
        type: "",
        tgl: "",
        start: "",
        end: "",
        visible: true,
        show_file: false,
        id_test: "",
        id_webinar: "",
        type_name: "",
        link_yt: "",
        show_close: false,
        scrolledToBottom: false,
        hideHeader: false,
        ucapan: "",
        timer: 0,
        value: 0,
        max: 200,
      };
    },

    beforeMount() {
      this.ConfigApiUrl(), this.UserProfileData();
    },

    mounted() {
      this.CheckToken(),
      this.IsLoggedIn(),
      this.CheckLogout(),
      this.EventAktif(),
      this.DetailEventProfileLogin(),
      this.StatusPembayaran(),
      this.VenoBox(),
      this.WelcomeText();
    },

    methods: {
      IsLoggedIn() {
        if (!this.token.accessToken) {
          this.$swal({
            icon: "error",
            title: "Oops...",
            text: "Anda tidak mempunyai hak akses ke halaman ini! / sesi login telah habis, silahkan login kembali",
          });
          setTimeout(() => {
            this.$router.push({
              name: "auth-login",
            });
          }, 1300);
        }
      },

      CheckToken() {
        this.$store.dispatch("config/checkAuthLogin", "token");
      },

      CheckLogout() {
        this.$store.dispatch("config/getProfileLogout", "logout");
      },

      ConfigApiUrl() {
        const api_url = process.env.NUXT_ENV_API_URL;
        this.$store.dispatch("config/storeConfigApiUrl", api_url);
      },

      EventAktif() {
        this.loading = true;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
        .get(`${this.api_url}/web/event/${this.$route.params.id}`)
        .then(({ data }) => {
          this.kegiatan = data.kegiatan;
          this.pelatihans = data.pelatihans;
          data.pelatihans.map((d) => {
            this.evaluasi.push(d);
            this.pelatihan_id = d.id;
            this.kegiatan_id = d.kegiatan_id;
          });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false;
        }, 900);
      },

      ToggleFile() {
        if (this.show_file || this.show_close) {
          this.show_file = false;
          this.show_close = false;
        }
      },

      FileType(type) {
        switch (type) {
          case 1:
          this.type_name = "Video Materi";
          break;
          case 2:
          this.type_name = "File Materi";
          break;
          case 3:
          this.type_name = "Pre Test";
          break;
          case 4:
          this.type_name = "Post Test";
          break;
          case 5:
          this.type_name = "File";
          break;
          case 6:
          this.type_name = "Video Webinar";
          break;
          default:
          this.type_name = "No type here";
        }
      },
      ShowCategory(id) {
        console.log(id);
        const filter = this.pelatihans.filter((d) => d.id == id);
        this.categories = filter.map((c) => {
          return c.categories.map((d) => {
            this.category_name = d.title;
            return d;
          });
        });
      },
      ShowField(raw, id_kategori = "", type) {
        window.scrollTo(0, 0);
        this.loading_file = true;
        this.show_file = true;
        this.show_close = true;
        this.detailed_data = raw;
        let field = "";
        switch (type) {
          case 1:
          field = "video";
          break;
          case 2:
          field = "file_pdf";
          break;
          case 3:
          field = "pre_test";
          break;
          case 4:
          field = "post_test";
          break;
          case 5:
          field = "file_pdf";
          break;
          case 6:
          field = "video";
          break;
          default:
          field = "No field here";
        }
        this.detailed = Object.keys(raw)
        .filter((key) => field.includes(key))
        .reduce((obj, key) => {
          obj[key] = raw[key];
          return obj;
        }, {});
      // const yt_link  = this.detailed.video ? this.$ytString(this.detailed.video) : ''
      const yt_link = this.detailed.video;
      // console.log(yt_link)
      this.link_yt = yt_link ? true : false;
      this.startTimer();
      this.type = type;
      this.FileType(type);
      this.id_test = id_kategori;
      this.id_webinar = id_kategori;
      setTimeout(() => {
        this.loading_file = false;
        window.scrollTo(0, 0);
      }, 900);
      setTimeout(() => {
        this.link_yt = false;
      }, 2500);
    },

    startTimer() {
      let vm = this;
      let timer = setInterval(function () {
        vm.value += 6;
        if (vm.value >= vm.max) clearInterval(timer);
      }, 100);
      vm.value = 0;
    },

    UserProfileData() {
      if (this.token) {
        this.loading = true;
        const url = `${this.api_url}/web/user`;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
        .get(url)
        .then(({ data }) => {
          this.profiles = data.user;
          this.works = data.pekerjaan;
          this.username = this.$username(data.user.nama);
        })
        .catch((err) => console.log(err.response ? err.response : ""))
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      }
    },

    DetailEventProfileLogin() {
      if (this.token.accessToken) {
        const url = `${this.api_url}/web/event/${this.$route.params.id}`;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
        .get(url)
        .then(({ data }) => {
            // console.log(data)
            this.details = data.kegiatan;
          })
        .catch((err) => console.log(err));
      }
    },

    StatusPembayaran() {
      if (this.token.accessToken) {
        this.loading = true;
        const url = `${this.api_url}/web/event/${this.$route.params.id}`;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
        .get(url)
        .then(({ data }) => {
          this.status_pendaftaran = data.kegiatan.status_pendaftaran_value;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
      }
    },

    WelcomeText() {
      var h = new Date().getHours();
      var m = new Date().getMinutes();
      var s = new Date().getSeconds();
      if (h >= 4 && h < 10) this.ucapan = "Selamat Pagi,";
      if (h >= 10 && h < 15) this.ucapan = "Selamat Siang,";
      if (h >= 15 && h < 18) this.ucapan = "Selamat Sore,";
      if (h >= 18 || h < 4) this.ucapan = "Selamat Malam,";
    },

    VenoBox() {
      new VenoBox({
        selector: ".event-detail",
        numeration: true,
        infinigall: true,
        share: ["facebook", "twitter", "linkedin", "pinterest", "download"],
        spinner: "rotating-plane",
      });
    },
  },

  computed: {
    token() {
      return this.$store.getters["config/ConfigCheckLogin"];
    },
    api_url() {
      return this.$store.getters["config/ConfigApiUrl"];
    },
    logout_data() {
      return this.$store.getters["config/ConfigProfileDataLogout"];
    },
  },
};
</script>
