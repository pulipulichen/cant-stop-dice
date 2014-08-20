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
            _el.attr("active_index", active.index);
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
            //console.log(_random);
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
    
    //setTimeout(function () {
        _setup_slot_machine("body");
    //}, 1000);
    
    var _is_mobile = function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        else {
            return false;
        }
    };
    
    var _fix_layout = function () {
        var _total_height = window.innerHeight;
        
        //if (_is_mobile()) {
        //    _total_height = _total_height - 50;
        //}
        
        $(".slot-group").height(_total_height);
        //var _height = $(".slot-group").height();
        //$(".slot-group").css("margin-top", "-" + (_height/2) + "px");
        
        var _orginal_height = $(".slotMachine .slot:first").height();
        var _max_width = $(".slot-group .slot-subgroup:first").width();
        var _max_height = $("td:first").height() - $(".slot-machine-score:first").height();
        
        //alert([_max_width, _max_height]);
        
        var _size = _max_width;
        if (_size > _max_height) {
            _size = _max_height;
        }
        _size = parseInt(((_size / 2) - 10), 10);
        
        var _interval_height = _orginal_height - _size;
        
        $(".slotMachine, .slotMachine .slot")
                .css("width", _size + "px")
                .css("height", _size + "px");
        
        //$(".slotMachineContainer").css("margin-top", "-" + _size + "px");
        
        var _margin_top = $(".slotMachineContainer:first").css("margin-top");
        var _active_index = $(".slotMachine:first").attr("active_index");
        //console.log(['int 1', _interval_height, _margin_top, _size, _orginal_height]);
        if (_margin_top !== "-" + _size + "px") {
            if (_active_index === undefined) {
                _margin_top = _margin_top.substring(0, _margin_top.length - 2);
                _margin_top = parseInt(_margin_top, 10) + _interval_height;
                //console.log(['int', _interval_height, _margin_top, _size, _orginal_height, _margin_top + "px"]);
                //setTimeout(function () {
                $(".slotMachineContainer").css("margin-top", _margin_top + "px");
            }
            else {
                $(".slotMachineContainer").each(function (_index, _ele) {
                    _ele = $(_ele);
                    var _ai = _ele.parent().attr("active_index");
                    _ai = parseInt(_ai, 10) + 1;
                    //console.log(_ai);
                    _margin_top = _ai * _size * -1;
                    _ele.css("margin-top", _margin_top + "px");
                })
            }
            //}, 0);
            //console.log(['int 2', $(".slotMachineContainer:first").css("margin-top")]);
            
        }
    };
    
    setTimeout(function () {
        _fix_layout();
    }, 0);
    
    //if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false) {
    //    $(window).resize(_fix_layout);
    //}
    $(window).resize(_fix_layout);
        

    
    
});