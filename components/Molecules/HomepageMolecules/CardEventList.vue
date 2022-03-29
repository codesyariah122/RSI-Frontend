<template>
  <div>
    <div v-if="events.length > 0">
        <mdb-row v-if="loading" class="row justify-content-center card__content">
          <!-- column event -->
          <mdb-col v-for="(item, index) in events" :key="item.id" col="12" md="4" class="mb-3">
            <b-card>
              <b-row cols="12">
                <b-col md="12" xs="12" sm="12">
                  <b-skeleton-img></b-skeleton-img>
                </b-col>
                <b-col md="12" xs="12" sm="12" class="mt-2">
                  <b-skeleton animation="fade" width="85%"></b-skeleton>
                  <b-skeleton animation="fade" width="55%"></b-skeleton>
                  <b-skeleton animation="fade" width="70%"></b-skeleton>
                </b-col>
              </b-row>
            </b-card>
          </mdb-col>
        </mdb-row>

        <mdb-row v-else class="row justify-content-center card__content">
          <mdb-col
          v-if="listIndex < listsToShow"
          v-for="listIndex in listsToShow"
          col="12"
          md="4"
          class="mb-3"
          :key="events[listIndex - 1].kegiatan_id"
          >
          <mdb-card>
            <mdb-card-image
            :src="events[listIndex - 1].photo"
            alt="No image found"
            ></mdb-card-image>

            <mdb-card-body>
              <mdb-badge
              class="mb-2 badge__category shadow-none"
              >{{ events[listIndex - 1].kategori_value }}</mdb-badge
              >

              <mdb-card-title
              class="truncate"
              style="color: #004899; font-weight: bold; min-height: 80px"
              >{{ events[listIndex - 1].kegiatan_title }}</mdb-card-title
              >
              <mdb-card-text
              class="truncate2 mt-2"
              style="width: 200px; min-height: 45px"
              >{{ events[listIndex - 1].kegiatan_desc }}</mdb-card-text
              >

              <h6 class="mt-2 idr__color">
                {{ $format(events[listIndex - 1].harga) }}
              </h6>

              <span style="font-size: 12px; margin-top: 1.5rem"
              ><i class="fa fa-calendar fa-fw fa-lg" aria-hidden="true"></i>
              {{ $moment(events[listIndex - 1].tgl_awal).format("LL") }} -
              {{ $moment(events[listIndex - 1].tgl_akhir).format("LL") }}</span
              >

              <!-- <mdb-btn @click="ToDetailEvent(lists[listIndex-1].kegiatan_id)" block class="btn btn-outline-primary mt-3 mb-2" color="primary">Detail Event</mdb-btn> -->
              <hr />
              <a
              @click="
              SetKeranjang(
                events[listIndex - 1].kegiatan_id,
                events[listIndex - 1].photo,
                events[listIndex - 1].kegiatan_title,
                events[listIndex - 1].harga
                )
                "
                :class="`btn my__btn-primary rounded-pill mt-3 mb-2 btn-block shadow-none ${
                  $device.isMobile ? 'btn-sm' : ''
                }`"
                color="success"
                ><i class="fa fa-cart-plus fa-fw fa-lg" aria-hidden="true"></i>
                Tambah ke keranjang</a
                >
                <nuxt-link
                :to="{
                  name: `detail-event-id-slug`,
                  params: {
                    id: events[listIndex - 1].kegiatan_id,
                    slug: $slug(events[listIndex - 1].kegiatan_title),
                  },
                }"
                :class="`btn my__btn-secondary rounded-pill mt-3 mb-2 btn-block shadow-none ${
                  $device.isMobile ? 'btn-sm' : ''
                }`"
                >Info Kelas</nuxt-link
                >
              </mdb-card-body>
            </mdb-card>
          </mdb-col>

          <!-- bg content -->
          <mdb-col col="12" lg="12" xs="12" sm="12" class="bg__content">
            <img :src="require('~/assets/art/vector-5.png')" />
          </mdb-col>
        </mdb-row>
        <mdb-row v-if="events.length > 0" class="row justify-content-center mt-2">
          <mdb-col
          col="12"
          xl="5"
          lg="12"
          xs="12"
          sm="12"
          :class="`${$device.isDesktop ? 'mb-5 shadow-none' : 'mb-2'}`"
          >
          <nuxt-link
          to="/events"
          :class="`btn my__btn-primary rounded-pill  ${
            $device.isMobile ? 'btn-block btn-sm' : 'btn-block'
          }`"
          >Lihat Semua Kelas</nuxt-link
          >
        </mdb-col>
      </mdb-row>
    </div>

      <mdb-row v-else
      col="12"
      class="justify-content-center card__content"
      >
      <mdb-col lg="12" xs="12" sm="12">
        <mdb-alert color="info">
          <mdb-icon icon="info-circle" size="lg" /> Belum ada event terdekat !
        </mdb-alert>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
import { SampleEvents } from "@/helpers";
export default {
  props: ["events", "loading", "listsToShow"],
  data(){
    return {
      carts: [],
      username: ''
    }
  },
  mounted() {
    this.UserProfileData()
  },

  methods: {
    CheckKeranjang(){
      if (this.events.length < this.listsToShow) {
        SampleEvents.map((d) => {
          this.events.push(d);
        });
      }
    },

    SetKeranjang(id_event, photo_event, title_event, harga) {
        const data_event = {
          id: id_event,
          photo: photo_event,
          title: title_event,
          harga: harga,
          active: true,
        };
        this.SaveCarts(data_event)
      },

      SaveCarts(data){
        // localStorage.setItem('carts', JSON.stringify(data))
        this.$store.dispatch("config/storeConfigCartEvent", data)
        // console.log(this.checks.length)
        if(this.token.accessToken){
          this.$router.push({
            path: `/profile/${this.username}/keranjang`
          });
        }else{
          localStorage.setItem('go-to-cart', JSON.stringify({
            status: true
          }))
          this.$router.push({
            name: 'auth-login'
          })
        }
      },

      UserProfileData() {
        if (this.token) {
          const url = `${this.api_url}/web/user`;
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
          this.$axios
          .get(url)
          .then(({ data }) => {
            this.username = this.$username(data.user.nama)
          })
          .catch((err) => console.log(err.response ? err.response : ""));
        }
      },

      CheckToken() {
        this.$store.dispatch("config/checkAuthLogin", "token");
      },
      ConfigApiUrl() {
        const api_url = process.env.NUXT_ENV_API_URL;
        this.$store.dispatch("config/storeConfigApiUrl", api_url);
      },

    },

    computed: {
      token() {
        return this.$store.getters["config/ConfigCheckLogin"];
      },
      api_url() {
        return this.$store.getters["config/ConfigApiUrl"];
      }
    }

}
</script>

<style lang="css">
.btn-outline-primary {
  border: 1px solid #3393ff !important;
}

.truncate {
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp, 3);
  -webkit-box-orient: vertical;
  word-break: var(--word-break, "none");
  overflow: hidden;
  hyphens: auto;
  text-align: var(--align, left);

  --is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
  --delay: Calc(-1s * (var(--is-single-line, 1) - 1));
  animation: states 1s var(--delay) paused;

  @keyframes states {
    0% {
      word-break: break-all;
    }
  }
}

.truncate2 {
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp, 2);
  -webkit-box-orient: vertical;
  word-break: var(--word-break, "none");
  overflow: hidden;
  hyphens: auto;
  text-align: var(--align, left);

  --is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
  --delay: Calc(-1s * (var(--is-single-line, 1) - 1));
  animation: states 1s var(--delay) paused;

  @keyframes states {
    0% {
      word-break: break-all;
    }
  }
}

.card__list .card__content .card .view {
  border-radius: 8px 8px 0px 0px !important;
}
</style>
