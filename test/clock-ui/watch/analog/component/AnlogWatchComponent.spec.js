'use strict';

angular.module('eyeota.watch.analog', []);
define([ 'clock-ui/app/watch/analog/component/AnalogWatch',
    'clock-ui/app/watch/analog/service/AnalogClockPartsManufacturingService',
    'kernel-ui/app/common/service/TimeService',
     'angular-mocks', '_', 'd3'], function() {

    describe(' Component "AnalogWatchComponent"', function() {
        var d3 = require('d3');
        var analogClockPartsManufacturingService = require('clock-ui/app/watch/analog/service/AnalogClockPartsManufacturingService');
        var timeService = require('kernel-ui/app/common/service/TimeService');
        var ctrl, $componentController;
        var SysParams = {
            "clock-radius" : 200,
            "analog-watch-background-color": "white",
            "analog-watch-seconds-tick-enabled": false,
            "analog-watch-offset": "0"
        };

        var config = new Object();
        config.backgroundColor = "white";
        config.secondsTickEnabled = true;
        config.subscriberId = 1;

        beforeEach(module('eyeota.watch.analog'));


        beforeEach(function() {
            module('eyeota.watch.analog', function($provide) {
              $provide.constant('SysParams', SysParams); 
              $provide.constant('d3', d3); 
            });
        });

        beforeEach(inject(['$componentController','$rootScope', function($ctrl, $rootScope){
                ctrl = $ctrl('analogWatch',{ 
                    TimeService:timeService,
                    AnalogClockPartsManufacturingService:analogClockPartsManufacturingService
                });
                $rootScope.$digest();
            }
        ]));

        it('can be initialized', function() {
            expect(ctrl).toBeDefined();
        });        

    });
});