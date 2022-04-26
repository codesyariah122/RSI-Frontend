<template>
  <div>
    <b-jumbotron
      class="jumbotron__home mt-5 shadow-none"
    >
      <b-container class="container__jumbotron">
        <b-row cols="12" class="row justify-content-start">

          <!-- Banner art image Mobile -->
          <MoleculesHomepageMoleculesBannerArtMobile v-if="$device.isMobile"/>

          <!-- Context -->
          <b-col md="7" xs="12" sm="12">
            <h2 class="display-6 text-capitalize">
              kembangkan kompetensi tenaga kesehatan
            </h2>
            <p>
             Tingkatkan kemampuan kompetensi sebagai tenaga kesehatan dengan ratusan kelas online bersertifikat resmi
            </p>
            <b-button
              v-if="!token.accessToken"
              :class="`my__btn-primary rounded-pill ${$device.isMobile ? 'btn-block btn-sm' : ''}`"
              @click="$router.push({ name: 'auth-registrasi' })"
              >Daftar Sekarang</b-button
            >
            <b-button
              v-if="!token.accessToken"
              :class="`my__btn-secondary rounded-pill ${$device.isMobile ? 'btn-block btn-sm mt-3' : ''}`"
              @click="$router.push({ name: 'auth-registrasi' })"
              >Lihat kelas saya</b-button
            >
          </b-col>

          <!-- Banner art image -->
          <MoleculesHomepageMoleculesBannerArtDesktop v-if="$device.isDesktop"/>

        </b-row>
      </b-container>
    </b-jumbotron>

  </div>
</template>

<script>
export default {
  props: ["items", "token"],
};
</script>
