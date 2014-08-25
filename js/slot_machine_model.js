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

if (typeof($) === "object") {
$(function () {

if (typeof($P) === "undefined") {
    $P = {};
}   //if (typeof($P) === "undefined") {

$P.slot_machine_model = {
    create: function (_active) {
        var _t = $(this.templete_selector).clone();
        _t.removeClass("dice-template");
        
        var _option = this.slot_machine_option;
        if (_active !== undefined) {
            _option.active = _active;
        }
        else {
            _option.active = $P.random.get_int(0, 5);
        }
        
        setTimeout(function () {
            _t.find(".slotMachine").slotMachine(_option);
        }, 0);
        
        _t.sound = this.init_sound();
        _t.start_roll = this.start_roll;
        _t.stop_roll = this.stop_roll;
        
        return _t;
    },
    templete_selector: ".slot-machine.dice-templete",
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
    start_roll: function () {
        var _machine = $(this);
        _machine.shuffle();
        _machine.sound.play();
        _machine.addClass(this.running_classname);
        _machine.removeAttr("active_index");
        _machine.active_index = undefined;
    },
    stop_roll: function (_callback) {
        var _machine = $(this);
        var _this = this;
        _machine.shuffle(1, function (_el, _active) {
            _machine.removeClass(_this.running_classname);
            _machine.attr("active_index", _active);
            _machine.active_index = _active;
            _machine.sound.stop();
            
            if (typeof(_callback) === "function") {
                _callback(_machine);
            }
        });
    },
    get_active_index: function () {
        return this.active_index;
    }
};

}); //$(function () {
}   //if (typeof($) === "object") {

