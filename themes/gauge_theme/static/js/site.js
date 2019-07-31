"use strict";
$(document).ready(function() {
    windowH();
    setGithubStar();
    copyCode($('.code-box'));
    getLocationhash();
    videoContentChange();
    videoEndchange();

    $('.tab_item').click(function(e) {
        e.preventDefault();
        var id = $(this).attr('data-attr');
        id = ('#' + id);
        $(this).parent().find('.active-tab').removeClass('active-tab');
        $(this).parent().parent().find('.tab-content-container').find('.tab-content').removeClass('active')
        $(this).addClass('active-tab');
        $(this).parent().parent().find('.tab-content-container').find(id).addClass('active');
    });


    // get started
    $('.tab-nav_item').click(function(e) {
        e.preventDefault();
        var id = $(this).attr('data-attr');
        id = ('#' + id);
        $('.tab-nav_item').removeClass('active-tab');
        $('.content-container > .tab-content').removeClass('active')
        $(this).addClass('active-tab');
        $(id).addClass('active');
        history.pushState({ urlPath: window.location.pathname }, "", id)
    });

    $('.mobile-heading').click(function(e) {
        e.preventDefault();
        var id = $(this).attr('data-attr');
        id = ('#' + id);
        $(this).toggleClass('open');

        var icon = $(this).find('.expander')

        if (icon.hasClass('arrow-active') == true) {
            icon.removeClass('arrow-active').addClass('arrow')
        } else {
            icon.removeClass('arrow').addClass('arrow-active')
        }

        $(id).toggleClass('active');
    });


    // mobile nav button

    $('.navbtn').on('click', function() {
        $('.bar').toggleClass('animate');
        // $('body').toggleClass('noscroll');
        // $('.top').toggleClass('open');
        // $('.nav').slideToggle();
        $('.left-sidebar-container nav').toggleClass('open');
        
    });

    //sticky header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 20) {
            $('.top').addClass('sticky');
        } else {
            $('.top').removeClass('sticky');
        }
    });

    // Github star count
    function gitHubStars() {
        $.ajax({
            url: "https://api.github.com/repos/getgauge/gauge",
            success: function(data) {
                if (data['stargazers_count'] != undefined) {
                    window.localStorage.setItem('star', data['stargazers_count'])
                }
            }
        })
    }

    function setGithubStar() {
        gitHubStars();
        var star = window.localStorage.getItem('star')
        $('.github_star').text(star);
    }

    $(".gdpr-cookie-banner .close").click(function() {
        document.cookie = "cookie-consent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        $(".gdpr-cookie-banner").hide();
    });

    if (document.cookie.indexOf("cookie-consent=true") >= 0) {
        $(".gdpr-cookie-banner").hide();
    }

    if ($(".tab-nav-get_started").length) {
        var packageName = determinePackageNameBasedOnOS();
        $(".tab-nav-get_started li.tab-nav_item[data-attr='" + packageName + "']").click();
    }

    if ($(".tab-nav").length) {
        var tab = window.location.hash.substr(1);
        var target = $(".tab-nav li[data-attr='" + tab + "'");
        if (target && target.length) {
            target.click();
        }
    }
    $('.hgt-menu-item').click(function() {
        var sectionId = $(this).attr('href');
        $('body,html').animate({
            scrollTop: $(sectionId).offset().top - 100
        }, 500);
    });

    $('.cntl-txt').click(function() {
        var id = $(this).attr('href');
        $('.sidebar-content').removeClass('active-content');
        $(id).addClass('active-content');
        $('.sidebar_item').removeClass('active_item');
        $('.sidebar_get-started').find(`[data-attr="${id}"]`).addClass('active_item');

        $('body, html').animate({
            scrollTop: 0
        }, 500);
    });

    $(document).ready(function() {
        $(".main-table").clone(true).appendTo('#table-scroll').addClass('clone');
    });

});

function copyCode(element) {
    $(element).each(function() {
        $(this).append("<button class='copyBtn'>Copy</button>");
        $(this).append("<input class='codeBox' value='none'> </input>");
        $(this).append('<span class="copied-text">copied</span>');
    });

    $('.copyBtn').click(function() {
        var value = $(this).prev().text();
        var $copied_text = $(this).nextAll('.copied-text');
        codeBox = $(this).next();
        codeBox.val(value);
        codeBox.select();
        document.execCommand('copy');
        $($copied_text).fadeIn();
        setTimeout(function() {
            $($copied_text).fadeOut();
        }, 3000);
    });
}

function getLocationhash() {
    var hash = window.location.hash;
    if (hash != "") {
        $('.sidebar-content').removeClass('active-content');
        $(hash).addClass('active-content');
        $('.sidebar_item').removeClass('active_item');
        $('.sidebar_get-started').find(`[data-attr="${hash}"]`).addClass('active_item');
    }
}

function videoContentChange() {
    $('.card-nav_item').click(function() {
        var videoId = '#' + $(this).attr('data-attr');
        $('.card').removeClass('active-card');
        $(videoId).addClass('active-card');
        $('.card-nav_item').removeClass('active');
        $(this).addClass('active');
        $(videoId).find('iframe').addClass('iframe-visible');
    });
}
function windowH() {
    var wH = $(window).height();
    $('.docs-container').css({height: wH});
 }

function videoEndchange() {
    var video = $('.video_item');

    video.on('ended', function() {
        let parent = $(this).parent().parent().parent();
        let nextItem = parent.next();
        let videoId = parent.attr('id');
        console.log(videoId);
        let li = $(".card-nav").find(`[data-attr='${videoId}']`);
        console.log(li);
        let nextLi = li.next();
        console.log(nextLi);

        parent.removeClass('active-card');
        li.removeClass('active');
        nextItem.addClass('active-card');
        nextLi.addClass('active');
    });

    var addCssToIframe = function() {
        if ($("iframe").contents().find("head") != undefined) {
            $('iframe')
                .contents()
                .find("head")
                .append(
                    '<link rel="stylesheet" href="/assets/stylesheets/site.css" type="text/css" />');
        }
    };

    setTimeout(addCssToIframe, 500);

}