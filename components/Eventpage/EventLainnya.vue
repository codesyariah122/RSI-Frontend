<template>
	<div>
		<mdb-row v-if="lists.length > 1" class="row justify-content-center">
			<mdb-col lg="12" xs="12" sm="12">
				<h4>Event Lainnya</h4>
			</mdb-col>

			<!-- Pagination option components & info -->
			<mdb-pagination color="blue" md class="mt-3">
				<b-pagination 
				v-model="currentPage"
				:total-rows="lists.length"
				:per-page="listToShow"
				@change="LoadEvent" aria-controls="show-event" align="center"></b-pagination>
			</mdb-pagination>

			<mdb-col  lg="12" xs="12" sm="12" class="mt-3 mb-5">
				<mdb-badge pill color="light-blue">
					Page: {{currentPage}}
				</mdb-badge>
			</mdb-col>
			<!-- End paginationn -->

			<mdb-col v-if="loading" lg="12" xs="12" sm="12">
				<div class="d-flex justify-content-center">
					<div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			</mdb-col>

			<mdb-col v-else lg="12" xs="12" sm="12">
				<div class="card__list">
					<!-- List event inside global-components -->
					<GlobalsListEvent :lists="lists" :listToShow="listToShow" :token="token" :data_event="data_event"/>
				</div>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default {
		props: ['lists', 'currentPage', 'loading' ,'listToShow', 'token', 'data_event'],


		methods: {
			RegistrasiEvent(id){
				this.$router.push({
					name: 'events-id-registrasi',
					params: {
						id: id
					}
				})
			}
		}
	}
</script>