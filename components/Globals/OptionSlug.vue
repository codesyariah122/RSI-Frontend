<template>
	<div class="berita__detail">
		<!-- Button options -->
		<mdb-row class="row justify-content-center berita__detail-option">
			<mdb-col md="6" xs="10" sm="10" class="back__link">
				<mdb-tooltip trigger="hover" :options="{placement: 'top'}">
					<span slot="tip"> kembali ke halaman daftar berita </span>
					<nuxt-link to="/ppkc/berita"  slot="reference"><mdb-icon icon="arrow-left" /> Berita lainnya </nuxt-link>
					</mdb-tooltip>
				</mdb-col>

				<!-- Berita selanjutnya -->
				<mdb-col md="6" xs="10" sm="10" class="next__link">
					<mdb-badge class="mb-3" pill color="light-blue">Berita Selanjutnya</mdb-badge>
					<mdb-card>
						<mdb-view hover>
							<a :href="`/detail/berita/${next.berita.id}/${$slug(next.berita.judul)}`">
								<mdb-card-image
								:src="next.berita.foto_url"
								alt="Card image cap"
								></mdb-card-image>
								<mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
							</a>
						</mdb-view>
						<!-- Share Button -->
						<!-- <mdb-row class="d-flex justify-content-end mr-2 mb-4 share__btn-content">
							<mdb-col md="3" xs="4" sm="4">
								<mdb-btn @click="show = !show" color="success" class="share-btn rounded-circle px-4 py-3">
									<mdb-icon icon="share-alt" />
								</mdb-btn>
							</mdb-col>
							<mdb-col v-if="show" md="3" xs="4" sm="4">
								<ul>
									<li>
										<mdb-btn size="sm" color="primary" class="share-btn rounded-circle px-3">
											<mdb-icon fab icon="facebook-f" />
										</mdb-btn>
									</li>
									<li>
										<mdb-btn size="sm" color="default" class="share-btn rounded-circle px-3">
											<mdb-icon fab icon="whatsapp" />
										</mdb-btn>
									</li>
								</ul>
							</mdb-col>
						</mdb-row> -->

						<mdb-card-body>
							<mdb-card-title>
								{{next.berita.judul}}
							</mdb-card-title>
							<hr />
							<p
							class="font-small grey-dark-text text-truncate"
							>
							{{next.berita.konten}}
						</p>
						<small class="date grey-text">
							{{$moment(next.berita.created_at).format("LLL")}}
						</small>
						<br><br>
						<nuxt-link color="indigo" :to="{name: `detail-berita-id-slug`, params: {id: next.berita.id, slug: $slug(next.berita.judul)}}" class="mt-5 mb-2">Baca Selengkapnya <mdb-icon icon="arrow-right" /></nuxt-link>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['next'],
		data(){
			return{
				show: false
			}
		}
	}
</script>