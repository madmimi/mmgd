document.documentElement.setAttribute('data-ua', navigator.userAgent);

$(document).ready(function() {

  var firstSection = $('body section:first-of-type'),
      downLink = $('a.chevron_down'),
      sectionHeight = 1800;

  downLink.bind('click', function(e) {
    e.preventDefault();
    var currentPosition = $(window).scrollTop(),
        newPosition = (Math.floor(currentPosition / sectionHeight) * sectionHeight) + sectionHeight;
    $('html, body').animate({scrollTop : newPosition + 520}, 500);
  });



}); // end document.ready



// Init Skrollr
var s = skrollr.init({
  render: function(data) {
    //Debugging - Log the current scroll position.
    console.log(data.curTop);
  }
});
