<template>
	<div>
		<LayoutsNavigation :token="token" :profiles="profiles" :slug="slug"/>
		
		<Nuxt :style="style"/>

		<!-- Scrolling back to top page -->
		<GlobalsToTop/>
		<!-- end scroll top -->
	</div>
</template>


<script>
	export default {

		data(){
			return{
				profiles:[],
				slug: '',
				profiles: [],
				style: `${this.$device.isDesktop ? 'margin-top: 4.5rem;' : 'margin-top:7rem;'}`,
				data_event_path: {
					event_id: this.$route.params.id,
					event_path: this.$route.path
				},
				status_pendaftaran: ''
			}
		},

		beforeMount(){
			this.ConfigApiUrl(),
			this.CheckToken()
		},
		mounted(){
			this.UserProfileData()
		},
		methods: {
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},
			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},
			UserProfileData(){
				if(this.token){					
					const url = `${this.api_url}/web/user`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.profiles = data.user
						this.slug = data.user.nama
					})
					.catch(err => console.log(err.response ? err.response : ''))
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