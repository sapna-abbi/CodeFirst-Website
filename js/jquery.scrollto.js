/*!
 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
 * Scroll smooth to any element in your DOM.
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (https://www.opensource.org/licenses/mit-license.php).
 * 2013/02/17
 **/
$(document).ready(function(){
    $.scrollTo = $.fn.scrollTo = function(x, y, options){
        if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);
        options = $.extend({}, {
            gap: {
                x: 0,
                y: 0
            },
            animation: {
                easing: 'swing',
                duration: 600,
                complete: $.noop,
                step: $.noop
            }
        }, options);
        return this.each(function(){
            var elem = $(this);
            elem.stop().animate({
                scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
                scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
            }, options.animation);
        });
    };
    var aChildren = $("nav li").children();
    var aArray = [];
    for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    }
    $(window).scroll(function(){
        var windowPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top;
            var divHeight = $(theID).height();
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("name-active");
            } else {
                $("a[href='" + theID + "']").removeClass("name-active");
            }
        }
        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("name-active")) {
                var navActiveCurrent = $(".name-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("name-active");
                $("nav li:last-child a").addClass("name-active");
            }
        }
    });
    $("nav a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash);
    });
});
