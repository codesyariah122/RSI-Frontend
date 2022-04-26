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
            Pendidikan
          </h2>
          <mdb-btn size="sm" color="deep-orange" @click="openModal">
            <mdb-icon icon="user-cog" size="lg" />
            Tambah Pendidikan
          </mdb-btn>
        </mdb-col>
      </mdb-row>
      <mdb-container>
        <mdb-row>
          <mdb-col
            v-for="item in list_pendidikans"
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
                        {{ item.nama_institusi }}
                      </h6>
                      <a
                        style="font-size: 14px"
                        href="#"
                        class=""
                        @click="editPendidikan(item)"
                        >Edit</a
                      >
                    </div>
                    <p class="info__context">
                      {{ item.jenjang_value }} - {{ item.jurusan }} <br />
                    </p>
                    <span style="color: #aaa !important; font-size: 12px">
                      {{ $moment(item.mulai_pend).format("LL") }} -
                      {{
                        item.akhir_pend != null
                          ? $moment(item.akhir_pend).format("LL")
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
                    v-model="pendidikan.nama_institusi"
                    required
                  ></b-form-input>
                </b-form-group>
              </mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Jurusan"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="pendidikan.jurusan"
                    required
                  ></b-form-input> </b-form-group
              ></mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="No Ijazah"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="pendidikan.no_ijazah"
                    required
                  ></b-form-input>
                </b-form-group>
              </mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Tanggal Ijazah"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <input
                    type="date"
                    class="form-control"
                    id="input_nama_ktp"
                    v-model="pendidikan.tanggal_ijazah"
                  />
                </b-form-group>
              </mdb-col>
              <mdb-col lg="6" xs="6" sm="6">
                <b-form-group
                  label="Jenjang"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <select
                    class="form-control"
                    id="sel1"
                    v-model="pendidikan.jenjang"
                  >
                    <option
                      v-for="jenjang in list_jenjang"
                      v-bind:value="jenjang.code"
                      v-bind:key="jenjang.code"
                    >
                      {{ jenjang.value }}
                    </option>
                  </select>
                </b-form-group></mdb-col
              >
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Mulai Pendidikan"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <input
                    type="date"
                    class="form-control"
                    id="input_nama_ktp"
                    v-model="pendidikan.mulai_pend"
                  />
                </b-form-group>
                <div class="form-group form-check">
                  <label class="form-check-label">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="pendidikan.is_sampai_sekarang"
                      @change="setSampaiSekarang"
                    />
                    Sampai saat ini
                  </label>
                </div>
              </mdb-col>
              <mdb-col lg="6" xs="6" sm="6"> </mdb-col>
              <mdb-col lg="6" xs="6" sm="6"
                ><b-form-group
                  label="Akhir Pendidikan"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                >
                  <input
                    type="date"
                    class="form-control"
                    id="input_nama_ktp"
                    v-model="pendidikan.akhir_pend"
                    :disabled="pendidikan.is_sampai_sekarang"
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
  name: "pendidikan-id",
  layout: "profile",

  data() {
    return {
      berita__list_style: this.$device.isDesktop
        ? "margin-top: 8rem;"
        : "margin-top: 6rem;",
      id: this.$route.params.id,
      path: this.$route.name,
      pendidikan: {
        id: null,
        jenjang: "",
        nama_institusi: "",
        jurusan: "",
        no_ijazah: "",
        mulai_pend: "",
        akhir_pend: "",
        tanggal_ijazah: "",
        is_sampai_sekarang: false,
      },
      list_pendidikans: [],
      list_jenjang: [],
      modalTitle: "Tambah Pendidikan",
    };
  },

  beforeMount() {
    this.ConfigApiUrl();
    this.JenjangList();
    this.UserPendidikan();
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

    JenjangList() {
      const url = `${this.api_url}/web/jenjang/list`;
      this.$axios
        .get(url)
        .then(({ data }) => {
          this.list_jenjang = data.list_data;
        })
        .catch((err) => console.log(err.response ? err.response : ""));
    },

    UserPendidikan() {
      if (this.token) {
        const url = `${this.api_url}/web/user/list-pendidikan`;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
          .get(url)
          .then(({ data }) => {
            this.list_pendidikans = data.list_data;
          })
          .catch((err) => console.log(err.response ? err.response : ""));
      }
    },
    openModal() {
      this.pendidikan.id = null;
      this.pendidikan.nama_institusi = "";
      this.pendidikan.jenjang = "";
      this.pendidikan.jurusan = "";
      this.pendidikan.mulai_pend = null;
      this.pendidikan.akhir_pend = null;
      this.pendidikan.no_ijazah = "";
      this.pendidikan.tanggal_ijazah = null;

      this.modalTitle = "Tambah Pendidikan";
      this.$refs["form_input"].show();
    },
    closeModal() {
      this.$refs["form_input"].hide();
    },
    editPendidikan(item) {
      this.modalTitle = "Edit Pendidikan";

      this.pendidikan.id = item.id;
      this.pendidikan.nama_institusi = item.nama_institusi;
      this.pendidikan.jenjang = item.jenjang;
      this.pendidikan.jurusan = item.jurusan;
      this.pendidikan.mulai_pend = moment(item.mulai_pend).format("YYYY-MM-DD");

      if (!item.akhir_pend) {
        this.pendidikan.is_sampai_sekarang = true;
      } else {
        this.pendidikan.is_sampai_sekarang = false;
        this.pendidikan.akhir_pend = moment(item.akhir_pend).format(
          "YYYY-MM-DD"
        );
      }

      this.pendidikan.no_ijazah = item.no_ijazah;

      if (item.tanggal_ijazah) {
        this.pendidikan.tanggal_ijazah = moment(item.tanggal_ijazah).format(
          "YYYY-MM-DD"
        );
      }

      this.$refs["form_input"].show();
    },
    setSampaiSekarang(e) {
      if (e.target.checked) {
        this.pendidikan.akhir_pend = null;
      }
    },
    simpan: async function () {
      if (!this.pendidikan.nama_institusi) {
        alert("Nama instansi harus diisi");
        return;
      }

      if (!this.pendidikan.mulai_pend) {
        alert("Mulai pendidikan harus diisi");
        return;
      }

      try {
        if (this.token) {
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;

          const formData = new FormData();
          formData.append("nama_institusi", this.pendidikan.nama_institusi);
          formData.append("jenjang", this.pendidikan.jenjang);
          formData.append("jurusan", this.pendidikan.jurusan);
          formData.append("no_ijazah", this.pendidikan.no_ijazah);
          formData.append(
            "mulai_pend",
            moment(this.pendidikan.mulai_pend).format("YYYY-MM-DD")
          );
          if (this.pendidikan.akhir_pend)
            formData.append(
              "akhir_pend",
              this.pendidikan.akhir_pend
                ? moment(this.pendidikan.akhir_pend).format("YYYY-MM-DD")
                : null
            );

          if (this.pendidikan.tanggal_ijazah)
            formData.append(
              "tanggal_ijazah",
              this.pendidikan.tanggal_ijazah
                ? moment(this.pendidikan.tanggal_ijazah).format("YYYY-MM-DD")
                : null
            );

          if (this.pendidikan.id) {
            const url = `${this.api_url}/web/user/pendidikan/${this.pendidikan.id}`;
            this.$axios
              .put(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(({ data }) => {
                this.$refs["form_input"].hide();
                this.UserPendidikan();
              })
              .catch((err) => {
                console.log(err);
                alert("Gagal menyimpan pendidikan. Coba lagi");
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            const url = `${this.api_url}/web/user/pendidikan`;
            this.$axios
              .post(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(({ data }) => {
                this.$refs["form_input"].hide();
                this.UserPendidikan();
              })
              .catch((err) => {
                console.log(err);
                alert("Gagal menyimpan pendidikan. Coba lagi");
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
