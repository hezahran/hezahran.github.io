//
//	Limopedia JS functions v1.0
//	----------------------------------------------------------
//	Copyright (c) 2014, VoicedHQ.com. All rights reserved.
//	Coded and Authored with all the love in the world.
//  Coder: Hashem Zahran @antikano || @hezahran
//	----------------------------------------------------------
//


/*global $, jQuery, alert*/
/*jslint browser: true*/
/*jslint node: true */
/*jslint devel: true */
/*jshint strict: true */

$('#navigation-bar').singlePageNav({
	offset: $('#navigation-bar').outerHeight(),
	filter: ':not(.external)',
	beforeStart: function () {
		"use strict";
		console.log('begin scrolling');
	},
	onComplete: function () {
		"use strict";
		console.log('done scrolling');
	}
});
$('.scroll-location').singlePageNav({
	offset: $('#navigation-bar').outerHeight(),
	filter: ':not(.external)',
	beforeStart: function () {
		"use strict";
		console.log('begin scrolling');
	},
	onComplete: function () {
		"use strict";
		console.log('done scrolling');
	}
});