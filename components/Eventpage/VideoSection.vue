<template>
	<mdb-container>
		<mdb-row col="12">
			<mdb-col lg="12">
				<b-embed
				type="iframe"
				aspect="16by9"
				:src="`https://www.youtube-nocookie.com/embed/${video}?autoplay=0&version=3&enablejsapi=1&showinfo=0&controls=0&rel=0&showinfo=0&disablekb=1&iv_load_policy=3&modestbranding=0`"
				allowfullscreen
				></b-embed>
			</mdb-col>
		</mdb-row>
	</mdb-container>
</template>

<script>
	export default{
		props: ['video'],

		methods: {
			LightBox(video){
                GLightbox({
                    'href': video,
                    'type': 'video',
                    'source': 'youtube', //vimeo, youtube or local
                    'width': 800,
                    'autoplayVideos': true,
                });
            },
		}
	}
</script>