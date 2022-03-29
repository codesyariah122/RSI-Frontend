<template>
  <div>
    <div
      ref="fasilitator_square"
      class="card__list"
      :style="berita__list_style"
    >
      <mdb-container style="max-width: 1300px">
        <mdb-row class="row justify-content-center header__ppkc-list-page">
          <mdb-col lg="12" xs="12" sm="12" style="margin-top: 32px">
            <h2 style="color: #004899 !important; font-weight: 700">
              Fasilitator
            </h2>
          </mdb-col>
        </mdb-row>
        <!-- delay looping data with loader spinner -->

        <div class="row text-center text-md-left" style="margin-top: 32px">
          <!-- Grid column -->
          <div
            v-for="item in lists"
            :key="item.id"
            class="col-xl-6 col-lg-12 mb-5 d-md-flex"
          >
            <div class="avatar mb-md-0 mb-4 mx-4">
              <img
                :src="item.foto_url"
                class="rounded z-depth-1"
                height="250px"
                width="200px"
                style="object-fit: cover"
              />
            </div>
            <div class="mx-2">
              <h4 class="font-weight-bold mb-3" style="font-size: 22px">
                {{ item.nama }}
              </h4>
              <h6
                class="font-weight-bold grey-text mb-3"
                style="font-size: 14px"
              >
                NIP : {{ item.nip }}
              </h6>
              <mdb-popover
                style="max-width: 600px"
                trigger="click"
                :options="{ placement: 'bottom' }"
              >
                <span slot="header">Pendidikan Formal</span>
                <span slot="body">{{ item.pendidikan_formal }}</span>
                <mdb-btn
                  outline="info"
                  style="min-width: 220px"
                  slot="reference"
                  rounded
                >
                  Pendidikan Formal
                </mdb-btn>
              </mdb-popover>
              <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
                <span slot="header">Pendidikan Informal</span>
                <span slot="body">{{ item.pendidikan_informal }}</span>
                <mdb-btn
                  outline="info"
                  style="min-width: 220px"
                  slot="reference"
                  rounded
                >
                  Pendidikan Informal
                </mdb-btn>
              </mdb-popover>
            </div>
          </div>
        </div>

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
            <button type="button" @click="LoadFasilitator" class="btn btn-info">
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
  props: ["lists", "loading", "error", "end"],
  data() {
    return {
      currentPage: 1,

      berita__list_style:
        this.$router.path == "berita" && this.$device.isDeskktop
          ? "margin-top: 15rem;"
          : "margin-top: 5rem;",
    };
  },

  mounted() {
    this.getNextFasilitator();
  },

  methods: {
    LoadFasilitator() {
      this.$emit("load-more-fasilitator");
    },

    getNextFasilitator() {
      window.onscroll = () => {
        if (!this.loading && !this.end && !this.error) {
          if (
            this.$refs.fasilitator_square.getBoundingClientRect().bottom <= 450
          ) {
            this.$emit("load-more-fasilitator");
          }
        }
      };
    },
  },
};
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

.content-desc {
  white-space: pre-wrap;
  font-size: 14px;
}

.popover {
  white-space: pre-wrap !important;
  max-width: 500px !important;
  text-align: left;
}
</style>
