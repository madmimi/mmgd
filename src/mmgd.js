document.documentElement.setAttribute('data-ua', navigator.userAgent);

$(document).ready(function() {

  var firstSection = $('body section:first-of-type'),
      downLink = $('a.chevron_down');

  function setHeight() {
    sectionHeight = firstSection.height();
    console.log(sectionHeight);
  }

  setHeight();

  var resizeTimer;
  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setHeight, 500);
  });

  downLink.bind('click', function(e) {
    e.preventDefault();
    var currentPosition = $(window).scrollTop();
    $('html, body').animate({scrollTop : currentPosition + sectionHeight + 20}, 500);
  });



}); // end document.ready



// Init Skrollr
var s = skrollr.init({
  render: function(data) {
    //Debugging - Log the current scroll position.
    // console.log(data.curTop);
  }
});
