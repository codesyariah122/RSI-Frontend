<template>
	<div>
		<b-card v-if="loading">
			<b-skeleton animation="throb" width="85%"></b-skeleton>
			<b-skeleton animation="throb" width="55%"></b-skeleton>
			<b-skeleton animation="throb" width="70%"></b-skeleton>
		</b-card>

		<b-tabs v-else content-class="mt-4" fill>
			<b-tab title="Akun" active class="font-weight-bold">
				<mdb-card class="content__tabs">
					<ProfileInfo :loading="loading" :profiles="profiles" :studs="studs" :works="works"/>
				</mdb-card>
			</b-tab>
			<b-tab title="Event yang diikuti" class="font-weight-bold">
				<EventDiikuti :profiles="profiles" :categories="categories"/>
			</b-tab>

			<b-tab title="Sertifikat" class="font-weight-bold">
				<MoleculesProfilePageEventSertifikat :categories="categories" :loading="loading"/>
			</b-tab>
		</b-tabs>
	</div>
</template>

<script>
	import ProfileInfo from '@/components/Molecules/ProfilePage/ProfileInfo'
	import EventDiikuti from '@/components/Molecules/ProfilePage/EventDiikuti'

	export default{
		props: ['profiles', 'studs', 'works', 'categories', 'api_url', 'token','loading'],
		
		components: {
			ProfileInfo,
			EventDiikuti
		}
	}
</script>