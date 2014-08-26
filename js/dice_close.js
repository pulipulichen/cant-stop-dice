/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$DICE_CLOSE = {
    init_cleaner: function () {
        var _this = this;
        //$("#dice_close .reset").click(function () {
        $("#restart").click(function () {
            //_this.hide_slot_runner();
            _this.reset();
            $(".runner.runner-clear").click();
            $("#trigger").click();
        });
        
//        setTimeout(function () {
//            $(".menu a").click();
//        }, 1000);
        
        
    },
    reset: function () {
        this.empty_closed_dices();
        $('.slot-subgroup .close-dice.hide').removeClass("hide");
        $('.slot-subgroup').removeClass("dice-closed");
        $("#restart").addClass("hide");
    },
    check_number: function () {
        return $("#dice_close .closed-dice:not(.reset)").length;
    },
    //is_runner_full: function () {
    //    return this.check_number() === 3;
    //},
    get_closed_dices: function () {
        var _r = [];
        
        $("#dice_close").find(".closed-dice:not(.reset)").each(function (_i, _el) {
            _r.push($(_el).attr("score"));
        });
        
        return _r;
    },
    empty_closed_dices: function () {
        $("#dice_close").addClass("hide")
                .find(".closed-dice:not(.reset)").remove();
    },
    add_closed_dice: function (_score) {
        var _dice = $('<div class="closed-dice"></div>')
                .html(_score)
                .attr("score", _score);
        var _this = this;
        _dice.click(function () {
            _this.reset_dice($(this).attr("score"));
        });
        $("#dice_close").removeClass("hide")
                .find(".container")
                .append(_dice);
        
        //for (var _i = 0; _i < 6; _i++) {
        //    $("#dice_close .container").append(_dice.clone());
        //}
        
        $("#restart").removeClass("hide");
        
        this.hide_slot_dice(_score);
    },
    hide_slot_dice: function (_score) {
        
        $('.slot-subgroup[score="'+_score+'"] .close-dice').addClass("hide");
        $('.slot-subgroup[score="'+_score+'"]').addClass("dice-closed");
    },
    is_in_closed: function (_score) {
        var _r = this.get_closed_dices();
        for (var _i in _r) {
            //console.log([_score+"", _r[_i]]);
            if (_score+"" === _r[_i]) {
                return true;
            }
        }
        return false;
    },
    reset_dice: function (_score) {
        
        //var _before_is_full = this.get_runners();
        //var _score = _runner.score;
        $('#dice_close .closed-dice[score="'+_score+'"]').remove();
        //alert([$('#runner .runner[score="'+_score+'"]').length, '#runner .runner[score="'+_score+'"]']);
        
        if (this.check_number() === 0) {
            this.empty_closed_dices();
        }
        
        $('.slot-subgroup[score="'+_score+'"] .close-dice.hide').removeClass("hide");
        $('.slot-subgroup[score="'+_score+'"]').removeClass("dice-closed");
    }
};

$(function () {
    $DICE_CLOSE.init_cleaner();
});