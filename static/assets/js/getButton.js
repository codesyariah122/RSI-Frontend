var url = 'https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?82740';
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var options = {
  "enabled":true,
  "chatButtonSetting":{
      "backgroundColor":"#4dc247",
      "ctaText":"",
      "borderRadius":"25",
      "marginLeft":"0",
      "marginBottom":"50",
      "marginRight":"50",
      "position":"left"
  },
  "brandSetting":{
      "brandName":"RSI Sultan Agung",
      "brandSubTitle":"RSI Sultan Agung Semarang",
      "brandImg":"https://raw.githubusercontent.com/codesyariah122/RSI-Frontend/main/assets/images/logo/Logo.jpg",
      "welcomeText":"Halo, new member\nada yang bisa kami bantu ?\ncukup kirimkan pesan kepada kami sekarang untuk mendapatkan info lebih lanjut tentang pelatihan tenaga kesehatan RSI Sultan Agung.",
      "messageText":"Halo, Admin RSI ! kami butuh bantuan untuk mengikuti pelatihan RSI Sultan Agung  {{page_link}}",
      "backgroundColor":"#0a5f54",
      "ctaText":"Start Chat",
      "borderRadius":"25",
      "autoShow":false,
      "phoneNumber":"6281284359312"
  }
};
    s.onload = function() {
        CreateWhatsappChatWidget(options);
    };
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);