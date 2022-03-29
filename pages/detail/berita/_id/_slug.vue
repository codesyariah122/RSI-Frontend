<template>
  <div class="berita__detail" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center berita__detail-content">
        <mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
          <h2 class="text-capitalize">{{lists.berita.judul}}</h2>
          <p>{{$moment(lists.berita.created_at).format("LLL")}}</p>
          <!-- Image content -->
          <center>            
            <img :src="lists.berita.foto_url" class="img-fluid hover-shadow" />
          </center>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="col__berita-2">
          <article class="content-desc">
            {{ lists.berita.konten }}
          </article>
        </mdb-col>
        
        <mdb-col lg="12" xs="12" sm="12" class="mt-5">
          <b-dropdown-divider class="line"></b-dropdown-divider>
        </mdb-col>
      </mdb-row>

      <!-- Content second -->
      <GlobalsOptionSlug :next="next"/>

    </mdb-container>
  </div>
</template>

<script>
export default {
  name: "detail-berita-id-slug",
  layout: "default",

  data() {
    return {
      berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
      id: this.$route.params.id,
      path: this.$route.name,
      berita: null,
    };
  },

  async asyncData({ $axios, params }) {
    const lists = await $axios.$get(`/web/berita/${params.id}`);
    const next_id = parseInt(params.id) + 1
    const next = await $axios.$get(`/web/berita/${next_id}`)
    return {
      lists,
      next
    };
  },
};
</script>

