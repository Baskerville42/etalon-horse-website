// Add Open Sans font
window.onload = function () {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i&amp;subset=cyrillic-ext';
	document.head.appendChild(link);
};

// Init Map
function initMap() {
	var club = {lat: 50.321178, lng: 30.306885};
	var container = document.getElementById('map');
	var map = new google.maps.Map(container, {
		zoom: parseInt(container.getAttribute('data-zoom')) || 13,
		center: club,
		disableDefaultUI: true,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		mapTypeControl: true,
		scaleControl: false,
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		rotateControl: true,
		fullscreenControl: false,
		scrollwheel: false,
	});
	var markerImage = '/images/contacts-map-marker.png';
	var marker = new google.maps.Marker({
		position: club,
		map: map,
		icon: markerImage
	});
	map.panBy( window.innerWidth / 4, 25);
}

// Init Main Slider
var topSlider = new Swiper('.top-slider.swiper-container', {
	speed: 400,
	spaceBetween: 0,
	nextButton: '.top-slider .slider-button-next',
	prevButton: '.top-slider .slider-button-prev',
	loop: true,
	effect: 'fade'
});

// Init services slider
var servicesSlider = new Swiper('.services-slider.swiper-container', {
	speed: 400,
	spaceBetween: 29,
	nextButton: '.services-slider .slider-button-next',
	prevButton: '.services-slider .slider-button-prev',
	loop: true,
	slidesPerView: 3,
	setWrapperSize: true,
	width: 960
});

// Init page slider
var pageSlider = new Swiper('.page-slider.swiper-container', {
	speed: 400,
	spaceBetween: 0,
	nextButton: '.page-slider .slider-button-next',
	prevButton: '.page-slider .slider-button-prev',
	loop: true,
	slidesPerView: 1,
	setWrapperSize: true,
	effect: 'fade'
});
