<template>
	<div class="wrap__boxes">
		<div class="row h-100">
			<div class="side-nav col-sm-4 col-2 h-100 bg-dark text-white py-2 d-flex align-items-center justify-content-center" id="left">
				<h5 class="d-none d-sm-block">I'm Fixed</h5>
			</div>
			<div class="col-sm-6 invisible col-2"><!--hidden spacer--></div>
			<div class="col offset-2 offset-sm-6 py-2">
				<h4>I Scroll</h4>
				<p>Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia salvia mustache 90's code editing brunch. Butcher polaroid VHS art party, hashtag Brooklyn deep v PBR narwhal sustainable mixtape swag wolf squid tote bag. Tote bag cronut semiotics,
					raw denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct trade ethical Odd Future jean shorts paleo. Forage Shoreditch tousled aesthetic irony, street art organic Bushwick artisan cliche semiotics ugh synth chillwave meditation.
				Shabby chic lomo plaid vinyl chambray Vice. Vice sustainable cardigan, Williamsburg master cleanse hella DIY 90's blog.</p>

				<p>Ethical Kickstarter PBR asymmetrical lo-fi. oreamcatcher street art Carles, stumptown gluten-free Kickstarter artisan Wes Anderson wolf pug. Godard sustainable you probably haven't heard of them, vegan farm-to-table Williamsburg slow-carb
					readymade disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche American Apparel whatever. Helvetica cray plaid, vegan brunch Banksy leggings +1 direct trade. Wayfarers codeply PBR selfies. Banh mi McSweeney's Shoreditch selfies,
				forage fingerstache food truck occupy YOLO Pitchfork fixie iPhone fanny pack art party Portland.</p>

				<p>Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia salvia mustache 90's code editing brunch. Butcher polaroid VHS art party, hashtag Brooklyn deep v PBR narwhal sustainable mixtape swag wolf squid tote bag. Tote bag cronut semiotics,
					raw denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct trade ethical Odd Future jean shorts paleo. Forage Shoreditch tousled aesthetic irony, street art organic Bushwick artisan cliche semiotics ugh synth chillwave meditation.
				Shabby chic lomo plaid vinyl chambray Vice. Vice sustainable cardigan, Williamsburg master cleanse hella DIY 90's blog.</p>

			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['pelatihans', 'ToggleFile', 'FilterIcon', 'ShowField'],
		data(){
			return {
			}
		},

		created() {
			window.addEventListener("scroll", this.handleScroll);
		},
		destroyed() {
			window.removeEventListener("scroll", this.handleScroll);
		},

		methods: {
			handleScroll(event) {
				const box = document.querySelector('.wrap__boxes')
				const navSide = document.querySelector('.side-nav')
				const scroll = window.scrollY
				console.log(scroll)
				if(scroll > 570){
					box.classList.add('stick')
					navSide.classList.add('fixed-top')
				}else{
					box.classList.remove('stick')
					navSide.classList.remove('fixed-top')
				}
			},
		},
	}
</script>