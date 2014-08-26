/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$RUNNER = {
    init_cleaner: function () {
        var _this = this;
        $("#runner .runner-clear").click(function () {
            //_this.hide_slot_runner();
            _this.reset();
        });
    },
    reset: function () {
        this.empty_runner();
        $('.slot-subgroup .runner.hide').removeClass("hide");
        $('.slot-subgroup').removeClass("dice-match");
    },
    check_number: function () {
        return $("#runner").find(".runner:not(.runner-clear)").length;
    },
    is_runner_full: function () {
        return this.check_number() === 3;
    },
    get_runners: function () {
        var _r = [];
        
        $("#runner").find(".runner:not(.runner-clear)").each(function (_i, _el) {
            _r.push($(_el).attr("score"));
        });
        
        return _r;
    },
    empty_runner: function () {
        $("#runner").addClass("hide")
                .find(".runner:not(.runner-clear)").remove();
    },
    add_runner: function (_score) {
        var _runner = $('<div class="runner"></div>')
                .html(_score)
                .attr("score", _score);
        var _this = this;
        _runner.click(function () {
            _this.remove_runner($(this).attr("score"));
        });
        $("#runner").removeClass("hide")
                .append(_runner);
        
        
        if (this.is_runner_full()) {
            this.hide_slot_runner();
        }
        else {
            this.hide_slot_runner(_score);
        }
    },
    hide_slot_runner: function (_score) {
        if (_score === undefined) {
            $('.slot-subgroup .runner').addClass("hide");
            //$('.dice-match').removeClass("dice-match");
        }
        else {
            $('.slot-subgroup[score="'+_score+'"] .runner').addClass("hide");
            $('.slot-subgroup[score="'+_score+'"]').addClass("dice-match");
        }
    },
    is_in_runner: function (_score) {
        var _r = this.get_runners();
        for (var _i in _r) {
            //console.log([_score+"", _r[_i]]);
            if (_score+"" === _r[_i]) {
                return true;
            }
        }
        return false;
    },
    remove_runner: function (_score) {
        
        var _before_is_full = this.get_runners();
        //var _score = _runner.score;
        $('#runner .runner[score="'+_score+'"]').remove();
        //alert([$('#runner .runner[score="'+_score+'"]').length, '#runner .runner[score="'+_score+'"]']);
        
        if (this.check_number() === 0) {
            this.empty_runner();
        }
        
        if (_before_is_full === false) {
            $('.slot-subgroup[score="'+_score+'"] .runner.hide').removeClass("hide");
            $('.slot-subgroup[score="'+_score+'"]').removeClass("dice-match");
        }
        else {
            $('.slot-subgroup .runner.hide').removeClass("hide");
            $('.dice-match').removeClass("dice-match");
            var _r = this.get_runners();
            //console.log(_r);
            $.each(_r, function (_i, _score) {
                $('.slot-subgroup[score="'+_score+'"] .runner').addClass("hide");
                $('.slot-subgroup[score="'+_score+'"]').addClass("dice-match");
            });
        }
    }
};

$(function () {
    $RUNNER.init_cleaner();
});