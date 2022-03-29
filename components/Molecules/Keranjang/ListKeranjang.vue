<template>
	<b-card no-body class="overflow-hidden shadow-none">
		<b-row no-gutters>
			<b-col md="2">
				<b-card-img :src="data_cart.photo" alt="Image" class="rounded-0"></b-card-img>
			</b-col>
			<b-col md="9">
				<b-card-body :title="data_cart.title">
					<b-card-text>
						{{$format(data_cart.harga)}}
					</b-card-text>
				</b-card-body>
			</b-col>
			<b-col md="1" class="delete__data">
				<i class="fa fa-times fa-fw fa-lg" aria-hidden="true"></i>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
	export default{
		props: ['data_cart']
	}
</script>