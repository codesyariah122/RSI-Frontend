<template>
	<div>
		<mdb-row class="row justify-content-center card__berita-list">
			<mdb-col v-if="listIndex <= listToShow" v-for="listIndex in listToShow" md="4" xs="12" sm="12" class="mb-3" :key="news[listIndex - 1].id">
				<mdb-card>
					<mdb-card-image :src="news[listIndex - 1].foto_url" alt="Card image cap"></mdb-card-image>
					<mdb-card-body>
						<mdb-card-title>{{news[listIndex - 1].judul}}</mdb-card-title>
						<mdb-card-text class="truncate2">{{news[listIndex - 1].content}}</mdb-card-text>
						<br><br>
						<nuxt-link :to="{name: `detail-berita-id-slug`, params: {id: news[listIndex - 1].id, slug: $slug(news[listIndex - 1].judul)}}" class="mt-5 mb-2">Baca Selengkapnya <mdb-icon icon="arrow-right" /></nuxt-link>
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
	import {SampleNews} from '@/helpers'

	export default {
		data(){
			return{
				news: [],
				listToShow: 3
			}
		},

		beforeMount(){
			this.GetNewsData()
		},

		methods: {
			GetNewsData(){
				SampleNews.map(d => {
					this.news.push(d)
				})
			}
		}
	}
</script>