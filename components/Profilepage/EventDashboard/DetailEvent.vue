<template>
	<div>
		<div v-if="loading" class="mb-5 mt-5">
			<b-card>
				<b-row>
					<b-col cols="6">
						<b-skeleton-img></b-skeleton-img>
					</b-col>
					<b-col cols="5">
						<b-skeleton animation="wave" width="85%"></b-skeleton>
						<b-skeleton animation="wave" width="55%"></b-skeleton>
						<b-skeleton animation="wave" width="70%"></b-skeleton>
					</b-col>
				</b-row>
			</b-card>
		</div>
		<div v-else class="title-section">
			<mdb-row class="event__detail-content">
				<mdb-col md="5" sm="12" xs="12" class="col-1">
					<div class="event__image-wrap">
						<img :src="details.photo" :class="`${$device.isDesktop ? 'img-fluid' : 'img-responsive'}`">
						<div class="overlay__event-img">
							<a :data-gall="details.photo" :href="details.photo" class="event__detail-profile icon" :title="details.kegiatan_title">
								<mdb-icon icon="search-plus" />
							</a>
						</div>
					</div>
				</mdb-col>

				<mdb-col md="7" sm="12" xs="12" col="12" class="col-2">
					<h4>
						{{details.kegiatan_title}}
					</h4>
					<h6 class="mt-3">
						{{details.harga ? $format(details.harga) : 'Rp. -'}}
					</h6>

					<mdb-row class="inside__first mt-3">
						<mdb-col md="4">
							<h5>Jenis kegiatan</h5>
							<mdb-badge class="badge btn-outline-primary mb-2" style="color:#004899!important;">
								{{details.kategori_value}}
							</mdb-badge>
						</mdb-col>
						<mdb-col md="4">
							<h5>Nilai SKP</h5>
							<p>
								{{details.nomor_skp ? details.nomor_skp : '--'}}
							</p>
						</mdb-col>
						<mdb-col md="12">
							<h5>Deskripsi</h5>
							<p>
								{{details.kegiatan_desc}}
							</p>
						</mdb-col>
						<mdb-col md="12">
							<h5>Waktu</h5>
							<p>
								{{$moment(details.tanggal_awal).format("LL")}} - {{$moment(details.tanggal_akhir).format("LL")}}
							</p>
						</mdb-col>
					</mdb-row>

					<mdb-row class="inside__second mt-3">


						<mdb-col>
							<div v-if="loading">
								<span class="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>
								Loading...
							</div>
							<div v-else>
								<mdb-btn disabled color="success" size="md" block class="text-white"> 
									<mdb-icon icon="check" size="lg"/> {{status_pendaftaran}}
								</mdb-btn>
							</div>
						</mdb-col>

					</mdb-row>

				</mdb-col>
			</mdb-row>
		</div>
	</div>
</template>

<style lang="scss">
	.event__detail-content{
		.col-1{
			.event__image-wrap{
				margin-bottom: 1rem;
				img{
					width: 250px;
					height: 250px;
				}
				position: relative;
				.overlay__event-img {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					width: 250px;
					height:250px;
					opacity: 0;
					transition: .3s ease;
					background-color: rgba(205, 209, 228, 0.9);
				}

				&:hover .overlay__event-img {
					opacity: 1;
				}

				.icon {
					color: white;
					font-weight: 700;
					font-size: 100px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					-ms-transform: translate(-50%, -50%);
					text-align: center;
				}

				.fa-zoom:hover {
					color: #eee;
				}
			}
		}
		.col-2{
			h4{
				color: $color-primary!important;
				font-size: 18px;
				font-weight: 600;
			}
			h6{
				color: $idr-color!important;
				font-size: 16px;
				font-weight: 600;
			}
			.inside__first{
				h5{
					font-size: 14px;
					font-weight: 600;
				}
				p{

					font-size:12px;
				}
			}
		}
	}
@media (min-width: 992px) {
	.event__detail-content{
		.col-1{
			.event__image-wrap{
				img{
					width:375px;
					height: 370px;
				}
				position: relative;
				.overlay__event-img {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					width: 355px;
					height:375px;
					opacity: 0;
					transition: .3s ease;
					background-color: rgba(205, 209, 228, 0.9);
				}

				&:hover .overlay__event-img {
					opacity: 1;
				}

				.icon {
					color: white;
					font-weight: 700;
					font-size: 100px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					-ms-transform: translate(-50%, -50%);
					text-align: center;
				}

				.fa-zoom:hover {
					color: #eee;
				}
			}
		}
		.col-2{
			h4{
				color: $color-primary!important;
				font-size: 18px;
				font-weight: 600;
			}
			h6{
				color: $idr-color!important;
				font-size: 16px;
				font-weight: 600;
			}
			.inside__first{
				h5{
					font-size: 14px;
					font-weight: 600;
				}
				p{
					font-size:12px;
				}
			}
		}
	}
}
</style>

<script>
	export default{
		props: ['details', 'loading', 'status_pendaftaran'],

		mounted(){
			this.VenoBox()
		},

		methods: {
			VenoBox(){
				new VenoBox({
					selector: '.event__detail-profile',
					numeration: true,
					infinigall: true,
					share: ['facebook', 'twitter', 'linkedin', 'pinterest', 'download'],
					spinner: 'rotating-plane'
				})
			},
		}
	}
</script>