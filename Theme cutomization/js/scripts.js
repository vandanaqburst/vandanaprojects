

jQuery(document).ready(function ($) {

	// Paralax
	if(!Modernizr.touch){ 
		$(window).stellar({
			horizontalScrolling: false,
			verticalOffset: 0,
			horizontalOffset: 0
		});
	};
	

//Read from JSON
	var i;
	var listItems = "";
	$.getJSON('images.json', function(data){
		// data=JSON.parse(data);
		jsonData = data;
		console.log(data);
	    for(i=0; i < data.length; i++){

		listItems=listItems+"<li class='element "+ data[i].class +"'><figure><img src='"+data[i].url+"' alt=''/>"+
	                    "<figcaption><h3><a href='#'>"+data[i].name+"</a></h3>"+
	                    "<footer><div id='nivo-lightbox-demo'><p> <a href='"+ 
	                    data[i].url
	                    +"'' data-lightbox-gallery='gallery1' id='nivo-lightbox-demo'> View</a> </p></div>"+
	                    "<a class='popup-with-zoom-anim  link-gallery' href='#small-dialog2' data-attr-key="+ data[i].id +">Detail</a>"+
	                    "</footer></figcaption></figure></li>";

	    }

	    console.log(listItems);
	    $('#container').html(listItems);




//Initialize again

	    $(function(){
    		
  		//Image gallery initialised again
    		$(document).ready(function(){
		     $('#nivo-lightbox-demo a').nivoLightbox({ effect: 'fade' });
	      	});

    	//Detail box initialised again
			$('.popup-with-zoom-anim').magnificPopup({
				type: 'inline',
				fixedContentPos: false,
				fixedBgPos: true,
				overflowY: 'auto',
				closeBtnInside: true,
				preloader: false,
				midClick: true,
				removalDelay: 300,
				mainClass: 'my-mfp-zoom-in'
			});


    		var $container = $('#container');
    		
		    $container.isotope({
		      itemSelector : '.element',
		      masonry : {
		        columnWidth : 295
		      }
		    });
      
    
      var $optionSets = $('#options .option-set'),
          $optionLinks = $optionSets.find('a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
  
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }
        
        return false;
      });
  });
	});

	$(document).on('click', '.link-gallery', function() { 
		getImageDetails(this); 
	});
});





	// Sticky Nav
	$(".nav_wrapper").sticky({topSpacing:0});
   
	// No SVG Support
    if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function() {
	        return $(this).attr('src').replace('.svg', '.png');
	    });
	}
	
    // Header toggle
    $('.header_toggle').click(function() {
		$('.nav_wrapper').toggleClass( "toggled" );
	});
	
	// Single Page Nav
	$('.nav_wrapper').singlePageNav({
	    offset: ($('.nav_wrapper').outerHeight()+20)
	});
	
	
	
	// Overlay	
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = [37, 38, 39, 40];
	
	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
	      e.preventDefault();
	  e.returnValue = false;  
	}
	
	function keydown(e) {
	    for (var i = keys.length; i--;) {
	        if (e.keyCode === keys[i]) {
	            preventDefault(e);
	            return;
	        }
	    }
	}
	
	function wheel(e) {
	  preventDefault(e);
	}
	
	function disable_scroll() {
	  if (window.addEventListener) {
	      window.addEventListener('DOMMouseScroll', wheel, false);
	  }
	  window.onmousewheel = document.onmousewheel = wheel;
	  document.onkeydown = keydown;
	}
	
	function enable_scroll() {
	    if (window.removeEventListener) {
	        window.removeEventListener('DOMMouseScroll', wheel, false);
	    }
	    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
	}
	
    $('.services_list li').click(function(event){
    	var $this = $(this).children('.bg');
        event.preventDefault(); // disable normal link function so that it doesn't refresh the page
        $this.show(); //display your popup
        
        if( $(window).width() < 500 ) {
	        $('.nav_wrapper').css("z-index", 0);
        }
        
        disable_scroll();
        
    });

    // hide popup when user clicks on close button
    $('.close_link').click(function(){
    	$('.bg').hide(); // hide the overlay
        
        if( $(window).width() < 500 ) {
	        $('.nav_wrapper').css("z-index", 100);
        }
        
        enable_scroll();
    });

    // hides the popup if user clicks anywhere outside the container
    $('.bg').click(function(){
    	$('.bg').hide();
        
        if( $(window).width() < 500 ) {
	        $('.nav_wrapper').css("z-index", 100);
        }
        
        enable_scroll();
    })
    // prevents the overlay from closing if user clicks inside the popup overlay
    $('.content_container').click(function(){
		return false;
	});

function getImageDetails(elem) {

	var id = $(elem).attr('data-attr-key');
	for( var i = 0; i < jsonData.length; i++ ) {
		if(jsonData[i].id === id) {
			$('.sticky-col p').text(jsonData[i].details);
			$('.sticky-col h3').text(jsonData[i].name);
			return;
		}
	}
}
