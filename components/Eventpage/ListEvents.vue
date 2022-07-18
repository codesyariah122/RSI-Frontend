<template>
  <div class="card__content-lists">
    <mdb-container>
      <mdb-row v-if="loading && !load_more" col="12" class="d-flex justify-content-start align-items-stretch mb-5 mt-2">
        <mdb-col v-if="empty" lg="12" xs="12" sm="12">
          <center>            
            <div class="spinner-border text-primary" style="width:7rem; height: 7rem;" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </center>
        </mdb-col>

        <mdb-col v-else v-for="(item, index) in lists" md="4" :key="item.kegiatan_id" class="mb-4">
          <b-card>
            <b-row>
              <b-col cols="12" class="mb-3">
                <b-skeleton-img></b-skeleton-img>
              </b-col>
              <b-col cols="12">
                <b-skeleton animation="wave" width="85%"></b-skeleton>
                <b-skeleton animation="wave" width="55%"></b-skeleton>
                <b-skeleton animation="wave" width="70%"></b-skeleton>
              </b-col>
            </b-row>
          </b-card>
        </mdb-col>

      </mdb-row>

      <mdb-row v-else col="12" class="d-flex justify-content-start align-items-stretch mb-5 webinar__content">
        <!-- <pre>
          {{lists[listIndex - 1]s.slice(0,6)}}
        </pre> -->
        <mdb-col v-if="empty || error_search" lg="12" xs="12" sm="12">
          <mdb-alert :color="`${error_search ? 'danger' : 'info'}`" class="text-center">
            <mdb-icon icon="info-circle" size="lg"/> {{message}}
          </mdb-alert>
          <mdb-btn @click="LoadMore" :class="`mt-3 btn my__btn-primary rounded-pill  ${
            $device.isMobile ? 'btn-block btn-sm' : 'btn-block'
          }`">Reload Event</mdb-btn>
        </mdb-col>

        <mdb-col
        v-if="listIndex <= lists.length"
        v-for="listIndex in listToShow"
        col="12"
        md="4"
        class="mb-4"
        :key="lists[listIndex - 1].kegiatan_id"
        >
        <mdb-card>
          <mdb-card-image
          :src="lists[listIndex - 1].photo"
          :alt="lists[listIndex - 1].kegiatan_title"
          ></mdb-card-image>

          <mdb-card-body>
            <mdb-badge class="mb-2 badge__category shadow-none">{{
              lists[listIndex - 1].kategori_value
            }}</mdb-badge>

            <mdb-card-title
            class="truncate"
            style="color: #004899; font-weight: bold; min-height: 80px"
            >{{ lists[listIndex - 1].kegiatan_title }}</mdb-card-title
            >
            <mdb-card-text
            class="truncate2 mt-2"
            style="width: 200px; min-height: 45px"
            >{{ lists[listIndex - 1].kegiatan_desc }}</mdb-card-text
            >

            <h6 class="mt-2 idr__color">
              {{ $format(lists[listIndex - 1].harga) }}
            </h6>

            <span style="font-size: 12px; margin-top: 1.5rem"
            ><i class="fa fa-calendar fa-fw fa-lg" aria-hidden="true"></i>
            {{ $moment(lists[listIndex - 1].tanggal_awal).format("LL") }} -
            {{ $moment(lists[listIndex - 1].tanggal_akhir).format("LL") }}</span
            >

            <!-- <mdb-btn @click="ToDetailEvent(lists[listIndex - 1].kegiatan_id)" block class="btn btn-outline-primary mt-3 mb-2" color="primary">Detail Event</mdb-btn> -->
            <hr />
            
              <nuxt-link
              :to="{
                name: `detail-event-id-slug`,
                params: {
                  id: lists[listIndex - 1].kegiatan_id,
                  slug: $slug(lists[listIndex - 1].kegiatan_title),
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
        <mdb-col v-if="loading_more" lg="12" xs="12" sm="12">
          <center>            
            <div class="spinner-border text-primary" style="width:7rem; height: 7rem;" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </center>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="search" class="row justify-content-center">
        <mdb-col xl="12" xs="12" lg="12" sm="12" :class="`${$device.isDesktop ? 'mb-5 shadow-none' : 'mb-2'}`">
          <mdb-btn
          @click="LoadMore"
          :class="`btn my__btn-primary rounded-pill  ${
            $device.isMobile ? 'btn-block btn-sm' : 'btn-block'
          }`"
          >
          <div v-if="loadingBtn">
            <b-spinner small ></b-spinner>
            Loading...
          </div>
          <div v-else>
            Reload Events
          </div>
        </mdb-btn>
        </mdb-col>
      </mdb-row>
      <div v-else>
        <mdb-row v-if="listToShow < lists.length" class="row justify-content-center mt-2">
          <mdb-col
          col="12"
          xl="5"
          lg="12"
          xs="12"
          sm="12"
          :class="`${$device.isDesktop ? 'mb-5 shadow-none' : 'mb-2'}`"
          >
              <mdb-btn
              @click="LoadMore"
              :class="`btn my__btn-primary rounded-pill  ${
                $device.isMobile ? 'btn-block btn-sm' : 'btn-block'
              }`"
              >
              <div v-if="loadingBtn">
                <b-spinner small ></b-spinner>
                Loading...
              </div>
              <div v-else>
                Lihat kelas Lainnya
              </div>
            </mdb-btn>
          </mdb-col>
        </mdb-row>
      </div>

    </mdb-container>
  </div>
</template>

<script>
  export default{
    props: ['loading', 'lists', 'listToShow', 'loading_more', 'loadingBtn', 'token', 'data_event', 'empty', 'message', 'error_search', 'page', 'search'],

    data(){
      return {
        timer: 0,
        value: 0,
        max: 500,
        load_more: null
      }
    },

    mounted(){
      this.startTimer()
    },

    methods: {
      RegistrasiEvent(id){
        this.$emit('registrasi-event', id)
      },

      startTimer() {
        let vm = this;
        let timer = setInterval(function() {
          vm.value += 6;
          if (vm.value >= vm.max) clearInterval(timer);
        }, 100);
        vm.value = 0
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

        LoadMore(){
          this.$emit('load-more-event', 20)
        }
    }
  }
</script>

<style lang="css">
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
</style>