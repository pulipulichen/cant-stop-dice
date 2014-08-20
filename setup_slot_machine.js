$(function(){
    
    var _slot_group = $(".slot-subgroup");

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
    /*
    var machine1 = _slot_group.find(".machine1").slotMachine({
            active	: 0,
            delay	: 100
    });

    var machine2 = _slot_group.find(".machine2").slotMachine({
            active	: 1,
            delay	: 100
    });
    */

    //var _score = 0;
    //var _score_result = _slot_group.find(".slotMachine-score");
    var _onComplete = function ($el, active){
        //alert($el[0].className);
        /*
        var _classname = $el[0].className;
        _score = _score + active.index + 1;
        if (_classname.indexOf("machine2")) {
            _score_result.text(_score);
        }
        */
        var _el = $($el[0]);
        var _score = active.index + 1;
        var _score_result = _el.parents(".slot-subgroup:first").find(".slot-machine-score");
        
        //alert([_score_result.text(), _score]);
        if (_score_result.text() !== "?") {
            var _temp_score = _score_result.text();
            _temp_score = parseInt(_temp_score, 10);
            //alert([_temp_score, _score]);
            _score = _score + _temp_score;
        }
        _score_result.text(_score);  
    };

    var _reset_score = function () {
        //_score = 0;
        _slot_group.find(".slot-machine-score").text("?");
    };
    _reset_score();

    var _start_flag = 0;
    var _start_callback = function(){
        if (_start_flag === 0) {
            _start_flag = 1;
            _reset_score();
            
            /*
            //machine1.shuffle(5, _onComplete);
            machine1.shuffle();

            setTimeout(function(){
                //machine2.shuffle(5, _onComplete);
                machine2.shuffle();
            }, 100);
            */
            
            //alert(_machines.length);
            $.each(_machines, function (_index, _machine) {
                //alert(_index);
                _machine.shuffle();
            });
        }
        else if (_start_flag === 1) {
            
            /*
            machine1.shuffle(1, _onComplete);
            setTimeout(function(){
                //machine2.shuffle(5, _onComplete);
                machine2.shuffle(1, _onComplete);
                //_onComplete();
            }, 100);
            */
            
            _start_flag = 2;
            var _interval = 100;
            $.each(_machines, function (_index, _machine) {
                setTimeout(function () {
                    _machine.shuffle(1, _onComplete);
                }, _interval * _index);
            });
            
            setTimeout(function () {
                _start_flag = 0;
            }, _machines.length * _interval);
        }
    };

    _slot_group.click(_start_callback);
    //$("#slotMachineButton1").click(_start_callback);
});