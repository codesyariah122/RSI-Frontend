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
					<mdb-row class="justify-content-center">
						<mdb-col md="12">						
							<h6>Pendaftaran Event</h6>
							<h4>{{event.kegiatan_title}}</h4>
						</mdb-col>

						<mdb-col md="12">
							<h6>Biaya</h6>
							<h2 class="font-weight-bolder">
								{{$format(event.harga)}}
							</h2>
						</mdb-col>

						<mdb-col md="12">
							<b-dropdown-divider class="line"></b-dropdown-divider>
						</mdb-col>

						<mdb-col md="12" class="mt-2">
							<h4>Pilih Metode Pembayaran</h4>
							<h6>Manual Transfer</h6>
						</mdb-col>

						<mdb-col md="12" class="mt-2">
							<form @submit.prevent="RegisterEvent">
								<div v-for="bank in banks" class="form-group">
									<div class="custom-control custom-radio">
										<input type="radio" class="custom-control-input" :id="`bank-${bank.id}`" name="groupOfDefaultRadios" :value="bank.id" v-model="field.bank_id">
										<label class="custom-control-label" :for="`bank-${bank.id}`">
											{{bank.nama}}
										</label>
									</div>
								</div>

								<div class="form-group">
									<mdb-btn type="submit" block color="white" size="md" class="text-primary">
										<div v-if="loading_btn">
											<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
											Loading...
										</div>
										<div v-else>
											<mdb-icon far icon="credit-card" size="lg" /> Bayar Pendaftaran
										</div>
									</mdb-btn>
								</div>
							</form>
						</mdb-col>

						<mdb-col md="12" class="mt-3 mb-2">
							<center>
								<a @click="$router.back()">
									<mdb-icon icon="arrow-left" size="md"/> Kembali
								</a>
							</center>
						</mdb-col>
					</mdb-row>

					<mdb-row v-if="error" class="row justify-content-center">
						<mdb-col md="12" class="mt-2 mb-5">
							<mdb-alert v-if="validation" color="danger">
								{{validation.message}}
							</mdb-alert>
						</mdb-col>
					</mdb-row>

			</mdb-container>
		</mdb-card-body>
	</mdb-card>
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

			RegisterEvent(){
				this.loading_btn = true
				// console.log(this.field.bank_id)
				if(this.field.bank_id === undefined){
					this.error = true
					this.validation.message = "Harap checklist pada bagian bank yang tersedia"
					setTimeout(() => {
						this.loading_btn=false
					}, 800)
				}else{					
					const url = `${this.api_url}/web/event/${this.id}/daftar`

					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.post(url, {
						bank_id: this.field.bank_id
					})
					.then(({data}) => {
						// console.log(data)
						let new_message = ''
						if(data.kegiatan_peserta.kegiatan_id){
							if(data.message === "Anda telah terdaftar pada event ini"){
								new_message = "Terima kasih telah mendaftar, segera lakukan pembayaran"	
							}else{
								new_message = data.message
							}
							this.Alert('success', new_message)
							this.$router.push({
								name: 'events-id-konfirmasi',
								params: {
									id: data.kegiatan_peserta.kegiatan_id
								}
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
					.finally(() => {
						this.loading_btn = false
					})
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