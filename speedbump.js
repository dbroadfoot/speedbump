(function($) {

    $.fn.speedbump = function(options) {

        var settings = $.extend({
            speedbump_exclusions: '',
            speedbump_message: '<p>By accessing this link you will be leaving our website.</p>'
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

        $('a.ext_link').click(function(e) {
            // open a modal
            $('#speedbump').addClass('is-active');
            e.preventDefault();
            //go to link on modal close
            var url = $(this).attr('href');
            $('#speedbump .btn-modal.btn-continue').click(function() {
                $('#speedbump').removeClass('is-active');
                window.open(url);
            });
            $('#speedbump .btn-modal.btn-close, #speedbump .modal-close').click(function() {
                $('#speedbump').removeClass('is-active');
            });
        });

        var html = `<div class="modal fade" id="speedbump" role="dialog">
		<div class="modal-background"></div>
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
				<div class="box">
	                <div class="modal-header">
	                <h4 class="modal-title">Notice</h4>
	                </div>
	                <div class="modal-body">
					` + settings.speedbump_message + `
	                </div>
	                <div class="modal-footer text-center">
	                <button type="button" title="continue" class="btn btn-modal btn-continue">Continue</button>
	                <button type="button" title="go back" class="btn btn-modal btn-close">Go Back</button>
	                </div>
				</div>
            </div>
			<button class="modal-close is-large" aria-label="close"></button>
        </div>
	</div>`;

        return $(html).appendTo(this);

    };

}(jQuery));
