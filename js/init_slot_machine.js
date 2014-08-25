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

$P.init_slot_machine = {
    init: function() {
        var _grid = this.append_to_grid();
        
        var _this = this;
        $P.grid.add_listener(function () {
            _this.append_to_grid();
        });
        
        setTimeout(function () {
            _this.slot_machine_collection.start_roll();
            //_this.slot_machine_collection.stop_roll();
        }, 100);
    },
    // --------------
    get_slot_machine_collection: function () {
        if (this.slot_machine_collection === null) {
            this.slot_machine_collection = $P.slot_machine_collection_model.create();
        }
        return this.slot_machine_collection;
    },
    grid_selector: ".slot-machine-grid",
    slot_machine_collection: null,
    
    // --------------
    append_to_grid: function () {
        var _coll = this.get_slot_machine_collection();
        var _grid = $(this.grid_selector).filter(":visible");
        for (var _i = 0; _i < _coll.length; _i++) {
            var _selector = "[slot_machine='" + _i + "']";
            var _g = _grid.find(_selector);
            //alert([_coll[_i].length, _g.length]);
            _g.append(_coll[_i]);
        }
        return _coll;
    }
};  //var _init_slot_machine = {

$P.init_slot_machine.init();

}); //$(function () {
}   //if (typeof($) === "object") {