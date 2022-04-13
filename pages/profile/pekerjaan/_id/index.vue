<template>
  <div class="berita__detail" :style="berita__list_style">
    <mdb-container>
      <!-- header -->
      <mdb-row class="row justify-content-center berita__detail-content">
        <mdb-col lg="12" xs="12" sm="12" class="mb-3">
          <mdb-btn @click="$router.go(-1)" color="danger" class="rounded-pill">
            <mdb-icon icon="angle-left" size="lg" /> Kembali Ke Profile 
          </mdb-btn>
        </mdb-col>
        <mdb-col
          lg="12"
          xs="12"
          sm="12"
          class="d-flex justify-content-between align-items-center"
        >
          <h2 class="text-capitalize" style="color: #004899; font-weight: 700">
            Pekerjaan
          </h2>
          <mdb-btn size="sm" color="deep-orange" @click="openModal">
            <mdb-icon icon="user-cog" size="lg" />
            Tambah Pekerjaan
          </mdb-btn>
        </mdb-col>
      </mdb-row>
      <mdb-container>
        <mdb-row>
          <mdb-col
            v-for="item in list_pekerjaans"
            :key="item.id"
            lg="6"
            sm="6"
            xs="6"
          >
            <mdb-card
              class="card-body"
              style="margin-top: 1rem; min-height: 190px"
              :key="item.id"
            >
              <mdb-container>
                <mdb-row>
                  <mdb-col>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <h6 class="font-weight-bold text-capitalize">
                        {{ item.jabatan }}
                      </h6>
                      <a
                        style="font-size: 14px"
                        href="#"
                        class=""
                        @click="editPekerjaan(item)"
                        >Edit</a
                      >
                    </div>
                    <p class="info__context">
                      <small>
                        {{ item.nama_perusahaan }} <br />
                        Alamat : {{ item.alamat_perusahaan }}
                      </small>
                    </p>
                    <span style="color: #aaa !important; font-size: 12px">
                      {{ $moment(item.mulai_kerja).format("LL") }} -
                      {{
                        item.akhir_kerja != null
                          ? $moment(item.akhir_kerja).format("LL")
                          : "Sampai sekarang"
                      }}
                    </span>
                  </mdb-col>
                </mdb-row>
              </mdb-container>
            </mdb-card>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </mdb-container>
    <div>
      <b-modal ref="form_input" size="lg" id="modal-1" :title="modalTitle">
        <form ref="form">
          <mdb-container>
            <mdb-row>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Nama Institusi"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="pekerjaan.nama_perusahaan"
                    required
                  ></b-form-input>
                </b-form-group>
              </mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Jabatan"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="pekerjaan.jabatan"
                    required
                  ></b-form-input> </b-form-group
              ></mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="NIK / NIP"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="pekerjaan.nik_nip"
                    required
                  ></b-form-input>
                </b-form-group>
              </mdb-col>
              <mdb-col lg="6" xs="6" sm="6">
                <b-form-group
                  label="Alamat Kantor"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="pekerjaan.alamat_perusahaan"
                    required
                  ></b-form-input> </b-form-group
              ></mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Bidang Pekerjaan"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="pekerjaan.bidang_pekerjaan"
                    required
                  ></b-form-input>
                </b-form-group>
              </mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Mulai Bekerja"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <input
                    type="date"
                    class="form-control"
                    id="input_nama_ktp"
                    v-model="pekerjaan.mulai_kerja"
                  />
                </b-form-group>
                <div class="form-group form-check">
                  <label class="form-check-label">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="pekerjaan.is_sampai_sekarang"
                      @change="setSampaiSekarang"
                    />
                    Sampai saat ini
                  </label>
                </div>
              </mdb-col>
              <mdb-col lg="6" xs="6" sm="6"> </mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Akhir Bekerja"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <input
                    type="date"
                    class="form-control"
                    id="input_nama_ktp"
                    v-model="pekerjaan.akhir_kerja"
                    :disabled="pekerjaan.is_sampai_sekarang"
                  />
                </b-form-group>
              </mdb-col>
            </mdb-row>
          </mdb-container>
        </form>
        <template #modal-footer>
          <div class="w-100">
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="simpan"
            >
              Simpan
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="closeModal"
            >
              Close
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "pekerjaan-id",
  layout: "profile",

  data() {
    return {
      berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
      id: this.$route.params.id,
      path: this.$route.name,
      pekerjaan: {
        id: null,
        nama_perusahaan: "",
        jabatan: "",
        nik_nip: "",
        alamat_perusahaan: "",
        bidang_pekerjaan: "",
        mulai_kerja: "",
        akhir_kerja: "",
        is_sampai_sekarang: false,
      },
      list_pekerjaans: [],
      modalTitle: "Tambah Pekerjaan",
    };
  },

  beforeMount() {
    console.log("load mount");
    this.ConfigApiUrl();
    this.UserPekerjaan();
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

    UserPekerjaan() {
      console.log(this.token);
      if (this.token) {
        const url = `${this.api_url}/web/user/list-pekerjaan`;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
          .get(url)
          .then(({ data }) => {
            console.log(data.list_data);
            this.list_pekerjaans = data.list_data;
            // if (user.masa_berlaku) {
            //   this.profiles.masa_berlaku = moment(user.masa_berlaku).format(
            //     "YYYY-MM-DD"
            //   );
            // }
          })
          .catch((err) => console.log(err.response ? err.response : ""));
      }
    },
    openModal() {
      this.pekerjaan.id = null;
      this.pekerjaan.nama_perusahaan = "";
      this.pekerjaan.jabatan = "";
      this.pekerjaan.nik_nip = "";
      this.pekerjaan.alamat_perusahaan = "";
      this.pekerjaan.bidang_pekerjaan = "";
      this.pekerjaan.mulai_kerja = null;

      this.pekerjaan.is_sampai_sekarang = false;
      this.pekerjaan.akhir_kerja = null;

      this.modalTitle = "Tambah Pekerjaan";
      this.$refs["form_input"].show();
    },
    closeModal() {
      this.$refs["form_input"].hide();
    },
    editPekerjaan(item) {
      this.modalTitle = "Edit Pekerjaan";

      this.pekerjaan.id = item.id;
      this.pekerjaan.nama_perusahaan = item.nama_perusahaan;
      this.pekerjaan.jabatan = item.jabatan;
      this.pekerjaan.nik_nip = item.nik_nip;
      this.pekerjaan.alamat_perusahaan = item.alamat_perusahaan;
      this.pekerjaan.bidang_pekerjaan = item.bidang_pekerjaan;
      this.pekerjaan.mulai_kerja = moment(item.mulai_kerja).format(
        "YYYY-MM-DD"
      );

      if (!item.akhir_kerja) {
        this.pekerjaan.is_sampai_sekarang = true;
      } else {
        this.pekerjaan.is_sampai_sekarang = false;
        this.pekerjaan.akhir_kerja = moment(item.akhir_kerja).format(
          "YYYY-MM-DD"
        );
      }
      this.$refs["form_input"].show();
    },
    setSampaiSekarang(e) {
      if (e.target.checked) {
        this.pekerjaan.akhir_kerja = null;
      }
    },
    simpan: async function () {
      if (!this.pekerjaan.nama_perusahaan) {
        alert("Nama instansi harus diisi");
        return;
      }

      if (!this.pekerjaan.mulai_kerja) {
        alert("Mulai kerja harus diisi");
        return;
      }

      try {
        if (this.token) {
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;

          const formData = new FormData();
          formData.append("nama_perusahaan", this.pekerjaan.nama_perusahaan);
          formData.append("jabatan", this.pekerjaan.jabatan);
          formData.append("nik_nip", this.pekerjaan.nik_nip);
          formData.append(
            "alamat_perusahaan",
            this.pekerjaan.alamat_perusahaan
          );
          formData.append("bidang_pekerjaan", this.pekerjaan.bidang_pekerjaan);
          formData.append(
            "mulai_kerja",
            moment(this.pekerjaan.mulai_kerja).format("YYYY-MM-DD")
          );
          if (this.pekerjaan.akhir_kerja)
            formData.append(
              "akhir_kerja",
              this.pekerjaan.akhir_kerja
                ? moment(this.pekerjaan.akhir_kerja).format("YYYY-MM-DD")
                : null
            );

          if (this.pekerjaan.id) {
            const url = `${this.api_url}/web/user/pekerjaan/${this.pekerjaan.id}`;
            this.$axios
              .put(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(({ data }) => {
                this.$refs["form_input"].hide();
                this.UserPekerjaan();
              })
              .catch((err) => {
                console.log(err);
                alert("Gagal menyimpan pekerjaan. Coba lagi");
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            const url = `${this.api_url}/web/user/pekerjaan`;
            this.$axios
              .post(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(({ data }) => {
                this.$refs["form_input"].hide();
                this.UserPekerjaan();
              })
              .catch((err) => {
                console.log(err);
                alert("Gagal menyimpan pekerjaan. Coba lagi");
              })
              .finally(() => {
                this.loading = false;
              });
          }
        }
      } catch (e) {
        console.error("error:", e);
      }
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
