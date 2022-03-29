<template>
  <div class="testimoni__list mt-5">
    <mdb-container>
      <mdb-row class="row justify-content-between header__inside-content">
        <!-- colomn header testimoni -->
        <mdb-col col="12" md="7">
          <h5 class="text-capitalize">
            <strong class="font-weight-bold">testimoni</strong>
          </h5>
        </mdb-col>

        <mdb-col v-if="$device.isDesktop" col="12" md="3" >
          <nuxt-link to="/rsi/testimoni" class="btn btn-sm rounded-pill shadow-none">Lihat Semua Testimoni </nuxt-link>
        </mdb-col>

        <!-- <mdb-col md="4"></mdb-col> -->
        <mdb-col md="12" xs="12" sm="12" :class="`text-capitalize ${$device.isDesktop ? '' : ''}`">
          <h2>Cerita sukses member kami</h2>
        </mdb-col>

        <mdb-col v-if="$device.isMobile" col="12" md="3" sm="12" class="mt-2">
          <nuxt-link to="/rsi/testimoni" class="btn btn-sm rounded-pill shadow-none">Lihat Semua Testimoni <i class="fa fa-arrow-circle-right fa-fw fa-lg" aria-hidden="true"></i></nuxt-link>
        </mdb-col>
      </mdb-row>

      <!-- column card testimoni -->
      <!-- Testimoni card components -->
      <MoleculesHomepageMoleculesCardTestimoni v-if="testimonis.length > 0" :testimonis="testimonis"/>

        <MoleculesHomepageMoleculesListTestimoniSample v-else/>


    </mdb-container>
  </div>
</template>

<script>
	export default{
		props: ['testimonis']
	}
</script>
