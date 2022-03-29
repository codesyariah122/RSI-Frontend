<template>
  <div>
    <b-card v-if="loading">
      <b-row>
        <b-col cols="2">
          <b-skeleton
            type="avatar"
            :size="`${$device.isDesktop ? size : '3rem'}`"
          ></b-skeleton>
        </b-col>
        <b-col cols="4">
          <b-skeleton animation="wave" width="85%"></b-skeleton>
          <b-skeleton animation="wave" width="55%"></b-skeleton>
          <b-skeleton animation="wave" width="70%"></b-skeleton>
        </b-col>
        <b-col cols="6">
          <b-row>
            <b-col cols="6">
              <b-skeleton animation="wave" width="85%"></b-skeleton>
            </b-col>
            <b-col cols="6">
              <b-skeleton animation="wave" width="55%"></b-skeleton>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>

    <b-card v-else>
      <mdb-container class="profile__info-data">
        <mdb-row class="d-flex justify-content-between">
          <mdb-col md="3" xs="12" sm="12" class="col__img-profile">
            <div class="hover__image-wrap">
              <div
                v-if="
                  profiles.photo !==
                  'https://api.ppkc-online.com/image-profiles/null'
                "
              >
                <b-avatar
                  variant="info"
                  :src="profiles.photo"
                  :size="size"
                ></b-avatar>
                <!-- <img
                  :src="profiles.photo"
                  class="img-fluid image rounded-circle"
                  /> -->
                <div class="overlay">
                  <a
                    :data-gall="
                      profiles.photo
                        ? profiles.photo
                        : `${require('~/assets/images/profile/user-profile.svg')}`
                    "
                    :href="
                      profiles.photo
                        ? profiles.photo
                        : `${require('~/assets/images/profile/user-profile.svg')}`
                    "
                    class="profiles-avatar icon"
                    title="Lihat Foto Profile"
                  >
                    <mdb-icon icon="search-plus" />
                  </a>
                </div>
              </div>
              <div v-else>
                <b-avatar
                  variant="primary"
                  :text="username.charAt(0)"
                  :size="size"
                ></b-avatar>
              </div>
            </div>
          </mdb-col>
          <mdb-col md="5" class="col__data-profile">
            <h2 class="text-capitalize">{{ profiles.nama }}</h2>
            <ul>
              <li class="mb-2">
                <a :href="`mailto:${profiles.email}`">
                  <mdb-icon far icon="envelope-open" size="md" />
                  {{ profiles.email }}
                </a>
              </li>
              <li>
                <a href="!#">
                  <mdb-icon icon="phone" size="md" /> {{ profiles.phone }}
                </a>
              </li>
            </ul>
          </mdb-col>

          <mdb-col md="4" class="profile__options-page">
            <mdb-row class="d-flex justify-content-center">
              <mdb-col col="12" sm="6">
                <mdb-btn outline="primary" size="sm">
                  <a :href="`/profile/edit/${profiles.id}`">
                    <mdb-icon icon="user-cog" size="sm" /> Edit Profile
                  </a>
                </mdb-btn>
              </mdb-col>
              <mdb-col col="12" sm="6">
                <mdb-btn color="deep-orange" size="sm" @click="LogoutProfile">
                  <mdb-icon icon="sign-out-alt" size="sm" /> Logout
                </mdb-btn>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["profiles", "loading", "username"],

  data() {
    return {
      p1: true,
      size: "10rem",
    };
  },

  mounted() {
    this.VenoBox();
  },

  methods: {
    VenoBox() {
      new VenoBox({
        selector: ".profiles-avatar",
        numeration: true,
        infinigall: true,
        share: ["facebook", "twitter", "linkedin", "pinterest", "download"],
        spinner: "rotating-plane",
      });
    },
    LogoutProfile() {
      this.$swal({
        title: `Keluar sebagai ${this.profiles.nama}?`,
        text: "Anda akan keluar dari halaman profile!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Lanjut keluar!",
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
  },
};
</script>
