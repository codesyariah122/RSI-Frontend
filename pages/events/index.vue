<template>
	<div class="webinar__list">
		<!-- Header filter event page -->
		<EventpageHeader @update-list-event="SearchEvent" :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" @load-more-event="LoadListEvent" :categories="categories" ref="eventChild" :search="search"/>
		
		<!-- List event page content -->
		<EventpageListEvents :lists="lists" :loading="loading" :loadingBtn="loadingBtn" :listToShow="listToShow" :message="message" :empty="empty" :token="token" :data_event="data_event" :error_search="error_search" @load-more-event="LoadListEvent" :page="page" :search="search"/>

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
				listToShow: 9,
				page: 1,
				start: 20,
				message:'',
				empty: null,
				error_search: null,
				month: '',
				search: null
			}
		},

		beforeMount(){
			this.ConfigApiUrl()
		},

		mounted(){
			this.FetchListEvent()
		},

		methods:{
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},

			FetchListEvent(keyword, start, category, month, loadingBtn=null, basedOn=null){
				this.loading = true
				this.loadingBtn = loadingBtn
				const url = `${this.api_url}/web/event/paging?keyword=${keyword ? keyword : ''}&start=${start ? start : this.start}&jenis_pelatihan=${category ? category : ''}&bulan_pelatihan=${month ? month : ''}`
				this.$axios.get(url)
				.then(({data}) => {
					this.categories = data.list_jenis_kegiatan
					this.$refs.eventChild.ResetForm()
					if(data.list_kegiatan_terdekat.length > 0){
						this.empty = false
						this.lists = data.list_kegiatan_terdekat
						// console.log(this.lists.length)
						if(this.lists.length < 9){
							this.listToShow = 3
						}else{
							this.listToShow = 9
						}
						// if (this.lists.length <= this.listToShow) {
						// 	SampleEvents.map(d => {
						// 		this.lists.push(d)
						// 	})
						// }
					}else{
						
						this.empty = true
						this.search = false
						if(basedOn === "category"){
							this.message = "Event dengan kategori yang di cari belum tersedia !"
						}else{
							this.message = `Tidak ada event terdekat di bulan ${this.month}!`
						}
						this.lists = []
						// setTimeout(() => {
						// 	this.empty = false
						// 	this.LoadListEvent(this.start)
						// }, 3000)
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

			LoadListEvent(start){
				// Clear list base on page == 1
				// console.log(page)
				// if(page == 1){
				// 	page = 0
				// }
				this.listToShow += 9
				this.search = false
				this.FetchListEvent('', this.start+=start,'', '', true)
			},

			SearchEvent(page, keyword, category, month, loadingBtn, month_name, basedOn){
				this.search = true
				this.month = month_name
				console.log(keyword)
				if(month === undefined && month === ""){
					this.error_search = true
					this.message = "Pilih bulan pelatihan terlebih dahulu"
					this.error_search= false
					this.lists = []
					this.search = false
					// setTimeout(() => {
					// }, 500)
					// setTimeout(() => {
					// 	this.FetchListEvent(keyword="",  this.start, category="", month="", loadingBtn)
					// }, 1500)
				}else{
					this.search = true
					this.empty = false
					this.error_search = false
					this.FetchListEvent(keyword, page, category, month, loadingBtn, basedOn)
				}
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