// Define closure for private code.
(function($){

    // Public method that POSTs story to webserver, to be appended to database.
    window.publishStory = function(text){
        var $btn = $('.js-form-submit-button')
            .disable()
            .addClass('is-status-wait')
            .value('Please wait...');
        $.post("/story", {
            date: parseInt(Number(new Date(),10)),
            text: text
        })
            .fail(function(err){
                console.log(err);
                $( "#dialog-message-error" ).dialog({
                    modal: true,
                    buttons: {
                        OK: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                });
            })
            .done(function(){
                $( "#dialog-message-success" ).dialog({
                    modal: true,
                    buttons: {
                        OK: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                });
            })
            .always(function(){
                $btn.removeClass('is-status-wait')
                    .enable()
                    .value('Submit Story');
            });
    };

})(window.jQuery);
