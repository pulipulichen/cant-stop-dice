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
}

$P.slot_machine_collection_model = {
    get_templete: function () {
        if (this.template_cache === undefined) {
            this.template_cache = $(this.templete_selector);
        }
        return this.template_cache;
    },
    templete_selector: ".slot-machine.dice-templete",
    template_cache: undefined,
    
    get: function () {
        if (this.slot_machine_collection.length === 0) {
            var _template = this.get_templete();
            var _grid_slot_number = $(this.grid_selector).filter(":first").find(".slot-machine").length;

            for (var _i = 0; _i < _grid_slot_number; _i++) {
                var _t = _template.clone();
                this.slot_machine_collection.push(_t);
            }
        }
        return this.slot_machine_collection;
    },
    grid_selector: ".slot-machine-grid",
    slot_machine_collection: [],
    
};  //var _init_slot_machine = {

}); //$(function () {
}   //if (typeof($) === "object") {