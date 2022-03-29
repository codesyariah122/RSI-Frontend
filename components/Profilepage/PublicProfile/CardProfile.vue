<template>
  <div>
    <b-card v-if="loading">
      <b-row>
        <b-col cols="2">
          <b-skeleton type="avatar"></b-skeleton>
        </b-col>
        <b-col cols="4">
          <b-skeleton animation="wave" width="85%"></b-skeleton>
          <b-skeleton animation="wave" width="55%"></b-skeleton>
          <b-skeleton animation="wave" width="70%"></b-skeleton>
        </b-col>
        <b-col cols="6">
          <b-row>
            <b-col cols="3">
              <b-skeleton animation="wave" width="85%"></b-skeleton>
            </b-col>
            <b-col cols="3">
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
              <img
                v-if="
                  profiles.photo !==
                  'https://api.ppkc-online.com/image-profiles/null'
                "
                :src="profiles.photo"
                class="img-fluid image rounded-circle"
              />
              <img
                v-else
                src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png"
                class="img-fluid image rounded-circle"
              />
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
          </mdb-col>
          <mdb-col md="5" class="col__data-profile">
            <h4>{{ profiles.nama }}</h4>
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
        </mdb-row>
      </mdb-container>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["profiles", "loading"],

  data() {
    return {
      p1: true,
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
      })
    }
  }
}
</script>
