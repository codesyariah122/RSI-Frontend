<template>
  <div class="profile__info">
    <div v-if="loading">
      <b-skeleton animation="wave" width="85%"></b-skeleton>
      <b-skeleton animation="wave" width="55%"></b-skeleton>
      <b-skeleton animation="wave" width="70%"></b-skeleton>
    </div>
    <!-- <pre>
			{{works}}
		</pre> -->

    <ul v-else class="mt-3">
      <li
      v-if="profiles.phone == null || profiles.no_anggota == null"
      class="mb-3 mt-2"
      >
      <mdb-alert color="warning" v-if="p1" @closeAlert="p1 = false" dismiss>
        <strong>Halo {{ profiles.nama }}</strong> profile anda belum lengkap
        silahkan edit profile.
      </mdb-alert>
    </li>
    <li class="mb-3">
      <div class="col-md-12 col-xs-12 col-sm-12">
        <strong class="text-primary text-uppercase font-weight-bold"
        >Nira</strong
        >
        <br />
        <p>
          {{ profiles.no_anggota }}
        </p>
      </div>
    </li>
    <li>
      <div class="d-flex justify-content-between align-items-center">
        <div class="col-md-6 col-xs-3 col-sm-3">              
          <strong class="text-primary font-weight-bold">Pekerjaan</strong>
        </div>
        <div class="col-md-6 col-xs-2 col-sm-2 mb-2">
          <a :href="`/profile/pekerjaan/${profiles.id}`" class="btn btn-sm btn-outline-primary font-weight-bold">Edit</a>
        </div>
      </div>
      <div class="d-flex">
        <div class="col-md-6">              
          <h6 class="font-weight-bold text-capitalize">
            {{ works.jabatan }}
          </h6>
          <p class="info__context">
            {{ works.nama_perusahaan }} <br />
            {{ works.alamat_perusahaan }}
          </p>
        </div>
      </div>
    </li>
    <li>
      <div class="d-flex justify-content-between align-items-center">
        <div class="col-md-6 col-xs-3 col-sm-3">
          <strong class="text-primary font-weight-bold">Pendidikan</strong>
        </div>
        <div class="col-md-6 col-xs-2 col-sm-2 mt-2 mb-2">
          <a :href="`/profile/pendidikan/${profiles.id}`" class="btn btn-sm btn-outline-primary font-weight-bold">Edit</a>
        </div>
      </div>
      <div class="d-flex">
        <div class="col-md-6  col-xs-6 col-sm-6"> 
         <h6 class="font-weight-bold text-capitalize">
          {{ studs.nama_institusi }}
        </h6>
        <p class="info__context">
          {{ studs.jenjang_value }} - {{ studs.jurusan }} <br />
          {{ $moment(studs.mulai_pend).format("Y") }} -
          {{ $moment(studs.akhir_pend).format("Y") }}
        </p>
        </div>
    </div>
  </li>
  <li>
    <div class="col-6 col-md-6 col-xl-6">
      <strong class="text-primary font-weight-bold">Domisili</strong> <br />
      <p>{{ profiles.kabupaten_name }}, {{ profiles.propinsi_name }}</p>
    </div>
  </li>
</ul>
</div>
</template>

<script>
  export default {
    props: ["loading", "works", "studs", "profiles"],

    data() {
      return {
        p1: true
      }
    }
  }
</script>
