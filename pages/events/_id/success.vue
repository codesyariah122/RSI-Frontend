<template>
	<div :class="`${$device.isDesktop ? 'event__pembayaran mb-5' : 'event__pembayaran mb-5'}`">
		<mdb-container>
			<EventpageSuccessHeader :data_pendaftaran="data_pendaftaran" :message="pembayaran.message" :bank="pembayaran.bank" :kegiatan="pembayaran.kegiatan" :checks="checks" />

			<EventpageSuccess :id="id" :your_events="your_events" :token="token" :api_url="api_url" bank="pembayaran.bank" :data_pendaftaran="data_pendaftaran" :kegiatan="pembayaran.kegiatan" :checks="checks" :details="details"/>

		</mdb-container>
	</div>
</template>

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
				data_pendaftaran: {},
				pembayaran: {
					bank: {},
					kegiatan: {},
					message:''
				},
				details:{}
			}
		},

		mounted(){
			this.StatusPembayaran(),
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

			ConfigApiUrl(){
				const url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', url)
			},

			StatusPembayaran(){
				this.pembayaran.bank = this.$route.params.bank
				this.pembayaran.kegiatan = this.$route.params.kegiatan
				this.pembayaran.message = this.$route.params.message
				console.log(this.pembayaran.bank)
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

			DetailEventProfileLogin(){
				if(this.token.accessToken){
					const url = `${this.api_url}/web/event/${this.$route.params.id}`

					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.details = data.kegiatan
					})
					.catch(err => console.log(err))
				}
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