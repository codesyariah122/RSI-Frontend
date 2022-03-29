<template>
  <div class="card__list" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center header__ppkc-list-page">
        <mdb-col lg="12" xs="12" sm="12">
          <h2 style="color: #004899 !important; font-weight: 700">
            Struktur Organisasi
          </h2>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="ppkc__col-1">
          <center>
            <img
              img
              :src="lists.result.foto_url"
              class="img-fluid hover-shadow"
            />
          </center>
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
    };
  },
};
</script>
