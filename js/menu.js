/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    $("#sound_enable").change(function () {
        var _enable = this.value;
        //alert([typeof(_machines_sound), _machines_sound.length]);
        for (var _i = 0; _i < _machines_sound.length; _i++) {
            //alert(_i);
            var _s = _machines_sound[_i];
            
            if (_enable === "off") {
                _s.mute();
                $('#sound_volume').slider('disable');			
            }
            else {
                _s.unmute();
                $('#sound_volume').slider('enable');			
            }
        }
    });
    $("#sound_volume_div").on( 'slidestop', function () {
        //alert(111);
        var _vol = $('#sound_volume').val();
        //alert(_vol);
        _vol = parseInt(_vol) / 100;
        console.log(_vol);
        for (var _i = 0; _i < _machines_sound.length; _i++) {
            var _s = _machines_sound[_i];
            
            _s.volume(_vol);
        }
    });
});

