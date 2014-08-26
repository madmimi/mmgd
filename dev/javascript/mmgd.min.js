document.documentElement.setAttribute('data-ua', navigator.userAgent);

$(document).ready(function() {

  var SECTION_HEIGHT    = 1800,
      OFFSET_TOP        = 520,
      END_OFFSET        = 22500,
      DEFAULT_SPEED     = 500,
      BACK_TO_TOP_SPEED = 3000,
      PLAY_SPEED        = 40000;

  var firstSection  = $('body section:first-of-type'),
      downLink      = $('a.chevron_down'),
      playLink      = $('a#play'),
      pauseLink     = $('a#pause'),
      stopLink      = $('a#stop'),
      backTopLink   = $('a#backTop');

  var getCurrentPosition = function() {
    return Math.floor($(window).scrollTop() / SECTION_HEIGHT) * SECTION_HEIGHT;
  };

  var scrollTo = function(top) {
    window.skrollr.animateTo(
      top > 0 ? top + OFFSET_TOP : 0,
      {
        duration: DEFAULT_SPEED,
        easing: "swing"
      }
    );
  };

  var playToEnd = function() {
    var currentScroll = window.skrollr.getScrollTop(),
        maxScroll     = window.skrollr.getMaxScrollTop();
    window.skrollr.animateTo(
      END_OFFSET,
      {
        duration: PLAY_SPEED * ((maxScroll - currentScroll) / maxScroll),
        easing: "linear"
      }
    );
  };

  var backToTop = function() {
    window.skrollr.animateTo(
      0,
      {
        duration: BACK_TO_TOP_SPEED,
        easing: "linear"
      }
    );
  };

  var stopScrolling = function() {
    window.skrollr.stopAnimateTo();
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
      case 37: // left
      case 38: // up
        scrollToPrevSection();
        break;

      case 39: // right
      case 40: // down
        scrollToNextSection();
        break;

      default:
        return; // exit this handler for other keys
    }

    e.preventDefault();
  });

  pauseLink.hide();
  backTopLink.hide();

  playLink.click(function (e) {
    e.preventDefault();
    playToEnd();
    $(this).hide();
    pauseLink.show();
  });

  pauseLink.click(function (e) {
    e.preventDefault();
    stopScrolling();
    $(this).hide();
    backTopLink.show();
    playLink.show();
  });

  backTopLink.click(function (e) {
    e.preventDefault();
    backToTop();
    $(this).hide();
    playLink.show();
  });

}); // end document.ready

// Init Skrollr
window.skrollr = skrollr.init({
  render: function(data) {
    //Debugging - Log the current scroll position.
    // console.log(data.curTop);
  }
});
