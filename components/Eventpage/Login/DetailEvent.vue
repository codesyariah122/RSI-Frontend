<template>
	<mdb-row v-if="loading" col="12" class="mt-5">
		<mdb-col lg="12">
			<b-card>
				<b-row>
					<b-col col="4">
						<b-skeleton-img></b-skeleton-img>
					</b-col>
					<b-col col="8">							
						<b-skeleton animation="wave" width="85%"></b-skeleton>
						<b-skeleton animation="wave" width="55%"></b-skeleton>
						<b-skeleton animation="wave" width="70%"></b-skeleton>
					</b-col>
				</b-row>
			</b-card>
		</mdb-col>
		<mdb-col lg="12" class="mt-2">
			<b-progress :max="max" height="2rem" :striped="true" show-progress :animated="true">
				<b-progress-bar :value="value" variant="success">
					<h5 v-if="value > 0">Loading</h5>
				</b-progress-bar>
			</b-progress>
		</mdb-col>
	</mdb-row>

	<div v-else>
		<mdb-row :class="`${$device.isMobile ? 'row justify-content-center' : ''}`">
			<mdb-col v-if="$device.isMobile" lg="4" xs="4" sm="12" col="12" class="event__flyer">
				<img :src="details.photo">
			</mdb-col>
			<mdb-col lg="6" xs="6" sm="12" col="12" class="event__info">
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
									<mdb-btn @click="BeliKelas(details.kegiatan_id, details)" class="btn my__btn-secondary rounded-pill btn-block shadow-none mb-2" :size="`${$device.isDesktop ? 'lg' : 'sm'}`">
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

					<mdb-col v-else-if="status_pendaftaran == 'Menunggu Konfirmasi'" md="12" xs="12" sm="12" class="mt-5">
						<div v-if="loading">
							<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
							Loading...
						</div>
						<div v-else>
							<mdb-btn @click="MenungguKonfirmasi(details.kegiatan_id)" class="btn my__btn-secondary rounded-pill btn-block shadow-none" size="md"> 
								<mdb-icon icon="check" size="lg"/> {{status_pendaftaran == 'Menunggu Konfirmasi' ? 'Check Status' : status_pendaftaran}}
							</mdb-btn>
						</div>
					</mdb-col>

					<mdb-col v-else-if="status_pendaftaran == 'Menunggu Pembayaran'" md="12" xs="12" sm="12" class="mt-5">
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

					<mdb-col v-else md="12" xs="12" sm="12" class="mt-5">
						<div v-if="loading">
							<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
							Loading...
						</div>
						<div v-else>
							<mdb-btn @click="ProfileEvent($username(profiles.nama), data_event.event_id, $slug(details.kegiatan_title))" v-if="data_event || token.accessToken" class="btn my__btn-primary rounded-pill btn-block shadow-none" :size="`${$device.isDesktop ? 'md' : 'sm'}`">
								<h5>Lanjut Pelatihan</h5>
							</mdb-btn>
						</div>
							<mdb-btn v-else size="md" color="grey" disabled class="mb-3 not__allowed">Daftar</mdb-btn>
						</mdb-col>
					</mdb-row>
				</mdb-col>

				<mdb-col v-if="$device.isDesktop" lg="4" xs="4" sm="12" class="event__flyer">
					<img :src="details.photo">
				</mdb-col>
			</mdb-row>

			<!-- Detail event schedule -->
			<div v-if="status_pendaftaran === 'Terdaftar'" class="event__jadwal">				
				<mdb-row class="row justify-content-start">
					<mdb-col lg="12" xs="12" sm="12">
						<h4>Jadwal Kelas</h4>
					</mdb-col>
				</mdb-row>

				<mdb-row class="row justify-content-start lists__jadwal mt-2">
					<mdb-col lg="6" xs="6" sm="12" class="lists__target">
						<div class="accordion shadow-none" role="tablist">
							<b-card v-for="(item, index) in schedules" :key="index+1" no-body class="shadow-none">
								<b-card-header header-tag="header" class="p-0" role="tab">
									<b-button @click="ToggleFile(index+1)" block :v-b-toggle="`accordion-${index+1}`"  class="shadow-none">
										<mdb-row class="row justify-content-start">
											<mdb-col md="10" sm="10" col="10" class="text-left">
												<h6>
													{{item.title}}
												</h6>
												<small>
													{{$moment(item.tanggal).format("LLLL")}}
												</small>
											</mdb-col>
											<mdb-col md="1" sm="1" col="1">
												<mdb-icon :icon="`${show_collapse && urutan == index+1 ? 'angle-down' : 'angle-right'}`" size="lg"/>
											</mdb-col>
										</mdb-row>
									</b-button>
								</b-card-header>

								<b-collapse v-if="urutan === index+1" v-model="visible" class="shadow-none schedule__collapse" :id="`accordion-1`" accordion="my-accordion" role="tabpanel">
									<b-card-body>
										<b-list-group class="list__categori">
											<b-list-group-item class="list__categori-item" v-for="(categori, index) in item.categories" :key="categori.urutan">
												<h6>
													{{categori.urutan}}. {{categori.title}}
												</h6>
												<b-list-group class="list__detail mt-2">
													<b-list-group-item v-for="(detail, index) in categori.details" :key="detail.urutan" class="list__detail-item mb-4">
														<mdb-row class="justify-content-start">
															<mdb-col md="10" sm="10" col="10" class="col-md-11">
																<mdb-icon class="text-success"  :icon="FilterIcon(detail.kategori)" :size="`${$device.isDesktop ? 'md' : 'sm'}`"/> <span> {{detail.title}} </span>
															</mdb-col>
															<mdb-col md="1" sm="1" col="1">
																<mdb-icon class="text-success" icon="check-circle" :size="`${$device.isDesktop ? 'md' : 'sm'}`"/>
															</mdb-col>
														</mdb-row>
													</b-list-group-item>
												</b-list-group>
											</b-list-group-item>
										</b-list-group>
									</b-card-body>
								</b-collapse>
							</b-card>
						</div>
					</mdb-col>

					<mdb-col lg="6" xs="6" sm="12" class="profile__pengajar mt-2">
						<div class="row">
							<div class="col-lg-12 col-sm-12 col-xs-12">
								<h5>Profile Fasilitator</h5>
							</div>
							<div class="col-lg-12 col-xs-12 col-sm-12 mt-3 card__profile">
								<b-card no-body class="shadow-none overflow-hidden">
									<b-row no-gutters class="row justify-content-center mt-4">
										<b-col md="2" col="12" class="profile__pic">
											<b-avatar :size="`${$device.isMobile ? '5rem' : '4rem'}`" variant="info" :src="require('~/assets/images/Avatar/5.jpg')"></b-avatar>
											<div :class="`${$device.isMobile ? 'd-flex justify-content-start mt-3 mx-auto' : 'row justify-content-start mt-3'}`">
												<div class="col-md-4 col-sm-4">
													<mdb-icon class="text-primary" fab icon="facebook-square" size="lg"/>
												</div>
												<div class="col-md-4 col-sm-4">
													<mdb-icon class="text-info" fab icon="linkedin-in" size="lg"/>
												</div>
											</div>
										</b-col>
										<b-col md="8" class="profile__info">
											<b-card-body title="dr. Hasan Fadly">
												<b-card-text>
													<blockquote>
														Dokter Umum
													</blockquote>
													<span>
														Saat ini, dr. Hasan Fadly bertugas sebagai dokter umum di Rumah Sakit Islam Sultan Agung Semarang dan aktif sebagai penyuluh kesehatan masyarakat di kota Semarang.
													</span>
													
												</b-card-text>
											</b-card-body>
										</b-col>
									</b-row>
								</b-card>
							</div>
						</div>

					</mdb-col>
				</mdb-row>
			</div>
			<!-- end event detail schedule -->

		</div>
	</template>

	<script>
		export default{
			props: ['loading', 'profiles', 'details', 'data_event', 'status_pendaftaran', 'token', 'api_url', 'schedules'],

			data(){
				return {
					timer: 0,
					value: 0,
					max: 100,
					show_collapse: false,
					urutan: null,
					visible: false
				}
			},

			mounted(){
				this.startTimer(),
				this.VenoBox()
			},


			methods: {
				ToggleFile(urutan) {
					console.log(urutan)
					if (urutan) {
						this.urutan = urutan;
						this.show_collapse = !this.show_collapse;
						this.visible = !this.visible
					}

				},

				FilterIcon(type) {
					switch (type) {
						case 1:
						return "tv";
						break;
						case 2:
						return "file-pdf";
						break;
						case 3:
						return "file-alt";
						break;
						case 4:
						return "file-archive";
						break;
						case 5:
						return "file-pdf";
						break;
						case 6:
						return "file-video";
						break;
						default:
						return "No type here";
					}
				},

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

				MenungguKonfirmasi(id){
					const data_storage = {
						data: localStorage.getItem('success') ? JSON.parse(localStorage.getItem('success')) : '',
						message: "Proses pembayaran Anda sedang di check oleh admin kami. Anda dapat mengakses kelas yang Anda beli, Setelah pembayaran Anda di verifiksi oleh sistem kami."
					}


					this.$router.push({
						name: 'events-id-success',
						params: {
							id: id,
							check: true,
							data_storage: data_storage
						}
					})
				},

				RegistrasiEvent(id){
					this.$emit('registrasi-event', id)
				},

				BeliKelas(id, data){
					this.$router.push({
						name: 'events-id-registrasi',
						params: {
							id: id,
							data: data
						}
					})
				},

				CheckPembayaran(id){
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(`/web/event/${id}/konfirmasi`)
					.then(({data}) => {
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