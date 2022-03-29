<template>
	<div>
		<mdb-row class="row justify-content-center card__content">

			<mdb-col v-if="listIndex <= lists.length" v-for="listIndex in listsToShow" col="12" md="4" class="mb-3" :key="lists[listIndex - 1].kegiatan_id"
			>
			<mdb-card>
				<mdb-card-image :src="lists[listIndex-1].photo" alt="No image found"></mdb-card-image>

				<mdb-card-body>
					<mdb-badge
					class="mb-2 badge__category shadow-none"
					>{{ lists[listIndex - 1].kategori_value }}</mdb-badge
					>

					<mdb-card-title
					class="truncate"
					style="color: #004899; font-weight: bold; min-height: 80px"
					>{{ lists[listIndex - 1].kegiatan_title }}</mdb-card-title
					>
					<mdb-card-text
					class="truncate2"
					style="width: 200px;min-height:45px;"
					>{{ lists[listIndex - 1].kegiatan_desc }}</mdb-card-text
					>

					<h6 class="mt-2 idr__color">
						{{ $format(lists[listIndex - 1].harga) }}
					</h6>

					<span style="font-size: 12px; margin-top:1.5rem;"
					><i class="fa fa-calendar fa-fw fa-lg" aria-hidden="true"></i> {{ $moment(lists[listIndex - 1].jam_awal).format("LL") }} -
					{{ $moment(lists[listIndex - 1].jam_akhir).format("LL") }}</span
					>

					<!-- <mdb-btn @click="ToDetailEvent(lists[listIndex-1].kegiatan_id)" block class="btn btn-outline-primary mt-3 mb-2" color="primary">Detail Event</mdb-btn> -->
					<hr />
					<a
					@click="
					SetKeranjang(
						lists[listIndex - 1].kegiatan_id,
						lists[listIndex - 1].photo,
						lists[listIndex - 1].kegiatan_title,
						lists[listIndex - 1].harga
						)
						"
						:class="`btn my__btn-primary rounded-pill mt-3 mb-2 btn-block shadow-none ${
							$device.isMobile ? 'btn-sm' : ''
						}`"
						color="success"
						><i class="fa fa-cart-plus fa-fw fa-lg" aria-hidden="true"></i>
						Tambah ke keranjang</a
						>
						<nuxt-link
						:to="{
							name: `detail-event-id-slug`,
							params: {
								id: lists[listIndex - 1].kegiatan_id,
								slug: $slug(lists[listIndex - 1].kegiatan_title),
							},
						}"
						:class="`btn my__btn-secondary rounded-pill mt-3 mb-2 btn-block shadow-none ${$device.isMobile ? 'btn-sm' : ''}`"
						>Info Kelas</nuxt-link
						>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>

			<mdb-col col="12" xl="5" lg="12" xs="12" sm="12" :class="`${$device.isDesktop ? 'mb-5 ml-5 shadow-none' : 'mb-2'}`">
				<nuxt-link to="/events" :class="`btn my__btn-primary rounded-pill  ${$device.isMobile ? 'btn-block btn-sm' : 'btn-block'}`">Lihat Semua Kelas</nuxt-link>
			</mdb-col>

			<!-- bg content -->
			<mdb-col col="12" lg="12" xs="12" sm="12" class="bg__content">
				<img :src="require('~/assets/art/vector-5.png')">
			</mdb-col>
		</mdb-row>

		
		<!-- <mdb-row :class="`row justify-content-center ${$device.isDesktop ? 'mb-5' : 'mb-2'}`">
			<mdb-col col="12"  xl="3" lg="12" xs="12" sm="12">
				<mdb-btn :class="`btn my__btn-primary rounded-pill btn-lg ${$device.isMobile ? 'btn-block' : ''}`">Lihat Semua Kelas</mdb-btn>
			</mdb-col>
		</mdb-row> -->
	</div>
</template>

<script>
	import {SampleEvents} from '@/helpers'

	export default{
		props: ['listsToShow'],
		data(){
			return {
				lists: [],
				carts: [],
				checks: localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : '',
				username: ''
			}
		},

		mounted(){
			this.lists = SampleEvents,
			this.UserProfileData()
		},

		methods: {
			SetKeranjang(id_event, photo_event, title_event, harga) {
				const data_event = {
					id: id_event,
					photo: photo_event,
					title: title_event,
					harga: harga,
					active: true,
				};
				// this.carts.push(data_event)
				this.SaveCarts(data_event)
			},
			SaveCarts(data){
				// localStorage.setItem('carts', JSON.stringify(data))
				this.$store.dispatch("config/storeConfigCartEvent", data)
				// console.log(this.checks.length)
				this.$router.push({
					path: `/profile/${this.username}/keranjang`
				});
			},

			UserProfileData() {
				if (this.token) {
					const url = `${this.api_url}/web/user`;
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`;
					this.$axios
					.get(url)
					.then(({ data }) => {
						this.username = this.$username(data.user.nama)
					})
					.catch((err) => console.log(err.response ? err.response : ""));
				}
			},

			CheckToken() {
				this.$store.dispatch("config/checkAuthLogin", "token");
			},
			ConfigApiUrl() {
				const api_url = process.env.NUXT_ENV_API_URL;
				this.$store.dispatch("config/storeConfigApiUrl", api_url);
			},

		},

		computed: {
			token() {
				return this.$store.getters["config/ConfigCheckLogin"];
			},
			api_url() {
				return this.$store.getters["config/ConfigApiUrl"];
			}
		}
	}
</script>