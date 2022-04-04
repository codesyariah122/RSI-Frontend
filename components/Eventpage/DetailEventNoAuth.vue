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
		<mdb-row v-else col="12" class="row justify-content-start">
			<mdb-col lg="6" xs="6" sm="12" class="event__info">
				<mdb-badge
				class="mb-2 badge__category shadow-none"
				>{{ events.kegiatan.kegiatan_value }}</mdb-badge
				>			
				<h1>
					{{events.kegiatan.kegiatan_title}}
				</h1>
				<h4 class="mt-3 idr__color">
					{{events.kegiatan.harga ? $format(events.kegiatan.harga) : 'Rp. -'}}
				</h4>
				<p>
					{{events.kegiatan.kegiatan_desc}}
				</p>
				<mdb-row col="12">
					<mdb-col md="6" sm="4">
						<h5>Waktu</h5>
						<p>
							{{$moment(events.kegiatan.tanggal_awal).format("LL")}} - {{$moment(events.kegiatan.tanggal_akhir).format("LL")}}
						</p>
					</mdb-col>
					<mdb-col md="6" sm="4">
						<h5>Nilai SKP</h5>
						<p>
							{{events.kegiatan.nomor_skp ? events.kegiatan.nomor_skp : '-'}}
						</p>
					</mdb-col>
				</mdb-row>
				<mdb-row class="mt-3">
					<mdb-col>
						<mdb-btn class="btn my__btn-secondary rounded-pill btn-block shadow-none" @click="GoToLogin">
							<mdb-icon icon="sign-in-alt" size="lg"/> Daftar
						</mdb-btn>
					</mdb-col>
				</mdb-row>
			</mdb-col>

			<!-- image flyer row -->
			<mdb-col lg="4" xs="4" sm="12" class="event__flyer">
				<img :src="events.kegiatan.photo">
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