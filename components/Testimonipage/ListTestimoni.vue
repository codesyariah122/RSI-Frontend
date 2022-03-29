<template>
  <div>
    <div ref="testimoni_square" class="card__list" :style="berita__list_style">
      <mdb-container>
        <!-- header -->
        <mdb-row class="row justify-content-center header__rsi-list-page">
          <mdb-col lg="12" xs="12" sm="12" style="">
            <h2>
              Testimoni
            </h2>
             <p>
              RSI Sultan Agung telah melakukan berbagai macam pelatihan dan
              telah banyak membantu meningkatkan kemampuan tenaga kesehatan
            </p>
          </mdb-col>
        </mdb-row>

        <!-- show card berita -->
        <mdb-row class="row justify-content-center col__testimoni mt-2">
          <mdb-col v-for="(item, index) in lists" md="6" xs="12" sm="12" class="col__testimoni-card" :key="item.id">
            <mdb-card class="card__testimoni-content">
              <mdb-container class="mt-3">
                <mdb-row>
                  <mdb-col md="4" class="avatar">
                    <mdb-card-image :src="item.avatar" alt="Card image cap"></mdb-card-image>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-card-body>
                    <mdb-card-title>{{item.konsumen}}</mdb-card-title>
                    <h6>{{item.profesi}}</h6>
                    <mdb-card-text>{{item.testimoni}}</mdb-card-text>
                  </mdb-card-body>
                </mdb-row>
              </mdb-container>
            </mdb-card>
          </mdb-col>
        </mdb-row>

        <mdb-row v-if="loading" class="row justify-content-center">
          <mdb-col lg="12" xs="12" sm="12">
            <div class="d-flex justify-content-center mt-5 mb-5">
              <div
              class="spinner-grow text-primary"
              role="status"
              style="width: 3rem; height: 3rem"
              >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row
      v-if="error"
      class="row justify-content-center header__ppkc-list-page"
      >
      <mdb-col lg="12" xs="12" sm="12">
        <button type="button" @click="LoadTestimoni" class="btn btn-info">
          Load More
        </button>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</div>
</div>
</template>

<script>
  export default {
    props: ["path", "lists", "loading", "error", "end"],
    data() {
      return {
        currentPage: 1,
        listToShow: 6,
        berita__list_style:
        this.$router.path == "/ppkc/berita" && this.$device.isDesktop
        ? "margin-top: 15rem;"
        : "margin-top: 7rem;",
      };
    },

    mounted() {
      this.getNextTestimoni();
    },

    methods: {
      LoadTestimoni() {
        this.$emit("load-more-testi");
      },

      getNextTestimoni() {
        window.onscroll = () => {
          if (!this.loading && !this.end && !this.error && this.$route.path == '/ppkc/testimoni') {
            if (
              this.$refs.testimoni_square.getBoundingClientRect().bottom <= 450
              ) {
              this.$emit("load-more-testi");
          }
        } else {
          console.log("else");
        }
      };
    },
  },
};
</script>
<style lang="scss">
  @include card_testimonial_mobile;

  @media (min-width: 992px) {
    @include card_testimonial_desktop;
  }
</style>
