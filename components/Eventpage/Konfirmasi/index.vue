<template>
	<div>
		<mdb-card class="card__registrasi-event">
			<mdb-card-body class="form__registrasi-event">
				
				<mdb-container v-if="loading" class="mt-5 mb-5">
					<div class="text-center">
						<div class="spinner-border" role="status" style="width: 4rem; height: 4rem;">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				</mdb-container>

				<mdb-container v-else>

					<mdb-row class="justify-content-center header__registrasi-event-card">
						<mdb-col md="12">						
							<h6>Event</h6>
							<h2>{{kegiatan.kegiatan_title}}</h2>
						</mdb-col>

						<mdb-col md="12">
							<h6>Biaya</h6>
							<h2>
								{{$format(kegiatan.harga)}}
							</h2>
						</mdb-col>

						<mdb-col md="12">
							<b-dropdown-divider class="line"></b-dropdown-divider>
						</mdb-col>

						<mdb-col md="12" class="mt-2">
							<h4>Metode Pembayaran</h4>
						</mdb-col>

						<mdb-col md="12" class="mt-2">
							<mdb-card>
								<mdb-card-body class="grey-text">
									<mdb-container>
										<mdb-row v-if="bank">
											<mdb-col lg="12" xs="12" sm="12" class="col__card-bank">
												<div v-if="bank.id == 1">
													<img :src="require('~/assets/images/bank/logo-bank-bca.svg')"  class="img-fluid">
													<br>
													<h6 class="mt-2">Bank {{bank.nama}} </h6>
													<p> a.n : <span class="text-capitalize">{{bank.nama_rek}}</span> </p>

													<h5>
														{{bank.no_rek}}
													</h5>
												</div>
												<div v-else-if="bank.id == 2">
													<img :src="require('~/assets/images/bank/logo-bank-mandiri.svg')" class="img-fluid">
													<br>
													<h6 class="mt-2">Bank {{bank.nama}} </h6>
													<p> a.n : <span class="text-capitalize">{{bank.nama_rek}}</span> </p>

													<h5>
														{{bank.no_rek}}
													</h5>
												</div>
												<div v-else>
													<small>No Bank History</small>
												</div>
											</mdb-col>
										</mdb-row>
									</mdb-container>
								</mdb-card-body>
							</mdb-card>
						</mdb-col>

						<mdb-col lg="12" xs="12" sm="12" class="col__card-upload-file mt-2 mb-2">
							<!-- <mdb-btn color="white" size="md" block class="text-primary font-weight-bold">Unggang Bukti Pembayaran</mdb-btn> -->
							<form>


								<div class="form-group mt-3">
									<div class="file-input">
										<input type="file" id="file" class="file" @change="FileImage($event)">
										<label for="file">
											Unggah Bukti Pembayaran
											<p class="file-name"></p>
										</label>
									</div>
								</div>

								<div v-if="status_pembayaran" class="form-group">
									<mdb-alert color="danger">
										{{new_message}}
									</mdb-alert>
								</div>

								<div class="form-group">
									<mdb-row v-if="field.preview" class="d-flex justify-content-center">
										<mdb-col md="12">
											<img :src="field.preview" width="150" class="img-fluid rounded-circle">
										</mdb-col><!-- 
										<mdb-col md="4">
											<mdb-btn type="submit" outline="info">Lanjutkan</mdb-btn>
										</mdb-col> -->
									</mdb-row>
								</div>

							</form>
						</mdb-col>


						<mdb-col md="12">
							<center>
								<nuxt-link :to="`/detail/event/${$route.params.id}`" class="white-text">Kembali Ke Events</nuxt-link>
							</center>
						</mdb-col>
					</mdb-row>

				</mdb-container>
			</mdb-card-body>
		</mdb-card>
	</div>
</template>


<script>

	export default{
		props: ['id', 'kegiatan', 'bank', 'token', 'api_url', 'loading'],

		data(){
			return{
				field: {},
				new_message:'',
				status_pembayaran: '',
				new_preview: '',
				total_bayar: '',
				status_bayar: null
			}
		},

		mounted(){
			// console.log(this.bank)
			this.CheckPembayaran(this.$route.params.id)
		},

		methods: {
			FileImage(e){
				this.field.photo = e.target.files[0]
				this.field.preview = URL.createObjectURL(e.target.files[0])
				console.log(this.field.preview)
				let formData = new FormData()
				formData.append("photo", this.field.photo)
				const config = {
					headers: {'content-type' : 'multipart/form-data'}
				}
				this.$axios.post(`${this.api_url}/web/event/${this.id}/buktibayar`, formData, config)
				.then(({data}) => {
					console.log(data)
					this.new_preview = data.kegiatan_peserta.bukti_bayar

					this.total_bayar = data.kegiatan_peserta.total_bayar

					this.$swal({
						position: 'top-end',
						icon: status,
						title: "Kami akan segera memverifikasi pembayaran anda",
						showConfirmButton: false,
						timer: 1500
					})

					this.status_bayar = true

					const data_storage = {
						data: data.kegiatan_peserta,
						message: "Terima kasih telah melakukan pembayaran kami akan segera melakukan proses verifikasi pembayaran anda"
					}

					localStorage.setItem("success", JSON.stringify(data_storage))

					this.$router.push({
						name: 'events-id-success',
						params: {
							id: this.id
						}
					})

				})
				.catch(err => console.log(err))
				.finally(() => {
					console.log("Ok")
				})
			},

			CheckPembayaran(id){
				const url = `${this.api_url}/web/event/${id}/daftar`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.post(url, {
					bank_id: this.bank.id
				})
				.then(({data}) => {
					console.log(data)
					if(data.message === "Anda telah terdaftar pada event ini"){
						this.status_pembayaran = true
						this.new_message = "Terima kasih telah mendaftar, segera lakukan pembayaran"
					}else{
						this.new_message = data.message
					}
				})
			}
		}
	}
</script>