'use strict';

angular.module('eyeota.watch.analog', []);
define([ 'clock-ui/app/watch/analog/service/AnalogClockPartsManufacturingService', 'angular-mocks', '_', 'd3'], function() {

    describe(' Service "AnalogClockPartsManufacturingService"', function() {
        var d3 = require('d3');
        var service;
        var SysParams = {
            "clock-radius" : 200
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

        beforeEach(inject(function($injector) {     
            service = $injector.get('AnalogClockPartsManufacturingService');
        }));

        beforeEach(function() {
            var fixture = '<div id="fixture"><span id="analogWatch"></span></div>';

            document.body.insertAdjacentHTML(
              'afterbegin', 
              fixture);
        });

        afterEach(function() {
            document.body.removeChild(document.getElementById('fixture'));
        });


        it('can be initialized', function() {
            expect(service).toBeDefined();
        });

        

        describe(', when calling "createAnalogClockParts()",', function() {

            it('returns a promise', function() {
                var promise = service.createAnalogClockParts(config);
                expect(promise.then).toBeDefined();
            });

            it('returns expected response on resolve', inject(function($rootScope) {

                var output;
                service.createAnalogClockParts(config).then(function(response) {
                    output = response;
                });

                $rootScope.$digest();
                var d = new Date();

                expect(output[0].type).toEqual("hour");
                expect(output[0].value).toEqual(d.getHours());
                expect(output[1].type).toEqual("minute");
                expect(output[1].value).toEqual(d.getMinutes());
            }));

            it('should create a svg element', inject(function($rootScope, $compile) {

                var svg,gClockFace,gClockHands;

                config.testMode = true;
                service.createAnalogClockParts(config).then(function(response) {
                    svg = document.getElementById('svg1');
                    gClockFace = document.getElementById('clock-face');
                    gClockHands = document.getElementById('clock-hands');

                });

                $rootScope.$digest();
                expect(svg).toBeDefined();
                expect(gClockFace).toBeDefined();
                expect(gClockHands).toBeDefined();

            }));


        });

    });
});