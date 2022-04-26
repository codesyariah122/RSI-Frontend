<template>
	<div class="webinar__list">
		<!-- Header filter event page -->
		<EventpageHeader @update-list-event="SearchEvent" :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" @load-more-event="LoadListEvent" :categories="categories" ref="eventChild"/>

		<!-- List event page content -->
		<EventpageListEvents :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" :message="message" :empty="empty" :token="token" :data_event="data_event" :error_search="error_search" @load-more-event="LoadListEvent"/>

	</div>
</template>

<script>
	export default{
		name: 'events',
		layout: 'default',
		data(){
			return {
				loading: null,
				loadingBtn: null,
				lists: [],
				categories: [],
				listToShow: 3,
				message:'',
				empty: null,
				error_search: null
			}
		},

		beforeMount(){
			this.ConfigApiUrl()
		},

		mounted(){
			this.ListEvent()
		},

		methods:{
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			ListEvent(keyword, page, category, month, loadingBtn=null){
				this.loading = true
				this.loadingBtn = loadingBtn
				const url = `${this.api_url}/web/event/paging?keyword=${keyword ? keyword : ''}&page=${page ? page : 1}&jenis_pelatihan=${category ? category : ''}&bulan_pelatihan=${month ? month : ''}`
				this.$axios.get(url)
				.then(({data}) => {
					this.categories = data.list_jenis_kegiatan
					this.$refs.eventChild.ResetForm()
					if(data.list_kegiatan_terdekat.length > 0){
						this.empty = false
						this.lists = data.list_kegiatan_terdekat
					}else{
						this.empty = true
						this.message = `Tidak ada event terdekat / tidak ada event yang dicari !`
						// setTimeout(() => {
						// 	this.empty = false
						// }, 2500)

						// if(month == undefined){
						// 	this.empty = true
						// 	this.message = "Pilih bulan pelatihan terlebih dahulu"
						// 	setTimeout(() => {
						// 		this.empty = false
						// 	}, 2500)
						// }else{
						// 	this.message = 'Data event yang dicari tidak di temukan'
						// }
					}
				})
				.catch(err => console.log(err.message))
				.finally(() => {
					setTimeout(() => {
						this.loading = false
						this.loadingBtn = false
					}, 1500)
				})
			},

			LoadListEvent(page){
				this.listToShow+=3
				this.ListEvent(page,'', '', '')
			},

			SearchEvent(page, keyword, category, month, loadingBtn){
				this.ListEvent(keyword, page, category, month, loadingBtn)
			},

			ConfigApiUrl(){
				const api_url = process.env.NUXT_ENV_API_URL
				this.$store.dispatch('config/storeConfigApiUrl', api_url)
			},

			SetEventLogin(data){
				this.$store.dispatch('config/setEventToLogin', JSON.stringify(data))
				this.$router.push({
					name: 'auth-login'
				})
			},

			GetEventDataLogin(){
				this.$store.dispatch('config/getEventDataToLogin', 'event')
			}
		},

		computed:{
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			},

			api_url(){
				return this.$store.getters['config/ConfigApiUrl']
			},

			set_event(){
				return this.$store.getters['config/ConfigSetEventLogin']
			},

			data_event(){
				return this.$store.getters['config/ConfigEventDataLogin']
			}
		}
	}
</script>