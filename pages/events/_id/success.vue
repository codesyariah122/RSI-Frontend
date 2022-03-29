<template>
	<div>
		<mdb-container class="pembayaran__success">
			<mdb-row v-if="loading" col="12" class="justify-content-center">
				<mdb-col lg="12">
					<b-card>
						<b-skeleton animation="throb" width="85%"></b-skeleton>
						<b-skeleton animation="throb" width="55%"></b-skeleton>
						<b-skeleton animation="throb" width="70%"></b-skeleton>
					</b-card>
				</mdb-col>
			</mdb-row>
			<mdb-row v-else col="12" class="justify-content-center">
				<mdb-col lg="12">
					<h1 v-if="data_pendaftaran.status_pendaftaran_value" class="text-center">
						{{data_pendaftaran.status_pendaftaran_value}} pembayaran
					</h1>
					<h1 v-else class="text-center">
						Menunggu konfirmasi pembayaran
					</h1>
				</mdb-col>
				<mdb-col v-if="checks || status_pendaftaran" lg="12" class="mt-5">
					<center>
						<b-button v-b-toggle.collapse-1 variant="primary">Lihat Bukti pembayaran anda <mdb-icon icon="binoculars" size="lg" /> </b-button>
						<b-collapse id="collapse-1" class="mt-2">
							<b-card class="shadow-none">
								<img :src="checks.data.bukti_bayar" alt="Image" class="rounded-0" width="300">
								<div class="overlay__event-img">
									<a :data-gall="checks.data.bukti_bayar" :href="checks.data.bukti_bayar" class="success-confirm icon" :title="your_events.kegiatan_title">
										<mdb-icon icon="search-plus" />
									</a>
								</div>
							</b-card>
						</b-collapse>
						
					</center>
				</mdb-col>
				
				<mdb-col lg="6" class="mt-3">
					<mdb-alert color="success">
						<mdb-icon icon="check" size="lg"/> {{checks.message}}
					</mdb-alert>
				</mdb-col>
			</mdb-row>

			<mdb-row col="12" class="mt-3 mb-5 row justify-content-center">
				<mdb-col lg="6">
					<center v-if="loading">
						<b-progress :max="max" height="2rem" :striped="true" show-progress :animated="true">
							<b-progress-bar :value="value" variant="success">
								<h5 v-if="value > 0">Loading</h5>
							</b-progress-bar>
						</b-progress>
					</center>
					<center v-else>
						<nuxt-link :to="`/detail/event/${id}/${$slug(your_events.kegiatan_title ? your_events.kegiatan_title : '')}`" color="primary" class="btn btn-outline-primary btn-block rounded"><mdb-icon icon="arrow-left" /> Selesai </nuxt-link>
					</center>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<style lang="scss">
	.pembayaran__success{
		margin-top: 7rem;
		h1{
			text-transform: capitalize;
			font-weight: 600;
			color:$color-primary;
		}
		.overlay__event-img {
			position: absolute;
			top: 12px;
			bottom: 0;
			left: 404px;
			right: 0;
			height:auto;
			width: 300px;
			opacity: 0;
			transition: .3s ease;
			background-color: rgba(205, 209, 228, 0.9);
		}

		&:hover .overlay__event-img {
			opacity: 1;
		}

		.icon {
			color: white;
			font-weight: 700;
			font-size: 100px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			-ms-transform: translate(-50%, -50%);
			text-align: center;
		}

		.fa-zoom:hover {
			color: #eee;
		}
	}
</style>

<script>
	export default {
		name: 'events-id-success',
		layout: 'default',
		data(){
			return {
				id: this.$route.params.id,
				checks: localStorage.getItem("success") ? JSON.parse(localStorage.getItem("success")) : '',
				your_events: {},
				lists: [],
				loading: null,
				timer: 0,
				value: 0,
				max: 100,
				status_pendaftaran:'',
				data_pendaftaran: []
			}
		},

		mounted(){
			this.GoYourEvent(),
			this.IsLoggedIn(),
			this.VenoBox(),
			this.CheckPembayaran()
		},

		methods: {
			IsLoggedIn(){
				if(!this.token.accessToken){
					this.Alert('error', `Anda tidak dapat izin untuk mengakses halaman ini`)
					setTimeout(() => {
						this.$router.push({
							path: `/detail/event/${this.$route.params.id}`
						})
					}, 900)
				}
			},
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			GoYourEvent(){
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(`${this.api_url}/web/event/${this.id}/daftar`)
				.then(({data}) => {
					this.your_events = data.kegiatan
					this.lists = data
				})
			},

			CheckPembayaran(){
				this.loading = true
				const url = `${this.api_url}/web/event/${this.$route.params.id}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(url)
				.then(({data}) => {
					console.log(data)
					this.data_pendaftaran = data.kegiatan
					// data.kegiatan.map(d => this.status_pendaftaran = d.status_pendaftaran_value)
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.startTimer()
					setTimeout(() => {
						this.loading = false
					}, 2500)
				})
			},

			startTimer() {
				let vm = this;
				let timer = setInterval(function() {
					vm.value += 6;
					if (vm.value >= vm.max) clearInterval(timer);
				}, 100);
			},

			Alert(status, data){
				switch(status){
					case 'error':
					return this.$swal({
						icon: status,
						title: 'Oops...',
						text: data,
					})
					break;
					case 'success':
					return this.$swal({
						position: 'top-end',
						icon: status,
						title: data,
						showConfirmButton: false,
						timer: 1500
					})
					break;
				}
			},

			VenoBox(){
				new VenoBox({
					selector: '.success-confirm',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			},
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