<template>
	<div v-if="$device.isDesktop">
		<LayoutsNavbarDesktop :token="token" :profiles="profiles" :slug="slug" @logout-profile="LogoutProfile" :event_id="event_id" :event_path="event_path"/>
	</div>
	<div v-else>
		<LayoutsNavbarMobile :token="token" :profiles="profiles" :slug="slug" @logout-profile="LogoutProfile" :event_id="event_id" :event_path="event_path"/>
	</div>
</template>

<script>
	export default{
		props: ['token', 'profiles', 'slug', 'event_id', 'event_path'],
		

		methods: {
			LogoutProfile(){
				// console.log(this.$route.path)
				this.$swal({
					title: `Keluar sebagai ${this.profiles.nama}?`,
					text: "Anda akan keluar dari halaman profile!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Ya, Lanjut keluar!'
				}).then((result) => {
					if (result.isConfirmed) {
						this.$store.dispatch('config/storeConfigAuth', '')
						this.$store.dispatch('config/setEventToLogin', '')
						this.$store.dispatch('config/setProfileLogout', JSON.stringify({logout: true, username: this.$username(this.profiles.nama)}))
						this.$swal(
							'Logout!',
							`Anda berhasil keluar dari profile ${this.profiles.nama}.`,
							'success'
							)
						this.$router.push({
							// name: 'auth-login'
							path: this.$route.path
						})
						setTimeout(() => {
							location.reload()
						}, 900)
					}
				})
			}
		}
	}
</script>
