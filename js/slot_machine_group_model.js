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


if (typeof($) === "object") {
$(function () {

if (typeof($P) === "undefined") {
    $P = {};
}   //if (typeof($P) === "undefined") {

$P.slot_machine_group_model = {
    create: function () {
        
        var _group = $("<div/>").addClass("slot-machine-group");
        
        var _machines = [];
        var _machines_length = 2;
        for (var _i = 0; _i < _machines_length; _i++) {
            var _m = $P.slot_machine_model.create();
            _machines.push(_m);
            _group.append(_m);
        }
        _group.machines = _machines;
        //_group.append($P.slot_machine_model.create());
        //_group.append($P.slot_machine_model.create());
        
        var _score = $P.slot_score_model.create();
        _group.append(_score);
        _group.score = _score;
        
        return _group;
    },
    //-----------------
    running_classname: "running",
    start_roll: function (_callback) {
        var _group = this;
        
        var _interval = $P.random.get_mutliple_int(300, 500, 2);
        var _base_interval = 0;
        
        for (var _i in _group.machines) {
            setTimeout(function () {
                var _m = _group.machines[_i];
                _m.start_roll();
            }, _base_interval);
            
            _base_interval = _base_interval + _interval[_i];
        }
        
        if (typeof(_callback) === "function") {
            setTimeout(function () {
                _callback();
            }, _base_interval);
        }
    },
    stop_roll: function (_callback) {
        var _group = this;
        
        var _interval = $P.random.get_mutliple_int(1000 , 1200, 2);
        var _base_interval = 0;
        
        for (var _i in _group.machines) {
            if (_i !== 0) {
                _base_interval = _base_interval + _interval[_i];
            }
            
            setTimeout(function () {
                var _m = _group.machines[_i];
                _m.stop_roll();
            }, _base_interval);
        }
        
        setTimeout(function () {
            
            var _score = 0;
            for (var _i in _group.machines) {
                var _m = _group.machines[_i];
                _score = _score + _m.active_index;
            }
            _group.score.set_score(_score);
            
            if (typeof(_callback) === "function") {
                _callback();
            }
        }, _base_interval);
            
    }
};

}); //$(function () {
}   //if (typeof($) === "object") {

