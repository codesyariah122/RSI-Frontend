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
      <mdb-row
        v-if="is_already_post_test == 0"
        col="12"
        class="row justify-content-center"
      >
        <mdb-col lg="12" xs="12" sm="12">
          <mdb-alert color="primary">
            <mdb-icon icon="info-circle" size="lg" /> Anda belum menyelesaikan
            post test. Mohon mengikuti post test untuk mengisi evaluasi
          </mdb-alert>
        </mdb-col>
      </mdb-row>

      <div v-else id="table-rtl" class="table-responsive">
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
            <tr v-else v-for="(item, index) in data.rows" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.title }}</td>
              <td>{{ $moment(item.tanggal).format("LL") }}</td>
              <td>
                {{ $moment(item.jam_awal, "HH:mm:ss").format("HH:mm:ss") }}
              </td>
              <td>
                {{ $moment(item.jam_akhir, "HH:mm:ss").format("HH:mm:ss") }}
              </td>
              <td v-if="item.sasaran">
                {{ item.sasaran }}
              </td>
              <td v-else>-</td>
              <td v-if="item.keterangan">
                {{ item.keterangan }}
              </td>
              <td v-else>-</td>
              <td v-if="item.sasaran && item.keterangan">
                <mdb-icon icon="check-double" size="lg" class="text-success" />
              </td>
              <td v-else class="add__data">
                <b-button
                  v-b-modal="`modal-${item.id}`"
                  size="sm"
                  :style="style"
                  ref="btnShow"
                  >Add</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>

        <b-modal
          v-for="(item, index) in data.rows"
          :key="item.id"
          :id="`modal-${item.id}`"
          hide-footer
        >
          <b-row>
            <b-col cols="12">
              <h4 class="card-title">
                {{ item.title }}
              </h4>
              <form @submit.stop.prevent="SendingData(item.id)">
                <div class="form-group">
                  <label for="sasaran"> Sasaran </label>
                  <textarea
                    id="sasaran"
                    v-model="data.form.sasaran"
                    class="form-control"
                  >
                  </textarea>
                </div>
                <div class="form-group">
                  <label for="sasaran"> Keterangan </label>
                  <textarea
                    id="keterangan"
                    v-model="data.form.keterangan"
                    class="form-control"
                  >
                  </textarea>
                </div>
                <div
                  v-if="item.sasaran == null && item.keterangan == null"
                  class="form-group m-3"
                >
                  <button
                    type="submit"
                    class="btn btn-block rounded-pill btn-primary"
                  >
                    <div v-if="loading_input">
                      <span
                        class="spinner-border spinner-border-sm text-primary"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </div>
                    <div v-else>Tambah Data</div>
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
  ],
  data() {
    return {
      data: {
        fields: [
          { title: "#" },
          { title: "Kegiatan" },
          { title: "Waktu Pelaksanaan" },
          { title: "Jam Awal" },
          { title: "Jam Akhir" },
          { title: "Sasaran" },
          { title: "Keterangan" },
          { title: "Options" },
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
      this.loading = true;
      const url = `${this.api_url}/web/kegiatan/evaluasi-rtl/list?kegiatan_id=${this.kegiatan_id}`;
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
      this.$axios
        .get(url)
        .then(({ data }) => {
          // console.log(data)
          this.data.rows = data.list_data;
          // console.log(this.data.rows)
          this.data.rows.forEach((item, index) => {
            if (item.sasaran && item.keterangan)
              this.data.jawabans.push({
                kegiatan_id: this.kegiatan_id,
                pelatihan_id: item.id,
                sasaran: item.sasaran,
                keterangan: item.keterangan,
              });
          });
          // console.log(this.data.jawabans)
          this.is_already = data.is_already;
          this.is_already_post_test = data.is_already_post_test;

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

    SendingData(pelatihan_id) {
      this.data.jawabans.push({
        kegiatan_id: this.kegiatan_id,
        pelatihan_id: pelatihan_id,
        sasaran: this.data.form.sasaran,
        keterangan: this.data.form.keterangan,
      });

      this.loading_input = true;

      let form_data = {
        kegiatan_id: this.kegiatan_id,
        jawabans: this.data.jawabans,
      };
      console.log(this.data.jawabans);

      const url = `${this.api_url}/web/kegiatan/evaluasi-rtl/jawaban`;
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
      this.$axios
        .post(url, form_data)
        .then(({ data }) => {
          console.log(data);
          if (data.messagge) {
            this.data.success = data.message;
            this.$swal(data.message, "", "success");
          }
        })
        .catch((err) => console.log(err.response))
        .finally(() => {
          setTimeout(() => {
            this.loading_input = false;
            this.$root.$emit("bv::hide::modal", "addmodal", "#btnShow");
            this.ListsData();
            this.data.jawabans = [];
          }, 2500);
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
