<template>
	<div>
		<mdb-row class="justify-content-start pembayaran__card">
			<mdb-col col="12"  lg="8" xs="10" sm="12" class="mb-3">
				<b-card no-body class="overflow-hidden shadow-none">
					<b-row v-if="$device.isDesktop" no-gutters class="mt-2 row justify-content-start ml-2 rincian__event-table">
						<h5>Ringkasan Belanja</h5>
						<table class="table table-borderless">
							<thead>
								<tr>
									<th scope="row">
										<b>Kelas</b>
									</th>
									<th scope="row">
										<b>Subtotal</b>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										{{kegiatan.kegiatan_title}}
									</td>
									<td>
										{{$format(kegiatan.harga)}}
									</td>
								</tr>
							</tbody>
						</table>
						<b-col md="12" xs="12" sm="12">
							<div class="dropdown-divider"></div>
						</b-col>
						<b-col md="5" xs="12" sm="12">
							<b-card title="Total Harga" class="shadow-none rincian__bayar">
								<b-card-text>
									<h2> {{$format(kegiatan.harga)}} </h2>
								</b-card-text>
							</b-card>
						</b-col>
					</b-row>
					<b-row v-else class="d-flex flex-row bd-highlight mb-3">
						<h5>Ringkasan Belanja</h5>
						<table class="table table-borderless">
							<thead>
								<tr>
									<th scope="row">
										<b>Kelas</b>
									</th>
									<th scope="row">
										<b>Subtotal</b>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										{{kegiatan.kegiatan_title}}
									</td>
									<td>
										{{$format(kegiatan.harga)}}
									</td>
								</tr>
							</tbody>
						</table>
						<b-col md="12" xs="12" sm="12">
							<div class="dropdown-divider"></div>
						</b-col>
						<b-col md="5" xs="12" sm="12">
							<b-card title="Total Harga" class="shadow-none rincian__bayar">
								<b-card-text>
									<h2> {{$format(kegiatan.harga)}} </h2>
								</b-card-text>
							</b-card>
						</b-col>
					</b-row>
				</b-card>
			</mdb-col>
		</mdb-row>

		<mdb-row style="margin-top: 16rem;" :class="`${$device.isDesktop ?  'justify-content-end check__point fixed-top' : 'row justify-content-center check__point'}`">
			<mdb-col col="12" lg="4" sm="12">
				<b-card class="shadow-none list__bank">
					<b-card-text>
						<div class="input__bank">
							<mdb-row v-if="error" class="row justify-content-center">
								<mdb-col md="12" class="mb-2">
									<mdb-alert v-if="validation" color="danger">
										{{validation.message}}
									</mdb-alert>
								</mdb-col>
							</mdb-row>
							<b-container>
								<div v-if="parseInt(bank.id) == 1">
									
									<b-card no-body class="shadow-none overflow-hidden card__bank-list">
										<b-row no-gutters>
											<b-col md="4" class="mt-5">
												<b-card-img :src="require('~/assets/images/bank/bsi.png')" alt="Image" class="rounded-0"></b-card-img>
											</b-col>
											<b-col md="8">
												<b-card-body title="Transfer Bank">
													<b-card-text>
														<h6 class="mt-2">Bank {{bank.nama}} </h6>
														<p> a.n : <span class="text-capitalize">{{bank.nama_rek}}</span> </p>

														<h5>
															{{bank.no_rek}}
														</h5>
													</b-card-text>
												</b-card-body>
											</b-col>
										</b-row>
									</b-card>
								</div>
								<div v-else-if="parseInt(bank.id )== 2">
									<img :src="require('~/assets/images/bank/permata-syariah.png')" class="img-fluid">
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
								<div class="dropdown-divider mt-2"></div>
							</b-container>
						</div>
						<mdb-col lg="12" xs="12" sm="12" class="col__card-upload-file mt-2 mb-2">
							<div v-if="status_pembayaran" class="form-group">
								<mdb-alert color="info">
									{{new_message}}
								</mdb-alert>
							</div>
							<form>
								<div class="form-group mt-3">
									<div class="file-input">
										<input type="file" id="file" class="rounded-pill file" @change="FileImage($event)">
										<label for="file">
											Unggah Bukti Pembayaran
											<p class="file-name"></p>
										</label>
									</div>
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
					</b-card-text>
					
				</b-card>
			</mdb-col>
		</mdb-row>

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
						message: "Proses pembayaran Anda sedang di check oleh admin kami. Anda dapat mengakses kelas yang Anda beli pada saat pembayaran telah diterima oleh sistem kami."
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
						this.new_message = "Terima kasih telah mendaftar, segera lakukan pembayaran, kemudian unggah bukti pembayaran Anda melalui tombol di bawah ini !"
					}else{
						this.new_message = data.message
					}
				})
			}
		}
	}
</script>