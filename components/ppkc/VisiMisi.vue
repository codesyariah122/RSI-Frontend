<template>
  <div class="card__list" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center header__ppkc-list-page">
        <mdb-col lg="12" xs="12" sm="12">
          <h2 style="color: #004899 !important; font-weight: 700">
            Visi & Misi
          </h2>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-2">
          <h5>Visi</h5>
          <p>
            {{ visi }}
          </p>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-3">
          <h5>Misi</h5>
          <p class="content-desc">{{ misi }}</p>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
export default {
  props: ["path", "lists", "visi", "misi"],
  data() {
    return {
      berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
    };
  },
};
</script>

<style scoped>
.content-desc {
  text-align: left !important;
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 35px !important;
}
</style>
