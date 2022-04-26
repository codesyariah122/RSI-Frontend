<template>
  <div class="card__list" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="rsi__page">
        <mdb-col lg="12" xs="12" sm="12" class="rsi__col-1">
          <h2 style="font-weight: 700">
            Struktur Organisasi
          </h2>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="rsi__col-2 mt-5">
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
