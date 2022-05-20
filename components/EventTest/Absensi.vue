<template>
  <div>
    <mdb-container v-if="data.success">
      <mdb-row col="12" class="row justify-content-center">
        <mdb-col lg="12" xs="12" sm="12">
          <mdb-alert color="success">
            <mdb-icon icon="check" size="lg" /> {{ data.success }}
          </mdb-alert>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <div v-if="loading">
      <mdb-row col="12" class="row justify-content-center">
        <mdb-col lg="12">
          <b-progress
            :max="max"
            height="2rem"
            :striped="true"
            show-progress
            :animated="true"
            class="mb-3"
          >
            <b-progress-bar :value="value" variant="success">
              <h5 v-if="value > 0" class="text-white">Loading</h5>
            </b-progress-bar>
          </b-progress>
        </mdb-col>
      </mdb-row>
    </div>

    <div v-else>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th
                v-for="(item, index) in data.fields"
                :key="index + 1"
                scope="col"
              >
                {{ item.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="10">
                <div class="d-flex justify-content-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else>
              <td>{{ 1 }}</td>
              <td>{{ data.rows.title }}</td>
              <td>{{ $moment(data.rows.tanggal).format("LL") }}</td>
              <td>
                <span v-if="data.rows.jam_absensi_pagi">{{
                  $moment(data.rows.jam_absensi_pagi).format("DD MMMM YYYY HH:mm:ss")
                }}</span>
                <a
                v-else
                href=""
                class="btn my__btn-primary rounded-pill btn-md btn-block text-white"
                @click.prevent="openModalAbsensiPagi(data.rows)"
                >
                <div v-if="loading_answer">
                  <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  ></span>
                  loading_answer...
                </div>
                <div v-else>Absen</div>
              </a>
            </td>
            <td>
              <span v-if="data.rows.jam_absensi_siang">{{
                $moment(data.rows.jam_absensi_siang).format(
                  "DD MMMM YYYY HH:mm:ss"
                  )
                }}</span>
                <a
                v-else
                href=""
                class="btn my__btn-primary rounded-pill btn-md btn-block text-white"
                @click.prevent="openModalAbsensiSiang(item)"
                >
                <div v-if="loading_answer">
                  <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  ></span>
                  loading_answer...
                </div>
                <div v-else>Absen</div>
              </a>
            </td>
            </tr>
          </tbody>
        </table>

        <b-modal ref="modalAbsenPagi" hide-footer v-model="dialogPagi">
          <b-row>
            <b-col cols="12">
              <h4 class="card-title">Absensi Pagi</h4>
              <form>
                <p>Apakah anda akan absen pagi ini?</p>
                <div class="form-group m-3">
                  <button
                    type="button"
                    class="btn my__btn-primary rounded-pill btn-md btn-block text-white"
                  >
                    <div v-if="loading_input">
                      <span
                        class="spinner-border spinner-border-sm text-primary"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </div>
                    <div v-else @click="SendingData">Ya</div>
                  </button>
                </div>
              </form>
            </b-col>
          </b-row>
        </b-modal>

        <b-modal ref="modalAbsenPagi" hide-footer v-model="dialogSiang">
          <b-row>
            <b-col cols="12">
              <h4 class="card-title">Absensi Siang</h4>
              <form>
                <p>Apakah anda akan absen siang ini?</p>
                <div class="form-group m-3">
                  <button
                    type="button"
                    class="btn my__btn-primary rounded-pill btn-md btn-block"
                  >
                    <div v-if="loading_input">
                      <span
                        class="spinner-border spinner-border-sm text-primary"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </div>
                    <div v-else @click="SendingDataSiang">Ya</div>
                  </button>
                </div>
              </form>
            </b-col>
          </b-row>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "api_url",
    "token",
    "kegiatan_id",
    "pelatihan_id",
    "tests",
    "evaluasi",
    "max",
    "value",
    "detailed",
    "title"
  ],
  data() {
    return {
      dialogPagi: false,
      dialogSiang: false,
      data: {
        fields: [
          { title: "#" },
          { title: "Kegiatan" },
          { title: "Waktu Pelaksanaan" },
          { title: "Absensi Pagi" },
          { title: "Absensi Siang" },
        ],
        rows: [],
        send: {
          title: "",
        },
        form: {},
        jawabans: [],
        success: "",
      },
      showModal: true,
      loading: null,
      loading_input: null,
      loading_answer: false,
      is_already: null,
      is_already_post_test: 0,
      style: `${
        this.$device.isDesktop ? "margin-top: -.3rem;" : "margint-top:0;"
      }`,
    };
  },

  mounted() {
    this.ListsData();
  },

  methods: {
    ListsData() {
      console.log(this.evaluasi)
      this.loading = true;
      const url = `${this.api_url}/web/absensi/${this.kegiatan_id}`;
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
      this.$axios
        .get(url)
        .then(({ data }) => {
          // console.log("list data");
          // console.log(data)
          // console.log(data.list_data);
          this.data.rows = data.list_data.map(d=>d);
          this.data.rows = this.data.rows.find(d => d.title === this.title)
          console.log(this.data.rows)
          this.IsAlready(this.is_already);
        })
        .catch((err) => console.log(err.response))
        .finally(() => {
          this.loading = false;
        }, 2500);
    },

    PressData(e) {
      this.data.jawabans.push(e.target.value);
      console.log(this.data.jawabans);
    },

    openModalAbsensiPagi(item) {
      this.data.form.id = item.id;

      this.dialogPagi = true;
    },

    openModalAbsensiSiang(item) {
      this.data.form.id = item.id;

      this.dialogSiang = true;
    },

    SendingData() {
      this.loading_input = true;

      let form_data = {};

      const url = `${this.api_url}/web/absensi/pagi/${this.data.form.id}`;
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
      this.$axios
        .post(url, form_data)
        .then(({ data }) => {
          console.log(data);
          this.$swal("Anda telah absen pagi ini", "", "success");
        })
        .catch((err) => console.log(err.response))
        .finally(() => {
          this.loading_input = false;
          this.dialogPagi = false;
          this.ListsData();
        });
    },

    SendingDataSiang() {
      this.loading_input = true;

      let form_data = {};

      const url = `${this.api_url}/web/absensi/siang/${this.data.form.id}`;
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
      this.$axios
        .post(url, form_data)
        .then(({ data }) => {
          console.log(data);
          this.$swal("Anda telah absen siang ini", "", "success");
        })
        .catch((err) => console.log(err.response))
        .finally(() => {
          this.loading_input = false;
          this.dialogSiang = false;
          this.ListsData();
        });
    },

    IsAlready(already) {
      let tableRTL = document.querySelector("#table-rtl");
      if (already === 1) {
        tableRTL.scrollIntoView();
      }
    },
  },
};
</script>
