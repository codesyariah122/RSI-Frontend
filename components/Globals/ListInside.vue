<template>
	<div class="mt-5 card__content">
		<div v-if="path == 'ppkc-berita'">
			<ppkcListBerita :lists="lists" :listToShow="listToShow"/>
		</div>
		<div v-else-if="path == 'ppkc-testimoni'">
			<ppkcListTestimoni :lists="lists" :listToShow="listToShow"/>
		</div>
		<div v-else>
			<small>No Component here</small>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['path', 'lists', 'listToShow']
	}
</script>