<template>
  <div>
    <mdb-navbar
    class="fixed-top lighten-4 navbar-9"
    light
    color="white"
    expand="large"
    togglerIcon=""
    animated
    animation="2"
    >
    <!-- Navbar brand -->
    <mdb-navbar-brand>
      <nuxt-link to="/">
        <!-- <MoleculesLayoutMoleculesBrand /> -->
        <img :src="require('~/assets/images/logo/Logo.svg')" class="img-fluid">
      </nuxt-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler class="mt-3 mb-2">
      <mdb-navbar-nav right>
        <mdb-nav-item active waves-fixed to="/"> Home </mdb-nav-item>
        <mdb-nav-item waves-fixed to="/events"> Katalog Kelas </mdb-nav-item>
        <mdb-nav-item
        v-if="token.accessToken"
        waves-fixed
        :to="`/profile/${$username(slug)}/events`"
        >
        Akses Pelatihan
      </mdb-nav-item>
      <mdb-dropdown tag="li" class="nav-item">
        <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed class="no-caret">
          Tentang Diklat <mdb-icon icon="external-link-alt" />
        </mdb-dropdown-toggle>
        <mdb-dropdown-menu :class="`${$device.isDesktop ? 'mt-4' : ''}`">
          <mdb-dropdown-item v-for="item in links" :key="item.id">
            <nuxt-link :to="item.link">
              {{ item.name }}
            </nuxt-link>
          </mdb-dropdown-item>
        </mdb-dropdown-menu>
      </mdb-dropdown>
      <mdb-nav-item waves-fixed>
        <nuxt-link to="/rsi/berita" tag="li" navLink > Berita </nuxt-link>
      </mdb-nav-item>
    </mdb-navbar-nav>
    <!-- check user login -->
    <nuxt-link
    to="/events/search"
    class="my__btn-circle btn shadow-none mt-3"
    size="md"
    ><mdb-icon icon="search" size="md" /></nuxt-link>
    <mdb-dropdown tag="li" class="nav-item ml-3 mr-3 mt-3">
      <mdb-dropdown-toggle slot="toggle" class="btn rounded-pill my__btn-circle shadow-none no-caret">
        <span v-if="token.accessToken && notifs" :class="`${notifs > 0 ? 'badge badge-success badge-sm' : 'badge badge-danger badge-sm'}`" style="float:right;margin-right: .3rem;border-radius: 45%;margin-bottom:-25px;"> {{notifs}} </span>

        <mdb-icon icon="shopping-cart" size="lg" style="margin-top: -.2rem;margin-left: -.2rem;"/>  <span class="sr-only">(current)</span>
      </mdb-dropdown-toggle>
      <mdb-dropdown-menu class="mt-3 keranjang__dropdown">
        <mdb-container>
          <mdb-row>
            <mdb-col col="12" lg="12" xs="12" sm="12">
              <h5>Keranjang Saya</h5>
            </mdb-col>

            <mdb-col lg="12">
             <div class="dropdown-divider"></div>
           </mdb-col>

           <mdb-col lg="12" xs="12" sm="12">
            <div v-if="token.accessToken && data_cart.length > 0" class="list__cart">
              <div v-for="(item, index) in data_cart" :key="item.id" class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight title__event">
                  {{item.title}}
                </div>
                <div class="p-2 bd-highlight">
                  {{$format(item.harga)}}
                </div>
                <div class="p-2 bd-highlight">
                  <i class="fa fa-times fa-fw fa-lg" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div v-else>
              <mdb-row>
                <mdb-col col="12" sm="12" md="12">
                  <mdb-alert color="info">
                    Belum ada pelatihan yang ditambahkan!
                  </mdb-alert>
                </mdb-col>
              </mdb-row>
            </div>
          </mdb-col>

          <mdb-col lg="12">
           <div class="dropdown-divider"></div>
         </mdb-col>

         <mdb-col lg="12" xs="12" sm="12" class="link__page">
          <div class="float-right">            
            <nuxt-link :to="`${token.accessToken ? `/profile/${$username(slug)}/keranjang` : '/auth/login'}`">
              Lihat Keranjang
            </nuxt-link>
          </div>
        </mdb-col>

      </mdb-row>
    </mdb-container>
  </mdb-dropdown-menu>
</mdb-dropdown>
<mdb-col lg="12">
 <div class="dropdown-divider"></div>
</mdb-col>

<mdb-row v-if="token.accessToken">
  <mdb-col col="12" sm="12">
    <mdb-dropdown tag="li" class="nav-item mt-4">
      <mdb-dropdown-toggle tag="a" navLink slot="toggle">
        <b-avatar
        v-if="
        profiles.photo !==
        'https://api.rsi-online.com/image-profiles/null'
        "
        variant="info"
        :src="profiles.photo"
        ></b-avatar>
        <b-avatar
        v-else
        variant="primary"
        :text="slug.charAt(0)"
        ></b-avatar>
        <!--   <b-img v-else :src="`${require('~/assets/images/profile/profile.svg')}`" rounded="circle" alt="Circle image" width="30" height="30"></b-img> -->
        {{ profiles.nama }}
      </mdb-dropdown-toggle>
      <mdb-dropdown-menu>
        <mdb-dropdown-item>
          <nuxt-link
          :to="{
            name: 'profile-name',
            params: { name: $username(slug) },
          }"
          class="text-center"
          >
          <b-avatar v-if="profiles.photo !== 'https://api.rsi-online.com/image-profiles/null'" variant="info" :src="profiles.photo" size="1.7rem"></b-avatar>
          <b-avatar v-else variant="primary" :text="slug.charAt(0)" size="1.7rem"></b-avatar> &nbsp; <b>{{ profiles.nama }}</b>
        </nuxt-link>
        <!-- <mdb-icon far icon="user-circle" size="lg"/>  -->
                    <!-- <a :href="`/profile/${$username(slug)}`" class="text-center">
                    <mdb-icon icon="user-md" /> Profile
                  </a> -->
                </mdb-dropdown-item>
                <div class="dropdown-divider"></div>
                <mdb-dropdown-item @click="Logout" class="text-center">
                  <mdb-icon icon="sign-out-alt" /> Logout
                </mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
          </mdb-col>
        </mdb-row>

        <div v-else>
          <mdb-row class="row justify-content-center">
            <mdb-col col="12" lg="12" xs="12" sm="12" class="mt-2">
              <nuxt-link 
              to="/auth/masuk"
              class="my__btn-secondary rounded-pill btn btn-block btn-md shadow-none"
              size="md"
              >Masuk</nuxt-link>
            </mdb-col>
            <mdb-col lg="12" xs="12" sm="12" class="mt-2">
              <nuxt-link
              to="/auth/registrasi"
              class="my__btn-primary rounded-pill btn btn-block btn-md shadow-none"
              size="md"
              >Daftar</nuxt-link>
            </mdb-col>         
          </mdb-row>
        </div>

        <!-- end check -->
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
  export default {
    props: ["token", "profiles", "slug", "event_id", "event_path"],
    data() {
      return {
        links: [
         { id: 1, name: "Yayasan & Direksi", link: "/rsi/yayasan-direksi" },
         { id: 2, name: "Visi & Misi", link: "/rsi/visi-misi" },
         {
          id: 3,
          name: "Agenda Pelatihan",
          link: "/rsi/agenda-pelatihan",
        },
        {
          id: 4,
          name: "Struktur Organisasi",
          link: "/rsi/struktur-organisasi",
        },
        { id: 5, name: "Fasilitas", link: "/rsi/fasilitas" },
        { id: 6, name: "Testimoni", link: "/rsi/testimoni" },
        { id: 7, name: "Fasilitator", link: "/rsi/fasilitator" }
        ],
        path: this.$route.path,
        mainProps: { blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' },
        scrolledToBottom: false,
        notifs: 0,
        data_cart:{}
      };
    },

    beforeMount(){
      this.scroll(),
      this.CheckKeranjang()
    },

    methods: {
      Logout() {
        this.$emit("logout-profile");
      },

      ToggleNotif(){
        this.notifs = this.notifs > 0 ? this.notifs + 3 : 0
      },

      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = window.pageYOffset
          // console.log(bottomOfWindow)
          let fixeNav= document.querySelector('.fixed-top')

          if (bottomOfWindow) {
           this.scrolledToBottom = true // replace it with your code
           fixeNav.classList.remove('shadow-none')
           fixeNav.classList.add('z-depth-2')
         }else{
          this.scrolledToBottom = false
          fixeNav.classList.add('shadow-none')
          fixeNav.classList.remove('z-depth-2')
        }
      }
    },
    GoToLogin() {
      if (this.event_id === this.$route.params.id) {
        const data = {
          event_id: this.event_id,
          event_path: this.event_path,
        };
        this.SetEventLogin(data);
      } else {
        this.$router.push({ name: "auth-login" });
      }
    },

    GoToRegistrasi(){
      this.$router.push({ name: "auth-registrasi" });
    },

    SetEventLogin(data) {
      this.$store.dispatch("config/setEventToLogin", JSON.stringify(data));
      this.$router.push({
        name: "auth-login",
      });
    },

    CheckKeranjang() {
      this.data_cart=(localStorage.getItem("carts")
        ? JSON.parse(localStorage.getItem("carts"))
        : "");
      this.notifs = this.data_cart.length
    }
  },

  computed: {
    set_event() {
      return this.$store.getters["config/ConfigSetEventLogin"];
    },
  },
};
</script>
