jQuery(document).ready(function ($) {

BASE_URL = "https://soutenir.pasteur.fr/brochure_legs/";
    //$(this).scrollTop(0);

    //Humburger menu
    $(".toggle-menu").click(function () {
        $(this).toggleClass("open");
        $(this).parent().next().toggle();
    });

    //block tabs
    if ($(window).width() > 767) {
        var interval = null;
        var cycleTabs = true;
        jQuery(function () {
            interval = setInterval(tabSlide, 10000);
        });
        function tabSlide() {
            if (cycleTabs) {
                var $active = $('.section-2 .block.active');
                var $next = ($active.next().length > 0) ? $active.next() : $('.section-2 .block:first');
                $active.removeClass('active');
                $next.addClass('active');
                tabID = $next.attr('data-tab');
                $('.tab[data-tab=' + tabID + ']').addClass('open').siblings().removeClass('open');
            }
        }

        $.fn.isInViewportTop = function () {
            var elementTop = $(this).offset().top;
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            return elementTop < viewportBottom;
        };
		function setTabsHeight() {
            tabHeight = $('#tab-1').height();
            $('.section-2 .tab').css({'min-height':tabHeight});
        }
        
        setTabsHeight();
        $(window).on('resize scroll', function () {
            $('#section-2 .tab.open').each(function () {
                if ($(this).isInViewportTop()) {
                    cycleTabs = false;
                } else {
                    cycleTabs = true;
                }
            });
			setTabsHeight();
        });
        $(window).on('resize scroll', function () {
            $('#section-4').each(function () {
                if ($(this).isInViewportTop()) {
                    $(this).addClass('fade-up');
                } else {
                    $(this).removeClass('fade-up');
                }
            });
        });

        // Disable tel link
        //$('.tel-block a').removeAttr('href');
    }
    
     if (window.location.href.indexOf("carmen") > -1) { 
        $('.tab[data-tab="1"]').addClass('open').siblings().removeClass('open');
        $('.section-2 .block[data-tab="1"]').addClass('active').siblings().removeClass('active');
        cycleTabs = false;
        $('html, body').animate({
            scrollTop: $('#carmen').offset().top - $('header').innerHeight() + 1
        }, 0);
    }
    
    if (window.location.href.indexOf("bernard") > -1) { 
        $('.tab[data-tab="2"]').addClass('open').siblings().removeClass('open');
        $('.section-2 .block[data-tab="2"]').addClass('active').siblings().removeClass('active');
        cycleTabs = false;
        $('html, body').animate({
            scrollTop: $('#bernard').offset().top - $('header').innerHeight() + 1
        }, 0);
    }
    
    if (window.location.href.indexOf("jeanne") > -1) { 
        $('.tab[data-tab="3"]').addClass('open').siblings().removeClass('open');
        $('.section-2 .block[data-tab="3"]').addClass('active').siblings().removeClass('active');
        cycleTabs = false;
        $('html, body').animate({
            scrollTop: $('#jeanne').offset().top - $('header').innerHeight() + 1
        }, 0);
    }

    $(".section-2 .block").on('click', function () {
        tabID = $(this).attr('data-tab');
        $('.tab[data-tab=' + tabID + ']').addClass('open').siblings().removeClass('open');
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        cycleTabs = false;
    });

    if ($(window).width() < 768) {
        $('.section-2 .blocks').addClass("owl-carousel");
        var owl = $('.section-2 .blocks')
        owl.owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            stagePadding: 0,
            // autoplay: true,
            // autoplayTimeout: 10000,
            // autoplayHoverPause: true

        });
        // Listen to owl events:
        owl.on('translated.owl.carousel', function () {
            console.log('changed');
            $(".owl-item.active .block").addClass("active").trigger("click");
            $(".owl-item.active").siblings().find(".block").removeClass("active");
        });

        $('.section-6 .blocks ul').addClass("owl-carousel");
        $('.section-6 .blocks ul').owlCarousel({
            loop: true,
            items: 1,
            nav: true,
            stagePadding: 0
        });
    }


// Cookies
    window.addEventListener("load", function () {
        /*
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#db8169"
                },
                "button": {
                    "background": "#ffffff"
                }
            },
            "content": {
                "message": "En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de cookies destinés à réaliser des statistiques de visites et améliorer votre performance sur ce site.",
                "dismiss": "OK, j’ai compris",
                "link": "Plus d’information",
                "href": "https://www.pasteur.fr/fr/mentions-legales#5-traitements-de-donnes-personnelles"
            }
        })*/
    });

// scroll to
    $("nav a,.menu .left a,.menu .right a,.btn1,.btn2,.slide-image").on('click', function (e) {
        e.preventDefault();
        if (this.hash !== "") {
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - $('header').innerHeight() + 1
            }, 800);
        }
        $(".toggle-menu.open").click();
    });

    /* Popup video */
    var videoSrc = $('#video iframe').attr('data-src');
    var videoSrc2 = $('#video2 iframe').attr('data-src');

    $('.play-video, .video-wrapper').on('click', function(e) {
        e.preventDefault();
        $('#video').addClass('open');
        $('#video iframe').attr('src', videoSrc + '?autoplay=1');
    });

    $('.play-video2').on('click', function(e) {
        e.preventDefault();
        $('#video2').addClass('open');
        $('#video2 iframe').attr('src', videoSrc2 + '?autoplay=1');
    });
  
    $('#video .close').on('click', function() {
        $('#video').removeClass('open');
        $('#video iframe').removeAttr('src');
    });
    $('#video2 .close').on('click', function() {
        $('#video2').removeClass('open');
        $('#video2 iframe').removeAttr('src');
    });
    //Colorbox popup
    if ($(window).width() < 768) {
        $(".colorbox-popin").colorbox({transition: 'none', width:'100%', height:'100%', className:'colorbox-popin'});
    } else {
        $(".colorbox-popin").colorbox({transition: 'none', width:'600px', height:'700px', className:'colorbox-popin'});
    }
    
	// Form label
    $('.contact-form input').on('focus', function () {
        $(this).parent('.form-item').addClass('focused');
    });
    
    $('.contact-form input').on('blur', function () {
        if($(this).val() == 0) {
            $(this).parent('.form-item').removeClass('focused');
        }
    });
	
	// contact form
	$('.contact-form').on('click', '.form-submit', function(e) {
		e.preventDefault();
		
		
		var $form = $(this).closest('form');
		
		$form.validate({
			errorLabelContainer: $form.find('.errors'),
			errorElement: 'li',
	        rules: {
	            'email': {
	                 required: true,
	                 email: true
	            },
	            'nom': {
	                required: true,
                    minlength: 2
	            },
	            'prenom': {
	                required: true,
                    minlength: 2
	            },
	            'civilite': {
	            	required: true
	            },
	            'tel': {
	            	required: false,
	            	maxlength: 10
	            },
	        },
	        messages: {
	        	'email': {
	                required: '',
	                email: ''
	            },
	            'nom': {
	                required: '',
                    minlength: ''
	            },
	            'prenom': {
	                required: '',
                    minlength: ''
	            },
	            'civilite': {
	                required: ''
	            }
	        }
	    });
		
		
		// If the form is invalid, do not submit it and return
	    if (!$form.valid()) {
	    	$form.find('.errors').html('Un champ est mal renseigné. Veuillez s’il vous plaît le vérifier et le corriger');
            $form.find('.success').html('');
	        return false;
	    }
	    $form.find('.errors').html('');
        $('.contact-form').find('.success').html('L\'Institut Pasteur vous remercie.<br> Le téléchargement de votre brochure est en cours.');
		$('.contact-form').addClass('submitted');
	    
	    var civilite = $form.find( "input[type=radio][name=civilite]:checked" ).val();
	    
	    $.ajax({
	    	url: BASE_URL + "actions/quiz_submit.php",
	    	data: {
                civilite: civilite,
	    		email: $form.find('input[name=email]').val(),    //MAIL: $form.find('#email').val(),
	    		nom: $form.find('input[name=nom]').val(),       //NOM: $form.find('#nom').val(),
	    		prenom: $form.find('input[name=prenom]').val(), //PRENOM: $form.find('#prenom').val(),
	    		tel: $form.find('input[name=tel]').val(), //TELEPHONE: $form.find('#tel').val() 
	    	},
	    	method: 'POST',
	    	async: false
	    })
	    .done(function(data) {
            window.location = './dl_pdf.php?dl=1';
            dataLayer.push({
                "event": "brochure",
                "gender": civilite == 'Mr' ? 'Monsieur' : 'Madame'
            });
	    });
	    
	    return false;
		
	});
	
	
	$('.section-5').on('click', '.socials li', function(e) {
		var window_size = "width=585,height=511", url = '',
			text = '';

		if ($(this).hasClass('facebook')) {
			window_size = "width=585,height=368";
			url = "https://www.facebook.com/sharer/sharer.php?u=http://dons.pasteur.fr/enquete-legs";
			window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,' + window_size);
			return false;
		} else if ($(this).hasClass('twitter')) {
			window_size = "width=585,height=261";
			text = "Que savez-vous de la transmission de Patrimoine ? Faites l'enquête avec #institutpasteur et testez vos connaissances sur http://dons.pasteur.fr/enquete-legs #LeSaviezVous #Legs #Donations #AssuranceVie";
			url = 'https://twitter.com/intent/tweet?text=' + amperoctoplus(text);
			window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,' + window_size);
			return false;
		}

		
	});
	

});

function amperoctoplus(s) 
{
	s = s.replace(/&/g, '%26');
	s = s.replace(/#/g, '%23');
	s = s.replace(/\+/g, '%2B');
	s = s.replace(/@/g, '%40');
	s = s.replace(/:/g, '%3A');
	return encodeURI(s);
}


function openTab(evt, tabNum) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    if ($(window).width() > 767) {
        document.getElementById(tabNum).style.display = "flex";
    } else {
        document.getElementById(tabNum).style.display = "block";
    }

}

window.randomize = function () {
    $('.ko-progress-circle').attr('data-progress', 100);
}
setTimeout(window.randomize, 200);
$('.ko-progress-circle').click(window.randomize);

function validateKeyStrokes(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 32 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122 && charCode < 192)) {
        return false;
    }
    return true;
}
