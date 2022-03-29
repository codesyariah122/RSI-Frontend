<template>
	<div>
		<ProfilepageAksesPelatihan :loading_event="loading_event" :pelatihans="pelatihans" :username="username" @event-diikuti="EventYangDiikuti"/>
	</div>
</template>

<script>
	export default {
		name: 'profile-events',
		layout: 'profile',

		data(){
			return {
				loading_event: null,
				pelatihans: [],
				profiles: [],
				username: ''
			}
		},

		beforeMount() {
			this.ConfigApiUrl()
		},

		mounted(){
			this.EventYangDiikuti(),
			this.IsLoggedIn(),
			this.UserProfileData()
		},

		methods: {
			IsLoggedIn() {
				if (!this.token.accessToken) {
					this.$swal({
						icon: "error",
						title: "Oops...",
						text: "Anda tidak mempunyai hak akses ke halaman ini, silahkan login!",
					});
					setTimeout(() => {
						this.$router.push({
							name: "auth-login",
						});
					}, 900);
				}
			},
			UserProfileData() {
				if (this.token) {
					const url = `${this.api_url}/web/user`;
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
					this.$axios
					.get(url)
					.then(({ data }) => {
						this.profiles = data.user
						this.username = this.$username(data.user.nama)
					})
					.catch((err) => console.log(err.response ? err.response : ""));
				}
			},
			EventYangDiikuti(page = 0, category = "", month = "") {
				this.loading_event = true;
				const url = `${this.api_url}/web/kegiatan/saya/list/page?start=${page}&jenis_pelatihan=${category}&bulan_pelatihan=${month}`;
				this.$axios
				.get(url)
				.then(({ data }) => {
					// console.log(data)
					if (data.list_data.length > 0) {
						this.pelatihans = data.list_data;
					} else {
						this.pelatihans = [];
					}
				})

				.catch((err) => console.log(err))

				.finally(() => {
					setTimeout(() => {
						this.loading_event = false;
					}, 2500)
				});
			},
			CheckToken() {
				this.$store.dispatch("config/checkAuthLogin", "token");
			},
			ConfigApiUrl() {
				const api_url = process.env.NUXT_ENV_API_URL;
				this.$store.dispatch("config/storeConfigApiUrl", api_url);
			},
		},

		computed: {
			token() {
				return this.$store.getters["config/ConfigCheckLogin"];
			},
			api_url() {
				return this.$store.getters["config/ConfigApiUrl"];
			}
		}
	}
</script>