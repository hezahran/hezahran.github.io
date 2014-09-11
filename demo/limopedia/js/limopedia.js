//
//	Limopedia JS functions v1.0
//	----------------------------------------------------------
//	Copyright (c) 2012, Tabshora.com. All rights reserved.
//	Coded and Authored with all the love in the world.
//  Coder: Hashem Zahran @antikano || @hezahran
//	----------------------------------------------------------
//
$('.feature-block').hover(function(e) {
  $(this).children('.feature-caption').slideToggle()(100);
});
$(window).load(function(){
    $('#thanksModal').modal({
        keyboard: false
    })
});
$('.modalbtn').click(function(e) {
  $('#thanksModal').toggleClass('show');
});
$('.single-page-nav').singlePageNav({offset: $('.single-page-nav').outerHeight(),
	filter: ':not(.external)',
	beforeStart: function() {
		console.log('begin scrolling');
},
	onComplete: function() {
		console.log('done scrolling');
}});

$('.footer-links-navi').singlePageNav({
	offset: $('.single-page-nav').outerHeight(),
	filter: ':not(.external)',
	beforeStart: function() {
		console.log('begin scrolling');
},
	onComplete: function() {
		console.log('done scrolling');
}
});