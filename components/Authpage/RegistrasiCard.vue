<template>
  <mdb-card class="card__registrasi">
    <mdb-card-body class="form__auth">
      <img :src="require('~/assets/images/logo/Logo.svg')" width="150">
      <!-- Material form login -->
      <form @submit.prevent="RegistrasiProfile">
        <h4 class="h4 text-left mb-2">Daftar</h4>

        <p class="text-left">
          Buat akun baru untuk mengakses seluruh layanan dan informasi pelatihan
          RSI Sultan Agung
        </p>

        <!-- Input login -->
        <div class="form-group has-input">
          <!-- <mdb-icon far icon="user-circle" class="form-control-feedback" /> -->
          <i class="fa fa-user fa-fw fa-lg form-control-feedback" aria-hidden="true"></i>

          <input
            type="text"
            class="form-control"
            placeholder="Nama"
            v-model="fields.nama"
            autofocus
          />
        </div>

        <div class="form-group has-input">
          <!-- <mdb-icon far icon="envelope" class="form-control-feedback" /> -->
          <i class="fa fa-phone fa-fw fa-lg form-control-feedback" aria-hidden="true"></i>
          <input
            type="number"
            class="form-control"
            placeholder="Nomor Handphone"
            v-model="fields.phone"
          />
        </div>

        <div class="form-group has-input">
          <!-- <mdb-icon far icon="envelope" class="form-control-feedback" /> -->
          <i class="fa fa-at fa-fw fa-lg form-control-feedback" aria-hidden="true"></i>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="fields.email"
          />
        </div>
        
        <div class="form-group has-input">
          <!-- <mdb-icon icon="lock" class="form-control-feedback" /> -->
          <img :src="require('~/assets/icons/web/ic_round-password.svg')" class="form-control-feedback">
          <input
            id="password1"
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="fields.password"
          />
        </div>
        <!-- <div class="form-group has-input">
          <img :src="require('~/assets/icons/web/ic_round-password.svg')" class="form-control-feedback">
          <input
            id="password2"
            type="password"
            class="form-control"
            placeholder="Ulangi Password"
            v-model="fields.confirm_password"
          />
        </div> -->

        <div class="form-group">
          <div @click="showPassword">
            <span v-if="showing_pass === false" style="cursor: pointer">
              <mdb-icon far icon="eye" /> Check Password
            </span>
            <span v-else style="cursor: pointer">
              <mdb-icon far icon="eye-slash" /> Sembunyikan
            </span>
          </div>
        </div>

        <div class="form-group mt-5">
          <mdb-btn
            type="submit"
            block
            size="md"
            class="btn rounded-pill shadow-none"
          >
            <div v-if="loading">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </div>
            <div v-else><mdb-icon icon="user-plus" size="md" /> Daftar</div>
          </mdb-btn>
        </div>
      </form>
      <!-- Material form login -->
      <!-- <mdb-row class="row justify-content-center white-text">
				<mdb-col md="5" class="mt-2">
					<b-dropdown-divider class="line"></b-dropdown-divider>
				</mdb-col>
				<mdb-col md="2">
					<h6 v-if="$device.isMobile" class="text-center mt-2">Atau</h6>
					<small v-else>Atau</small>
				</mdb-col>
				<mdb-col md="5" class="mt-2">
					<b-dropdown-divider class="line"></b-dropdown-divider>
				</mdb-col>
			</mdb-row> -->

      <!-- <div class="form-group mt-3">
				<mdb-btn block color="white" size="md" class="text-primary">
					<mdb-icon fab icon="google" /> Daftar dengan Akun Google
				</mdb-btn>
			</div> -->

      <mdb-row class="row justify-content-center white-text mb-2 mt-1">
        <mdb-col v-if="show_alert" lg="12" xs="12" sm="12">
          <mdb-alert color="danger" dismiss>
            <strong>Ooops!</strong> {{ validation }}
          </mdb-alert>
        </mdb-col>
      </mdb-row>

      <mdb-row
        :class="`${
          $device.isMobile
            ? 'justify-content-center black-text form__daftar-link'
            : 'justify-content-center black-text'
        }`"
      >
        <mdb-col md="12" xs="12" sm="12" lg="12">
          <h6
            :class="`${
              $device.isMobile ? 'text-center mt-1 mb-2' : 'text-center  mb-2'
            }`"
          >
            Sudah punya Akun ?
            <a href="/auth/login">Masuk Sekarang</a>
          </h6>
        </mdb-col>
      </mdb-row>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
export default {
  props: ["event_data", "validation", "show_alert", "loading"],
  data() {
    return {
      fields: {},
      showing_pass: false,
    };
  },

  methods: {
    RegistrasiProfile() {
      const params = {
        nama: this.fields.nama,
        phone: this.fields.phone,
        email: this.fields.email,
        password: this.fields.password,
        // confirm_password: this.fields.confirm_password,
      };
      this.$emit("registrasi-profile", params);
    },

    showPassword() {
      const password1 = document.querySelector("#password1");
      // const password2 = document.querySelector("#password2");
      if (password1.type === "password" ) {
        password1.type = "text";
        this.showing_pass = true;
      } else {
        password1.type = "password";
        this.showing_pass = false;
      }
    },
  },
};
</script>
