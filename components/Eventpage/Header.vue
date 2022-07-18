<template>
  <div>
    <mdb-container class="header__event">
      <mdb-row class="justify-content-center">
        <mdb-col col="12" lg="12" xs="12" sm="12">
          <h2>Katalog Kelas</h2>
          <p class="text-justify mt-5 mb-2">
            Temukan kelas sesuai kompeteni yang ingin Anda tingkatkan.
          </p>
        </mdb-col>

        <mdb-col lg="12" xs="12" sm="12" class="filter__event">
          <div :class="`${$device.isDesktop ? 'd-flex flex-row bd-highlight mb-3' : 'bd-highlight mb-3'}`">
            <div class="p-2 bd-highlight mr-3">
              <h6>Filter</h6>
            </div>
            <div class="p-2 bd-highlight mr-2">
              <div class="form-group">
                <!-- <pre>
                  {{categories}}
                </pre> -->
                <select
                @change="ChangeCategory($event)"
                v-model="field.category_id"
                class="browser-default custom-select rounded-pill"
                >
                    <option selected :value="undefined">Jenis Pelatihan</option>
                    <option
                    v-for="(item, index) in categories"
                    :value="parseInt(item.code)" :key="item.id"
                    >
                    {{ item.value }}
                  </option>
                </select>
              </div>
            </div>
            <div class="p-2 bd-highlight">
              <div class="form-group">
                <select
                @change="ChangeMonth($event)"
                v-model="field.month"
                class="browser-default custom-select rounded-pill"
                >
                    <option selected :value="undefined">Bulan Pelatihan</option>
                    <option
                    v-for="(month, index) in $moment.months()"
                    :value="index + 1"
                    :data-month="index + 1"
                    :data-name="month"
                    >
                    {{ month }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="!search || search == null" :class="`p-2 bd-highlight mr-3 ${$device.isDesktop ? 'count__event' : ''}`">
              <div class="float-right">
                  <h6>
                    Menampilkan <strong> {{listToShow}} </strong> dari <strong> {{lists.length < listToShow ? listToShow : lists.length}} </strong>
                  </h6>
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>

  </div>
</template>

<script>
export default {
  props: ["lists", "loading", "loadingBtn", "listToShow", "categories", "search"],
  data() {
    return {
      field: {
        keyword: "",
        category_id: null,
        month: null,
      },
      month: "",
      selected: undefined,
      currentPage: 1,
      basedOn: null
    };
  },

  methods: {
    SearchEvent() {
      this.$emit(
        "update-list-event",
        this.currentPage,
        this.field.keyword,
        this.field.category_id,
        this.field.month,
        true,
        this.month,
        this.basedOn
      );
    },

    ResetForm() {
      this.field.keyword = "";
      this.field.category_id = this.selected;
      this.field.month = this.selected;
    },

    ChangeCategory(e) {
      this.field.category_id = e.target.value;
      this.basedOn = "category"
      this.SearchEvent()
    },

    ChangeMonth(e) {
      const options = e.target.options;
      this.field.month = options[options.selectedIndex].getAttribute("data-month");
      this.month = options[options.selectedIndex].getAttribute("data-name");
      this.basedOn = "month"
      this.SearchEvent()
    },

    // load pagination
    LoadEvent(page) {
      this.$emit(
        "load-more-event",
        page,
        this.field.keyword,
        this.field.category_id,
        this.field.month
      );
    },
  },
};
</script>
