$(function () {
    window.addEventListener('shake', shakeEventDidOccur, false);

    //function to call when shake occurs
    function shakeEventDidOccur () {

        $("body").click();
        setTimeout(function () {
            $("body").click();
        }, 1000);
    }
});