$(function(){

    var _setup_slot_machine = function (_slot_group) {
        
        if (typeof(_slot_group) === "string") {
            _slot_group = $(_slot_group);
        }
        
        var _slot_machine_option = {
            active	: 0,
            delay	: 100
        };
        var _machines = [];
        _slot_group.find(".slotMachine").each(function (_index, _machine) {
            _machine = $(_machine);
            var _m = _machine.slotMachine(_slot_machine_option);
            _machines.push(_m);
        });
        var _onComplete = function ($el, active){
            var _el = $($el[0]);
            _el.removeClass("running");
            var _score = active.index + 1;
            var _subgroup = _el.parents(".slot-subgroup:first");
            var _score_result = _subgroup.find(".slot-machine-score");

            if (_score_result.text() !== "?") {
                var _temp_score = _score_result.text();
                _temp_score = parseInt(_temp_score, 10);
                _score = _score + _temp_score;
            }
            _score_result.text(_score);
            
            if (_subgroup.find(".running").length === 0) {
                _score_result.addClass("complete");
            }
            
            if (_slot_group.find(".running").length === 0) {
                _start_flag = 0;
            }
        };

        var _results = _slot_group.find(".slot-machine-score");
        _results.text("?");
        var _reset_score = function () {
            _results.each(function (_i, _e) {
                _e = $(_e);
                _e.removeClass("complete");
                
                if (_e.text() !== "?") {
                    _e.fadeOut("fast", function () {
                        _e.text("?");
                        _e.fadeIn("fast");
                    });
                }
                //_e.text("?");
            });
        };
        _reset_score();

        var _start_flag = 0;
        var _start_callback = function(){
            
            var _random = parseInt(Math.random() * 50, 10);
            console.log(_random);
            var _interval = 75 + _random;
            
            if (_start_flag === 0) {
                _start_flag = 1;
                _reset_score();

                //$.each(_machines, function (_index, _machine) {
                //    _machine.shuffle();
                //});
                
                $.each(_machines, function (_index, _machine) {
                    setTimeout(function () {
                        _slot_group.find(".slotMachine").addClass("running");
                        _machine.shuffle();
                    }, _interval * _index);
                });
                
                setTimeout(function () {
                    _start_flag = 2;
                }, _machines.length * _interval);
            }
            else if (_start_flag === 2) {

                _start_flag = 3;
                var _interval = 100;
                $.each(_machines, function (_index, _machine) {
                    setTimeout(function () {
                        _machine.shuffle(1, _onComplete);
                    }, _interval * _index);
                });

                //setTimeout(function () {
                //    _start_flag = 0;
                //}, _machines.length * _interval);
            }
        };

        _slot_group.click(_start_callback);
    };  //var _setup_slot_machine = function (_slot_group) {
    
    _setup_slot_machine("body");
    
    var _fix_layout = function () {
        var _total_height = window.innerHeight;
        
        $(".slot-group").height(_total_height);
        //var _height = $(".slot-group").height();
        //$(".slot-group").css("margin-top", "-" + (_height/2) + "px");
    };
    _fix_layout();
    
    $(window).resize(_fix_layout);
        
});