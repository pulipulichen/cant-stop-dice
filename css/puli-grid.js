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
    
var _puli_grid = {
    init: function () {
        var _pgrid = this;
        $(window).resize(function () {
            _pgrid.resize();
        });
        
        _pgrid.resize();
    },
    resize: function () {
        if (this.target_objects === undefined) {
            this.target_objects = $(this.target_selector);
        }
        var _window_height = window.innerHeight;
        var _window_width = window.innerWidth;
        
        if (_window_height > _window_width) {
            this.set_orientation("portrait");
        }
        else {
            this.set_orientation("landscape");
        }
    },
    set_orientation: function (_orientation) {
        var _hide_classname = "puli-grid-hide";
        if (_orientation === "portrait") {
            this.target_objects.filter(".portrait").removeClass(_hide_classname);
            this.target_objects.filter(".landscape").addClass(_hide_classname);
        }
        else {
            this.target_objects.filter(".landscape").removeClass(_hide_classname);
            this.target_objects.filter(".portrait").addClass(_hide_classname);
        }
    },
    target_selector: "table.puli-grid",
    target_objects: undefined
}; //var _puli_grid = {

_puli_grid.init();

}); //$(function () {
    
}   // if (typeof($) === "object") {


