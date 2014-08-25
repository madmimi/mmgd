document.documentElement.setAttribute('data-ua', navigator.userAgent);

$(document).ready(function() {

  var SECTION_HEIGHT = 1800,
      OFFSET_TOP     = 520;

  var firstSection  = $('body section:first-of-type'),
      downLink      = $('a.chevron_down');

  var getCurrentPosition = function() {
    return Math.floor($(window).scrollTop() / SECTION_HEIGHT) * SECTION_HEIGHT;
  };

  var scrollTo = function(top) {
    $('html, body').stop(true).animate({
      scrollTop : top > 0 ? top + OFFSET_TOP : 0
    }, 500, "swing");
  };

  var scrollToPrevSection = function() {
    scrollTo(getCurrentPosition() - SECTION_HEIGHT);
  };

  var scrollToNextSection = function() {
    scrollTo(getCurrentPosition() + SECTION_HEIGHT);
  };

  downLink.bind('click', function(e) {
    e.preventDefault();
    scrollToNextSection();
  });

  $(document).keydown(function(e) {
    switch(e.which) {
      case 38: // up
        scrollToPrevSection();
        break;

      case 40: // down
        scrollToNextSection();
        break;

      default:
        return; // exit this handler for other keys
    }

    e.preventDefault();
  });

}); // end document.ready

// Init Skrollr
var s = skrollr.init({
  render: function(data) {
    //Debugging - Log the current scroll position.
    // console.log(data.curTop);
  }
});
