<template>
  <div class="card__list" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center header__ppkc-list-page">
        <mdb-col lg="12" xs="12" sm="12">
          <h2 style="color: #004899 !important; font-weight: 700">Sejarah</h2>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-1">
          <center>
            <!-- <mdb-card reverse class="card__berita-img">
              <mdb-view hover cascade>
                <a href="#!">
                  <mdb-card-image
                    :src="lists.result.foto_url"
                    alt="Card image cap"
                  ></mdb-card-image>
                  <mdb-mask waves overlay="white-slight"></mdb-mask>
                </a>
              </mdb-view>
            </mdb-card> -->
            <img :src="lists.result.foto_url" class="img-fluid hover-shadow" />
          </center>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2">
          <p class="content-desc">{{ lists.result.description }}</p>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
export default {
  props: ["path", "lists"],
  data() {
    return {
      berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
    }
  },

  mounted(){
    this.VenoBox()
  },

  methods: {
    VenoBox(){
      new VenoBox({
        selector: '.sejarah',
        numeration: true,
        infinigall: true,
        share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
        spinner: 'rotating-plane'
      })
    }
  }
}
</script>

<style scoped>
.content-desc {
  white-space: pre-wrap;
  font-size: 16px;
}
</style>
