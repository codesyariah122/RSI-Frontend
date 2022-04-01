<template>
	<div>
		<LayoutsNavigation :token="token" :profiles="profiles" :slug="slug" :event_id="event_id" :event_path="event_path"/>
		
		<Nuxt/>

		<LayoutsFooter v-if="$route.name !== 'detail-event-id-slug' || !token.accessToken"/>

		<!-- Scrolling back to top page -->
		<GlobalsToTop/>
		<!-- end scroll top -->
	</div>
</template>

<script>
	export default {

		data(){
			return{
				profiles: {},
				slug: '',
				event_id: localStorage.getItem('event_id'),
				event_path: this.$route.path
			}
		},

		head:{
			
		},
		
		beforeMount(){
			this.ConfigApiUrl(),
			this.CheckToken()
		},

		created(){
			this.WidgetChat()
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
			},

			WidgetChat(){
				let url = 'https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?82740';
				let s = document.createElement('script');
				s.type = 'text/javascript';
				s.async = true;
				s.src = url;
				let cta_text = this.$device.isDesktop ? 'Admin RSI Sultan Agung' : ''
				let options = {
					"enabled":true,
					"chatButtonSetting":{
						"backgroundColor":"#06875C",
						"ctaText":'',
						"borderRadius":"25",
						"marginLeft":"20",
						"marginBottom":"20",
						"marginRight":"50",
						"position":"left"
					},
					"brandSetting":{
						"brandName":"RSI Sultan Agung",
						"brandSubTitle":"RSI Sultan Agung Semarang",
						"brandImg":"https://rsi-test-frontend.vercel.app/_nuxt/img/profile-panel-footer.ec7a376.svg",
						"welcomeText":"Halo, new member\nada yang bisa kami bantu ?\ncukup kirimkan pesan kepada kami sekarang untuk mendapatkan info lebih lanjut tentang pelatihan tenaga kesehatan RSI Sultan Agung.",
						"messageText":"Halo, Admin RSI ! kami butuh bantuan untuk mengikuti pelatihan RSI Sultan Agung  {{page_link}}",
						"backgroundColor":"#0a5f54",
						"ctaText":"Start Chat",
						"borderRadius":"25",
						"autoShow":false,
						"phoneNumber":"6281284359312"
					}
				};
				s.onload = function() {
					CreateWhatsappChatWidget(options);
				};
				let x = document.getElementsByTagName('script')[0];
				x.parentNode.insertBefore(s, x);
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
