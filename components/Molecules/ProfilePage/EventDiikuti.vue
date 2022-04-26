<template>
	<div>
		<mdb-row cols="12" class="justify-content-end filtering__form-data">
			<mdb-col md="2">
				<h5>Filter</h5>
			</mdb-col>
			<mdb-col md="10">
				<form @submit.prevent="FilterEvent">
					<mdb-row :class="`${$device.isDesktop ? 'd-flex justify-content-between' : ''}`">
						<mdb-col col="12" md="3">
							<select selected :value="undefined" @change="ChangeCategory($event)">
								<option value="">Jenis Pelatihan</option>
								<option v-for="(item, index) in categories" :value="item.code">
									{{item.value}}
								</option>
							</select>
						</mdb-col>
						<mdb-col col="12" md="3">
							<select selected :value="undefined" @change="ChangeMonth($event)">
								<option value="">Bulan Pelatihan</option>
								<option v-for="(month, index) in $moment.months()" :value="index + 1">
									{{month}}
								</option>
							</select>
						</mdb-col>
						<mdb-col col="12" md="4">
							<mdb-btn size="sm" type="submit">
								<div v-if="loading_filter">
									<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									Loading...
								</div>
								<div v-else>
									<mdb-icon icon="filter" size="sm"/> Terapkan Filter	
								</div>
							</mdb-btn>
						</mdb-col>
					</mdb-row>
				</form>
			</mdb-col>
		</mdb-row>

		<mdb-row v-if="loading_filter" class="row justify-content-center mt-2">
			<mdb-col lg="12" xs="12" sm="12">
				<b-skeleton animation="throb" width="85%"></b-skeleton>
				<b-skeleton animation="throb" width="55%"></b-skeleton>
				<b-skeleton animation="throb" width="70%"></b-skeleton>
			</mdb-col>
		</mdb-row>

		<mdb-row v-else col="12" class="row justify-content-center event__diikuti-card mb-3">
			<mdb-col lg="12" xs="12" sm="12">
				<mdb-card v-if="empty_filter" class="card-body" style="width: 100%; margin-top: 1rem;">
					<mdb-row>
						<mdb-col lg="12" xs="12" sm="12">
							<mdb-alert color="warning" v-if="p1" @closeAlert="EventYangDiikuti(0, '','');p1=false" dismiss>
								<strong>Oopps!</strong> tidak ada event yang anda ikuti.
							</mdb-alert>
						</mdb-col>
					</mdb-row>
				</mdb-card>

				<mdb-card v-else v-for="(item, index) in pelatihans" class="card-body" style="width: 100%; margin-top: 1rem;" :key="item.id">
					<mdb-container>
						<mdb-row>
							<mdb-col lg="12" xs="12" sm="12">
								<mdb-card-title>{{item.kegiatan_title}}</mdb-card-title>
								<small class="date__event">
									{{$moment(item.tanggal_awal).format("LL")}} - {{$moment(item.tanggal_akhir).format("LL")}}
								</small>
								<mdb-row class="d-flex justify-content-start">
									<mdb-col md="3">
										<span>Status : </span> 
									</mdb-col>
									<mdb-col md="4">
										<mdb-badge size="sm" class="mb-2 badge__category shadow-none" >{{item.status_pendaftaran_value}}</mdb-badge>
									</mdb-col>
									<mdb-col md="12">
										<blockquote class="blockquote-footer">
											{{item.kegiatan_desc}}
										</blockquote>
									</mdb-col>
								</mdb-row>
							<!-- <mdb-row class="d-flex justify-content-start mb-3">
								<mdb-col md="3">
									<span>Kategori : </span>
								</mdb-col>
								<mdb-col md="1">
									<mdb-badge v-if="index+1" size="sm" class="badge btn-primary mb-4 badge__category text-white" >{{categories[index].value}}</mdb-badge>
								</mdb-col>
							</mdb-row> -->
							<mdb-row>
								<mdb-col md="6">
									<h4 class="idr__color">{{$format(item.harga)}}</h4>
								</mdb-col>
							</mdb-row>
						</mdb-col>

						<mdb-col lg="6" xs="12" sm="12" class="mt-3">
							<nuxt-link :to="`/detail/event/${item.kegiatan_id}/${$slug(item.kegiatan_title)}`" size="sm" class="btn my__btn-primary rounded-pill btn-block">Akses Pelatihan</nuxt-link>
						</mdb-col>
					</mdb-row>
				</mdb-container>
			</mdb-card>
		</mdb-col>

	</mdb-row>

</div>
</template>

<script>
	import {FetchData} from '@/helpers'
	export default{
		props: ['profiles'],
		data(){
			return {
				pelatihans:[],
				categories: [],
				p1: true,
				username: '',
				field: {},
				loading_filter: null,
				empty_filter: null
			}
		},

		beforeMount(){
			this.ConfigApiUrl(),
			this.UserProfileData(),
			this.EventYangDiikuti()
		},
		mounted(){
			this.CheckToken(),
			this.EventCategories()
		},

		methods: {
			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},

			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			UserProfileData(){
				if(this.token){
					this.loading=true					
					const url = `${this.api_url}/web/user`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.username = this.$username(data.user.nama)
					})
					.catch(err => console.log(err.response ? err.response : ''))
					.finally(() => {
						setTimeout(() => {
							this.loading=false
						},1500)
					})
				}
			},

			EventYangDiikuti(page=0, category='', month=''){
				// category = this.field.category  ? this.field.category  : ''
				// month = this.field.month ? this.field.month : ''
				this.loading_filter = true
				this.empty_filter = false
				const url = `${this.api_url}/web/kegiatan/saya/list/page?start=${page}&jenis_pelatihan=${category}&bulan_pelatihan=${month}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(url)
				.then(({data}) => {
					if(data.list_data.length > 0){
						this.pelatihans = data.list_data
					}else{
						this.empty_filter = true
					}
				})

				.catch(err => console.log(err))

				.finally(() => {
					setTimeout(() => {
						this.loading_filter=false
					}, 1500)
				})
			},

			EventCategories(page=1,keyword='',category='',month=''){
				const url = `${this.api_url}/web/event/paging?keyword=${keyword?keyword:''}&page=${page?page:1}&jenis_pelatihan=${category?category:''}&bulan_pelatihan=${month?month:''}`

				FetchData(url)
				.then((data) => {
					this.categories = data.list_jenis_kegiatan
				})
				.catch(err => console.log(err))
			},

			FilterEvent(){
				this.EventYangDiikuti(0, this.field.category, this.field.month)
			},

			ChangeCategory(e){
				this.field.category = e.target.value
			},

			ChangeMonth(e){
				this.field.month = e.target.value
			}
		},
		computed: {
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			},
			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			},
		}
	}
</script>