<template>
  <div class="card__list">
    <!-- webinar list header -->
    <div class="row justify-content-between card__header">
      <mdb-col md="12" xs="12" sm="12">
        <h5 class="text-capitalize">
          <strong class="font-weight-bold">mulai sekarang</strong>
        </h5>
      </mdb-col>
      <!-- <mdb-col md="4"></mdb-col> -->
      <mdb-col md="12" xs="12" sm="12" :class="`text-capitalize ${$device.isDesktop ? 'mb-5' : 'mb-2'}`">
        <h2>Temukan kelas sesuai kompetensi yang ingin dicapai</h2>
      </mdb-col>
    </div>
  <!-- End header webinar list -->

    <!-- Event webinar list content -->
    <CardEventList :listsToShow="listsToShow" :events="events" :loading="loading" />
    <!-- <MoleculesHomepageMoleculesListEventSample v-else :listsToShow="listsToShow"/> -->
    <!-- End Event Webinar List content -->

  </div>
</template>

<script>
import CardEventList from "@/components/Molecules/HomepageMolecules/CardEventList";

export default {
  props: ["events", "loading"],
  components: {
    CardEventList
  },
  data() {
    return {
      listsToShow: 3
    }
  }
}
</script>
