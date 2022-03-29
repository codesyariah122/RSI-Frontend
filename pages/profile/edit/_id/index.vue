<template>
  <div class="berita__detail" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center berita__detail-content">
        <mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
          <h2 class="text-capitalize">Data Diri</h2>
        </mdb-col>
        <mdb-col sm="6" md="4" class="justify-content-center col__img-profile">
          <img
            v-if="profiles.photo"
            :src="profiles.photo"
            class="mx-auto d-block rounded-circle"
            width="200"
            height="200"
            alt=""
            style="object-fit: cover"
          />
          <img
            v-else
            :src="require('~/assets/images/profile/user-profile.svg')"
            class="img-fluid rounded-circle"
            width="200"
            height="200"
          />
          <p class="text-center">
            <a href="#" class="edit-photo" title="Ganti foto">
              <input
                type="file"
                placeholder="Ganti foto"
                @change="previewFiles"
              />
              Ganti Foto
            </a>
          </p>
        </mdb-col>
      </mdb-row>
      <mdb-row style="margin-top: 32px">
        <div class="col-md-6">
          <div class="form-group">
            <label for="no">No Anggota</label>
            <input
              type="text"
              class="form-control"
              id="input_no_anggota"
              autofocus
              v-model="profiles.no_anggota"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Alamat Email</label>
            <input
              type="text"
              class="form-control"
              id="input_nama_ktp"
              v-model="profiles.email"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Nama KTP</label>
            <input
              type="text"
              class="form-control"
              id="input_nama_ktp"
              v-model="profiles.nama"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Tempat Lahir</label>
            <input
              type="text"
              class="form-control"
              id="input_nama_ktp"
              v-model="profiles.tempat_lahir"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">No KTP</label>
            <input
              type="text"
              class="form-control"
              id="input_nama_ktp"
              v-model="profiles.no_ktp"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Tanggal Lahir</label>
            <input
              type="date"
              class="form-control"
              id="input_nama_ktp"
              v-model="profiles.tanggal_lahir"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">No STR</label>
            <input
              type="text"
              class="form-control"
              id="input_nama_ktp"
              v-model="profiles.str"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Masa Berlaku</label>
            <input
              type="date"
              class="form-control"
              id="input_nama_ktp"
              v-model="profiles.masa_berlaku"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Propinsi</label>
            <select
              class="form-control"
              id="sel1"
              v-model="profiles.propinsi_id"
              @change="onchangepropinsi($event)"
            >
              <option
                v-for="item in propinsi"
                v-bind:value="item.id"
                v-bind:key="item.id"
              >
                {{ item.nama }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Kabupaten</label>
            <select
              class="form-control"
              id="sel1"
              v-model="profiles.kabupaten_id"
            >
              <option
                v-for="item in filteredPropinsi"
                v-bind:value="item.id"
                v-bind:key="item.id"
              >
                {{ item.nama }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="nama">Alamat Lengkap</label>
            <input
              type="text"
              class="form-control"
              id="input_nama_ktp"
              v-model="profiles.address"
            />
          </div>
        </div>
      </mdb-row>
      <mdb-row class="row justify-content-center berita__detail-content">
        <mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
          <button type="button" class="btn btn-primary" @click.prevent="simpan">
            Simpan
          </button>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "profile-edit-id",
  layout: "default",

  data() {
    return {
      berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
      id: this.$route.params.id,
      path: this.$route.name,
      profiles: {
        nama: "",
        no_anggota: "",
        email: "",
        propinsi_id: "",
        kabupaten_id: "",
        photo: "",
      },
      propinsi: [],
      kabupaten: [],
      filtered_kabupaten: [],
      input_file: File,
    };
  },

  beforeMount() {
    console.log("load mount");
    this.ConfigApiUrl();
    this.PropinsiList();
    this.KabupatenList();
    this.UserProfileData();
  },

  mounted() {
    this.IsLoggedIn();
  },

  methods: {
    IsLoggedIn() {
      if (!this.token.accessToken) {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Anda tidak mempunyai hak akses ke halaman ini!",
        });
        setTimeout(() => {
          this.$router.push({
            name: "auth-login",
          });
        }, 900);
      }
    },

    CheckToken() {
      this.$store.dispatch("config/checkAuthLogin", "token");
    },
    ConfigApiUrl() {
      const api_url = process.env.NUXT_ENV_API_URL;
      this.$store.dispatch("config/storeConfigApiUrl", api_url);
    },

    UserProfileData() {
      console.log(this.token);
      if (this.token) {
        const url = `${this.api_url}/web/user`;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
          .get(url)
          .then(({ data }) => {
            const user = data.user;
            console.log(user);
            this.profiles.no_anggota = user.no_anggota;
            this.profiles.nama = user.nama;
            this.profiles.email = user.email;
            this.profiles.tempat_lahir = user.tempat_lahir;
            this.profiles.no_ktp = user.no_ktp;
            if (user.tanggal_lahir) {
              this.profiles.tanggal_lahir = moment(user.tanggal_lahir).format(
                "YYYY-MM-DD"
              );
            }
            this.profiles.str = user.str;
            if (user.masa_berlaku) {
              this.profiles.masa_berlaku = moment(user.masa_berlaku).format(
                "YYYY-MM-DD"
              );
            }
            this.profiles.address = user.address;
            this.profiles.propinsi_id = user.propinsi_id;
            this.profiles.kabupaten_id = user.kabupaten_id;
            this.profiles.photo = user.photo;
          })
          .catch((err) => console.log(err.response ? err.response : ""));
      }
    },
    PropinsiList() {
      const url = `${this.api_url}/web/propinsi`;
      this.$axios
        .get(url)
        .then(({ data }) => {
          this.propinsi = data.result;
        })
        .catch((err) => console.log(err.response ? err.response : ""));
    },
    KabupatenList() {
      const url = `${this.api_url}/web/kabupaten`;
      this.$axios
        .get(url)
        .then(({ data }) => {
          this.kabupaten = data.result;
        })
        .catch((err) => console.log(err.response ? err.response : ""));
    },
    onchangepropinsi(event) {
      console.log(event.target.value);
      this.profiles.kabupaten_id = "";
    },
    simpan: async function () {
      try {
        if (!this.profiles.tanggal_lahir) {
          alert("Tanggal lahir harus diisi");
          return;
        }

        if (this.token) {
          const url = `${this.api_url}/web/user`;
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;

          const formData = new FormData();
          formData.append("no_anggota", this.profiles.no_anggota);
          formData.append("email", this.profiles.email);
          formData.append("nama", this.profiles.nama);
          formData.append("tempat_lahir", this.profiles.tempat_lahir);
          formData.append("no_ktp", this.profiles.no_ktp);
          formData.append(
            "tanggal_lahir",
            moment(this.profiles.tanggal_lahir).format("YYYY-MM-DD")
          );
          formData.append("str", this.profiles.str);
          formData.append(
            "masa_berlaku",
            this.profiles.masa_berlaku
              ? moment(this.profiles.masa_berlaku).format("YYYY-MM-DD")
              : null
          );
          formData.append("propinsi_id", this.profiles.propinsi_id);
          formData.append("kabupaten_id", this.profiles.kabupaten_id);
          formData.append("address", this.profiles.address);

          if (this.input_file) formData.append("photo", this.input_file);

          this.$axios
            .post(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(({ data }) => {
              console.log(data);
              this.$router.push({
                name: "profile",
              });
            })
            .catch((err) => {
              console.log(err);
              alert("Gagal menyimpan profile. Coba lagi");
            })
            .finally(() => {
              this.loading = false;
            });
        }
      } catch (e) {
        console.error("error:", e);
      }
    },

    previewFiles(event) {
      console.log(event.target.files[0]);
      const file = event.target.files[0];
      this.profiles.photo = URL.createObjectURL(file);
      console.log(this.profiles.photo);
      this.input_file = file;
    },
  },

  computed: {
    token() {
      return this.$store.getters["config/ConfigCheckLogin"];
    },
    api_url() {
      return this.$store.getters["config/ConfigApiUrl"];
    },
    filteredPropinsi() {
      if (this.profiles.propinsi_id == "" || this.profiles.propinsi_id == null)
        return this.kabupaten;

      return this.kabupaten.filter(
        (c) => c.propinsi_id == this.profiles.propinsi_id
      );
    },
  },
};
</script>
