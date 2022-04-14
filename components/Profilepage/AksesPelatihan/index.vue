<template>
	<mdb-container class="akses__pelatihan">
		<b-row class="row justify-content-center">
			<b-col lg="12" xs="12" sm="12">
				<b-jumbotron class="shadow-none bg-gray">
					<b-container>
						<b-row>
							<b-col md="8" xs="12" sm="12">
								<h1 id="header">{{header.title}}</h1>
							</b-col>
						</b-row>
						<b-row class="mt-3">
							<b-col md="8" xs="12" sm="12">
								<p id="lead">{{header.context}}</p>
							</b-col>
						</b-row>
					</b-container>

					<b-container v-if="pelatihans.length > 0" class="mt-5">
						<b-row v-if="loading_event" class="row justify-content-center">
							<b-col v-for="(item, index) in pelatihans" :key="item.id" md="4" xs="12" sm="12" class="mb-5">
								<b-card>
									<b-row cols="12">
										<b-col md="12" xs="12" sm="12">
											<b-skeleton-img></b-skeleton-img>
										</b-col>
										<b-col md="12" xs="12" sm="12" class="mt-2">
											<b-skeleton animation="fade" width="85%"></b-skeleton>
											<b-skeleton animation="fade" width="55%"></b-skeleton>
											<b-skeleton animation="fade" width="70%"></b-skeleton>
										</b-col>
									</b-row>
								</b-card>
							</b-col>
						</b-row>

						<b-row v-else>
							<b-col v-if="listIndex <= pelatihans.length" v-for="listIndex in listToShow" md="4" xs="12" sm="12" class="mb-3 card__pelatihan" :key="pelatihans[listIndex-1].id">
								
								<mdb-card>
									<mdb-card-image
									:src="pelatihans[listIndex-1].photo"
									alt="No image found"
									></mdb-card-image>

									<mdb-card-body>
										<mdb-badge
										class="mb-2 badge__category shadow-none"
										>{{pelatihans[listIndex-1].status_pendaftaran_value}}</mdb-badge
										>

										<mdb-card-title
										class="truncate"
										>{{ pelatihans[listIndex-1].kegiatan_title }}</mdb-card-title
										>
										<mdb-card-text
										class="truncate2 mt-2"
										style="width: 200px; min-height: 45px"
										>{{ pelatihans[listIndex-1].kegiatan_desc }}</mdb-card-text
										>

										<h6 class="mt-2 idr__color">
											{{ $format(pelatihans[listIndex-1].harga) }}
										</h6>

										<span style="font-size: 12px; margin-top: 1.5rem"
										><i class="fa fa-calendar fa-fw fa-lg" aria-hidden="true"></i>
										{{ $moment(pelatihans[listIndex-1].tgl_awal).format("LL") }} -
										{{ $moment(pelatihans[listIndex-1].tgl_akhir).format("LL") }}</span
										>

										<hr />

											<nuxt-link :to="`/profile/${username}/events/${pelatihans[listIndex-1].kegiatan_id}/${$slug(pelatihans[listIndex-1].kegiatan_title)}`" size="sm" class="btn my__btn-primary rounded-pill btn-block">Akses Pelatihan</nuxt-link>
										</mdb-card-body>
									</mdb-card>

							</b-col>
						</b-row>

						<b-row v-if="listToShow <= pelatihans.length" class="row justify-content-center">
							<b-col md="12" xs="12" sm="12">
								<b-button block pill variant="primary" @click="ShowMore">Load More Event</b-button>
							</b-col>
						</b-row>
					</b-container>

					<b-container v-else>
						<b-alert show dismissible>
							Belum ada event yang Anda diikuti !
						</b-alert>
					</b-container>

				</b-jumbotron>
			</b-col>
		</b-row>
	</mdb-container>
	
</template>

<script>
	export default {
		props: ['loading_event', 'pelatihans', 'username'],
		data(){
			return{
				listToShow:3,
				header: {
					title: 'Pelatihan Saya',
					context: 'Silahkan mulai belajar dengan klik list pelatihan yang telah kamu beli, atau lihat pelatihan terbaru lainnya dibagian bawah halaman ini. Selamat belajar!'
				}
			}
		},

		methods: {
			ShowMore(page=0){
				this.listToShow+=3
				console.log(this.listToShow)
				if(this.listToShow % 2 == 20){
					const page = page*2
				}

				this.$emit('event-diikuti', page, '', '')
			}
		}
	}
</script>

<style lang="scss">
	.akses__pelatihan{
		margin-top: 7rem;
		margin-bottom: 7rem;
		font-family: 'Poppins', sans-serif;
		.jumbotron{
			background-color: $jumbotron-bg;
			h1{
				font-size: 2rem;
				font-weight: 800;
			}
			p{
				font-size: 16px;
				font-weight: 400;
			}
			.card{
				height: auto;
				width: 287px;
				margin-left: -1rem;
				.card-body{
					.card-title{
						font-weight: 700;
						color:$second-black;
					}
					.badge__category{
						background-color: transparent!important;
						color: $color-primary!important;
						border:1px $color-primary solid;
					}
				}
				.card-subtitle{
					font-size: 12px;
				}
				&:hover{
					background-color: $bg-blue-gray;
				}
				.content__card-event{
					.desc{
						margin-top: 1rem;
					}
					.truncate {
						display: -webkit-box;
						-webkit-line-clamp: var(--line-clamp, 1);
						-webkit-box-orient: vertical;
						word-break: var(--word-break, "none");
						overflow: hidden;
						hyphens: auto;
						text-align: var(--align, left);

						--is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
						--delay: Calc(-1s * (var(--is-single-line, 1) - 1));
						animation: states 1s var(--delay) paused;

						@keyframes states {
							0% {
								word-break: break-all;
							}
						}
					}
					.truncate2 {
						display: -webkit-box;
						-webkit-line-clamp: var(--line-clamp, 2);
						-webkit-box-orient: vertical;
						word-break: var(--word-break, "none");
						overflow: hidden;
						hyphens: auto;
						text-align: var(--align, left);

						--is-single-line: 1 - Clamp(0, Calc(var(--line-clamp) - 1), var(--line-clamp));
						--delay: Calc(-1s * (var(--is-single-line, 1) - 1));
						animation: states 1s var(--delay) paused;

						@keyframes states {
							0% {
								word-break: break-all;
							}
						}
					}
					[data-title] {
						font-size: 18px;
						position: relative;
						cursor: help;
						width: 250px;
					}

					[data-title]:hover::before {
						content: attr(data-title);
						position: absolute;
						bottom: -46px;
						padding: 10px;
						background: #000;
						color: #fff;
						font-size: 14px;
						white-space: nowrap;
					}
					[data-title]:hover::after {
						content: '';
						position: absolute;
						bottom: -12px;
						left: 8px;
						border: 8px solid transparent;	
						border-bottom: 8px solid #000;
					}
				}
				.content__idr-event{
					margin-top: 1rem;
					h4{
						font-size:18px!important;
					}
				}

				.content__link-event{
					.btn__link-event{
						font-size: 14px;
						margin-top: 1rem;
						width: 100%;
					}
				}
			}
		}
	}
@media (min-width: 992px) {
	.akses__pelatihan{
		margin-top: 1rem;
		font-family: 'Poppins', sans-serif;
		.jumbotron{
			background-color: $jumbotron-bg;
			h1{
				font-size: 2rem;
				font-weight: 800;
			}
			p{
				font-size: 18px;
				font-weight: 400;
			}
			.card{
				width: auto;
				height: auto;
				.card-subtitle{
					font-size: 14px;
				}
				&:hover{
					background-color: $bg-blue-gray;
				}
				.content__card-event{
					.desc{
						margin-top: 2rem;
					}
					[data-title] {
						font-size: 18px;
						position: relative;
						cursor: help;
						width: 250px;
					}

					[data-title]:hover::before {
						content: attr(data-title);
						position: absolute;
						bottom: -46px;
						padding: 10px;
						background: #000;
						color: #fff;
						font-size: 14px;
						white-space: nowrap;
					}
					[data-title]:hover::after {
						content: '';
						position: absolute;
						bottom: -12px;
						left: 8px;
						border: 8px solid transparent;	
						border-bottom: 8px solid #000;
					}
				}
				.content__idr-event{
					margin-top: 2rem;
					h4{
						font-size:18px!important;
					}
				}

				.content__link-event{
					.btn__link-event{
						// margin-top: 2rem;
						width: 100%;
					}
				}
			}
		}
	}
}
</style>