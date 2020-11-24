$(document).ready(function() {
  $(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $(".pull-right").addClass("test");
    } else {
      $(".pull-right").removeClass("test");
    }
  });
});
