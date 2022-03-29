<template>
	<div class="profile__page mb-5">
		<mdb-container>
			<mdb-row class="row justify-content-center card__profile-page">
				<mdb-col lg="12" xs="12" sm="12">
					<CardProfile :profiles="profiles" :loading="loading"/>
				</mdb-col>
			</mdb-row>

			<mdb-row class="row justify-content-center tabs__detail-profile">
				<mdb-col lg="12" xs="12" sm="12">
					<TabsProfile :profiles="profiles" :works="works ? works : '-'" :studs="studs ? studs : '-'" :categories="categories" :pelatihans="pelatihans" :loading="loading" :field="field" @filter-event-child="FilterEvent" @change-category-child="ChangeCategory" @change-event-child="ChangeMonth"/>
				</mdb-col>
			</mdb-row>

		</mdb-container>
	</div>
</template>

<script>
	import {FetchData} from '@/helpers'
	import CardProfile from './CardProfile'
	import TabsProfile from './TabsProfile'

	export default {
		props: ['profiles', 'genders', 'studs', 'jobs', 'works', 'maritals', 'pelatihans', 'categories', 'api_url', 'empty_filter', 'loading'],

		components: {
			CardProfile,
			TabsProfile
		},
		data(){
			return {
				field: {}
			}
		},

		methods: {
			FilterEvent(){
				// console.log(this.field)
				this.$emit('load-event-follow', 1, this.field.category, this.field.month)
			},

			ChangeCategory(e){
				this.field.category = e.target.value
			},

			ChangeMonth(e){
				this.field.month = e.target.value
			}
		}
	}
</script>