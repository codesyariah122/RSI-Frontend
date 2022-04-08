<template>
	<div :class="`${$device.isDesktop ? 'event__keranjang mb-5' : 'event__keranjang mb-5'}`">
		<mdb-container>
			<mdb-row class="row justify-content-center">
				<mdb-col col="12" lg="12" xs="12" sm="12" class="keranjang__header">
					<h2>Keranjang Saya</h2>
				</mdb-col>
			</mdb-row>

			<mdb-row class="justify-content-start keranjang__card">
				<mdb-col v-if="data_cart.length == 0" col="12" lg="8" xs="8" sm="12">
					<b-card no-body class="overflow-hidden shadow-none">
						<b-alert class="mt-2" show variant="info"> {{message}} </b-alert>
					</b-card>
				</mdb-col>

				<mdb-col v-else col="12" v-for="(item, index) in data_cart" :key="item.id" lg="8" xs="8" sm="12" class="mb-3">
					<b-card no-body class="overflow-hidden shadow-none">
						<b-row v-if="$device.isDesktop" no-gutters>
							<b-col md="2" sm="2">
								<b-card-img :src="item.photo" alt="Image" class="rounded-0"></b-card-img>
							</b-col>
							<b-col md="9" sm="6">
								<b-card-body :title="item.title">
									<b-card-text>
										{{$format(item.harga)}}
									</b-card-text>
								</b-card-body>
							</b-col>
							<b-col md="1" sm="1" class="delete__data">
								<i @click="DeleteEventCart(index)" class="fa fa-times fa-fw fa-lg" aria-hidden="true" style="cursor: pointer;"></i>
							</b-col>
						</b-row>

						<div v-else class="d-flex flex-row bd-highlight mb-3">
							<div class="p-2 bd-highlight">
								<b-card-img :src="item.photo" alt="Image" class="rounded-0"></b-card-img>
							</div>
							<div class="p-2 bd-highlight">
								{{item.title}} - {{$format(item.harga)}}
							</div>
							<div class="p-2 bd-highlight">
								<i class="fa fa-times fa-fw fa-lg" aria-hidden="true"></i>
							</div>
						</div>

					</b-card>
				</mdb-col>
			</mdb-row>

			<mdb-row :class="`${$device.isDesktop ?  'justify-content-end pembayaran__card fixed-top' : 'row justify-content-center pembayaran__card'}`">
				<mdb-col col="12" lg="4" sm="12">
					<b-card title="Pilih Pembayaran" class="shadow-none list__bank">
						<b-card-text>
							Silahkan pilih salah satu metode pembayaran yang tersedia
						</b-card-text>

						<b-card-text>
							<div class="input__bank">
								<b-container>
									<b-form-radio name="bank" v-model="field.bank">
										<img :src="require('~/assets/images/bank/logo-bank-mandiri.svg')" width="100" height="50"> <span>Transfer Bank Mandiri</span>
									</b-form-radio>
								</b-container>
							</div>
							<div class="input__bank">
								<b-container>
									<b-form-radio name="bank" v-model="field.bank"> <img :src="require('~/assets/images/bank/logo-bank-bca.svg')" width="100" height="50"> <span>Transfer Bank BCA</span>
									</b-form-radio>
								</b-container>
							</div>
						</b-card-text>
					</b-card>

					<b-card title="Ringkasan Belanja" class="shadow-none rincian__bayar">
						<b-card-text>
							<h5>Total Harga</h5>
							<span>{{data_cart.length}} Kelas</span>
						</b-card-text>

						<b-card-text>
							<h2> {{$format(total)}} </h2>
						</b-card-text>

						<b-btn @click="Submit" class="btn btn-block btn-sm rounded-pill">Lanjutkan Pembayaran</b-btn>
					</b-card>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	export default  {
		name: 'profile-keranjang',
		layout: 'profile',

		data(){
			return {
				data_cart: [],
				total_lists: [],
				total:'',
				message: 'Tidak ada event yang di tambahkan!',
				field: {}
			}
		},

		beforeMount(){
			this.CheckToken()
		},

		mounted(){
			this.IsLoggedIn(),
			this.CheckKeranjang()
		},

		methods: {
			Submit(){
				this.$swal("Ok")
			},
			CheckKeranjang() {
				this.data_cart=(localStorage.getItem("carts")
				? JSON.parse(localStorage.getItem("carts"))
				: "");

				if(this.data_cart.length > 0){					
					this.data_cart.map(d => {
						this.total_lists.push(d.harga)
					})

					console.log(this.total_lists)
					this.total = parseInt(this.total_lists[0] ? this.total_lists[0] : 0) + parseInt(this.total_lists[1]? this.total_lists[1] : 0) + parseInt(this.total_lists[2] ? this.total_lists[2] : 0)
				}else{
					this.total = 0
				}

			},
			CheckToken(){
				this.$store.dispatch('config/checkAuthLogin', 'token')
			},
			
			IsLoggedIn(){
				if(!this.token.accessToken){
					this.Alert('error', `Silahkan login untuk mengakses keranjang !`)
					setTimeout(() => {
						this.$router.push({
							// path: `/detail/event/${this.$route.params.id}`
							path: '/auth/login'
						})
					}, 900)
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
			},

			DeleteEventCart(index){
				this.data_cart.splice(index, 1)
				this.total_lists.splice(index,1)
				this.$store.dispatch("config/storeRemoveCartEvent", index)
				localStorage.setItem('go-to-cart', JSON.stringify({
					status: false
				}))
				setTimeout(() => {
					location.reload()
				}, 1000)
			}
		},
		computed:{
			token(){
				return this.$store.getters['config/ConfigCheckLogin']
			}
		}
	}
</script>

<style lang="scss">
	
</style>