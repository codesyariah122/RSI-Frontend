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

		<div v-else>
			<mdb-row>
				<mdb-col lg="6" xs="6" sm="12" class="event__info">
					<!-- <pre>
						{{details}}
					</pre> -->
					<mdb-badge
					class="mb-2 badge__category shadow-none"
					>{{details.kategori_value}}</mdb-badge
					>			
					<h1>
						{{details.kegiatan_title}}
					</h1>
					<h4 class="mt-3 idr__color">
						{{details.harga ? $format(details.harga) : 'Rp. -'}}
					</h4>
					<p>
						{{details.kegiatan_desc}}
					</p>
					<mdb-row col="12">
						<mdb-col md="6" sm="4">
							<h5>Waktu</h5>
							<p>
								{{$moment(details.tanggal_awal).format("LL")}} - {{$moment(details.tanggal_akhir).format("LL")}}
							</p>
						</mdb-col>
						<mdb-col md="6" sm="4">
							<h5>Nilai SKP</h5>
							<p>
								{{details.nomor_skp ? details.nomor_skp : '-'}}
							</p>
						</mdb-col>

					</mdb-row>
					<mdb-row class="mt-3" col="12">
						<mdb-col v-if="status_pendaftaran == 'Daftar'" md="12" xs="12" sm="12">

							<div v-if="loading">
								<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
								Loading...
							</div>
							<div v-else>
								
								<mdb-row class="row justify-content-start">
									<mdb-col md="5">
										<mdb-btn @click="CheckConfirmasi(details.kegiatan_id)" class="btn my__btn-secondary rounded-pill btn-block shadow-none" size="lg">
											{{status_pendaftaran == "Daftar" ? "Beli Kelas" : status_pendaftaran}}
										</mdb-btn>
									</mdb-col>
									<mdb-col md="7">
										<mdb-btn
										@click="
										SetKeranjang(
											item.kegiatan_id,
											item.photo,
											item.kegiatan_title,
											item.harga
											)
											"
											:class="`btn my__btn-primary rounded-pill btn-block shadow-none ${
												$device.isMobile ? 'btn-sm' : ''
											}`"
											color="success"
											><i class="fa fa-cart-plus fa-fw fa-lg" aria-hidden="true"></i>
											Tambah ke keranjang
										</mdb-btn>
									</mdb-col>
								</mdb-row>
							</div>
						</mdb-col>

						<mdb-col v-else-if="status_pendaftaran == 'Menunggu Konfirmasi'" md="12" xs="12" sm="12">
							<div v-if="loading">
								<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
								Loading...
							</div>
							<div v-else>
								<mdb-btn @click="RegistrasiEvent(details.kegiatan_id)" class="btn my__btn-secondary rounded-pill btn-block shadow-none" size="md"> 
									<mdb-icon icon="check" size="lg"/> {{status_pendaftaran == 'Menunggu Konfirmasi' ? 'Check Status' : status_pendaftaran}}
								</mdb-btn>
							</div>
						</mdb-col>

						<mdb-col v-else-if="status_pendaftaran == 'Menunggu Pembayaran'" md="12" xs="12" sm="12">
							<div v-if="loading">
								<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
								Loading...
							</div>
							<div v-else>
								<mdb-btn @click="CheckPembayaran(details.kegiatan_id)" class="btn my__btn-secondary rounded-pill btn-block shadow-none" size="md"> 
									<mdb-icon icon="check" size="lg"/> {{status_pendaftaran == 'Menunggu Konfirmasi' ? 'Check Status' : status_pendaftaran}}
								</mdb-btn>
							</div>
						</mdb-col>

						<mdb-col v-else md="12" xs="12" sm="12">
							<div v-if="loading">
								<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
								Loading...
							</div>
							<div v-else>
								<!-- <mdb-btn v-if="data_event || token.accessToken" color="success" size="md" disabled>
									<mdb-icon far icon="calendar-check" /> {{status_pendaftaran}}
								</mdb-btn> -->
								<mdb-btn @click="ProfileEvent($username(profiles.nama), data_event.event_id, $slug(details.kegiatan_title))" v-if="data_event || token.accessToken" class="btn my__btn-secondary rounded-pill btn-block shadow-none" size="md">
									<mdb-icon icon="tachometer-alt" size="lg"/> Dashboard Pelatihan
								</mdb-btn>
							</div>
							<mdb-btn v-else size="md" color="grey" disabled class="mb-3 not__allowed">Daftar</mdb-btn>
						</mdb-col>
					</mdb-row>
				</mdb-col>

				<mdb-col lg="4" xs="4" sm="12" class="event__flyer">
					<img :src="details.photo">
				</mdb-col>
			</mdb-row>

			<!-- Detail event -->
			<mdb-row class="row justify-content-start event__jadwal">
				<mdb-col lg="12" xs="12" sm="12">
					<h4>Jadwal Kelas</h4>
				</mdb-col>
			</mdb-row>
		</div>

	</div>
</template>

<script>
	export default{
		props: ['loading', 'profiles', 'details', 'data_event', 'status_pendaftaran', 'token', 'api_url'],

		data(){
			return {
				timer: 0,
				value: 0,
				max: 100
			}
		},

		mounted(){
			this.startTimer(),
			this.VenoBox()
		},


		methods: {

			CheckKeranjang(){
				if (this.events.length < this.listsToShow) {
					SampleEvents.map((d) => {
						this.events.push(d);
					});
				}
			},

			SetKeranjang(id_event, photo_event, title_event, harga) {
				const data_event = {
					id: id_event,
					photo: photo_event,
					title: title_event,
					harga: harga,
					active: true,
				};
				this.SaveCarts(data_event)
			},

			SaveCarts(data){
				this.$store.dispatch("config/storeConfigCartEvent", data)
				if(this.token.accessToken){
					this.$router.push({
						path: `/profile/${this.username}/keranjang`
					});
				}else{
					localStorage.setItem('go-to-cart', JSON.stringify({
						status: true
					}))
					this.$router.push({
						name: 'auth-login'
					})
				}
			},

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

			CheckPembayaran(id){
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(`/web/event/${id}/konfirmasi`)
				.then(({data}) => {
					console.log(data)
					if(data.kegiatan){
						this.$router.push({
							name: 'events-id-konfirmasi',
							params: {
								id: id,
								bank: data.bank,
								kegiatan: data.kegiatan
							}
						})
					}
				})
				.catch(err => console.log(err))

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