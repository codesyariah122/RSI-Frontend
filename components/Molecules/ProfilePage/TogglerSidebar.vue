<template>
	<div>
		<mdb-row class="justify-content-end">
			<mdb-col :col="`${$device.isDesktop ? 1 : 3}`">
				<mdb-tooltip trigger="hover" :options="{placement: 'bottom'}">
					<span slot="tip"> {{close_show ? 'Tutup Menu Pelatihan' : 'Buka Menu Pelatihan'}} </span>
					<mdb-btn id="docs-sidebar-toggler" class="toggler" gradient="blue" slot="reference" color="primary" @click="SidebarToggler(); close_show = !close_show;">
						<!-- <mdb-icon icon="bars" size="sm"/> -->
						<i v-if="close_show" class="fas fa-times"></i>
						<i v-else class="fas fa-bars"></i>
					</mdb-btn>
				</mdb-tooltip>
			</mdb-col>
		</mdb-row>
	</div>
</template>

<style lang="scss">
	.toggler{
		z-index: 9999;
		&:hover{
			color:$bg-fourt!important;
		}
		position: fixed;
	}

	@media (min-width: 992px) {
		.toggler{
			margin-left: -2rem;
		}
	}
</style>

<script>
	export default{
		data(){
			return {
				close_show: true
			}
		},
		methods: {
			SidebarToggler(){
				const sidebar = document.getElementById('docs-sidebar');
				if (sidebar.classList.contains('sidebar-visible')) {
					console.log('visible');
					sidebar.classList.remove('sidebar-visible');
					sidebar.classList.add('sidebar-hidden');

				} else {
					console.log('hidden');
					sidebar.classList.remove('sidebar-hidden');
					sidebar.classList.add('sidebar-visible');
				}
			},
		}
	}
</script>
