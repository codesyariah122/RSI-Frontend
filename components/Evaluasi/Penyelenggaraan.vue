<template>
  <div class="pre__test">
    <mdb-container>
      <div v-if="loading_soal">
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

        <div v-else>
          <mdb-row
            v-if="is_already == 1"
            col="12"
            class="row justify-content-center"
          >
            <mdb-col lg="12" xs="12" sm="12">
              <mdb-alert color="primary">
                <mdb-icon icon="info-circle" size="lg" /> Anda telah
                menyelesaikan evaluasi penyelenggaraan ini !
              </mdb-alert>
            </mdb-col>
          </mdb-row>

          <mdb-row col="12" class="row justify-content-center mb-3">
            <mdb-col lg="12" xs="12" sm="12">
              <small class="text-primary">
                Mohon isi evaluasi untuk penyelenggaraan berikut
              </small>
            </mdb-col>
          </mdb-row>

          <mdb-row
            col="12"
            class="row justify-content-center"
            v-for="(item, index) in lists"
            :key="item.id"
          >
            <mdb-col lg="12" class="test__content">
              <h4>No. {{ item.urutan }}</h4>
              <p>{{ item.aspek_dinilai }}</p>
              <div class="test-answers">
                <form method="POST" class="is-not-results">
                  <fieldset>
                    <div class="answers">
                      <div class="answer">
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          :readonly="is_already == 1"
                          v-model="item.jawaban"
                        ></textarea>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </mdb-col>
          </mdb-row>

          <mdb-row
            v-if="is_already == 0"
            col="12"
            class="row justify-content-center"
          >
            <mdb-col lg="12">
              <div class="mb-2">
                <a
                  href=""
                  class="btn btn-primary btn-md rounded btn-block"
                  @click.prevent="SubmitTest"
                >
                  <div v-if="loading_answer">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    loading_answer...
                  </div>
                  <div v-else>Submit <mdb-icon far icon="paper-plane" /></div>
                </a>
              </div>
            </mdb-col>
          </mdb-row>
        </div>
      </div>
    </mdb-container>
  </div>
</template>

<script>
export default {
  props: [
    "id_test",
    "token",
    "api_url",
    "pelatihans",
    "details",
    "username",
    "kegiatan_id",
  ],

  data() {
    return {
      loading_soal: null,
      loading_answer: null,
      is_already: 0,
      is_already_post_test: 0,
      lists: [],
      profiles: [],
      timer: 0,
      value: 0,
      max: 100,
    };
  },

  mounted() {
    this.Evaluasi();
    this.UserProfileData();
  },

  methods: {
    UserProfileData() {
      if (this.token) {
        const url = `${this.api_url}/web/user`;
        this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
        this.$axios
          .get(url)
          .then(({ data }) => {
            this.profiles = data.user;
          })
          .catch((err) => console.log(err.response ? err.response : ""));
      }
    },

    Evaluasi() {
      this.loading_soal = true;
      const url = `${this.api_url}/web/kegiatan/evaluasi-penyelenggaraan/list?kegiatan_id=${this.kegiatan_id}`;
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
      this.$axios
        .get(url)
        .then(({ data }) => {
          this.lists = data.list_data;
          this.is_already = data.is_already;
          this.is_already_post_test = data.is_already_post_test;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.startTimer();
          this.loading_soal = false;
        });
    },

    SubmitTest() {
      //check if already filled all question
      var isFilled = 1;
      this.lists.forEach((entry) => {
        if (entry.jawaban == null || !entry.jawaban.trim()) {
          isFilled = 0;
        }
      });

      if (isFilled == 0) {
        this.$swal("Mohon isi semua hasil evaluasi", "", "success");
        return;
      }

      window.scrollTo(0, 0);
      this.loading_soal = true;

      this.$swal({
        title: "Apakah Anda yakin ingin mengirimkan hasil evaluasi ini ?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Ya, Kumpulkan jawaban saya",
        denyButtonText: `Tidak`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.KirimJawaban();
        } else if (result.isDenied) {
          this.loading_soal = false;
        }
      });
    },

    KirimJawaban() {
      window.scrollTo(0, 0);
      const url = `${this.api_url}/web/kegiatan/evaluasi-penyelenggaraan/jawaban`;
      this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;

      var paramJawaban = [];
      this.lists.forEach((entry) => {
        paramJawaban.push({
          kegiatan_id: this.kegiatan_id,
          pelatihan_evaluasi_penyelenggaraan_id: entry.id,
          jawaban: entry.jawaban,
        });
      });

      var params = {
        kegiatan_id: this.kegiatan_id,
        jawabans: paramJawaban,
      };
      this.$axios
        .post(url, params)
        .then(({ data }) => {
          console.log(data);
          this.$swal(data.message, "", "success");
          this.is_already = 1;
        })
        .catch((err) => {
          console.log(err);
          this.$swal("Gagal menyimpan evaluasi. Coba lagi", "", "success");
        })
        .finally(() => {
          setTimeout(() => {
            this.loading_answer = false;
            this.loading_soal = false;
          }, 2500);
        });
    },

    startTimer() {
      let vm = this;
      let timer = setInterval(function () {
        vm.value += 6;
        if (vm.value >= vm.max) clearInterval(timer);
      }, 100);
      vm.value = 0;
    },
  },
};
</script>
