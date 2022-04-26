<template>
	<div class="berita__list">
		<mdb-row class="row justify-content-center header__inside-content">
			<!-- colomn header berita -->
			<mdb-col col="12" md="12" xs="12" sm="12">
				<h5 :class="`${$device.isDesktop ? 'text-center' : 'text-center'}`">Berita</h5>
			</mdb-col>
			<mdb-col md="12" xs="12" sm="12">
				<h2 class="text-center font-weight-bold" :style="`${$device.isDesktop ? 'margin-left:5rem;' : 'margin-left:2rem;'}`">
					Ikuti Berita dan Kegiatan Kami
				</h2>
			</mdb-col>
		</mdb-row>

		<mdb-row class="col__berita mt-3 mb-3">
			<!-- column card berita -->
			<mdb-col lg="12" xs="12" sm="12" >
				<!-- Card berita components -->
				<MoleculesHomepageMoleculesCardBerita :news="news" ref="childBerita"/>	
			</mdb-col>

			<!-- <MoleculesHomepageMoleculesListBeritaSample v-else/> -->
		</mdb-row>

	</div>
</template>

<script>

	export default{
		props: ['lists', 'news']
	}
</script>
