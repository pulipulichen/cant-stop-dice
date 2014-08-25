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

$P.slot_score_model = {
    create: function () {
        
        var _s = $("<div/>").addClass("slot-machine-score");
        
        _s.set_score = this.set_score;
        _s.reset_score = this.reset_score;
        
        _s.reset_score();
        
        return _s;
    },
    set_score: function (_score) {
        
        var _slot_score = this;
        
        var _dot = Math.abs(6 - Math.abs(_score - 7));
        _score = _score + '<div class="dot">';
        for (var _i = 0; _i < _dot; _i++) {
            _score = _score + "&#46;";
        }
        _score = _score + '</div>';
        
        _slot_score.html(_score);
        _slot_score.addClass("complete");
    },
    reset_score: function () {
        
        var _slot_score = this;
        _slot_score.html('?<div class="dot hide">.</div>');
        _slot_score.removeClass("complete");
    }
};

}); //$(function () {
}   //if (typeof($) === "object") {

