jQuery(document).ready(function ($) {
	circleTh = $(".step-join .wrap-images-view img");
	circleDefault = $(".step-join .step-1 .wrap-images-view img");
	/**
	 * Carousel
	 * */
	if ($(".primary-carousel").length) {
		$('.primary-carousel').owlCarousel({
			loop: false,
			nav: false,
			dots: false,
			autoplay: false,
			autoplayHoverPause: false,
			navText: ['<span aria-hidden="true" class="arrow_carrot-left"></span>', '<span aria-hidden="true" class="arrow_carrot-right"></span>'],
			responsive: {
				0: {
					items: 1
				},
				480: {
					items: 1
				},
				1020: {
					items: 1
				}
			}
		});
	}

	/***
	* Menu Toggle 
	*/
	$('.wrap-bar').click(function(){
		$('.main-menu').toggleClass("open");
		$(this).toggleClass("active");
		$(".green-bar").toggleClass("active");
	});
	$('body').on('click', '.close-menu', function(e){
		$('.main-menu').removeClass("open");
		return false;
	});
	closeButton = $(".close-popup");
	$('body').on('click', '.mo-sai-sdt', function(e){
		$(".modal").removeClass("show");
		$(".popup-sai-sdt").addClass("show");
		$(".modal-backdrop").addClass("show");
		$("body").addClass("no-scroll");
		return false;
	});
	
	$('body').on('click', '.change-info', function(e){
		$(".modal").removeClass("show");
		$(".modal-backdrop").removeClass("show");
		$("body").removeClass("no-scroll");
	});

	closeButton.click(function (event) {
		$(".modal").removeClass("show");
		$(".modal-backdrop").removeClass("show");
		$("body").removeClass("no-scroll");
	});

	//Logo
	const nav_logo = document.getElementById("nav_logo");

	if(nav_logo){
		addEventListener("scroll", () => {
			nav_logo.classList.toggle("onScroll", window.pageYOffset > 0);
		}, false);
	}
	
});
