<template>
  <footer class="footer mt-5">
    <div class="container text-center py-5">
      <small class="copyright"
        >Template Copyright &copy;
        <a href="https://rsisultanagung.halomedika.com/" target="_blank"
          >RSI Sultan Agung</a
        ></small
      >
      <ul class="social-list list-unstyled pt-4 mb-0">
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-github fa-fw"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-twitter fa-fw"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-slack fa-fw"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-product-hunt fa-fw"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-facebook-f fa-fw"></i></a>
        </li>
        <li class="list-inline-item">
          <a href="#"><i class="fab fa-instagram fa-fw"></i></a>
        </li>
      </ul>
      <!--//social-list-->
    </div>
  </footer>
</template>

<style lang="scss">
.copyright {
  a {
    color: $color-primary;
  }
}
.social-list {
  a {
    // background-color: $bg-primary!important;
    color: $color-primary !important;
    transition: background-color 0.3s;
    &:hover {
      // background-color: $scroll-bar-bg;
      color: $color-secondary !important;
      transition: background-color 0.3s;
    }
  }
}
</style>
