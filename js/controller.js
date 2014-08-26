$(function () {
    
    var _first = true;
    var _running = false;
    $("#trigger").click(function () {
        var _this = $(this);
        $("body").removeClass("cursor-pointer");
        $("body").addClass("cursor-wait");
        if (_running === false) {
            
            
            _this.parent(".controller:first").fadeOut(function () {
                //_this.text("STOP");
                _this.html('<img src="img/playback_next.png" />');
                _running = true;
            });
        }
        else {
            
            _this.parent(".controller:first").fadeOut(function () {
                _running = false;
                //_this.text("CONTINUE");
                _this.html('<img src="img/play_alt.png" />');
            });
        }
        _first = false;
    });
});
