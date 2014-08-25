
        
var _machines_sound = [];

$(function(){
var _machines = [];  
var _setup_slot_machine = function (_slot_group) {
        
        if (typeof(_slot_group) === "string") {
            _slot_group = $(_slot_group);
        }
        var _vibrate = function () {
            if (typeof(navigator) === "object" 
                    && typeof(navigator.vibrate) === "function") {
                navigator.vibrate(100);
            }
        };

        var _slot_machine_option = {
            active	: 0,
            delay	: 100
        };
        var _end_sound = new Howl({
            urls: ['img/blop.mp3']
        });
        _slot_group.find(".slotMachine").each(function (_index, _machine) {
            setTimeout(function () {
                var _random = parseInt(Math.random() * 6 , 10);
                _slot_machine_option.active = _random;
                _machine = $(_machine);
                _machine.attr("active_index", _random);
                var _m = _machine.slotMachine(_slot_machine_option);
                
                _machines.push(_m);
                
                var _sound = new Howl({
                    urls: ['img/shake_and_roll_dice.mp3'],
                    loop: true
                });
                _machines_sound.push(_sound);
            }, 0);
            
        });
        
        //setTimeout(function () {
        //    $(".slot-select").fadeIn();
        //}, 50);
        
        var _onComplete = function ($el, active){
            var _el = $($el[0]);
            _el.removeClass("running");
            _el.attr("active_index", active.index);
            //var _score = active.index + 1;
            var _subgroup = _el.parents(".slot-subgroup:first");
            var _score_result = _subgroup.find(".slot-machine-score");

            /*
            if (_score_result.text().indexOf("?") === -1) {
                var _temp_score = _score_result.text();
                _temp_score = parseInt(_temp_score, 10);
                _score = _score + _temp_score;
            }
            */
            //_score_result.text(_score);
            
            // 播放結束音效
            
            if (_subgroup.find(".running").length === 0) {
                var _score = 0;
                _subgroup.find(".slotMachine").each(function (_index, _ele) {
                    var _ai = $(_ele).attr("active_index");
                    //console.log(['ai', _ai]);
                    _ai = parseInt(_ai, 10) + 1;
                    _score = _score + _ai;
                });
                
                var _dot = Math.abs(6 - Math.abs(_score - 7));
                _score = '<div class="number">' + _score + '</div><div class="dot">';
                for (var _i = 0; _i < _dot; _i++) {
                    _score = _score + "&#46;";
                }
                _score = _score + '</div>';
                
                _score_result.html(_score);
                
                var _add_runner = $('<div class="runner add"><img src="img/add.png" /></div>');
                var _close_dice = $('<div class="close-dice"></div>');
                _score_result.find(".number")
                        .prepend(_add_runner)
                        .append(_close_dice);
                
                _add_runner.addClass("hide");
                _close_dice.addClass("hide");
                
                _score_result.addClass("complete");
                
                _end_sound.play();
            }
            
            if (_slot_group.find(".running").length === 0) {
                _start_flag = 0;
            }
        };

        var _results = _slot_group.find(".slot-machine-score");
        //var _default_result = '<div class="runner add hide"><img src="img/add.png" /></div>?<div class="close-dice hide"></div><div class="dot hide">.</div>';
        //var _default_result = '<div class="runner add"><img src="img/add.png" /></div><div class="number">7</div><div class="close-dice"></div><div class="dot">......</div>';
        var _default_result = '<div class="number">?</div><div class="dot hide">.</div>';
        _results.html(_default_result);
        var _reset_score = function () {
            if (_results.eq(0).text().indexOf("?") === -1) {
                //if (window.confirm("Do you want to reset score and roll dices again?") === false) {
                //    return false;
                //}
            }
            _results.each(function (_i, _e) {
                _e = $(_e);
                _e.removeClass("complete");
                
                if (_e.text().indexOf("?") === -1) {
                    
                    _e.fadeOut("fast", function () {
                        _e.html(_default_result);
                        _e.fadeIn("fast");
                    });
                }
                //_e.text("?");
            });
            return true;
        };
        _reset_score();

        var _start_flag = 0;
        var _start_callback = function(){
            //$("#trigger").click();
            var _random = parseInt(Math.random() * 50, 10);
            //console.log(_random);
            var _interval = 75 + _random;
            
            if (_start_flag === 0) {
                _start_flag = 1;
                
                if (_reset_score() === false) {
                    return;
                }

                //$.each(_machines, function (_index, _machine) {
                //    _machine.shuffle();
                //});
                
                _vibrate();
                
            
                $.each(_machines, function (_index, _machine) {
                    setTimeout(function () {
                        _slot_group.find(".slotMachine").addClass("running");
                        _machine.shuffle();
                        _machines_sound[_index].play();
                    }, (_index * (_interval % 7) + _interval) * _index );
                });
                
                setTimeout(function () {
                    $(".tap-message").fadeIn(function () {
                        $("body").addClass("cursor-pointer");
                        $("body").removeClass("cursor-wait");
                        _start_flag = 2;
                        
                    });
                    $("#trigger").fadeIn();
                }, _machines.length * _interval);
            }
            else if (_start_flag === 2) {
                
                _start_flag = 3;
                
                _vibrate();
                $("body").removeClass("cursor-pointer");
                $("body").addClass("cursor-wait");
                if ($(".tap-message:visible").length === 1) {
                    $(".tap-message").fadeOut(function () {
                        var _interval = 500;
                        $.each(_machines, function (_index, _machine) {
                        //for (var _index = 0; _index < 4; _index++) {
                            //var _machine = _machines[_index];
                            setTimeout(function () {
                                _machine.shuffle(1, _onComplete);
                                _machines_sound[_index].stop();
                            }, _interval * _index);
                        //}
                        //_start_flag = 4;
                        });
                        setTimeout(function () {
                            $("#trigger").fadeIn();
                            $("body").removeClass("cursor-wait");
                        }, _interval * _machines.length);
                    });
                }
                    /*
                } else if (_start_flag === 4) {
                    for (var _index = 4; _index < 8; _index++) {
                        var _machine = _machines[_index];
                        setTimeout(function () {
                            _machine.shuffle(1, _onComplete);
                            _machines_sound[_index].stop();
                        }, _interval * _index);
                    }
                    _start_flag = 5;
                }
                else {
                    for (var _index = 8; _index < _machines.length; _index++) {
                        var _machine = _machines[_index];
                        setTimeout(function () {
                            _machine.shuffle(1, _onComplete);
                            _machines_sound[_index].stop();
                        }, _interval * _index);
                    }
                    _start_flag = 5;
                }
                    */
                //setTimeout(function () {
                //    _start_flag = 0;
                //}, _machines.length * _interval);
            }
        };

        //$(".slot-group").click(_start_callback);
        $("body").addClass("cursor-pointer");
        $("#trigger").click(_start_callback);
        $(".tap-message").click(function () {
            $("#trigger").click();
        });
        
        var _first = true;
        $(".slot-group").click(function () {
            if (_first === true || _start_flag === 2) {
                $("body").removeClass("cursor-pointer");
                $("#trigger").click();
                _first = false;
            }
        });
        
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
    
    var _last_ori = null;
    var _fix_layout = function () {
        var _total_height = window.innerHeight;
        var _total_width = window.innerWidth;
        
        //--------------------------
        
        var _ori;
        if (_total_width > _total_height) {
            _ori = "landscape";
            $("body").addClass("landscape");
        }
        else {
            _ori = "portrait";
            $("body").removeClass("landscape");
        }
        
        if (_ori !== _last_ori) {
            if (_ori === "landscape") {
                $("body").addClass("landscape");
            }
            else {
                $("body").removeClass("landscape");
            }
        }
        
        /*
        if (_is_mobile()) {
            if ($("body").hasClass("landscape")) {
                alert([_total_width, $("tr").width()]);
                if (parseInt(_total_width / 2, 10) === $("tr").width()) {
                    setTimeout(function () {
                        $("tr").css("width", "100px");
                        alert([_total_width, $("tr").width()]);
                    }, 100);
                }
                //$("tr").css("width", parseInt(_total_width / 3, 10) + "px");
            }
            else {
                //$("tr").css("width", "100%");
            }
            
        }
        */
       
        // 移動
        if (_ori !== _last_ori) {
            var _machines = $(".slot-subgroup");
            if ($("body").hasClass("landscape")) {
                var _td = $(".slot-group tr.landscape td");
                //alert([_machines.filter("[slot_machine='0']").length, _td.length]);
                _machines.filter("[slot_machine='0']").appendTo(_td.eq(0));
                _machines.filter("[slot_machine='1']").appendTo(_td.eq(0));
                _machines.filter("[slot_machine='2']").appendTo(_td.eq(1));
                _machines.filter("[slot_machine='3']").appendTo(_td.eq(1));
                _machines.filter("[slot_machine='4']").appendTo(_td.eq(2));
                _machines.filter("[slot_machine='5']").appendTo(_td.eq(2));
    //            _machines[1].appendTo(_td.eq(0));
    //            _machines[2].appendTo(_td.eq(1));
    //            _machines[3].appendTo(_td.eq(1));
    //            _machines[4].appendTo(_td.eq(2));
    //            _machines[5].appendTo(_td.eq(2));
            }
            else {
                var _td = $(".slot-group tr.portrait td .slot-select");
                //alert(_td.length);
                _machines.filter("[slot_machine='0']").appendTo(_td.eq(0));
                _machines.filter("[slot_machine='1']").appendTo(_td.eq(0));
                _machines.filter("[slot_machine='2']").appendTo(_td.eq(1));
                _machines.filter("[slot_machine='3']").appendTo(_td.eq(1));
                _machines.filter("[slot_machine='4']").appendTo(_td.eq(2));
                _machines.filter("[slot_machine='5']").appendTo(_td.eq(2));
            }
        }
        // ---------------------------------
        
        //if (_is_mobile()) {
        //    _total_height = _total_height - 50;
        //}
        
        $(".slot-group").height(_total_height);
        //var _height = $(".slot-group").height();
        //$(".slot-group").css("margin-top", "-" + (_height/2) + "px");
        
        //----------------------------------
        
        var _tap_message = $(".tap-message");
        
        var _tap_top = (_total_height / 2) - (_tap_message.height() / 2);
        var _tap_left = (_total_width / 2) - (_tap_message.width() / 2);
        //console.log([_total_width, _tap_message.width(), _tap_left]);
        _tap_message.css("top", _tap_top + "px")
            .css("left", _tap_left + "px");
        
        //---------------------------------
        
        if (_ori === "portrait") {
            var _orginal_height = $(".slotMachine .slot:first").height();
            var _max_width = $(".slot-group .slot-subgroup:first").width();
            var _max_height = $(".portrait td:first").height() - $(".slot-machine-score:first").height();
        }
        else {
            var _orginal_height = $(".slotMachine .slot:first").height();
            var _max_width = $(".slot-group .slot-subgroup:first").width();
            var _max_height = $("td:first").height() - $(".slot-machine-score:first").height();
        }
        
        //alert([_max_width, _max_height]);
        
        var _size = _max_width;
        if (_size > _max_height) {
            _size = _max_height;
        }
        _size = parseInt(((_size / 2) - 10), 10);
        //if (_is_mobile()) {
        //    _size = _size / 2;
        //}
        
        
        
        var _interval_height = _orginal_height - _size;
        
        $(".slotMachine, .slotMachine .slot")
                .css("width", _size + "px")
                .css("height", _size + "px");
        
        //$(".slotMachineContainer").css("margin-top", "-" + _size + "px");
        
        var _margin_top = $(".slotMachineContainer:first").css("margin-top");
        var _active_index = $(".slotMachine:first").attr("active_index");
        //console.log(['int 1', _interval_height, _margin_top, _size, _orginal_height]);
        if (_margin_top !== "-" + _size + "px") {
            if (_active_index === undefined && typeof(_margin_top) === "string") {
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
        
        _last_ori = _ori;
    };
    
    setTimeout(function () {
        _fix_layout();
    }, 0);
    
    //if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false) {
    //    $(window).resize(_fix_layout);
    //}
    $(window).resize(_fix_layout);
        

    
    
});