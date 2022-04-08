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
										{{event.kegiatan_title}}
									</td>
									<td>
										{{$format(event.harga)}}
									</td>
								</tr>
							</tbody>
							<!-- <tfoot>
								<tr>
									<th colspan="12">
										<div class="dropdown-divider"></div>
									</th>
								</tr>
								<tr>
									<th>Total</th>
									<th>{{$format(event.harga)}}</th>
								</tr>
								<tr>
									<th colspan="12">
										<div class="dropdown-divider"></div>
									</th>
								</tr>
							</tfoot> -->
						</table>
						<b-col md="12" xs="12" sm="12">
							<div class="dropdown-divider"></div>
						</b-col>
						<b-col md="5" xs="12" sm="12">
							<b-card title="Total Harga" class="shadow-none rincian__bayar">
								<b-card-text>
									<h2> {{$format(event.harga)}} </h2>
								</b-card-text>
							</b-card>
						</b-col>
					</b-row>

					<div v-else class="d-flex flex-row bd-highlight mb-3">
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
										{{event.kegiatan_title}}
									</td>
									<td>
										{{$format(event.harga)}}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

				</b-card>
			</mdb-col>
		</mdb-row>

		<mdb-row :class="`${$device.isDesktop ?  'row justify-content-end check__point' : 'row justify-content-center check__point'}`">
			<mdb-col col="12" lg="4" sm="12">
				<b-card title="Transfer Bank" class="shadow-none list__bank">
					
					<b-card-text>
						<div class="input__bank">
							<mdb-row v-if="error" class="row justify-content-center">
								<mdb-col md="12" class="mb-2">
									<mdb-alert v-if="validation" color="danger">
										{{validation.message}}
									</mdb-alert>
								</mdb-col>
							</mdb-row>
							<form @submit.prevent="RegisterEvent">
								<b-container>
									<!-- <div v-for="bank in banks" :key="bank.id">
										<input type="radio" class="custom-control-input" :id="`bank-${bank.id}`" :value="bank.id" v-model="field.bank_id">
										<label class="custom-control-label" :for="`bank-${bank.id}`">
											<img :src="`${bank.id === 1 ? require('~/assets/images/bank/bsi.png') : require('~/assets/images/bank/permata-syariah.png')}`" width="100" height="50"> {{bank.nama}}
										</label>
									</div> -->
									<b-form-radio v-for="bank in banks" :key="bank.id" name="bank" :id="`bank-${bank.id}`" :value="bank.id" v-model="field.bank_id">
										<img :src="`${bank.id === 1 ? require('~/assets/images/bank/bsi.png') : require('~/assets/images/bank/permata-syariah.png')}`" width="150" height="50"> <span>{{bank.nama}}</span>
									</b-form-radio>
									<div class="dropdown-divider mt-2"></div>
								</b-container>
								<b-btn type="submit" class="mt-2 btn btn-block btn-lg rounded-pill btn-white shadow-none">
									<div v-if="loading_btn">
										<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
										Loading...
									</div>
									<div v-else>
										<mdb-icon far icon="credit-card" size="lg" /> Bayar Pendaftaran
									</div>
								</b-btn>
							</form>
						</div>
					</b-card-text>
					
				</b-card>
			</mdb-col>
		</mdb-row>
	</div>
</template>


<script>
	export default{
		props: ['id', 'token', 'api_url'],

		data(){
			return {
				loading: null,
				loading_btn:null,
				event: {},
				banks:[],
				field: {},
				error: null,
				validation: {}
			}
		},

		mounted(){
			this.EventData()
		},

		methods: {
			Submit(){
				this.$swal("Test")
			},
			CheckEvent(){
				const url = `${this.api_url}/web/event/${this.$route.params.id}/daftar`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios.get(url)
				.then(({data}) => {
					console.log(data)
				})
				.catch(err => console.log(err.message))
			},

			EventData(){
				this.loading = true
				this.$axios.get(`/web/event/${this.id}/daftar`)
				.then(({data}) => {
					this.event = data.kegiatan
					this.banks = data.list_bank
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading = false
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

			RegisterEvent(){
				this.error = false
				this.validation.message=""
				this.loading_btn = true
				console.log(this.field.bank_id)
				if(this.field.bank_id){
					const url = `${this.api_url}/web/event/${this.id}/daftar`

					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.post(url, {
						bank_id: this.field.bank_id
					})
					.then(({data}) => {
						console.log(data)
						let new_message = ''
						if(data.kegiatan_peserta.kegiatan_id){
							if(data.message === "Anda telah terdaftar pada event ini" || data.message === ""){
								new_message = "Terima kasih telah mendaftar, segera lakukan pembayaran"	
							}else{
								new_message = data.message
							}
							this.Alert('success', new_message)
							// this.$router.push({
							// 	name: 'events-id-konfirmasi',
							// 	params: {
							// 		id: data.kegiatan_peserta.kegiatan_id,

							// 	}
							// })
							this.CheckPembayaran(data.kegiatan_peserta.kegiatan_id)
						}
					})
					.catch(err => {
						console.log(err)
					})
					.finally(() => {
						setTimeout(() => {
							this.loading_btn = false
						}, 1000)
					})
				}else{					
					this.error = true
					this.validation.message = "Harap checklist pada bagian bank yang tersedia"
					setTimeout(() => {
						this.loading_btn=false
					}, 1500)

				}
			},

			Alert(status, data){
				switch(status){
					case 'error':
					return this.$swal({
						icon: status,
						title: 'Oops...',
						text: data,
					})
					break;
					case 'success':
					return this.$swal({
						position: 'top-end',
						icon: status,
						title: data,
						showConfirmButton: false,
						timer: 1500
					})
					break;
				}
			}

		}
	}
</script>
