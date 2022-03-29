<template>
	<div>
		<mdb-row v-if="loading" col="12" class="mt-5">
			<mdb-col lg="12">
				<b-card>
					<b-row>
						<b-col cols="4">
							<b-skeleton-img></b-skeleton-img>
						</b-col>
						<b-col cols="8">							
							<b-skeleton animation="wave" width="85%"></b-skeleton>
							<b-skeleton animation="wave" width="55%"></b-skeleton>
							<b-skeleton animation="wave" width="70%"></b-skeleton>
						</b-col>
					</b-row>
				</b-card>
			</mdb-col>
		</mdb-row>
		<mdb-row v-else>
			<mdb-col md="5" sm="12" xs="12" class="col-1">
				<div class="event__image-wrap">
					<img :src="events.kegiatan.photo" class="rounded image">
					<div class="overlay__event-img">
						<a :data-gall="events.kegiatan.photo" :href="events.kegiatan.photo" class="event-details icon" :title="events.kegiatan_title">
							<mdb-icon icon="search-plus" />
						</a>
					</div>
				</div>
			</mdb-col>

			<mdb-col md="7" sm="12" xs="12" col="12" class="col-2">
				<h1>
					{{events.kegiatan.kegiatan_title}}
				</h1>
				<h4 class="mt-3 idr__color">
					{{events.kegiatan.harga ? $format(events.kegiatan.harga) : 'Rp. -'}}
				</h4>

				<mdb-row class="inside__first mt-3">
					<mdb-col md="4">
						<h5>Jenis kegiatan</h5>
						<p>
							{{events.kegiatan.kegiatan_value}}
						</p>
					</mdb-col>
					<mdb-col md="4">
						<h5>Nilai SKP</h5>
						<p>
							{{events.kegiatan.nomor_skp ? events.kegiatan.nomor_skp : '-'}}
						</p>
					</mdb-col>
					<mdb-col md="12">
						<h5>Deskripsi</h5>
						<p>
							{{events.kegiatan.kegiatan_desc}}
						</p>
					</mdb-col>
					<mdb-col md="12">
						<h5>Waktu</h5>
						<p>
							{{$moment(events.kegiatan.tanggal_awal).format("LL")}} - {{$moment(events.kegiatan.tanggal_akhir).format("LL")}}
						</p>
					</mdb-col>
				</mdb-row>

				<mdb-row class="inside__second mt-3">
					<mdb-col>
						<mdb-btn size="md" color="blue-grey" class="mb-3" @click="GoToLogin">
							<mdb-icon icon="sign-in-alt" size="lg"/> Daftar
						</mdb-btn>
					</mdb-col>
				</mdb-row>

			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['events', 'loading'],

		mounted(){
			this.VenoBox()
		},

		methods: {
			VenoBox(){
				new VenoBox({
					selector: '.event-details',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			},

			GoToLogin() {
				if (this.event_id === this.$route.params.id) {
					const data = {
						event_id: this.event_id,
						event_path: this.event_path,
					};
					this.SetEventLogin(data);
				} else {
					this.$router.push({ name: "auth-login" });
				}
			},

			SetEventLogin(data) {
				this.$store.dispatch("config/setEventToLogin", JSON.stringify(data));
				this.$router.push({
					name: "auth-login",
				});
			},
		},

		computed: {
			set_event() {
				return this.$store.getters["config/ConfigSetEventLogin"];
			}
		},
	}
</script>