<template>
	<div id="list-question">
		<mdb-badge pill color="light-blue" class="mt-2 mb-3"><mdb-icon far icon="question-circle" size="lg" /> Pertanyaan : </mdb-badge>
		<div v-if="loading_lists_ask">
			<b-card  no-body class="ask__box overflow-hidden mb-3">
				<b-row no-gutters class="row justify-content-center">
					<b-col md="2">
						<b-skeleton type="avatar" class="rounded-pill mt-2" width="100"></b-skeleton>
					</b-col>
					<b-col md="8">
						<b-card-body>
							<b-skeleton animation="fade" width="85%"></b-skeleton>
							<b-skeleton animation="fade" width="55%"></b-skeleton>
							<b-skeleton animation="fade" width="70%"></b-skeleton>
						</b-card-body>
					</b-col>
				</b-row>
			</b-card>
		</div>
		<div v-else>
			<b-card v-if="listIndex <= lists.length" v-for="(listIndex, index) in listToShow" :key="lists[listIndex-1].id" no-body :class="`${$device.isDesktop ? 'ask__box overflow-hidden mb-3 shadow-none' : 'ask__box overflow-hidden mb-3 shadow-none border-0'}`">
				<b-row no-gutters class="d-flex justify-content-center content__card-ask">
					<b-col md="2">
						<b-avatar v-if="lists[listIndex-1].user_photo !=='https://api.ppkc-online.com/image-profiles/null'" variant="info" :src="lists[listIndex-1].user_photo" :size="size"></b-avatar>
						<b-avatar v-else variant="primary" :text="username.charAt(0)" :size="size"></b-avatar>
						<!-- <b-card-img :src="lists[listIndex-1].user_photo" alt="Image" class="rounded-pill"></b-card-img> -->
					</b-col>
					<b-col md="8">
						<b-card-body :title="lists[listIndex-1].user_name">
							<b-card-text>
								{{lists[listIndex-1].question}}
							</b-card-text>
							<small class="text-disable">
								{{$moment(lists[listIndex-1].created_at).format("LLLL")}}
							</small>
						</b-card-body>
					</b-col>
				</b-row>
			</b-card>

			<div v-if="loading_more_ask">
				<div class="d-flex justify-content-center">
					<div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			</div>

			<b-button v-if="listToShow <= lists.length" variant="success" pill block class="mt-4" @click="LoadMore">
				<div>
					Lebih Banyak <mdb-icon icon="angle-down" size="lg"/>
				</div>
			</b-button>

		</div>

		<div class="send__komentar mt-5">
			<b-form-textarea
			id="textarea"
			v-model="field.question"
			placeholder="Tulis Pertanyaan Anda ..."
			rows="3"
			max-rows="6"
			></b-form-textarea>

			<mdb-alert v-if="error" color="danger" @closeAlert="error=false" dismiss class="mt-5">
				<strong>Oops ! </strong> {{validation.error}}
			</mdb-alert>

			<mdb-alert v-if="success" color="success" @closeAlert="success=false" dismiss class="mt-5">
				<strong>Halo, {{ask.user_name}} </strong> pertannyaan anda telah terkirim
			</mdb-alert>

			<b-button @click.prevent="KirimPertanyaan" variant="primary" pill class="mt-4 float-right">
				<div v-if="loading_send_ask">
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Loading...
				</div>
				<div v-else>
					Kirim Pertanyaan <mdb-icon far icon="paper-plane" size="md"/>
				</div>
			</b-button>
		</div>

	</div>
</template>

<script>
	export default{
		props: [
		'api_url',
		'token',
		'profiles'
		],

		data(){
			return {
				size: '5rem',
				detail_webinar: localStorage.getItem("detail_webinar") ? JSON.parse(localStorage.getItem("detail_webinar")) : '',
				loading_lists_ask: null,
				loading_send_ask: null,
				loading_more_ask: null,
				lists: [],
				listToShow: 3,
				field: {},
				data_status: '',
				ask: {},
				validation: {},
				error: false,
				success: null
			}
		},

		mounted(){
			this.PertanyaanLists()
		},

		methods: {
			PertanyaanLists(start){
				this.loading_lists_ask = true
				// console.log(this.detail_webinar)
				if(this.detail_webinar){				
					const url = `${this.api_url}/web/webinar/question/list?start=${start ? start : 0}&pelatihan_detail_id=${this.detail_webinar.webinar.pelatihan_detail_id}`
					this.$axios.defaults.headers.common.Authorization = `Bearer ${this.token.accessToken}`
					this.$axios.get(url)
					.then(({data}) => {
						this.lists = data.list_data

					})
					.catch(err => console.log(err.response))
					.finally(() => {
						setTimeout(() => {
							this.loading_lists_ask = false
						}, 2500)
					})
				}
			},

			KirimPertanyaan(){
				this.loading_send_ask=true
				const url = `${this.api_url}/web/webinar/question`
				const data = {
					pelatihan_id: this.detail_webinar.webinar.pelatihan_detail_id,
					question: this.field.question
				}
				console.log(data)
				this.$axios.post(url,{
					pelatihan_detail_id: data.pelatihan_id,
					question: data.question
				})
				.then(({data}) => {
					console.log(data)
					this.ask = data.question
					console.log(this.ask)
					if(this.ask.data_status === 1){
						let list_question = document.querySelector("#list-question")
						list_question.scrollIntoView()
						this.PertanyaanLists()
						this.success=true
						this.field.question = ''
						this.data_status = this.ask.data_status
					}
				})
				.catch(err => {
					console.log(err.message)
					this.loading_send_ask=false
					this.error = true
					this.validation.error=err.message
				})
				.finally(() => {
					setTimeout(() => {
						this.loading_send_ask=false
					}, 1500)
				})
			},

			LoadMore(){
				this.loading_more_ask=true
				setTimeout(() => {
					this.loading_more_ask=false
					this.listToShow += 1
				},1500)
			}

		}
	}
</script>



<style lang="scss">
	.ask__box{
		.content__card-ask{
			width: 80%;
			margin-left: 3rem;			
			.b-skeleton-avatar{
				max-width: 85px;
				margin-left: 2rem;
				margin-top: 1rem;
			}
			.card-title{
				font-size:14px;
				margin-left: 2rem;
			}
			.card-text{
				font-size:12px;
			}
			small{
				font-size: 9px;
			}
		}
	}
	@media (min-width: 992px) {
		.ask__box{
			max-width:800px;
			.content__card-ask{
				.b-avatar{
					margin-top: .3rem;
				}
				.b-skeleton-avatar{
					margin-left: 1rem;
					margin-bottom: 1rem;
					max-width: 100px;
				}
				.card-title{
					font-size: 16px!important;
					font-weight: 600;
					color: $color-primary;
				}
				.card-text{
					font-size: 14px!important;
					margin-left: 2rem;
				}
				small{
					font-size: 12px;
					margin-left: 2rem;
				}
				.send__komentar{
					textarea{
						background: $scroll-bar-bg!important;
					}
				}
			}
		}
	}
</style>
