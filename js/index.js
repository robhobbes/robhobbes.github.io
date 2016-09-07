if (window.location.protocol != 'https:') {
  window.location.href = window.location.href.replace(window.location.protocol, 'https:');
}

$(document).ready(function(){
	var animationSpeed = 750,
		clock;

	$('.nav-button').click(openNav);
	$('.close-button-wrapper').click(closeNav);

	$(window).resize(function(){
		if($('.main-header').hasClass('selected')){
			positionNavWrapper();
		}
		positionCloudsWrapper();
	});

	$('.scroll-element').on('click',function(evt){
		if(evt){
			evt.preventDefault();
			evt.stopPropagation();
		}

		var target = evt ? evt.target : window.event.srcElement,
			href = $(target).attr('href').substring(1),
			scrollTo = href == 'aboutme' ? 0 : $('.main-content .'+href).offset().top,
			difference = Math.abs(scrollTo - $(window).scrollTop());
			time = Math.max(200 * (parseInt(difference/100)),200);

		$('.close-button-wrapper').trigger('click');

		$('html,body').animate({scrollTop: scrollTo},time);
	});

	function openNav(){
		$('.main-header').addClass('selected');
		$('.nav-content').fadeIn(animationSpeed);
		$('.nav-button').fadeOut(animationSpeed);
		positionNavWrapper();
	}

	function closeNav(){
		var $el = $('.nav-wrapper');

		$el.css('top','').css('left','');
		$('.main-header').removeClass('selected');
		$('.nav-content').fadeOut(animationSpeed);
		$('.nav-button').fadeIn(animationSpeed);
	}

	function positionNavWrapper(){
		var $el = $('.nav-wrapper'),
			height = Math.min($('.main-wrapper').height(),window.innerHeight),
			top,left;

		top = height/2 - $el.height()/2;
		left = $('.main-wrapper').width()/2 - $el.width()/2;
		$el.css('left',left).css('top',top);
	}

	for(var i=1;i<20;i++){
		setTimeout(positionCloudsWrapper,i*100);
	}

	function positionCloudsWrapper(){
		$('.clouds-wrapper').height($('.main-wrapper').height());
	}

	$("pre.js").snippet(
	  "javascript",
	  {
	    style: "typical_custom",
	    transparent: true
	  }
	);

	clock = new WordClock('.clock');
	clock.start();
});
