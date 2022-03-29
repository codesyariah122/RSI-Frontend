<template>
  <!-- Footer -->
  <mdb-footer class="footer__layout font-small">
    <mdb-container class="text-left footer__sitemap">
      <mdb-row
        :class="`${$device.isMobile ? 'd-flex justify-content-center' : 'row'}`"
      >
        <!-- footer branding content -->
        <mdb-col col="12" sm="3" class="mt-5 col-1">
          <img :src="brand" />

          <h5 class="title text-capitalize">rumah sakit islam <br> sultan agung</h5>

          <address>
            Jl. Raya Kaligawe KM 4 Semarang 50112 Jawa Tengah, Indonesia
          </address>
          
        </mdb-col>

				<mdb-col col="12" :sm="`${$device.isDesktop ? '9' : '12'}`" :class="`${$device.isMobile ? 'mt-2 col-2' : 'mt-2 col-2'}`">
					<!-- sitemap footer content -->
					<MoleculesLayoutMoleculesSiteMap/>
				</mdb-col>

			</mdb-row>

      <!-- Bonus Map -->
      <!-- <mdb-row>
        <mdb-col col="12" lg="12" class="col-3">
          <LayoutsMap />
        </mdb-col>
      </mdb-row> -->
      <!-- end map -->
    </mdb-container>
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid>
        &copy;Copyright {{ $moment(year).year() }}
        <a target="_blank" href="https://rsisultanagung.halomedika.com"
          >RSI Sultan Agung</a
        >. All Rights Reserved
      </mdb-container>
    </div>
  </mdb-footer>
  <!-- Footer -->
</template>

<script>
import LogoBrand from "~/assets/images/logo/Logo.svg";

export default {
  data() {
    return {
      brand: LogoBrand,
      year: new Date(),
    };
  },
};
</script>
