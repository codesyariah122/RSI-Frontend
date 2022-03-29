<template>
  <mdb-card class="card__login shadow-none">
    <mdb-card-body class="form__auth">
      <!-- Material form login -->
      <img :src="require('~/assets/images/logo/Logo.svg')" width="150" />

      <form class="mt-2" @submit.prevent="LoginProfile">
        <h4 class="h4 text-left mb-2">Selamat Datang</h4>

        <p class="text-left">
          Masukkan alamat email dan password yang terdaftar untuk mengakses akun
          Anda
        </p>

        <!-- Input login -->
        <div class="form-group has-input">
          <!-- <mdb-icon far icon="envelope" class="form-control-feedback" /> -->
          <i
            class="fa fa-at fa-fw fa-lg form-control-feedback"
            aria-hidden="true"
          ></i>
          <input
            type="text"
            class="form-control"
            placeholder="Alamat Email"
            v-model="fields.email"
            autofocus
          />
        </div>

        <div class="form-group has-input">
          <img
            :src="require('~/assets/icons/web/ic_round-password.svg')"
            class="form-control-feedback"
          />
          <!-- <mdb-icon icon="lock" class="form-control-feedback" /> -->
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
            v-model="fields.password"
          />
        </div>

        <div class="form-group mb-3">
          <div @click="showPassword">
            <span v-if="showing_pass === false" style="cursor: pointer">
              <mdb-icon far icon="eye" /> Check Password
            </span>
            <span v-else style="cursor: pointer">
              <mdb-icon far icon="eye-slash" /> Sembunyikan
            </span>
          </div>
        </div>

        <mdb-row class="row justify-content-center">
          <mdb-col col="sm" md="7" sm="7" xs="7">
            <div class="form-group">
              <input id="remember" type="checkbox" name="remember" />
              <label for="remember">Ingat Saya</label>
            </div>
          </mdb-col>

          <mdb-col col="sm" md="5" sm="5" xs="5">
            <div class="form-group">
              <nuxt-link to="/">Lupa Password</nuxt-link>
            </div>
          </mdb-col>
        </mdb-row>

        <div class="form-group mt-2">
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
            <div v-else><mdb-icon icon="sign-in-alt" size="md" /> Masuk</div>
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
              $device.isMobile
                ? 'text-center mt-1 mb-2'
                : 'text-center mt-1 mb-2'
            }`"
          >
            Belum punya Akun ?
            <a href="/auth/registrasi">Daftar Sekarang</a>
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
      p1: true,
    };
  },

  methods: {
    LoginProfile() {
      const params = {
        email: this.fields.email,
        password: this.fields.password,
      };
      this.$emit("login-profile", params);
    },

    showPassword() {
      const password = document.querySelector("#password");
      if (password.type === "password") {
        password.type = "text";
        this.showing_pass = true;
      } else {
        password.type = "password";
        this.showing_pass = false;
      }
    },
  },
};
</script>
