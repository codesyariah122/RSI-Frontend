<template>
  <div id="docs-sidebar" class="docs-sidebar">
    <div v-if="loading" class="mt-5">
      <b-skeleton animation="throb" width="85%"></b-skeleton>
      <b-skeleton animation="throb" width="55%"></b-skeleton>
      <b-skeleton animation="throb" width="70%"></b-skeleton>
    </div>
    <nav v-else id="docs-nav" class="docs-nav navbar shadow-none">
      <ul class="section-items list-unstyled nav flex-column pb-3">
        <li class="nav-item__sidebar section-title">
          <h5>
           {{details.kegiatan_title}}
         </h5>
       </li>
       <li class="nav-item__sidebar">
        <div class="row justify-content-start profile__fasilitator">
          <div class="col-md-5 avatar">
            <b-avatar :src="require('~/assets/images/Avatar/5.jpg')" size="5rem"></b-avatar>
          </div>
          <div class="col-md-7 profile">
            <h5>dr. Hasan Fadly</h5>
            <blockquote>Dokter Umum</blockquote>
          </div>
        </div>
      </li>
      <b-dropdown-divider
      style="list-style: none; margin-top: 0.5rem"
      ></b-dropdown-divider>

      <div v-if="loading">
        <mdb-spinner big multicolor />
      </div>

      <div v-else class="collapse__docs">
        
          <div
          v-for="(item, index) in pelatihans"
          :key="item.id"
          >
          <b-button
          v-b-toggle="`collapse-${item.id}`"
          class="active btn__pelatihan shadow-none nav-item__sidebar nav-link__sidebar section-title"
          @click="ToggleFile(index + 1, item.title)"
          >
          <mdb-row col="12" class="d-flex justify-content-between">
            <mdb-col col="9" md="9" sm="9" xs="9">
              <h6>{{ item.title }}</h6>
              <small> {{$moment(item.tanggal).format("LLLL")}} </small>
            </mdb-col>

            <mdb-col col="2" md="2" sm="2" xs="2">
              <mdb-icon 
              :icon="`${
                show_collapse && index + 1 === urutan
                ? 'angle-down'
                : 'angle-right'
              }`"
              size="lg"
              />
            </mdb-col>
          </mdb-row>
        </b-button>

        <b-collapse
        :id="`collapse-${item.id}`"
        class="collapse__category-event shadow-none"
        >
        <b-card class="shadow-none">
          <div v-for="(c, index) in item.categories" :key="c.id">
            <h6> {{c.urutan}}. {{c.title}} </h6>
            <div v-for="(d, index) in c.details" :key="d.id">
              <b-list-group class="list__modul">
                <b-list-group-item
                class="list-unstyled"
                @click="
                ShowField(
                  d,
                  d.kategori == 3 || d.kategori == 4 || d.kategori == 6
                  ? d.id
                  : d.kategori,
                  d.kategori
                  )
                  "
                  >
                  <mdb-row>
                    <mdb-col md="10" xs="10" sm="10" col="10">
                      <mdb-icon color="success" :icon="FilterIcon(d.kategori)" :size="`${$device.isDesktop ? 'lg' : 'sm'}`"/> <a
                      class="link__text"
                      :href="`#item-${d.kategori}`"
                      @click="
                      ShowField(
                        d,
                        d.kategori == 3 ||
                        d.kategori == 4 ||
                        d.kategori == 6
                        ? d.id
                        : d.kategori,
                        d.kategori
                        )
                        "
                        >
                        {{ d.title }}
                      </a>

                    </mdb-col>
                    <mdb-col md="1" xs="1" sm="1" col="1">
                      <mdb-icon far icon="circle" color="success" :size="`${$device.isDesktop ? 'lg' : 'sm'}`"/>
                    </mdb-col>
                  </mdb-row>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <b-button
            v-b-toggle="`collapse-absensi`"
            class="active btn__pelatihan shadow-none nav-item__sidebar nav-link__sidebar section-title sidebar__absen"
            @click="ToggleFile(pelatihans.length+2, kegiatan_title)"
            >

                <mdb-row col="12" class="row justify-content-start">
                  <mdb-col col="9" md="9" sm="9" xs="9"> 
                    Absensi {{kegiatan_title}}
                  </mdb-col>

                  <mdb-col col="1" md="1" sm="1" xs="1">
                    <mdb-icon
                    :icon="`${
                      show_collapse && pelatihans.length+2 === urutan
                      ? 'angle-down'
                      : 'angle-right'
                    }`"
                    size="lg"
                    />
                  </mdb-col>
                </mdb-row>
            </b-button>

            <b-collapse
            :id="`collapse-absensi`"
            class="collapse__category-event collapse__absensi -3 shadow-none"
            >
                <b-card class="shadow-none">
                  <div v-for="(evaluasi, index) in absensis" :key="evaluasi.id">
                    <b-list-group class="list__modul">
                      <b-list-group-item
                      class="list-unstyled"
                      @click="ShowField(evaluasi, evaluasi.id, evaluasi.id, kegiatan_title)"
                      >
                      <mdb-row>
                        <mdb-col md="10" xs="10" sm="10" col="10">
                          <mdb-icon color="success" far icon="calendar-alt" :size="`${$device.isDesktop ? 'lg' : 'sm'}`"/> <a
                          class="link__text"
                          :href="`#item-${evaluasi.id}`"
                          @click="ShowField(evaluasi, evaluasi.id, evaluasi.id)"
                          >{{ evaluasi.nama }}
                        </a>
                      </mdb-col>
                      <mdb-col md="2" xs="2" sm="2" col="2">
                        <mdb-icon far icon="circle" color="success" :size="`${$device.isDesktop ? 'lg' : 'sm'}`"/>
                      </mdb-col>
                    </mdb-row>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-card>
          </b-collapse>
        </b-card>
      </b-collapse>
    </div>
    <b-dropdown-divider
      style="list-style: none; margin-top: 0.7rem;margin-bottom: 1.5rem;"
      ></b-dropdown-divider>
    <b-button
    v-b-toggle="`collapse-evaluasi`"
    class="active btn__pelatihan shadow-none nav-item__sidebar nav-link__sidebar section-title"
    @click="ToggleFile(pelatihans.length + 1)"
    >
    <mdb-row col="12" class="d-flex justify-content-between">
      <mdb-col col="9" md="9" sm="9" xs="9"> 
       <h5> Evaluasi </h5>
     </mdb-col>

     <mdb-col col="2" md="2" sm="2" xs="2">
      <mdb-icon
      :icon="`${
        show_collapse && pelatihans.length+1 === urutan
        ? 'angle-down'
        : 'angle-right'
      }`"
      size="lg"
      />
    </mdb-col>
  </mdb-row>
</b-button>

<b-collapse
:id="`collapse-evaluasi`"
class="collapse__category-event shadow-none"
>
<b-card class="shadow-none">
  <div v-for="(evaluasi, index) in evaluasis" :key="evaluasi.id">
    <b-list-group class="list__modul">
      <b-list-group-item
      class="list-unstyled"
      @click="ShowField(evaluasi, evaluasi.id, evaluasi.id)"
      >
      <mdb-row>
        <mdb-col md="10" xs="10" sm="10" col="10">
          <mdb-icon color="success" far icon="calendar-check" :size="`${$device.isDesktop ? 'lg' : 'sm'}`"/> <a
          class="link__text"
          :href="`#item-${evaluasi.id}`"
          @click="ShowField(evaluasi, evaluasi.id, evaluasi.id)"
          >
          {{ evaluasi.nama }}
        </a>
      </mdb-col>
      <mdb-col md="1" xs="1" sm="1" col="1">
        <mdb-icon far icon="circle" color="success" :size="`${$device.isDesktop ? 'lg' : 'sm'}`"/>
      </mdb-col>
    </mdb-row>
  </b-list-group-item>
</b-list-group>
</div>
</b-card>
</b-collapse>

    <!-- <b-button
    v-b-toggle="`collapse-absensi`"
    class="active btn__pelatihan shadow-none nav-item__sidebar nav-link__sidebar section-title"
    @click="ToggleFile(pelatihans.length+2)"
    >
    <mdb-row col="12" class="d-flex justify-content-between">
      <mdb-col col="9" md="9" sm="9" xs="9"> 
        <h5>Absensi</h5> 
      </mdb-col>

      <mdb-col col="2" md="2" sm="2" xs="2">
        <mdb-icon
        :icon="`${
          show_collapse && pelatihans.length+2 === urutan
          ? 'angle-down'
          : 'angle-right'
        }`"
        size="lg"
        />
      </mdb-col>
    </mdb-row>
    </b-button>

    <b-collapse
    :id="`collapse-absensi`"
    class="collapse__category-event -3 shadow-none"
    >
    <b-card class="shadow-none">
      <div v-for="(evaluasi, index) in absensis" :key="evaluasi.id">
        <b-list-group class="list__modul">
          <b-list-group-item
          class="list-unstyled"
          @click="ShowField(evaluasi, evaluasi.id, evaluasi.id)"
          >
          <mdb-row>
            <mdb-col md="10" xs="10" sm="10" col="10">
              <mdb-icon color="success" far icon="calendar-alt" :size="`${$device.isDesktop ? 'lg' : 'sm'}`"/> <a
              class="link__text"
              :href="`#item-${evaluasi.id}`"
              @click="ShowField(evaluasi, evaluasi.id, evaluasi.id)"
              >
              {{ evaluasi.nama }}
            </a>
          </mdb-col>
          <mdb-col md="1" xs="1" sm="1" col="1">
            <mdb-icon far icon="circle" color="success" :size="`${$device.isDesktop ? 'lg' : 'sm'}`"/>
          </mdb-col>
        </mdb-row>
      </b-list-group-item>
    </b-list-group>
    </div>
    </b-card>
    </b-collapse> -->

  </div>


</ul>
</nav>
<!--//docs-nav-->
</div>
<!--//docs-sidebar-->
</template>

<script>
  export default {
    props: [
    "pelatihans",
    "profiles",
    "username",
    "loading",
    "scrolledToBottom",
    "details",
    ],

    data() {
      return {
        show_collapse: false,
        urutan: "",
        kegiatan_title: '',
        evaluasis: [
        {
          id: 7,
          nama: "Evaluasi Fasilitator",
        },
        {
          id: 8,
          nama: "Evaluasi Penyelenggaraan",
        },
        {
          id: 9,
          nama: "Evaluasi Pasca Kegiatan",
        },
        {
          id: 10,
          nama: "Evaluasi Rencana Tindak Lanjut",
        },
        ],
        absensis: [
        {
          id: 11,
          nama: "Absensi Pelatihan",
        },
        ],

      };
    },

    mounted() {
      this.SetupSidebar(), this.SidebarLink();
    },

    methods: {
      FilterIcon(type) {
        switch (type) {
          case 1:
          return "video";
          break;
          case 2:
          return "file-pdf";
          break;
          case 3:
          return "file-alt";
          break;
          case 4:
          return "file-archive";
          break;
          case 5:
          return "file-pdf";
          break;
          case 6:
          return "file-video";
          break;
          default:
          return "No type here";
        }
      },

      ShowField(raw, id_kategori = "", type, kegiatan_title) {
        window.scrollTo(0, 0);
        this.$emit("show-field", raw, id_kategori, type, kegiatan_title);
      },

      ToggleFile(urutan, kegiatan_title) {
        // console.log(urutan)
        if (urutan) {
          this.kegiatan_title = kegiatan_title
          this.urutan = urutan;
          this.show_collapse = !this.show_collapse;
        }
      // this.show_collapse = !this.show_collapse
      window.scrollTo(0, 0);
      this.$emit("toggle-file");
    },

    LogoutProfile() {
      // console.log(this.$route.path)
      this.$swal({
        title: `Keluar sebagai ${this.profiles.nama}?`,
        text: "Anda akan keluar dari halaman profile!",
        icon: "warning",
        showCancelButton: true,
        confiruttonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confiruttonText: "Ya, Lanjut keluar!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("config/storeConfigAuth", "");
          this.$store.dispatch("config/setEventToLogin", "");
          this.$store.dispatch(
            "config/setProfileLogout",
            JSON.stringify({
              logout: true,
              username: this.$username(this.profiles.nama),
            })
            );
          this.$swal(
            "Logout!",
            `Anda berhasil keluar dari profile ${this.profiles.nama}.`,
            "success"
            );
          this.$router.push({
            // name: 'auth-login'
            path: this.$route.path,
          });
          setTimeout(() => {
            location.reload();
          }, 900);
        }
      });
    },

    SetupSidebar() {
      const sidebar = document.getElementById("docs-sidebar");
      sidebar.classList.add("sidebar-visible");
      let w = window.innerWidth;
      window.onload = function () {
        if (w >= 1200) {
          console.log("larger");
          sidebar.classList.remove("sidebar-hidden");
          sidebar.classList.add("sidebar-visible");
        } else {
          console.log("smaller");
          sidebar.classList.remove("sidebar-visible");
          sidebar.classList.add("sidebar-hidden");
        }
      };

      window.onresize = function () {
        if (w >= 1200) {
          console.log("larger");
          sidebar.classList.remove("sidebar-hidden");
          sidebar.classList.add("sidebar-visible");
        } else {
          console.log("smaller");
          sidebar.classList.remove("sidebar-visible");
          sidebar.classList.add("sidebar-hidden");
        }
      };
    },

    SidebarLink() {
      const sidebarLinks = document.querySelectorAll("#docs-nav .scrollto");
      console.log(sidebarLinks);
      sidebarLinks.forEach((sidebarLink) => {
        sidebarLink.addEventListener("click", (e) => {
          console.log(e);
          console.log("check");
          e.preventDefault();

          var target = sidebarLink.getAttribute("href").replace("#", "");
          var sidebar = document.getElementById("docs-sidebar");

          document
          .getElementById(target)
          .scrollIntoView({ behavior: "smooth" });
          if (
            sidebar.classList.contains("sidebar-visible") &&
            window.innerWidth < 1200
            ) {
            sidebar.classList.remove("sidebar-visible");
          sidebar.classList.add("sidebar-hidden");
        }
      });
      });
    },
  },
};
</script>
