<template>
	<div class="mt-2 card__content">
		<mdb-row class="row justify-content-center">
			<mdb-col id="show-event" v-if="listIndex <= lists.length" v-for="listIndex in listToShow" md="4" xs="12" sm="12" :key="lists[listIndex-1].kegiatan_id">
				<mdb-card>
					<mdb-view hover>
						<a href="#!">
							<mdb-card-image
							:src="lists[listIndex-1].photo"
							alt="Card image cap" class="img-fluid"/>
							<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
						</a>
					</mdb-view>
					<mdb-card-body>
						<mdb-badge class="badge btn-outline-primary mb-4 badge__category">{{lists[listIndex-1].kategori_value}}</mdb-badge>

						<mdb-card-title class="truncate2">{{lists[listIndex-1].kegiatan_title}}</mdb-card-title>

						<span class="mt-2">{{$moment(lists[listIndex-1].tgl_awal).format("LL")}} - {{$moment(lists[listIndex-1].tgl_akhir).format("LL")}}</span>
						<br>
						
						<span class="mt-2 idr__color">
							{{$format(lists[listIndex-1].harga)}}
						</span>

						<nuxt-link :to="{name: `detail-event-id-slug`, params: {id: lists[listIndex-1].kegiatan_id, slug: $slug(lists[listIndex-1].kegiatan_title)}}" class="btn btn-outline-primary mt-3 mb-2 btn-block" color="primary">Detail Event</nuxt-link>
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

<style lang="css">
	.truncate2 {
		display: -webkit-box;
		-webkit-line-clamp: var(--line-clamp, 2);
		-webkit-box-orient: vertical;
		word-break: var(--word-break, "none");
		overflow: hidden;
		hyphens: auto;
		text-align: var(--align, left);

		--is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
		--delay: Calc(-1s * (var(--is-single-line, 1) - 1));
		animation: states 1s var(--delay) paused;

		@keyframes states {
			0% {
				word-break: break-all;
			}
		}
	}
</style>