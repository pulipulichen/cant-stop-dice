$(function () {
    
    //function to call when shake occurs
    var _shakeEventDidOccur = function () {

        $("body").click();
        //setTimeout(function () {
        //    $("body").click();
        //}, 1000);
    };
    
    window.addEventListener('shake', _shakeEventDidOccur, false);
    //shake.startWatch(_shakeEventDidOccur);

    
    $(document).keypress(function (_event) {
        if (_event.keyCode === 32) {
            _shakeEventDidOccur();
        }
    });
});