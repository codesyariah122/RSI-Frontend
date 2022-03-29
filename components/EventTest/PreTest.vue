<template>
	<div class="pre__test">
		<!-- <mdb-container v-if="save_test.user_id == profiles.id ? save_test.status : success.status" class="success__test">
			<mdb-row col="12" class="row justify-content-center">
				<mdb-col lg="12">
					<mdb-alert :color="`${save_test.status ? 'info' : 'success'}`">
						Halo, {{save_test.profile.nama}}. {{save_test.message ? save_test.message :  success.message}}
					</mdb-alert>
				</mdb-col>
			</mdb-row>
		</mdb-container> -->
		
		<mdb-container>
			<div v-if="loading_soal">
				<mdb-row col="12" class="row justify-content-center">
					<mdb-col lg="12">
						<b-progress :max="max" height="2rem" :striped="true" show-progress :animated="true" class="mb-3">
							<b-progress-bar :value="value" variant="success">
								<h5 v-if="value > 0" class="text-white">Loading</h5>
							</b-progress-bar>
						</b-progress>
					</mdb-col>
				</mdb-row>
			</div>

			<div v-else>
				<mdb-row v-if="tests.is_already == 1" col="12" class="row justify-content-center">
					<mdb-col lg="12" xs="12" sm="12">
						<mdb-alert color="primary">
							<mdb-icon icon="info-circle" size="lg"/> Anda telah menyelesaikan sesi pre test ini !
						</mdb-alert>
					</mdb-col>
				</mdb-row>
				
				<mdb-row col="12" class="row justify-content-center mb-2 mt-2">
					<mdb-col lg="12" xs="12" sm="12" class="box__intro-test">	
						<ul style="list-style: none; margin-top:-.5rem;">
							<li>
								<blockquote class="blockquote-footer mb-2 mt-2">
									Waktu pelaksanaan test :
								</blockquote>
								Tanggal : <time> {{$moment(waktu.tgl).format("LL")}} </time>
							</li>
							<li>
								Mulai : <time> {{$moment(waktu.jam_awal, "HH:mm:ss").format("hh:mm A")}} </time>
							</li>
							<li>
								Berakhir : <time> {{$moment(waktu.jam_akhir, "HH:mm:ss").format("hh:mm A")}} </time>
							</li>
						</ul>
					</mdb-col>
				</mdb-row>

				<mdb-row col="12" class="row justify-content-center mb-3">
					<mdb-col lg="12" xs="12" sm="12">
						<h4 class="text-gray">Total soal : {{config.totalItem}}</h4>
						<small class="text-primary">
							*.Selesaikan soal secara berurutan (1 s/d {{lists.length}})
						</small>
					</mdb-col>
				</mdb-row>

				<mdb-row col="12" class="row justify-content-center" v-if="listIndex <= lists.length" v-for="(listIndex, index) in config.perItem" :key="lists[listIndex-1].id">
					<mdb-col lg="12" class="test__content">
						<h4> Soal {{lists[listIndex-1].urutan}} </h4>
						<p> {{lists[listIndex-1].pertanyaan}} </p>
						<div class="test-answers">
							<form
							method="POST"
							class="is-not-results"
							>
							<fieldset>
								<div class="answers">
									<div
									class="answer"
									v-for="(option, indx) in lists[listIndex-1].pilihans" :key="option.id"
									:value="option.id"
									>

									<!-- Debugging -->
										<!-- <pre>

										{{lists[listIndex-1].urutan}} || {{config_soal.current}}

										 {{lists[listIndex-1].urutan > config_soal.current}} |  -- {{config.disabled}}
										</pre> -->

										<input 
										type="radio"
										v-model="tests.is_already == 1 ? lists[listIndex-1].jawaban : lists[listIndex-1].ujian_id"
										:disabled="tests.is_already == 1 ? true : false"
										:value="option.id"
										:id="option.id"
										required @change="ChangeJawaban(option.ujian_id, index, option.id, lists[listIndex-1].urutan)"/>
										<label
										:for="option.id"
										class="answer__item"
										>
										{{option.jawaban}}
									</label> 
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</mdb-col>

		</mdb-row>

		<mdb-row v-if="tests.is_already == 0 && lists.length > 0"  col="12" class="row justify-content-center">
			<mdb-col lg="12">
				<div class="mb-2 ">
					<a
					href=""
					class="btn btn-primary btn-md rounded btn-block"
					@click.prevent="SubmitTest"
					>
					<div v-if="loading_answer">
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						loading_answer...
					</div>
					<div v-else>
						Submit <mdb-icon far icon="paper-plane" />
					</div>
				</a>
			</div>
		</mdb-col>

		<mdb-col lg="12" xs="12" sm="12">
			<small>
				Terjawab {{config.defaultUrutan }} - dari {{config.lastItem  === 0 ? config.totalItem : config.lastItem}} soal
			</small>
		</mdb-col>
	</mdb-row>

</div>
</mdb-container>

</div>
</template>

<script>
	export default{
		props: ['id_test', 'token', 'api_url', 'pelatihans', 'details', 'username'],

		data(){
			return {
				loading_soal: null,
				loading_answer: null,
				tests: [],
				lists: [],
				config: {
					loadingSoal: null,
					totalItem: '',
					perItem:'',
					currentItem: 1,
					lastItem: 0,
					disabled: false,
					nextItem: 0,
					defaultUrutan: 0
				},
				config_soal: localStorage.getItem('urutan_soal') ? JSON.parse(localStorage.getItem('urutan_soal')) : '',
				field: {
					soal:[],
					jawaban:[]
				},
				jawaban:{},
				success:{
					status: null,
					message: ''
				},
				waktu: {
					tgl: '',
					jam_awal: '',
					jam_akhir: ''
				},
				change:{
					choice: ['A', 'B', 'C', 'D'],
					urutan: 1
				},
				data_pretest: [],
				save_test: {},
				soal_active: false,
				profiles: [],
				timer: 0,
				value: 0,
				max: 100
			}
		},

		mounted(){
			this.PreTest(),
			this.UserProfileData(),
			this.WaktuPelatihan(),
			this.save_test=localStorage.getItem(`finish-pre-test-${this.id_test}-${this.username}`) ? JSON.parse(localStorage.getItem(`finish-pre-test-${this.id_test}-${this.username}`)) : 'Nothing'
		},

		methods: {

			ChangeJawaban(id_soal, position, id_jawaban, urutan){
				this.config.defaultUrutan = urutan
				if(urutan === this.config_soal.current){
				// if(urutan){
					localStorage.setItem('urutan_soal', JSON.stringify({
						current: urutan !== this.config.lastItem ? this.config_soal.current+=1 : urutan,
						next: this.config_soal.next+=1
					}))
					// this.config.perItem+=1
					this.config.disabled=true
					this.config.currentItem = urutan
					this.config.nextItem = urutan+1
					if(this.field.jawaban.length > 1){
						this.field.jawaban.splice(position, 1, id_jawaban)
					}else{
						this.field.jawaban.push(id_jawaban)
					}
				}else{
					this.field.jawaban.splice(position, 0, id_jawaban)
					console.log(position)
					console.log(false)
				}
				// this.config.perItem += 1
				// this.soal_active = urutan ? true : null
				
				// localStorage.setItem('urutan_soal', urutan)
				// this.config.currentItem = localStorage.getItem('urutan_soal')
				// if(this.field.jawaban.length > 1){
				// 	this.field.jawaban.splice(position, 1, id_jawaban)
				// }else{
				// 	this.field.jawaban.push(id_jawaban)
				// }
				console.log(this.field.jawaban)
			},

			UserProfileData(){
				if(this.token){					
					const url = `${this.api_url}/web/user`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.profiles = data.user
					})
					.catch(err => console.log(err.response ? err.response : ''))
				}
			},

			WaktuPelatihan(){
				this.pelatihans.map(d => {
					this.waktu.tgl = d.tanggal
					this.waktu.jam_awal = d.jam_awal
					this.waktu.jam_akhir = d.jam_akhir
				})
			},

			PreTest(){

				localStorage.setItem('urutan_soal', JSON.stringify({
					current: this.config.currentItem,
					next: this.config.currentItem+=1,
				}))

				this.loading_soal = true
				const url = `${this.api_url}/web/event/1/pretest/list/${this.id_test}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
				this.$axios
				.get(url)
				.then(({data}) => {
					// console.log(data)
					this.lists = data.list_data
					this.config.totalItem = data.list_data.length
					this.tests = data.pelatihan
					this.config.listItem = data.list_data.length
					this.field.soal = this.field.soal.length < 1 ? this.lists.map(d => d.id) : this.field.jawaban.shift()
					this.config.perItem = data.list_data.length
					const config_soal = localStorage.getItem('urutan_soal') ? JSON.parse(localStorage.getItem('urutan_soal')) : ''	
					this.config.currentItem = config_soal.current
					// this.field.jawaban = this.field.jawaban.length < 1 ? this.lists.map(d => d.jawaban) : this.field.jawaban.shift()
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.save_test = localStorage.getItem(`finish-pre-test-${this.id_test}-${this.username}`) ? JSON.parse(localStorage.getItem(`finish-pre-test-${this.id_test}-${this.username}`)) : ''
					this.startTimer()
					setTimeout(() => {
						this.loading_soal=false
					}, 1500)
				})
			},


			SubmitTest(){
				window.scrollTo(0, 0)
				this.loading_soal = true

				if(this.tests.is_already === 1){
					this.$swal({
						position: 'top-end',
						icon: 'info',
						title: 'Anda sudah pernah menyelesaikan sesi Pre Test ini !',
						showConfirmButton: false,
						timer: 1500
					})
					setTimeout(() => {
						window.scrollTo(0,0)
						this.loading_soal = false
					}, 1500)
				}else{					
					this.$swal({
						title: 'Apakah Anda yakin ingin mengumpulkan jawaban ?',
						html:
						`Anda telah mengisi <b>${this.field.jawaban.length}</b> dari <b>${this.field.soal.length} soal</b>`,
						showDenyButton: true,
						showCancelButton: false,
						confirmButtonText: 'Ya, Kumpulkan jawaban saya',
						denyButtonText: `Tidak`,
					}).then((result) => {
						/* Read more about isConfirmed, isDenied below */
						if (result.isConfirmed) {
							this.KirimJawaban(this.field.soal, this.field.jawaban)
						} else if (result.isDenied) {
							this.field.jawaban = []
							this.loading_soal = false
							this.$swal('Changes are not saved', '', 'info')
						}
					})
				}
			},

			KirimJawaban(soal, jawaban){
				window.scrollTo(0, 0)
				const url = `${this.api_url}/web/event/1/pretest/${this.id_test}`
				this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`

				if(jawaban.length > 0){	
					this.$axios.post(url, {
						ujian: JSON.stringify(soal),
						jawaban: JSON.stringify(jawaban)
					})
					.then(({data}) => {
						if(data.message == "Berhasil menyimpan hasil test"){
							this.success.message = data.message
							this.$swal(data.message, '', 'success')
						}
					})
					.catch(err => {
						this.loading_answer = false
						this.success.status = false
						this.success.message = err.message
					})
					.finally(() => {
						this.success.status = true
						const save_test = localStorage.setItem(`finish-pre-test-${this.id_test}-${this.$username(this.profiles.nama)}`, JSON.stringify({status: this.success.status, user_id: this.profiles.id, message: 'Anda sudah menyelesaikan sesi pre test', profile: this.profiles}))
						this.save_test = localStorage.getItem(`finish-pre-test-${this.id_test}-${this.$username(this.profiles.nama)}`) ? JSON.parse(localStorage.getItem(`finish-pre-test-${this.id_test}-${this.$username(this.profiles.nama)}`)) : ''
						// this.startTimer()
						setTimeout(() => {
							this.loading_answer = false
							this.loading_soal = false
							this.PreTest()
						}, 2500)
					})
				}else{					
					this.$swal({
						icon: 'error',
						title: 'Oops...',
						text: 'Anda belum menjawab apapun!',
					})
					// this.startTimer()
					setTimeout(() => {
						this.loading_answer = false
						this.loading_soal = false
						this.PreTest()
					}, 1500)
				}

			},

			startTimer() {
				let vm = this;
				let timer = setInterval(function() {
					vm.value += 6;
					if (vm.value >= vm.max) clearInterval(timer);
				}, 100);
				vm.value = 0
			}
		}
	}
</script>