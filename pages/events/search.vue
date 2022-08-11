<template>
	<div class="search__event">
		<b-container>
			<b-row class="text-center" align-v="center">
				<b-col>
					<img :src="require('~/assets/icons/search.svg')">
				</b-col>
			</b-row>
			<b-row class="vh-10 text-center mt-3" align-v="center">
				<b-col>
					<h2>Cari Kelas</h2>
					<p>
						Cari kelas sesuai kompetensi yang ingin Anda tingkatkan
					</p>
				</b-col>
			</b-row>
			<div class="form__search d-flex justify-content-center">
				<b-container class="col__form-search">					
					<form @submit.prevent="SearchEvent">
						<b-row class="d-flex justify-content-center">
							<b-col md="8">
								<div class="form-group has-search">
									<mdb-icon icon="search" class="form-control-feedback" />
									<input type="text" class="form-control" placeholder="Cari Pelatihan" v-model="field.keyword">
								</div>
							</b-col>
							<b-col md="4">
								<mdb-btn type="submit" size="md" :class="`${$device.isMobile ? 'rounded-pill btn-block' : 'rounded-pill'}`">
									<div v-if="loadingBtn">
										<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
										Loading...
									</div>
									<div v-else>
										<mdb-icon icon="search"/>&nbsp; Cari
									</div>
								</mdb-btn>
							</b-col>
						</b-row>
					</form>
				</b-container>
			</div>
			<div class="event__list-search d-flex justify-content-center">
				<b-container id="event-card">
					<b-row v-if="error" class="row justify-content-center card__event-content">
						<b-col md="6" sm="12">
							<b-alert class="text-center font-weight-bold" v-if="message" show variant="danger">
								{{message}}
							</b-alert>
						</b-col>
					</b-row>
					<b-row v-else class="row justify-content-center card__event-content">
						<b-col v-if="success && event" md="4" sm="12" cols="12">
							<mdb-card>
								<mdb-card-image
								:src="event.photo"
								:alt="event.kegiatan_title"
								></mdb-card-image>

								<mdb-card-body>
									<mdb-badge class="mb-2 badge__category shadow-none">{{
										event.kategori_value
									}}</mdb-badge>

									<mdb-card-title
									class="truncate"
									style="color: #004899; font-weight: bold; min-height: 80px"
									>{{ event.kegiatan_title }}</mdb-card-title
									>
									<mdb-card-text
									class="truncate2 mt-2"
									style="width: 200px; min-height: 45px"
									>{{ event.kegiatan_desc }}</mdb-card-text
									>

									<h6 class="mt-2 idr__color">
										{{ $format(event.harga) }}
									</h6>

									<span style="font-size: 12px; margin-top: 1.5rem"
									><i class="fa fa-calendar fa-fw fa-lg" aria-hidden="true"></i>
									{{ $moment(event.tgl_awal).format("LL") }} -
									{{ $moment(event.tgl_akhir).format("LL") }}</span
									>
									<hr />
									<nuxt-link
									:to="{
										name: `detail-event-id-slug`,
										params: {
											id: event.kegiatan_id,
											slug: $slug(slug),
										},
									}"
									:class="`btn my__btn-secondary rounded-pill mt-3 mb-2 btn-block shadow-none ${
										$device.isMobile ? 'btn-sm' : ''
									}`"
									>Info Kelas</nuxt-link
									>
								</mdb-card-body>
							</mdb-card>
						</b-col>
						<b-col v-else md="6" sm="12">
							<b-alert class="text-center font-weight-bold" v-if="message" show variant="warning">Warning 
								{{message}}
							</b-alert>
						</b-col>
					</b-row>
				</b-container>
			</div>
		</b-container>
	</div>
</template>

<script>
	export default{
		name: 'events-search',
		layout: 'default',
		data(){
			return{
				field: {},
				event: {},
				loadingBtn:null,
				error: null,
				success: null,
				message: null,
				slug: ''
			}
		},

		methods: {
			SearchEvent(keyword){
				this.loadingBtn = true
				keyword = this.field.keyword
				console.log(keyword)
				const url = `${process.env.NUXT_ENV_API_URL}/web/event/paging?keyword=${keyword}`
				if(keyword === "undefined" || keyword === ""){
					this.loadingBtn = false
					this.error  = true
					this.message = "Kolom pencarian harus di isi !!"
				}else{
					this.error = false
					this.$axios.get(url)
					.then(({data}) => {
						this.event = data.list_kegiatan_terdekat[0]
						this.slug = data.list_kegiatan_terdekat[0].kegiatan_title
					})
					.catch(err => {
						this.success = false
						this.message = 'Tidak ada event yang di cari !!'
						console.log(err.response)
					})
					.finally(() => {
						setTimeout(() => {
							this.success = true
							this.loadingBtn = false
							this.field.keyword = ''
						}, 1000)
					})
				}
			}
		}
	}
</script>
