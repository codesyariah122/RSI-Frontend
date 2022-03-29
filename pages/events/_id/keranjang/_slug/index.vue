<template>
	<div :class="`${$device.isDesktop ? 'event__keranjang mb-5' : 'event__keranjang mb-5'}`">
		<mdb-container>
			<mdb-row col="12" class="row justify-content-center keranjang__header">
				<mdb-col lg="12" xs="12" sm="12">
					<h2>Keranjang Saya</h2>
				</mdb-col>

				<mdb-col lg="12" xs="12" sm="12">
					
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	export default  {
		name: 'events-id-keranjang-slug',
		layout: 'profile',

		beforeMount(){
			this.CheckToken()
		},

		mounted(){
			this.IsLoggedIn()
		},

		methods: {
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},
			
			IsLoggedIn(){
				if(!this.token.accessToken){
					this.Alert('error', `Silahkan login untuk mengakses keranjang !`)
					setTimeout(() => {
						this.$router.push({
							// path: `/detail/event/${this.$route.params.id}`
							path: '/auth/login'
						})
					}, 900)
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
		computed:{
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			}
		}
	}
</script>