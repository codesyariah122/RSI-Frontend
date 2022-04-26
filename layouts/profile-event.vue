<template>
	<div>
		<LayoutsNavigation :token="token" :profiles="profiles" :slug="slug" :event_id="data_event_path.event_id" :event_path="data_event_path.event_path" />

		<Nuxt :style="style"/>
		
	</div>
</template>

<script>
	export default {

		data(){
			return{
				loading: null,
				slug: '',
				profiles: [],
				style: `${this.$device.isDesktop ? 'margin-top: 4.5rem;' : 'margin-top:7rem;'}`,
				data_event_path: {
					event_id: this.$route.params.id,
					event_path: this.$route.path
				},
				status_pendaftaran: '',
				scrolled: localStorage.getItem('scroll') ? JSON.parse(localStorage.getItem('scroll')) : ''
			}
		},

		head:{
			link: [
				{ rel: 'stylesheet', type: 'text/css', href: '/assets/glightbox/glightbox.min.css'},
				{ rel: 'stylesheet', type: 'text/css', href: '/assets/venobox/dev/venobox.min.css'},
				{ rel: 'stylesheet', href: '/assets/docs/css/theme.css'}
			],
			
			script: [
				{
					src: '/assets/glightbox/glightbox.min.js',
					type: 'text/javascript'
				},
				{
					src: '/assets/venobox/dev/venobox.min.js',
					type: 'text/javascript'
				},
				{
					src: '/assets/docs/plugins/popper.min.js',
					type: 'text/javascript'
				},
				
				{
					src: '/assets/docs/plugins/bootstrap/js/bootstrap.min.js',
					type: 'text/javascript'
				},
				{
					src: '/assets/docs/plugins/smoothscroll.min.js',
					type: 'text/javascript'
				},
				
				{
					src: '/assets/docs/plugins/gumshoe/gumshoe.polyfills.min.js',
					type: 'text/javascript'
				}
			]
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