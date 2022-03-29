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
			<mdb-col lg="12">
				<b-progress :max="max" height="2rem" :striped="true" show-progress :animated="true">
					<b-progress-bar :value="value" variant="success">
						<h5 v-if="value > 0">Loading</h5>
					</b-progress-bar>
				</b-progress>
			</mdb-col>
		</mdb-row>

		<mdb-row v-else>
			<mdb-col md="5" sm="12" xs="12" class="col-1">
				<div class="event__image-wrap">
					<img :src="details.photo" class="rounded image">
					<div class="overlay__event-img">
						<a :data-gall="details.photo" :href="details.photo" class="event__details-login icon" :title="details.kegiatan_title">
							<mdb-icon icon="search-plus" />
						</a>
					</div>
				</div>
			</mdb-col>

			<mdb-col md="7" sm="12" xs="12" col="12" class="col-2">
				<h1>
					{{details.kegiatan_title}}
				</h1>
				<h4 class="mt-3">
					{{details.harga ? $format(details.harga) : 'Rp. -'}}
				</h4>

				<mdb-row class="inside__first mt-3">

					<mdb-col v-if="data_event || token.accessToken" md="12" class="mt-2 mb-3">
						<mdb-badge v-if="status_pendaftaran  !== 'Daftar'" color="success">{{status_pendaftaran}}</mdb-badge>
					</mdb-col>

					<mdb-col md="4">
						<h5>Jenis kegiatan</h5>
						<mdb-badge color="success">
							{{details.kategori_value}}
						</mdb-badge>
					</mdb-col>
					<mdb-col md="4">
						<h5>Nilai SKP</h5>
						<p>
							{{details.nomor_skp ? details.nomor_skp : '-'}}
						</p>
					</mdb-col>
					<mdb-col md="12">
						<h5>Deskripsi</h5>
						<p>
							{{details.kegiatan_desc}}
						</p>
					</mdb-col>
					<mdb-col md="12">
						<h5>Waktu</h5>
						<p>
							{{$moment(details.tanggal_awal).format("LL")}} - {{$moment(details.tanggal_akhir).format("LL")}}
						</p>
					</mdb-col>

					
				</mdb-row>

				<mdb-row class="inside__second mt-3" col="12">
					<mdb-col v-if="status_pendaftaran == 'Daftar'" lg="12" xs="12" sm="12">
						<div v-if="loading">
							<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
							Loading...
						</div>
						<div v-else>
							<mdb-btn @click="CheckConfirmasi(details.kegiatan_id)" gradient="blue" size="md">
								<mdb-icon far icon="calendar-plus" size="lg"/> {{status_pendaftaran}}
							</mdb-btn>
						</div>
					</mdb-col>

					<mdb-col v-else-if="status_pendaftaran == 'Menunggu Konfirmasi'" lg="12" xs="12" sm="12">
						<div v-if="loading">
							<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
							Loading...
						</div>
						<div v-else>
							<mdb-btn @click="RegistrasiEvent(details.kegiatan_id)" color="info" size="md"> 
								<mdb-icon icon="check" size="lg"/> {{status_pendaftaran == 'Menunggu Konfirmasi' ? 'Check Status' : status_pendaftaran}}
							</mdb-btn>
						</div>
					</mdb-col>

					
					<mdb-col v-else lg="12" xs="12" sm="12">
						<div v-if="loading">
							<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
							Loading...
						</div>
						<div v-else>
							<!-- <mdb-btn v-if="data_event || token.accessToken" color="success" size="md" disabled>
								<mdb-icon far icon="calendar-check" /> {{status_pendaftaran}}
							</mdb-btn> -->
							<mdb-btn @click="ProfileEvent($username(profiles.nama), data_event.event_id, $slug(details.kegiatan_title))" v-if="data_event || token.accessToken" color="primary" size="md">
								<mdb-icon icon="tachometer-alt" size="lg"/> Dashboard Pelatihan
							</mdb-btn>
						</div>
						<mdb-btn v-else size="md" color="grey" disabled class="mb-3 not__allowed">Daftar</mdb-btn>
					</mdb-col>
				</mdb-row>

			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default{
		props: ['loading', 'profiles', 'details', 'data_event', 'status_pendaftaran', 'token'],

		data(){
			return {
				timer: 0,
				value: 0,
				max: 100,
			}
		},

		mounted(){
			this.startTimer(),
			this.VenoBox()
		},


		methods: {
			RegistrasiEvent(id){
				// alert(id)
				this.$emit('registrasi-event', id)
			},

			CheckConfirmasi(id){
				this.$router.push({
					name: 'events-id-registrasi',
					params: {
						id: id
					}
				})
			},

			ProfileEvent(username, id_event, slug){
				this.$router.push({
					path: `/profile/${username}/events/${id_event}/${slug}`
				})
			},

			startTimer() {
				let vm = this;
				let timer = setInterval(function() {
					vm.value += 6;
					if (vm.value >= vm.max) clearInterval(timer);
				}, 100);
			},

			VenoBox(){
				new VenoBox({
					selector: '.event__details-login',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			},
		}
	}
</script>