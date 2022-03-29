<template>
	<div>
		<mdb-row>
			<mdb-col id="show-event" v-if="listIndex <= lists.length" v-for="listIndex in listToShow" md="4" xs="12" sm="12" :key="lists[listIndex-1].id" class="mb-2 col-lg-4 d-flex align-items-stretch">
				<mdb-card>
					<mdb-view hover>
						<a :href="`/detail/berita/${lists[listIndex-1].id}/${$slug(lists[listIndex-1].judul)}`">
							<mdb-card-image
							:src="lists[listIndex-1].foto_url"
							alt="Card image cap" class="img-fluid"/>
							<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
						</a>
					</mdb-view>
					<mdb-card-body>

						<mdb-card-title>{{lists[listIndex-1].judul}}</mdb-card-title>
						<br/>
						<nuxt-link :to="{name: `detail-berita-id-slug`, params: {id: lists[listIndex-1].id, slug: $slug(lists[listIndex-1].judul)}}" class="mt-5 mb-2" color="primary">Baca Selengkapnya <mdb-icon icon="arrow-right" /></nuxt-link>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['lists', 'listToShow']
	}
</script>