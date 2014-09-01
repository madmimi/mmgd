(function() {
  document.documentElement.setAttribute('data-ua', navigator.userAgent);

  var SECTION_HEIGHT    = 1800,
      OFFSET_TOP        = 520,
      DEFAULT_SPEED     = 500,
      BACK_TO_TOP_SPEED = 3000,
      PLAY_SPEED        = 58000;

  var firstSection  = $('body section:first-of-type'),
      downLink      = $('a.chevron_down'),
      playLink      = $('a#play'),
      pauseLink     = $('a#pause'),
      backTopLink   = $('a#backTop');

  var isPlaying = false;

  var getCurrentPosition = function() {
    return Math.floor(window.skrollr.getScrollTop() / SECTION_HEIGHT) * SECTION_HEIGHT;
  };

  var scrollSpeedMultiplicator = function() {
    var maxScroll = window.skrollr.getMaxScrollTop();
    return ((maxScroll - window.skrollr.getScrollTop()) / maxScroll);
  };

  var scrollTo = function(top) {
    window.skrollr.animateTo(
      top > 0 ? top + OFFSET_TOP : 0,
      {
        duration: DEFAULT_SPEED,
        easing: "linear"
      }
    );
  };

  var playToEnd = function() {
    window.skrollr.animateTo(
      window.skrollr.getMaxScrollTop(),
      {
        duration: PLAY_SPEED * scrollSpeedMultiplicator(),
        easing: "linear"
      }
    );
  };

  var backToTop = function() {
    window.skrollr.animateTo(
      0,
      {
        duration: BACK_TO_TOP_SPEED * scrollSpeedMultiplicator(),
        easing: "linear"
      }
    );
  };

  var togglePlay = function() {
    if (isPlaying) {
      isPlaying = false;
      stopScrolling();
      updateUI();
    } else {
      isPlaying = true;
      playToEnd();
      updateUI();
    }
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

  var updateUI = function(data) {
    if (!data) {
      data = {
        curTop: window.skrollr.getScrollTop(),
        maxTop: window.skrollr.getMaxScrollTop()
      };
    }

    if (data.curTop < data.maxTop) {
      if (isPlaying) {
        playLink.hide();
        pauseLink.show();
        backTopLink.hide();
      } else {
        playLink.show();
        pauseLink.hide();

        if (data.curTop > OFFSET_TOP) {
          backTopLink.show();
        } else {
          backTopLink.hide();
        }
      }
    } else {
      isPlaying = false;
      backTopLink.show();
      playLink.hide();
      pauseLink.hide();
    }
  };

  $(document).ready(function() {

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

        case 32:
          togglePlay();
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
      isPlaying = true;
      playToEnd();
      updateUI();
    });

    pauseLink.click(function (e) {
      e.preventDefault();
      isPlaying = false;
      stopScrolling();
      updateUI();
    });

    backTopLink.click(function (e) {
      e.preventDefault();
      isPlaying = false;
      backToTop();
      updateUI();
    });

  }); // end document.ready

  // Init Skrollr
  window.skrollr = skrollr.init({
    render: function(data) {
      //Debugging - Log the current scroll position.
      // console.log(data.curTop);

      updateUI(data);
    }
  });
})();
