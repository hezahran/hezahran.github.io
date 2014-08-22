//  ----------------------------------------------------------
//  HE Zahran JS functions v1.0
//  ----------------------------------------------------------
//  Copyright (c) 2014, HEZahran.com. All rights reserved.
//  Coded and Authored with all the love in the world.
//  Coder: Hashem Zahran @antikano || @hezahran
//  ----------------------------------------------------------

//  ----------------------------------------------------------
//  parallax background
//  ----------------------------------------------------------
$.stellar({
  horizontalScrolling: false
});

//  ----------------------------------------------------------
//  smooth scolling 
//  ----------------------------------------------------------
$('#main-navbar').singlePageNav({
  offset: $('#main-navbar').outerHeight(),
  updateHash: true,
});
$('.more-info').singlePageNav({
  offset: $('#main-navbar').outerHeight(),
  updateHash: true,
});

//  ----------------------------------------------------------
//  portfolio filters
//  ----------------------------------------------------------
$('#portfolio-grid').mixItUp({
  animation: {
    duration: 1000,
    effects: 'fade scale(0.01) stagger(102ms)',
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
  }
});

//  ----------------------------------------------------------
//  contact form validation
//  ----------------------------------------------------------
$(function() {
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {},
    submitSuccess: function($form, event) {
      event.preventDefault();
      var name = $("input#name").val();
      var email = $("input#email").val();
      var message = $("textarea#message").val();
      var firstName = name;
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $.ajax({
        url: "http://c7l.me/hezahran/contact.php",
        type: "POST",
        data: {name: name, email: email, message: message},
        cache: false,
        success: function() {
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append( "</button>");
          $('#success > .alert-success').append("<strong>Thanks "+firstName+", Your message has been sent. I will get back to you as soon as possible. </strong>");
          $('#success > .alert-success').append('</div>');
          $('#contactForm').trigger("reset");
        },
        error: function() {
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append( "</button>");
          $('#success > .alert-danger').append("<strong>Sorry "+firstName+", it seems that my mail server is not responding...</strong> Could you please email me directly to <a href='mailto:sayhi@hezahran.com?Subject=Message_Me from hezahran.com'>sayhi@hezahran.com</a>? Sorry for the inconvenience!");
          $('#success > .alert-danger').append('</div>');
          $('#contactForm').trigger("reset");
        },
      })
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });
  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});
$('#name').focus(function() {
  $('#success').html('');
});

//  ----------------------------------------------------------
//  google maps
//  ----------------------------------------------------------
function initialize() {
  var myLatlng = new google.maps.LatLng(31.2647696,29.9945858);
  var mapOptions = {
    zoom: 16,
    center: myLatlng,
    scrollwheel: false
  }
  var map = new google.maps.Map(document.getElementById('site-map'), mapOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Hello World!'
  });
}
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' + 'callback=initialize';
  document.body.appendChild(script);
}
window.onload = loadScript;