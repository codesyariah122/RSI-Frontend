<template>
	<b-col md="5" class="jumbo__art-img">
		<b-row cols="12" class="d-flex justify-content-start">
			<b-col  sm="3" class="col-card-1">  
				<mdb-card class="z-depth-2">
					<mdb-row  class="d-flex justify-content-between">
						<mdb-col md="7">
							<mdb-container>
								<mdb-row  class="row justify-content-center">
									<mdb-col md="12">
										<h1>500+</h1>
									</mdb-col>
									<mdb-col md="12">
										<p>
											Member telah bergabung
										</p>
									</mdb-col>
								</mdb-row>
							</mdb-container>
						</mdb-col>
						<mdb-col md="5">
							<img :src="require('~/assets/art/vector-2.png')" alt="Card image cap"/>
						</mdb-col>
					</mdb-row>
				</mdb-card>
			</b-col>
			<b-col  sm="9" class="first-box"></b-col>
			<b-col  sm="9" class="card__image-box">
				<mdb-card>
					<mdb-card-image :src="require('~/assets/images/homepage/jumbo-img-1.svg')" alt="Card image cap"></mdb-card-image>
				</mdb-card>
			</b-col>
			<b-col  sm="9" class="second-box float-right"></b-col>
			<b-col  sm="9" class="col-card-2">
				<mdb-card class="z-depth-2">
					<mdb-row  class="d-flex justify-content-between">
						<mdb-col sm="9">
							<mdb-container>
								<mdb-row  class="row justify-content-center">
									<mdb-col md="12">
										<h1>100+</h1>
									</mdb-col>
									<mdb-col md="12">
										<p>
											Kelas pilihan dengan Pengajar Terbaik
										</p>
									</mdb-col>
								</mdb-row>
							</mdb-container>
						</mdb-col>
						<mdb-col sm="3">
							<img :src="require('~/assets/art/vector-1.png')" alt="Card image cap"/>
						</mdb-col>
					</mdb-row>
				</mdb-card>
			</b-col>
		</b-row>
	</b-col>
</template>