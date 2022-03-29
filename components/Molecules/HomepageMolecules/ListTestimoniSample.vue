<template>
	<div>
		<mdb-row class="row justify-content-center col__testimoni">
			<mdb-col v-for="listIndex in listToShow" md="6" xs="12" sm="12" class="col__testimoni-card" :key="lists[listIndex-1].id">
				<mdb-card class="card__testimoni-content">
					<mdb-container class="mt-3">
						<mdb-row>
							<mdb-col md="4" class="avatar">
								<mdb-card-image :src="lists[listIndex-1].avatar" alt="Card image cap"></mdb-card-image>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-card-body>
								<mdb-card-title>{{lists[listIndex-1].name}}</mdb-card-title>
								<h6>{{lists[listIndex-1].profesi}}</h6>
								<mdb-card-text>{{lists[listIndex-1].testimoni}}</mdb-card-text>
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
	import {TestimoniSamples} from '@/helpers'
	export default{
		data(){
			return {
				lists: [],
				listToShow: 2
			}
		},

		beforeMount(){
			this.GetTestimoniSample()
		},

		methods: {
			GetTestimoniSample(){
				TestimoniSamples.map(d => {
					this.lists.push(d)
				})
			}
		}
	}
</script>

<style lang="scss">
@include card_testimonial_mobile;

@media (min-width: 992px) {
  @include card_testimonial_desktop;
}
</style>