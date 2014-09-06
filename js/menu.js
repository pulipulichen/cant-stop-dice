/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    
    setTimeout(function () {
        
    
    $("#sound_enable").on("change", function () {
        //alert( this.value);
        
        var _vol = $('#sound_volume').val();
        //alert(_vol);
        _vol = parseInt(_vol) / 100;
        
        var _enable = this.value;
        //alert([typeof(_machines_sound), _machines_sound.length]);
        
        for (var _i = 0; _i < _machines_sound.length; _i++) {
            //alert(_i);
            var _s = _machines_sound[_i];
            
            if (_enable === "off") {
                //_s.mute();
                _s.volume(0);
                $('#sound_volume').slider('disable');			
            }
            else {
                //_s.unmute();
                _s.volume(_vol);
                $('#sound_volume').slider('enable');			
            }
        }
        if (_enable === "off") {
            //_end_sound.mute();
            _end_sound.volume(0);
        }
        else {
            //_end_sound.unmute();
            _end_sound.volume(_vol);
        }
    });
    }, 0);
    $("#sound_volume_div").on( 'slidestop', function () {
        //alert(111);
        var _vol = $('#sound_volume').val();
        //alert(_vol);
        _vol = parseInt(_vol) / 100;
        //console.log(_vol);
        for (var _i = 0; _i < _machines_sound.length; _i++) {
            var _s = _machines_sound[_i];
            
            _s.volume(_vol);
        }
        _end_sound.volume(_vol);
    });
});

