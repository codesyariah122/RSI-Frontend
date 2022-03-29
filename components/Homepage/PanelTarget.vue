<template>
  <div class="panel__target-content">
    <!-- Header -->
    <mdb-row class="row justify-content-center panel__header">
      <mdb-col col="12" lg="12" xs="12" sm="12">
        <h5 class="text-capitalize text-center">
          <strong class="font-weight-bold">mengapa memilih kami ? </strong>
        </h5>
      </mdb-col>
      <mdb-col col="12" lg="6" xs="12" sm="12">
         <h2 class="text-center">Beli sekali, Akses dari Perangkat Manapun, Selamanya</h2>
      </mdb-col>
    </mdb-row>

    <!-- Panel -->
    <mdb-row class="row justify-content-center lists__panel">
      <mdb-col v-for="(item, index) in panels" col="12" md="4" xs="12" sm="12" :key="item.id" :class="`${$device.isMobile ? 'mb-3' : ''}`">
        <mdb-card class="shadow-none">
          <mdb-container class="mt-2">
            <mdb-card-image :src="item.vector" alt="Card image cap"></mdb-card-image>
            <mdb-card-body>
              <mdb-card-title>
                {{item.title}}
              </mdb-card-title>
              <mdb-card-text> {{item.context}} </mdb-card-text>
            </mdb-card-body>
          </mdb-container>
        </mdb-card>
      </mdb-col>
    </mdb-row>

    <mdb-row class="row justify-content-center">
      <mdb-col col="12" lg="12" xs="12" sm="12" class="bg__content">
        <img :src="require('~/assets/art/vector-4.png')" :width="`${$device.isMobile ? '370px' : ''}`">
      </mdb-col>
    </mdb-row>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        panels: [
          {
            id: 1, vector: require('~/assets/art/vector-6.svg'), title: "Akses Kelas Tak Terbatas Waktu", context: 'Setiap kelas yang telah dibeli dapat diakses selamanya melalui berbagai perangkat desktop atau mobile.'
          },
          {
            id: 2, vector: require('~/assets/art/vector-7.svg'), title: "Diskusi Sesama Anggota dan Konsultasi Bersama", context: 'Member yang terdaftar dalam sebuah kelas mendapatkan akses ke group diskusi anggota dan dapat berkonsultasi dengan pengajar.'
          },
          {
            id: 3, vector: require('~/assets/art/vector-8.svg'), title: "Kelas Bersertifikat Resmi", context: 'Sertifikat resmi akan didapatkan member setelah menyelesaikan seluruh modul pembelajaran dalam suatu kelas.'
          }
        ]
      }
    }
  }
</script>
