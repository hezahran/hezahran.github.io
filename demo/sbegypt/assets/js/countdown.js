(function ($) {
    var settings;
    var timer;

    var circleSeconds;
    var circleMinutes;
    var circleHours;
    var circleDays;

    var layerSeconds;
    var layerMinutes;
    var layerHours;
    var layerDays;

    var element;

    $(window).load(updateCircles);
    $(window).on("redraw",function(){ switched=false; updateCircles(); }); // An event to listen for
    $(window).on("resize", updateCircles);

    $.fn.countdown = function(options) {
        element = $(this);

        var defaults = $.extend({
            start: new Date().getTime()/1000, 
            end: '1388041200', 
            now: new Date().getTime()/1000, 
            selectors: {
                value_seconds: '.clock_seconds .val',
                canvas_seconds: 'canvas_seconds',
                value_minutes: '.clock_minutes .val',
                canvas_minutes: 'canvas_minutes',
                value_hours: '.clock_hours .val',
                canvas_hours: 'canvas_hours',
                value_days: '.clock_days .val',
                canvas_days: 'canvas_days'
            },
            seconds: {
                borderColor: '#93ff93',
                borderWidth: '5'
            },
            minutes: {
                borderColor: '#fbde69',
                borderWidth: '5'
            },
            hours: {
                borderColor: '#c0fbff',
                borderWidth: '5'
            },
            days: {
                borderColor: '#ff8d72',
                borderWidth: '5'
            }
        }, options);

        settings = $.extend({}, defaults, options);

        dispatchTimer();

        if (!$.support.leadingWhitespace) {
            ie8();
        } else {        
            prepareCounters();
            startCounters();                        
        }
    };

    function ie8() {
        var interval = setInterval(function(){
            $(settings.selectors.value_days).html(timer.days);
            $(settings.selectors.value_hours).html(24 - timer.hours);
            $(settings.selectors.value_minutes).html(60 - timer.minutes);
            $(settings.selectors.value_seconds).html(60 - timer.seconds);

            if (timer.seconds > 59 ) {
                if (60 - timer.minutes == 0 && 24 - timer.hours == 0 && timer.days == 0) {
                    clearInterval(interval);

                    $('.clock-item', element).hide();
                    $('.clock-close').hide();
                    $('.clock-done').fadeIn();
                }
                timer.seconds = 1;

                if (timer.minutes > 59) {
                    timer.minutes = 1;
                    layerMinutes.draw();
                    if (timer.hours > 23) {
                        timer.hours = 1;
                        if (timer.days > 0) {
                            timer.days--;
                            $(settings.selectors.value_days).html(timer.days);
                        }
                    } else {
                        timer.hours++;
                    }
                    $(settings.selectors.value_hours).html(24 - timer.hours);
                } else {
                    timer.minutes++;
                }
                $(settings.selectors.value_minutes).html(60 - timer.minutes);
            } else {
                timer.seconds++;
            }
            $(settings.selectors.value_seconds).html(60 - timer.seconds);
        }, 1000);
    }

    function updateCircles() {        
        layerSeconds.draw();
        layerMinutes.draw();
        layerHours.draw();
        layerDays.draw();
    }

    function convertToDeg(degree) {
        return (Math.PI/180)*degree - (Math.PI/180)*90
    }

    function dispatchTimer() {
        timer = {
            total: Math.floor((settings.end - settings.start) / 86400),
            days: Math.floor((settings.end - settings.now ) / 86400),
            hours: 24 - Math.floor(((settings.end - settings.now) % 86400) / 3600),
            minutes: 60 - Math.floor((((settings.end - settings.now) % 86400) % 3600) / 60),
            seconds: 60 - Math.floor((((settings.end - settings.now) % 86400) % 3600) % 60 )
        }
    }

    function prepareCounters() {
        // Seconds
        var secondsStage = new Kinetic.Stage({
            container: settings.selectors.canvas_seconds,
            width: 220,
            height: 220
        });        

        circleSeconds = new Kinetic.Shape({
            drawFunc: function(canvas) {                     
                var radius = $('#' + settings.selectors.canvas_seconds).width()/2 - settings.seconds.borderWidth/2;
                var x = $('#' + settings.selectors.canvas_seconds).width()/2;
                var y = $('#' + settings.selectors.canvas_seconds).height()/2;                
                var ctxSeconds = canvas.getContext();

                ctxSeconds.beginPath();
                ctxSeconds.arc(x, y, radius, convertToDeg(0), convertToDeg(timer.seconds * 6));
                canvas.stroke(this);
                $(settings.selectors.value_seconds).html(60 - timer.seconds);
            },
            stroke: settings.seconds.borderColor,
            strokeWidth: settings.seconds.borderWidth
        });

        layerSeconds = new Kinetic.Layer();
        layerSeconds.add(circleSeconds);
        secondsStage.add(layerSeconds);

        // Minutes
        var minutesStage = new Kinetic.Stage({
            container: settings.selectors.canvas_minutes,
            width: 220,
            height: 220
        });

        circleMinutes = new Kinetic.Shape({
            drawFunc: function(canvas) {     
                var radius = $('#' + settings.selectors.canvas_minutes).width()/2 - settings.minutes.borderWidth/2;
                var x = $('#' + settings.selectors.canvas_minutes).width()/2;
                var y = $('#' + settings.selectors.canvas_minutes).height()/2;

                var ctx = canvas.getContext();
                ctx.beginPath();
                ctx.arc(x, y, radius, convertToDeg(0), convertToDeg(timer.minutes * 6));
                canvas.stroke(this);
                $(settings.selectors.value_minutes).html(60 - timer.minutes);

            },
            stroke: settings.minutes.borderColor,
            strokeWidth: settings.minutes.borderWidth
        });

        layerMinutes = new Kinetic.Layer();
        layerMinutes.add(circleMinutes);
        minutesStage.add(layerMinutes);

        // Hours
        var hoursStage = new Kinetic.Stage({
            container: settings.selectors.canvas_hours,
            width: 220,
            height: 220
        });

        circleHours = new Kinetic.Shape({
            drawFunc: function(canvas) {
                var radius = $('#' + settings.selectors.canvas_hours).width()/2 - settings.hours.borderWidth/2;
                var x = $('#' + settings.selectors.canvas_hours).width()/2;
                var y = $('#' + settings.selectors.canvas_hours).height()/2;

                var ctx = canvas.getContext();
                ctx.beginPath();
                ctx.arc(x, y, radius, convertToDeg(0), convertToDeg(timer.hours * 15));
                canvas.stroke(this);
                $(settings.selectors.value_hours).html(24 - timer.hours);

            },
            stroke: settings.hours.borderColor,
            strokeWidth: settings.hours.borderWidth
        });

        layerHours = new Kinetic.Layer();
        layerHours.add(circleHours);
        hoursStage.add(layerHours);

        // Days
        var daysStage = new Kinetic.Stage({
            container: settings.selectors.canvas_days,
            width: 220,
            height: 220
        });

        circleDays = new Kinetic.Shape({
            drawFunc: function(canvas) {
                var radius = $('#' + settings.selectors.canvas_days).width()/2 - settings.days.borderWidth/2;
                var x = $('#' + settings.selectors.canvas_days).width()/2;
                var y = $('#' + settings.selectors.canvas_days).height()/2;
                var ctx = canvas.getContext();

                ctx.beginPath();
                ctx.arc(x, y, radius, convertToDeg(0), convertToDeg((360 / timer.total) * (timer.total - timer.days)));
                canvas.stroke(this);
                $(settings.selectors.value_days).html(timer.days);

            },
            stroke: settings.days.borderColor,
            strokeWidth: settings.days.borderWidth
        });

        layerDays = new Kinetic.Layer();
        layerDays.add(circleDays);
        daysStage.add(layerDays);
    }

    function startCounters() {
        var interval = setInterval(function(){
            if (timer.seconds > 59 ) {
                if (60 - timer.minutes == 0 && 24 - timer.hours == 0 && timer.days == 0) {
                    clearInterval(interval);

                    $('.clock-item', element).hide();
                    $('.clock-close').hide();
                    $('.clock-done').fadeIn();
                }
                timer.seconds = 1;

                if (timer.minutes > 59) {
                    timer.minutes = 1;
                    layerMinutes.draw();
                    if (timer.hours > 23) {
                        timer.hours = 1;
                        if (timer.days > 0) {
                            timer.days--;
                            layerDays.draw();
                        }
                    } else {
                        timer.hours++;
                    }
                    layerHours.draw()
                } else {
                    timer.minutes++;
                }
                layerMinutes.draw();
            } else {
                timer.seconds++;
            }
            layerSeconds.draw();
        }, 1000);
    }
})(jQuery);
