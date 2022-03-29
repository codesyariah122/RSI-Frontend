<template>
  <div>
    <!-- Testimoni content -->
    <mdb-row class="row justify-content-center col__testimoni">
      <mdb-col v-for="(item, index) in testimonis" md="6" xs="12" sm="12" class="col__testimoni-card" :key="item.id">
        <mdb-card class="card__testimoni-content">
          <mdb-container class="mt-3">
            <mdb-row>
              <mdb-col md="4" class="avatar">
                <mdb-card-image :src="item.avatar" alt="Card image cap"></mdb-card-image>
              </mdb-col>
            </mdb-row>
            <mdb-row>
              <mdb-card-body>
                <mdb-card-title>{{item.name}}</mdb-card-title>
                <h6>{{item.profesi}}</h6>
                <mdb-card-text>{{item.testimoni}}</mdb-card-text>
              </mdb-card-body>
            </mdb-row>
          </mdb-container>
        </mdb-card>
      </mdb-col>

      <mdb-col col="12" lg="12" xs="12" sm="12" class="bg__content">
        <img :src="require('~/assets/art/vector-3.png')" :width="`${$device.isMobile ? '370px' : ''}`">
      </mdb-col>
    </mdb-row>

  </div>
</template>

<script>
import DefaultProfile from "~/assets/images/profile/user-profile.svg";

export default {
  props: ["testimonis"],
  data() {
    return {
      testiToShow: 4,
      profile_default: DefaultProfile,
      null_foto: null,
    }
  }
}
</script>

<style lang="scss">
@include card_testimonial_mobile;
.tns-outer {
  position: relative;
}
[data-controls] {
  border: 0;
  padding: 0;
  font-size: 40px;
  position: absolute;
  top: 50%;
  margin-top: -18px;
  z-index: 1;
  background: transparent;
  color: $color-primary;
}
button[disabled] {
  color: $default-gray !important;
  cursor: not-allowed;
}
[data-controls="prev"] {
  left: -8px;
}
[data-controls="next"] {
  right: 5px;
}
@media (min-width: 992px) {
  @include card_testimonial_desktop;
}
</style>
