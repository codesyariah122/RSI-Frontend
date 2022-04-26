<template>
  <div>
    <mdb-row class="d-flex justify-content-center">
      <div class="col-md-3 col-sm-12 col-6 p-0 float-left mb-3 kontak-footer">
        <h5 class="mb-4 font-weight-bold text-uppercase">Kontak</h5>
        <ul class="list-group">
          <li class="list-group-item bg-transparent border-0 p-0 mb-2">
            <a href="tel:+62246580019">
              Telepon +6224 6580019
            </a>
          </li>
          <li class="list-group-item bg-transparent border-0 p-0 mb-2">
            <a href="">
              Fax +6224 658 1928
            </a>
          </li>
          <li class="list-group-item bg-transparent border-0 p-0 mb-2">
            <a href="tel:+6282111552424">
              Hotline +62821 1155 2424
            </a>
          </li>
          <li class="list-group-item bg-transparent border-0 p-0 mb-2">
            <a href="tel:62246593452">
              IGD +6224 6593452
            </a>
          </li>
          <li class="list-group-item bg-transparent border-0 p-0 mb-2">
            <a href="mailto:rs@rsisultanagung.co.id">
              Email rs@rsisultanagung.co.id
            </a>
          </li>
        </ul>
      </div>

      <div v-if="$device.isDesktop" class="col-md-3 col-sm-6 col-6 p-0 mb-3 float-left"></div>

      <div class="col-md-3 col-sm-12 col-6 p-0 mb-3 float-left social-media">
        <h5 class="mb-4 font-weight-bold text-uppercase">Social Media</h5>
        <ul class="list-group">
          <li class="list-group-item bg-transparent border-0 p-0 mb-3">
            <a href="https://id-id.facebook.com/www.rsisultanagung.co.id/">
             <img :src="require('~/assets/icons/socials/facebook.svg')"> RSI Sultan Agung
            </a>
          </li>
          <li class="list-group-item bg-transparent border-0 p-0 mb-3">
            <a href="https://twitter.com/rsisultanagung">
              <img :src="require('~/assets/icons/socials/twitter.svg')"> @rsisultanagung
            </a>
          </li>
          <li class="list-group-item bg-transparent border-0 p-0 mb-3">
            <a href="https://www.instagram.com/rsi.sultanagung/?hl=id">
              <img :src="require('~/assets/icons/socials/instagram.svg')"> rsi.sultanagung
            </a>
          </li>
        </ul>
      </div>

      <div class="col-md-4 col-sm-12 col-6 mb-3 p-0 float-right link-menu">
        <h5 class="mb-4 font-weight-bold text-uppercase">Menu</h5>
        <div class="row">
          <div class="col-sm-3">
            <ul class="list-group">
              <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                <a href="/"></i>
                  Home
                </a>
              </li>
              <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                <a href="/events"></i> 
                  Katalog Kelas
                </a>
              </li>
              <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                <a href="/auth/login"></i> 
                  Daftar
                </a>
              </li>
            </ul>
          </div>
          <div :class="`col-sm-3 ${$device.isDesktop ? 'ml-5' : ''}`">
            <ul class="list-group">
               <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                <a href="/auth/login"></i>
                  Login
                </a>
              </li>
              <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                <a href="/rsi/berita"></i> 
                  Berita
                </a>
              </li>
              <li class="list-group-item bg-transparent border-0 p-0 mb-2">
                <a href="/rsi/testimoni"></i> 
                  Testimoni
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-sm-12">
            <ul class="list-group">
             <li class="list-group-item bg-transparent border-0 p-0 mb-2">
              <a href="/auth/login"></i>
                  Situs Resmi RSI Sultan Agung <mdb-icon icon="external-link-alt" size="sm" />
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </mdb-row>
  </div>
</template>
