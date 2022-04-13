<template>
  <div v-if="type == 1" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section mt-2" id="item-1-1">
      <div v-if="link_yt">
        <center>
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
          <b-col cols="12" class="mt-3">
            <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
          </b-col>
        </center>
      </div>
      <div v-else>
        <EventpageVideoSection :video="detailed.video" />
      </div>
    </section>
  </div>

  <div v-else-if="type == 2" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section mt-2" id="item-1-1">
      <mdb-alert
        v-if="
          detailed.file_pdf == 'https://api.ppkc-online.com/file-pelatihan/null'
        "
        color="danger"
      >
        Not found!
      </mdb-alert>
      <div v-else class="embed-responsive embed-responsive-1by1">
        <object
          :data="detailed.file_pdf"
          type="application/pdf"
          width="100%"
          :height="`${$device.isDesktop ? '900px' : '600px'}`"
        ></object>
      </div>
    </section>
  </div>

  <div v-else-if="type == 3" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="success" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EventTestPreTest
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :details="details"
        :username="username"
      />
    </section>
  </div>

  <div v-else-if="type == 4" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="success" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EventTestPostTest
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :username="username"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :details="details"
        :evaluasi="evaluasi"
      />
    </section>
  </div>

  <div v-else-if="type == 5" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="primary" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section mt-2" id="item-1-1">
      <mdb-alert
        v-if="
          detailed.file_pdf == 'https://api.ppkc-online.com/file-pelatihan/null'
        "
        color="danger"
      >
        Not found!
      </mdb-alert>
      <div v-else class="embed-responsive embed-responsive-1by1">
        <object
          :data="detailed.file_pdf"
          type="application/pdf"
          width="100%"
          :height="`${$device.isDesktop ? '900px' : '600px'}`"
        ></object>
      </div>
    </section>
  </div>

  <div v-else-if="type == 6" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <!-- <mdb-badge color="info" class="mb-2">{{type_name}}</mdb-badge> -->
        <h5 class="type__name">{{ type_name }}</h5>
        <h2>{{ detailed_data.title }}</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section mt-2" id="item-1-1">
      <EventWebinar
        :id_webinar="id_webinar"
        :token="token"
        :api_url="api_url"
        :profiles="profiles"
        :details="details"
      />
    </section>
  </div>

  <div v-else-if="type == 7" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Evaluasi</h5>
        <h2>Evaluasi Fasilitator</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EvaluasiFasilitator
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :username="username"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :details="details"
        :evaluasi="evaluasi"
      />
    </section>
  </div>

  <div v-else-if="type == 8" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Evaluasi</h5>
        <h2>Evaluasi Penyelenggaraan</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EvaluasiPenyelenggaraan
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :username="username"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :details="details"
        :evaluasi="evaluasi"
      />
    </section>
  </div>

  <div v-else-if="type == 9" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Evaluasi</h5>
        <h2>Evaluasi Pasca Kegiatan</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EvaluasiPascaKegiatan
        :id_test="id_test"
        :type_name="type_name"
        :token="token"
        :api_url="api_url"
        :pelatihans="pelatihans"
        :username="username"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :details="details"
        :evaluasi="evaluasi"
      />
    </section>
  </div>
  <div v-else-if="type == 10" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Evaluasi</h5>
        <h2>Evaluasi Rencana Tindak Lanjut</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EventTestTableRTL
        :token="token"
        :api_url="api_url"
        :kegiatan_id="kegiatan_id"
        :pelatihan_id="pelatihan_id"
        :tests="tests"
        :evaluasi="evaluasi"
      />
    </section>
  </div>
  <div v-else-if="type == 11" class="embed__file">
    <header class="docs-header">
      <section class="docs-intro">
        <h5 class="type__name">Absensi</h5>
        <h2>Absensi Pelatihan</h2>
      </section>
      <!--//docs-intro-->
    </header>
    <section class="docs-section" id="item-1-1">
      <EventTestAbsensi
        :token="token"
        :api_url="api_url"
        :kegiatan_id="kegiatan_id"
        :kegiatan_title="kegiatan_title"
        :pelatihan_id="pelatihan_id"
        :tests="tests"
        :evaluasi="evaluasi"
        :max="max" :value="value"
      />
    </section>
  </div>
</template>

<script>
export default {
  props: [
    "type",
    "type_name",
    "detailed",
    "detailed_data",
    "details",
    "profiles",
    "pelatihans",
    "api_url",
    "token",
    "value",
    "max",
    "id_test",
    "id_webinar",
    "username",
    "link_yt",
    "kegiatan_id",
    "kegiatan_title",
    "pelatihan_id",
    "evaluasi",
    "tests"
  ],
};
</script>
