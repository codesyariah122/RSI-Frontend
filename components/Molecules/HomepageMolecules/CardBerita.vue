<template>
	<div>
		<mdb-row class="row justify-content-center">
			<!-- bg content -->
			<mdb-col col="12" lg="12" xs="12" sm="12" class="bg__content">
				<img :src="require('~/assets/art/vector-5.png')" />
			</mdb-col>
		</mdb-row>
		<mdb-row class="row justify-content-center card__berita-list">
			<mdb-col v-for="(item, index) in news" md="4" xs="12" sm="12" :key="item.id" class="mb-3">
				<mdb-card>
					<mdb-card-image :src="item.cover" alt="Card image cap"></mdb-card-image>
					<mdb-card-body>
						<mdb-card-title>{{item.judul}}</mdb-card-title>
						<mdb-card-text class="truncate2">{{item.content}}</mdb-card-text>
						<br><br>
						<nuxt-link :to="{name: `detail-berita-id-slug`, params: {id: item.id, slug: $slug(item.judul)}}" class="mt-5 mb-2">Baca Selengkapnya <mdb-icon icon="arrow-right" /></nuxt-link>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>


			<mdb-col col="12"  xl="4" lg="12" xs="12" sm="12" :class="`${$device.isDesktop ? 'mb-5 mt-5 ml-5 shadow-none' : 'mb-2'}`">
				<nuxt-link to="/rsi/berita" :class="`btn my__btn-primary rounded-pill ${$device.isMobile ? 'btn-block btn-sm btn__link' : 'btn-lg'}`">Lihat Semua Berita</nuxt-link>
			</mdb-col>
		</mdb-row>

	</div>
</template>

<script>
	export default{
		props: ['news']
	}
</script>

