<template>
  <div class="card__list" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center header__ppkc-list-page">
        <mdb-col lg="12" xs="12" sm="12">
          <h2 style="color: #004899 !important; font-weight: 700">Fasilitas</h2>
        </mdb-col>

        <mdb-col
          v-for="(item, indx) in lists.list_data"
          :key="item.id"
          lg="12"
          xs="12"
          sm="12"
          class="ppkc__col-2 mt-2"
        >
          <h5>{{ item.nama }}</h5>
          <mdb-row v-if="item.list_foto.length > 0">
            <mdb-col md="4" v-for="(n, indxs) in item.list_foto" :key="n.id" class="hover__image-wrap">
                <img
                :src="n.foto_url"
                class="img-fluid image"
                style="
                height: 200px;
                width: 100%;
                object-fit: cover;
                margin-top: 16px;
                "
                />
                <div class="overlay">
                  <a :data-gall="n.foto_url" :href="n.foto_url" class="fasilitas icon" :title="`Lihat Foto ${item.nama} ${indxs+1}`">
                    <mdb-icon icon="search-plus" />
                  </a>
                </div>
            </mdb-col>
          </mdb-row>
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
        selector: '.fasilitas',
        numeration: true,
        infinigall: true,
        share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
        spinner: 'rotating-plane'
      })
    }
  }
}
</script>
