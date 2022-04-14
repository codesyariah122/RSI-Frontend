<template>
	<div :class="`${$device.isDesktop ? 'event__pembayaran mb-5' : 'event__pembayaran mb-5'}`">
		<mdb-container>
			<EventpageRegistrasiHeader/>

			<EventpageRegistrasi :id="event_id" :token="token" :api_url="api_url" :details="details"/>
		</mdb-container>
	</div>
</template>


<script>
	export default{
		name: 'events-id-registrasi',
		layout: 'profile',
		data(){
			return{
				event_id: this.$route.params.id,
				details: {}
			}
		},

		beforeMount(){
			this.ConfigApiUrl(),
			this.CheckToken()
		},

		mounted(){
			this.IsLoggedIn(),
			this.StatusPembayaran()
		},

		methods:{
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
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},

			StatusPembayaran(){
				const url = `${this.api_url}/web/event/${this.$route.params.id}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(url)
				.then(({data}) => {
					console.log(data)
					// this.status_pendaftaran = data.kegiatan.status_pendaftaran_value
					if(data.kegiatan.status_pendaftaran_value === 'Menunggu Konfirmasi'){
						this.$router.push({
							name: 'events-id-success',
							params: {id: this.$route.params.id}
						})
					}
				})
				.catch(err => console.log(err))
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
			}
		},

		computed: {
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			},
			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			}
		}
	}
</script>