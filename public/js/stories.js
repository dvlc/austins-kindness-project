// Define closure for private code.
(function($){

	var $elStatus = $('.js-has-status'),	// node whose CSS will be updated to reflect loading status
		$elStories = $('.js-has-stories'),	// node into which stories HTML will be inserted
		lastStatus = null;					// cache of last time the loading status was changed

	// Fetches list of stories from webserver, and updates DOM accordingly.
	// First, sets $elStatus's status to "wait".
	// Then sends AJAX request to webserver to fetch the stories as JSON.
	// When server responds, updates $elStatus to either "error", "empty" (no stories found), or "success"
	// (one or more stories found). Also resets the HTML contents of $elStories to display the found stories,
	// if any.
	window.fetchStories = function(){

		// Reset status flag in DOM to "wait".
		if (lastStatus) {
			$elStatus.removeClass('is-status-'+lastStatus);
			lastStatus = null;
		}
		$elStatus.addClass('is-status-wait');

		// Fetch stories data from webserver.
		$.getJSON('/stories')
			.fail(function(err){

				// Fetch failed; display error message.
				$elStatus.addClass('is-status-error')
					.removeClass('is-status-wait');
				lastStatus = 'error';
				console.log(err);
			})
			.done(function(stories){

				// Fetch returned without error. Did we find any stories in database?
				var len = stories && stories.length;
				lastStatus = len ? 'success' : 'empty';
				$elStatus.addClass('is-status-'+lastStatus)
					.removeClass('is-status-wait');

				// If some stories were found, generate HTML for them.
				var out = [];
				if (len) {
					for (var i=0; i<len; i++) {
						var story = stories[i];
						out.push('<li><p class="time">'
						+ (new Date(story.date)).toLocaleString()
						+ '</p><p class="body">'
						+ story.text
						+ '</p></li>');
					}
				}
				$elStories.html(out.join(''));
			});

	};

})(window.jQuery);

// Once the HTML document is loaded, start trying to load stories.
$(document).ready(function(){
	window.fetchStories();
});
