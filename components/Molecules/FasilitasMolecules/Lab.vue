<template>
	<div>
		<mdb-row>
			<mdb-col md="4" v-for="n in lab.list_foto" :key="n.id">
				<img :src="n.foto_url" class="img-fluid">
			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default {
		props: ['lab']
	}
</script>