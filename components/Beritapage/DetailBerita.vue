<template>
	<div class="berita__detail-content">
		<mdb-col lg="12" xs="12" sm="12" class="col__berita-1">
			<h2 class="text-capitalize">{{lists.berita.judul}}</h2>
			<p>{{$moment(lists.berita.created_at).format("LLL")}}</p>
			<!-- Image content -->
			<center>            
				<img :src="lists.berita.foto_url" class="img-fluid hover-shadow" />
			</center>
		</mdb-col>


		<mdb-col lg="12" xs="12" sm="12" class="col__berita-2">
			<article class="content-desc">
				{{ lists.berita.konten }}
			</article>
		</mdb-col>
		
		<mdb-col lg="12" xs="12" sm="12" class="mt-5">
			<b-dropdown-divider class="line"></b-dropdown-divider>
		</mdb-col>
	</div>
</template>

<script>
	export default{
		props: ['lists']
	}
</script>