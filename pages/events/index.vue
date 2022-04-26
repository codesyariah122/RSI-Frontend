<template>
	<div class="webinar__list">
		<!-- Header filter event page -->
		<EventpageHeader @update-list-event="SearchEvent" :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" @load-more-event="LoadListEvent" :categories="categories" ref="eventChild"/>

		<!-- List event page content -->
		<EventpageListEvents :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" :loading_more="loading_more" :message="message" :empty="empty" :token="token" :data_event="data_event" :error_search="error_search" @load-more-event="LoadListEvent"/>

	</div>
</template>

<script>
	import {SampleEvents} from '@/helpers'
	export default{
		name: 'events',
		layout: 'default',
		data(){
			return {
				loading: null,
				loadingBtn: null,
				lists: [],
				categories: [],
				listToShow: 6,
				message:'',
				empty: null,
				error_search: null,
				loading_more: null
			}
		},

		beforeMount(){
			this.ConfigApiUrl(),
			this.FetchListEvent()
		},

		methods:{
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			FetchListEvent(keyword, page, category, month, loadingBtn=null){
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
						// console.log(this.lists.length)
						if(this.lists.length <= 3 || !category || !month){
							SampleEvents.map(d => this.lists.push(d))
							this.lists.slice(3)
						}
					}else{
						this.empty = true
						this.message = `Tidak ada event terdekat / tidak ada event yang dicari !!`
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
				// Clear list base on page == 1
				// console.log(page)
				// if(page == 1){
				// 	page = 0
				// }
				// console.log(page)
				window.scrollTo(0,document.body.scrollHeight);
				this.loading_more=true
				setTimeout(() => {
					this.listToShow = (this.lists.length - this.listToShow) + this.listToShow
					this.loading_more=false
				}, 1000)
				setTimeout(() => {
					this.FetchListEvent(page,'', '', '', false)
				}, 1500)
			},

			SearchEvent(page, keyword, category, month, loadingBtn){
				console.log(typeof category)
				this.FetchListEvent(keyword, page, category, month, loadingBtn)
				// if(month === undefined || month === ""){
				// 	this.error_search = true
				// 	this.message = "Pilih bulan pelatihan terlebih dahulu"
				// 	setTimeout(() => {
				// 		this.error_search= false
				// 	}, 500)
				// 	setTimeout(() => {
				// 		this.FetchListEvent(keyword="", page=0, category="", month="", loadingBtn)
				// 	}, 1500)
				// }else{
				// 	this.empty = false
				// 	this.error_search = false
				// 	this.FetchListEvent(keyword, page, category, month, loadingBtn)
				// }
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