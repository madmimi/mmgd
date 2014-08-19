document.documentElement.setAttribute('data-ua', navigator.userAgent);

$(document).ready(function() {

  Modernizr.addTest('backgroundcliptext', function() {
    var div = document.createElement('div');
    div.style.webkitBackgroundClip = "text";
    var text = div.style.cssText.indexOf('text');
    if (text > 0) {
      return true;
    }
    'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g, function(val) {
      if (val + 'BackgroundClip' in div.style) {
        return true;
      }
    });
  });
});

// Init Skrollr
  var s = skrollr.init({
      render: function(data) {
          //Debugging - Log the current scroll position.
          console.log(data.curTop);
      }
  });
