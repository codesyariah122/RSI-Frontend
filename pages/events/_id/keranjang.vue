<template>
	<div>
		<h1>
			Keranjang event
		</h1>
	</div>
</template>

<script>
	export default  {
		name: 'events-id-keranjang',
		layout: 'profile',
		mounted(){
			this.IsLoggedIn
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
		}
	}
</script>