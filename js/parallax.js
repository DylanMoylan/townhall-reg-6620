'use strict';

var CME = window.CME || {};

CME.townhall = {
    init: function() {
        var self = this
        self.navIndex = 1;
        self.config.setScrolledNav();
        self.registerHeader();
        self.config.programConnector();
        self.partnerRotate();
        self.supportersRotate();
        $(window).on("resize", function() {
            self.config.programConnector();
        });
        $(".register-now, .town-hall__section").addClass("town-hall__section--ready");

    }, // init
    config: {
        navLocation: 80,
        headerNavOffset: $('.town-hall-header').outerHeight(true),
        scrollOffsetPadding: 200,
        getSectionOffset: function(index) {
            if (index == -1) {
                return $(".town-hall-" + $(".town-hall-nav ul li").eq(0).find("a").data("section")).offset().top;
            }
            if (index < $(".town-hall-nav ul li").length) {
                return $(".town-hall-" + $(".town-hall-nav ul li").eq(index).find("a").data("section")).offset().top;
            }
        },
        scrollPage: function(pixels) {
            return $("html, body").animate({
                scrollTop: pixels
            });
        },
        doRotate: function(container, elms, showClass) {
            var speed = ($(container).data("speed") * 1000),
                rotateImgs,
                rotateIndex = 0;

            elms.eq(0).addClass(showClass);
            rotateImgs = setInterval(function() {
                $(elms).removeClass(showClass);
                if (rotateIndex >= ($(elms).length - 1)) {
                    rotateIndex = 0;
                } else {
                    rotateIndex++;
                }
                $(elms).eq(rotateIndex).addClass(showClass);
            }, speed);
        },
        programConnector: function() {
            $(".program-timeline:first-child .program-timebar").height($(".program-timeline-wrap").height() - $(".program-timeline:last-child").outerHeight()).css({
                opacity: 1,
                visibility: 'visible'
            });
        },
        setScrolledNav: function() {
            var screenDir = window.pageYOffset || document.documentElement.scrollTop,
                sectionsBelow = [],
                sectionClass = null,
                self = this;

            $(".town-hall-nav ul li").each(function(a, b) {
                var self = this,
                    navAnchor = $(this).find("a"),
                    sectionLoc = $(".town-hall-" + $(navAnchor).data("section")).offset().top;

                $(this).removeClass("current");

                if (screenDir >= sectionLoc) {
                    sectionsBelow.push(a);
                }
            });

            if (sectionsBelow[0] > 0 && sectionsBelow.length < $(".town-hall-nav ul li").length) {
                self.navIndex = sectionsBelow[0];
            } else if (sectionsBelow.length == $(".town-hall-nav ul li").length) {
                self.navIndex = sectionsBelow[($(".town-hall-nav ul li").length - 1)];
            } else if (sectionsBelow.length > 0) {
                self.navIndex = sectionsBelow[sectionsBelow.length - 1];
            } else {
                self.navIndex = ($(".town-hall-nav ul li").length - 1);
            }
        },
    }, // configtooltip
    registerHeader: function() {
        var self = this,
            lastScrollTop = 0,
            offDiff = 0, bgMove=1,
            navLength = $(".town-hall-nav ul li").length;
        $(window).on('scroll load', function() {
            var navOffset,
                documentScrollTop = $(document).scrollTop();
                
                if(documentScrollTop < 160){
                    bgMove = (documentScrollTop * 0.7);
                }
                var coords = '50% '+ bgMove + 'px';
            $(".town-hall-hero-content-bg").css({
                 backgroundPosition: coords, 
                "backgroundAttachment": "initial !important"
            })
            navOffset = self.config.headerNavOffset + self.config.scrollOffsetPadding;
            var screenDir = window.pageYOffset || document.documentElement.scrollTop;
            if (screenDir > lastScrollTop) {
                // downscroll code
                switch (self.navIndex) {
                    case -1:
                        offDiff = (self.config.getSectionOffset(self.navIndex) - 200);
                        break;
                    case 3:
                        offDiff = (self.config.getSectionOffset(self.navIndex) - 420);
                        break;
                    case 4:
                        offDiff = (self.config.getSectionOffset(self.navIndex) - 520);
                        break;
                    default:
                        offDiff = (self.config.getSectionOffset(self.navIndex) - self.config.scrollOffsetPadding);
                }

                if (documentScrollTop >= offDiff && self.navIndex <= (navLength - 1)) {
                    if (self.navIndex > -1) {
                        $(".town-hall-nav ul li").eq(self.navIndex).find("a").addClass("current");
                    }
                    if (self.navIndex <= (navLength - 1)) {
                        self.navIndex++;
                    } else {
                        if (self.navIndex > -1) {
                            $(".town-hall-nav ul li:last-child a").addClass("current");
                        }
                    }
                }
            }
            if (screenDir < lastScrollTop) {
                // upscroll code
                switch (self.navIndex) {
                    case navLength:
                        offDiff = self.config.getSectionOffset(navLength - 1) + 350;
                        self.navIndex = navLength - 1;
                        break;
                    default:
                        offDiff = (self.config.getSectionOffset(self.navIndex) + 350);
                }
                if (documentScrollTop <= offDiff && (self.navIndex > -1)) {
                    $(".town-hall-nav ul li").eq(self.navIndex).find("a").addClass("current");
                    self.navIndex--;
                }
            }
            if ((documentScrollTop < (self.config.getSectionOffset(0) - navOffset))) {
                self.navIndex = -1;
            }
            lastScrollTop = screenDir;

        });
    }, // registerHeader
    partnerRotate: function() {
        if ($(".partners-info").text().trim().length == 0) {
            $(".partners-info").hide();
        }
        if ($(".partners-logos div").length > 1) {
            this.config.doRotate($(".partners-logos"), $(".partners-logos div"), "showLogo");
        } else {
            $(".partners-logos div:first-child").addClass("showLogo");
        }
    }, // partnerRotate
    supportersRotate: function() {
            if ($(".supporters-info").text().trim().length == 0) {
                $(".supporters-info").hide();
            }
            if ($(".supporters-logos div").length > 1) {
                this.config.doRotate($(".supporters-logos"), $(".supporters-logos div"), "showLogo");
            } else {
                $(".supporters-logos div:first-child").addClass("showLogo");
            }
    }, // supportersRotate
}

$("document").ready(function() {
    CME.townhall.init();
});