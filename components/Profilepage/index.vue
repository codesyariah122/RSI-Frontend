<template>
	<div class="profile__page mb-5">
		<mdb-container>
			<mdb-row class="row justify-content-center card__profile-page">
				<mdb-col lg="12" xs="12" sm="12">
					<CardProfile :profiles="profiles" :studs="studs" :works="works" :loading="loading" :maritals="maritals" :username="username"/>
				</mdb-col>
			</mdb-row>

			<mdb-row class="row justify-content-center tabs__detail-profile">
				<mdb-col lg="12" xs="12" sm="12">
					<TabsProfile :profiles="profiles" :categories="categories" :api_url="api_url" :token="token" :studs="studs" :works="works"/>
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
		props: ['profiles', 'genders', 'studs', 'jobs', 'works', 'maritals',  'categories', 'api_url', 'token', 'loading', 'username'],

		components: {
			CardProfile,
			TabsProfile
		}
	}
</script>