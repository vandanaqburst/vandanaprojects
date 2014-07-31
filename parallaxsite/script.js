// parallax
$(document).ready(function() {

	$('section[data-type="background"]').each(function() {
		var $bgObj = $(this);
		$(window).scroll(function() {
      var yPos = -($(window).scrollTop()/$bgObj.data('speed'));
			var coords = '50%'+yPos+'px';
			console.log("yPos--",yPos,"   coords--",coords);
			$bgObj.css({backgroundPosition: coords});
		});
	});

});

// Content change
$(document).ready(function () {
    var allBoxes = $("div.boxes").children("div");
    transitionBox(null, allBoxes.first());
});

function transitionBox(from, to) {
    function next() {
        var nextTo;
        if (to.is(":last-child")) {
            nextTo = to.closest(".boxes").children("div").first();
        } else {
            nextTo = to.next();
        }
        to.fadeIn(500, function () {
            setTimeout(function () {
                transitionBox(to, nextTo);
            }, 5000);
        });
    }

    if (from) {
        from.fadeOut(500, next);
    } else {
        next();
    }
}

//Menu fade
$(window).scroll(function(){
			 
if ($(this).scrollTop() > 600) {
	$('#fadeMenu').slideDown();
	}
	else {
	$('#fadeMenu').slideUp();
}
			 
});

//Scroller
    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 750);
            return false;
          }
        }
      });
    });