$(function() {
	// Navigation
	$('.docs-nav>li').click(function() {
		var el = '#' + $(this).attr('href');
		scrollEl(el, 400);
	})

	// scroll fixed nav
	$(window).scroll(function() {
		scroll = $('body').scrollTop();
		height = $('#main-header').height();

		if(scroll > height) {
			$('#main-nav').css('top', scroll-height);
		} else {
			$('#main-nav').css('top', 0);
		}
	})


	// Name section scroll
	$('.name-section').hover(
		function () {
	  		$(this).append($('<div class="before-link"></div>'));
	  		$(this).css('paddingLeft', 50);
		},
		function () {
	  		$(this).find('div:last').remove();
	  		$(this).css('paddingLeft', 0);
		}
	);
	$('.name-section').click(function() {
		scrollEl(this, 400)
	});


	function scrollEl(el, speed) {
		var destination = $(el).offset().top;
	    $('body').animate({ scrollTop: destination }, speed);
	}

})