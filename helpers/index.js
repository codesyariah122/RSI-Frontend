export const FetchData = async(url) => {
	const fetchs = await fetch(url)
	try{
		return fetchs.json()
	}catch(err){
		console.error(err)
	}
}

export const LoginProfile = async(url, data) => {
	const login = await fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},

		body: JSON.stringify(data)
	})

	try{
		return await login.json()
	}catch(err){
		console.log(err)
	}

}

export const CheckWeather = async(city, apiKey) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	const weather = await fetch(url)
	try{
		return weather.json()
	}catch(err){
		console.error(err)
	}
}

export const SampleEvents = [
	{
		kegiatan_id:1, 
		kegiatan_title: 'Penanganan Pertama pada Gejala COVID 19',
		kategori_value: 'full online',
		kategori_code: "1",
		photo: require('~/assets/images/samples/Card/1.jpg'),
		kegiatan_desc: 'Kuasai penanganan pertama pada pasien suspek atau bergejala COVID 19',
		harga: '199000',
		jam_awal: new Date(2022, 3, 2),
		jam_akhir: new Date(2022, 3, 22)
	},
	{
		kegiatan_id:2, 
		kegiatan_title: 'Pelatihan sanitasi lingkungan dan pembuatan Desinfektan',
		kategori_value: 'full online',
		kategori_code: "1",
		photo: require('~/assets/images/samples/Card/2.jpg'),
		kegiatan_desc: 'Rangkaian pelatihan untuk menjaga kebersihan lingkungan disertai cara pembuatan desinfektan',
		harga: '99000',
		jam_awal: new Date(2022, 3, 22),
		jam_akhir: new Date(2022, 3, 30)
	},
	{
		kegiatan_id:3, 
		kegiatan_title: 'Pelatihan tenaga k3 - tingkat muda', 
		kategori_value: 'blended',
		kategori_code: "2",
		photo: require('~/assets/images/samples/Card/3.jpg'),
		kegiatan_desc: 'Rangkaian pelatihan untuk persiapan menjadi tenaga ahli keselamatan dan kesehatan kerja (K3)',
		harga: '399000',
		jam_awal: new Date(2022, 4, 2),
		jam_akhir: new Date(2022, 4, 22)
	},
	{
		kegiatan_id:4, 
		kegiatan_title: 'Pelatihan tes kesehatan1 - tingkat muda', 
		kategori_value: 'blended',
		kategori_code: "2",
		photo: require('~/assets/images/samples/Card/3.jpg'),
		kegiatan_desc: 'Rangkaian pelatihan untuk persiapan menjadi tenaga ahli keselamatan dan kesehatan kerja (K3)',
		harga: '399000',
		jam_awal: new Date(2022, 4, 2),
		jam_akhir: new Date(2022, 4, 22)
	},
	{
		kegiatan_id:5, 
		kegiatan_title: 'Pelatihan tes kesehatan2 - tingkat muda', 
		kategori_value: 'blended',
		kategori_code: "2",
		photo: require('~/assets/images/samples/Card/3.jpg'),
		kegiatan_desc: 'Rangkaian pelatihan untuk persiapan menjadi tenaga ahli keselamatan dan kesehatan kerja (K3)',
		harga: '399000',
		jam_awal: new Date(2022, 4, 2),
		jam_akhir: new Date(2022, 4, 22)
	},
	{
		kegiatan_id:6, 
		kegiatan_title: 'Pelatihan tes kesehatan3 - tingkat muda', 
		kategori_value: 'classical',
		kategori_code: "3",
		photo: require('~/assets/images/samples/Card/3.jpg'),
		kegiatan_desc: 'Rangkaian pelatihan untuk persiapan menjadi tenaga ahli keselamatan dan kesehatan kerja (K3)',
		harga: '399000',
		jam_awal: new Date(2022, 4, 2),
		jam_akhir: new Date(2022, 4, 22)
	}
]

export const SampleNews = [
	{
		id:1,
		foto_url: require('~/assets/images/samples/Card/7.jpg'),
		judul: 'penyerahan sertifikat akreditasi institusi pelatihan',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img src="https://static.republika.co.id/uploads/images/inpicture_slide/penyerahan-sertifikat-dsn-mui-kepada-rsi-sultan-agung-_170924170748-892.jpg" class="img-fluid"><br/><br/>
			Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident,sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://cdn-2.tstatic.net/banjarmasin/foto/bank/images/launching-rsi-sultan-agung-banjarbaru.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://cdn-2.tstatic.net/banjarmasin/foto/bank/images/penandatanganan-prasasti-wakaf-rsi-sultan-agung-banjarbaru.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2016/05/Drg-Ade-Rafiani-MM-kanan-menerima-kenang-kenanganan-dari-RSI-Sultan-Agung.-1024x683.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2019/06/IMG_1029-1024x683.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2015/07/gedung-RSI-Sultan-Agung.jpg">
			`,
		created_at: new Date(2022, 11, 17, 9, 45, 0),
	},
	{
		id:2,
		foto_url: require('~/assets/images/samples/Card/9.jpg'),
		judul: 'sibuk kerja dan cuma geber olahraga sabtu-minggu',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> 
		<img class="img-fluid" src="https://doktersehat.com/wp-content/uploads/2019/11/gerakan-chair-dips-doktersehat.jpg"><br/><br/>
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
		<img class="img-fluid" src="https://cdn-2.tstatic.net/tribunnews/foto/bank/images/ilustrasi-olahraga-treadmill.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
		<img class="img-fluid" src="https://asset.kompas.com/crops/0YwkKcnN9pHIN6GNZ4k3ogttSy4=/0x0:1000x667/750x500/data/photo/2018/11/10/2805725828.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
		<img class="img-fluid" src="https://cdn0-production-images-kly.akamaized.net/hJtb6HLBmv37mzVfZb9mL5TPdPc=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1901737/original/029922600_1518675928-indomie_2_673x373.jpg">
		`,
		created_at: new Date(2022, 11, 17, 8, 0, 0),
	},
	{
		id:3,
		foto_url: require('~/assets/images/samples/Card/8.jpg'),
		judul: 'dua aktivitas fisik ini paling cocok untuk pasien diabetes',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/>
		<img class="img-fluid" src="https://cdn0-production-images-kly.akamaized.net/dND5gd-WywCQly4J8KlSfy8sU48=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1769295/original/030973700_1510633431-Persiapan-Olahraga-untuk-Penderita-Diabetes.jpg"> <br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://image-cdn.medkomtek.com/s0ASHVtf4z4-Is1Cp7nMKwJ3uFs=/673x379/smart/klikdokter-media-buckets/medias/2304579/original/075066600_1553337422-Tips-Latihan-Yoga-untuk-Pemula-By-Pixel-Shot-Shutterstock.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://rsud.kulonprogokab.go.id/files/news/thumb/85ae7fec9194c75e4fef8ba0a65366bf.jpeg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://asset.kompas.com/crops/9RXYE1B6OgCk3Y5-MBBJLLRVlxw=/5x0:1000x663/750x500/data/photo/2017/09/10/3382448217.jpg">
		`,
		created_at: new Date(2022, 11, 17, 9, 23, 0),
	},
	{
		id:4,
		foto_url: require('~/assets/images/samples/Card/7.jpg'),
		judul: 'penyerahan sertifikat akreditasi institusi pelatihan',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://static.republika.co.id/uploads/images/inpicture_slide/penyerahan-sertifikat-dsn-mui-kepada-rsi-sultan-agung-_170924170748-892.jpg"><br/><br/>
			Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident,sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://cdn-2.tstatic.net/banjarmasin/foto/bank/images/launching-rsi-sultan-agung-banjarbaru.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://cdn-2.tstatic.net/banjarmasin/foto/bank/images/penandatanganan-prasasti-wakaf-rsi-sultan-agung-banjarbaru.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2016/05/Drg-Ade-Rafiani-MM-kanan-menerima-kenang-kenanganan-dari-RSI-Sultan-Agung.-1024x683.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2019/06/IMG_1029-1024x683.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2015/07/gedung-RSI-Sultan-Agung.jpg">
			`,
		created_at: new Date(2022, 11, 17, 11, 21, 0),
	},
	{
		id:5,
		foto_url: require('~/assets/images/samples/Card/9.jpg'),
		judul: 'sibuk kerja dan cuma geber olahraga sabtu-minggu',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> 
		<img class="img-fluid" src="https://doktersehat.com/wp-content/uploads/2019/11/gerakan-chair-dips-doktersehat.jpg"><br/><br/>
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
		<img class="img-fluid" src="https://cdn-2.tstatic.net/tribunnews/foto/bank/images/ilustrasi-olahraga-treadmill.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
		<img class="img-fluid" src="https://asset.kompas.com/crops/0YwkKcnN9pHIN6GNZ4k3ogttSy4=/0x0:1000x667/750x500/data/photo/2018/11/10/2805725828.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
		<img class="img-fluid" src="https://cdn0-production-images-kly.akamaized.net/hJtb6HLBmv37mzVfZb9mL5TPdPc=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1901737/original/029922600_1518675928-indomie_2_673x373.jpg">
		`,
		created_at: new Date(2022, 11, 17, 17, 11, 0),
	},
	{
		id:6,
		foto_url: require('~/assets/images/samples/Card/8.jpg'),
		judul: 'dua aktivitas fisik ini paling cocok untuk pasien diabetes',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/>
		<img class="img-fluid" src="https://cdn0-production-images-kly.akamaized.net/dND5gd-WywCQly4J8KlSfy8sU48=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1769295/original/030973700_1510633431-Persiapan-Olahraga-untuk-Penderita-Diabetes.jpg"> <br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://image-cdn.medkomtek.com/s0ASHVtf4z4-Is1Cp7nMKwJ3uFs=/673x379/smart/klikdokter-media-buckets/medias/2304579/original/075066600_1553337422-Tips-Latihan-Yoga-untuk-Pemula-By-Pixel-Shot-Shutterstock.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://rsud.kulonprogokab.go.id/files/news/thumb/85ae7fec9194c75e4fef8ba0a65366bf.jpeg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://asset.kompas.com/crops/9RXYE1B6OgCk3Y5-MBBJLLRVlxw=/5x0:1000x663/750x500/data/photo/2017/09/10/3382448217.jpg">
		`,
		created_at: new Date(2022, 11, 17, 15, 4, 0),
	},
	{
		id:7,
		foto_url: require('~/assets/images/samples/Card/7.jpg'),
		judul: 'penyerahan sertifikat akreditasi institusi pelatihan',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://static.republika.co.id/uploads/images/inpicture_slide/penyerahan-sertifikat-dsn-mui-kepada-rsi-sultan-agung-_170924170748-892.jpg"><br/><br/>
			Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident,sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://cdn-2.tstatic.net/banjarmasin/foto/bank/images/launching-rsi-sultan-agung-banjarbaru.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://cdn-2.tstatic.net/banjarmasin/foto/bank/images/penandatanganan-prasasti-wakaf-rsi-sultan-agung-banjarbaru.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2016/05/Drg-Ade-Rafiani-MM-kanan-menerima-kenang-kenanganan-dari-RSI-Sultan-Agung.-1024x683.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2019/06/IMG_1029-1024x683.jpg"><br/><br/>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
			<img class="img-fluid" src="https://rsisultanagung.co.id/v2015/wp-content/uploads/2015/07/gedung-RSI-Sultan-Agung.jpg">
			`,
		created_at: new Date(2022, 11, 17, 11, 21, 0),
	},
	{
		id:8,
		foto_url: require('~/assets/images/samples/Card/9.jpg'),
		judul: 'sibuk kerja dan cuma geber olahraga sabtu-minggu',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/> 
		<img class="img-fluid" src="https://doktersehat.com/wp-content/uploads/2019/11/gerakan-chair-dips-doktersehat.jpg"><br/><br/>
		Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
		<img class="img-fluid" src="https://cdn-2.tstatic.net/tribunnews/foto/bank/images/ilustrasi-olahraga-treadmill.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
		<img class="img-fluid" src="https://asset.kompas.com/crops/0YwkKcnN9pHIN6GNZ4k3ogttSy4=/0x0:1000x667/750x500/data/photo/2018/11/10/2805725828.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
		<img class="img-fluid" src="https://cdn0-production-images-kly.akamaized.net/hJtb6HLBmv37mzVfZb9mL5TPdPc=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1901737/original/029922600_1518675928-indomie_2_673x373.jpg">
		`,
		created_at: new Date(2022, 11, 17, 17, 11, 0),
	},
	{
		id:9,
		foto_url: require('~/assets/images/samples/Card/8.jpg'),
		judul: 'dua aktivitas fisik ini paling cocok untuk pasien diabetes',
		konten: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/>
		<img class="img-fluid" src="https://cdn0-production-images-kly.akamaized.net/dND5gd-WywCQly4J8KlSfy8sU48=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1769295/original/030973700_1510633431-Persiapan-Olahraga-untuk-Penderita-Diabetes.jpg"> <br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://image-cdn.medkomtek.com/s0ASHVtf4z4-Is1Cp7nMKwJ3uFs=/673x379/smart/klikdokter-media-buckets/medias/2304579/original/075066600_1553337422-Tips-Latihan-Yoga-untuk-Pemula-By-Pixel-Shot-Shutterstock.jpg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://rsud.kulonprogokab.go.id/files/news/thumb/85ae7fec9194c75e4fef8ba0a65366bf.jpeg"><br/><br/>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
		<img class="img-fluid" src="https://asset.kompas.com/crops/9RXYE1B6OgCk3Y5-MBBJLLRVlxw=/5x0:1000x663/750x500/data/photo/2017/09/10/3382448217.jpg">
		`,
		created_at: new Date(2022, 11, 17, 15, 4, 0),
	},
]

export const TestimoniSamples = [
	{
		id:1,
		avatar: require('~/assets/images/samples/Avatar/2.jpg'),
		konsumen: 'Gading Ginanjar',
		profesi: 'Fisioterapis',
		testimoni: 'Pengajar kelas yang saya ikuti dapat menjelaskan materi pembelajaran dengan cara yang menarik dan menyenangkan.'
	},

	{
		id:2,
		avatar: require('~/assets/images/samples/Avatar/1.jpg'),
		konsumen: 'Alyssa Khairunnissa',
		profesi: 'Perawat',
		testimoni: 'Kelas yang saya ikuti menjadi salah satu investasi ilmu yang sangat berharga. Sangat menguntungkan!.'
	},
	{
		id:3,
		avatar: require('~/assets/images/samples/Avatar/2.jpg'),
		konsumen: 'Gading Ginanjar',
		profesi: 'Fisioterapis',
		testimoni: 'Pengajar kelas yang saya ikuti dapat menjelaskan materi pembelajaran dengan cara yang menarik dan menyenangkan.'
	},

	{
		id:4,
		avatar: require('~/assets/images/samples/Avatar/1.jpg'),
		konsumen: 'Alyssa Khairunnissa',
		profesi: 'Perawat',
		testimoni: 'Kelas yang saya ikuti menjadi salah satu investasi ilmu yang sangat berharga. Sangat menguntungkan!.'
	},
	{
		id:5,
		avatar: require('~/assets/images/samples/Avatar/2.jpg'),
		konsumen: 'Gading Ginanjar',
		profesi: 'Fisioterapis',
		testimoni: 'Pengajar kelas yang saya ikuti dapat menjelaskan materi pembelajaran dengan cara yang menarik dan menyenangkan.'
	},

	{
		id:6,
		avatar: require('~/assets/images/samples/Avatar/1.jpg'),
		konsumen: 'Alyssa Khairunnissa',
		profesi: 'Perawat',
		testimoni: 'Kelas yang saya ikuti menjadi salah satu investasi ilmu yang sangat berharga. Sangat menguntungkan!.'
	}
]

export const RSISampleSejarah = ""