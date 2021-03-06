/* 
 * The MIT License
 *
 * Copyright 2014/8/25 Pulipuli Chen <pulipuli.chen@gmail.com>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
;

if (typeof($) !== "undefined") {
$(function () {

if (typeof($P) === "undefined") {
    $P = {};
}   //if (typeof($P) === "undefined") {

$P.slot_machine_model = {
    create: function (_active) {
        var _t = $(this.templete_selector).clone();
        //alert(_t.length);
        _t.removeClass("dice-template");
        
        var _option = this.slot_machine_option;
        if (_active !== undefined) {
            _option.active = _active;
        }
        else {
            _option.active = $P.random.get_int(0, 5);
            //alert(_option.active);
        }
        
        //_option.active = 5;
        var _this = this;
        _t.start_roll = function () {
            var _machine = _t;
            //console.log(this.className);
            //_machine.shuffle();
            _machine.machine.shuffle();
            //_machine.start_shuffle();
            //_machine.sound.play();
            _machine.addClass(_this.running_classname);
            _machine.removeAttr("active_index");
            _machine.active_index = undefined;
        };
        _t.stop_roll = function (_callback) {
            var _machine = _t;
            //var _this = this;
            _machine.machine.shuffle(1, function (_el, _active) {
                _machine.removeClass(_this.running_classname);
                _machine.attr("active_index", _active);
                _machine.active_index = _active;
                _machine.sound.stop();

                if (typeof(_callback) === "function") {
                    _callback(_machine);
                }
            });
        };
        _t.get_active_index = _get_active_index = function () {
            return this.active_index;
        };
        
        _t.active_index = _option.active;
        _t.sound = _this.init_sound();
        
        setTimeout(function () {
            _t.machine = _t.slotMachine({
                active: _t.active_index,
                delay: 100
            });
            _t.start_shuffle = function () {
               _t.machine.shuffle(); 
            };
            
            //_t.start_roll = _start_roll;
            //_t.stop_roll = _stop_roll;
            //console.log(typeof(_t.start_roll));
        }, 0);
        
        //console.log(typeof(_t.start_roll));
        
        return _t;
    },
    templete_selector: ".slot-machine.dice-template",
    // ----------------
    slot_machine_option: {
        active	: 0,
        delay	: 100
    },
    
    // ----------------
    init_sound: function () {
        var _sound = new Howl({
            urls: this.sound_urls,
            loop: true
        });
        return _sound;
    },
    sound_urls: ['img/shake_and_roll_dice.mp3'], 
    
    //-----------------
    running_classname: "running",
};

}); //$(function () {
}   //if (typeof($) === "object") {

