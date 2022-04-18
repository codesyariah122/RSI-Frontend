<template>
	<div>
		<mdb-row class="row justify-content-start">
			<mdb-col col="12" lg="12" xs="12" sm="12" class="pembayaran__header">
				<h2> {{data_pendaftaran.status_pendaftaran_value}} </h2>
				
				<p>{{message ? message : checks.message}}.</p>

			</mdb-col>
		</mdb-row>
	</div>
</template>

<script>
	export default {
		props: ['data_pendaftaran', 'message', 'bank', 'kegiatan', 'checks']
	}
</script>