(function($) {

    $.fn.speedbump = function(options) {

        var settings = $.extend({
            speedbump_exclusions: '',
			speedbump_selector: '.speedbump',
			speedbump_close_selectors: 'speedbump-close-button, .button.close'
        }, options);

        $.expr[":"].external = function(a) {
            var linkhn = a.hostname.split('.').reverse();
            if (!(linkhn.length > 1)) return false;
            var linkHref = linkhn[1] + "." + linkhn[0];

            var domainhn = window.location.hostname.split('.').reverse();
            var domainHref = domainhn[0] == "" ? "" : domainhn[1] + "." + domainhn[0];

            var check_exclusions = settings.speedbump_exclusions.split(',');
            for (i = 0; i < check_exclusions.length; i++) {
                checkme = check_exclusions[i];
                if (checkme != "" && checkme.indexOf('*') !== -1) {
                    if (checkme.indexOf('.*') === -1) {
                        checkme = checkme.replace('*', '.*');
                    }
                    match = a.href.match(new RegExp(checkme));
                    if (match !== null && match.index === 0) {
                        return false;
                    }
                } else {
                    if (a.href === checkme) return false;
                }
            }

            return !a.href.match(/^mailto\:/) && !a.href.match(/^tel\:/) && !a.href.match(/^javascript\:/) && linkHref !== domainHref;
        };

        $("a:external:not(.no_warning)").addClass("ext_link");
		
		$(settings.speedbump_close_selectors).click(function(){
			$(settings.speedbump_selector).removeClass('is-active');
		});

        $('a.ext_link').click(function(e) {
            // open a modal
            $(settings.speedbump_selector).addClass('is-active');
            e.preventDefault();
            //go to link on modal close
            var url = $(this).attr('href');
	    $(settings.speedbump_selector + ' a.button').unbind('click');
            $(settings.speedbump_selector + ' a.button').click(function() {
                $(settings.speedbump).removeClass('is-active');
                window.open(url);
            });
        });

        return true;

    };

}(jQuery));
