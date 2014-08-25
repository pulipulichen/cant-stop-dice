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

if (typeof($) !== "undefined") {
$(function () {

if (typeof($P) === "undefined") {
    $P = {};
}

$P.slot_machine_collection_model = {
    create: function () {
        if (this.slot_machine_collection.length === 0) {
            //var _template = this.get_templete();
            var _grid_slot_number = $(this.grid_selector).filter(":first").find(".slot-machine").length;
            
            for (var _i = 0; _i < _grid_slot_number; _i++) {
                var _t = $P.slot_machine_group_model.create();
                this.slot_machine_collection.push(_t);
            }
            
        }
        return this.slot_machine_collection;
    },
    
    grid_selector: ".slot-machine-grid",
    slot_machine_collection: [],
    
    // ------------------------
    start_roll: function (_callback) {
        
        var _coll = this;
        var _next_wait_ary = $P.random.get_mutliple_int(50, 150, 6);
        var _wait_time_base = 0;
        
        for (var _i = 0; _i < _coll.length; _i++) {
            _wait_time_base = _wait_time_base + _next_wait_ary[_i];
            setTimeout(function () {
                _coll[_i].start_roll();
            }, _wait_time_base);
        }
        
        if (typeof(_callback) === "function") {
            setTimeout(function () {
                _callback();
            }, _wait_time_base);
        } 
    },
    stop_action: function (_callback) {
        var _coll = this;
        var _next_wait_ary = $P.random.get_mutliple_int(500, 1000, 6);
        var _group_interval = $P.random.get_mutliple_int(1000, 3000, 2);
        var _wait_time_base = 0;
        
        for (var _i = 0; _i < _coll.length; _i++) {
            
            if (_i !== 0 && _i % 2 === 0) {
                _wait_time_base = _wait_time_base + _group_interval.pop();
            }
            
            _wait_time_base = _wait_time_base + _next_wait_ary[_i];
            setTimeout(function () {
                _coll[_i].stop_roll();
            }, _wait_time_base);
            
        }
        
        if (typeof(_callback) === "function") {
            setTimeout(function () {
                _callback();
            }, _wait_time_base);
        }
    }
};  //var _init_slot_machine = {

}); //$(function () {
}   //if (typeof($) === "object") {