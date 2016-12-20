'use strict';

angular.module('eyeota.common', []);
define([ 'kernel-ui/app/common/service/TimeService', 'angular-mocks', '_' ], function() {

    describe(' Service "TimeService"', function() {
        var service;
        var SysParams = {
            "time-interval" : 1000
        };
        var mockCallback = function(){

        } 

        beforeEach(module('eyeota.common'));


        beforeEach(function() {
            module('eyeota.common', function($provide) {
              $provide.constant('SysParams', SysParams); 
            });
        });

        beforeEach(inject(function($injector) {     
            service = $injector.get('TimeService');
        }));

        it('can be initialized', function() {
            expect(service).toBeDefined();
        });

        

        describe(', when calling "subscribe()",', function() {

            it('returns a promise', function() {
                var promise = service.subscribe(mockCallback, 0);
                expect(promise.then).toBeDefined();
            });

            it('returns expected response on resolve', inject(function($rootScope) {

                var output;
                service.subscribe(mockCallback).then(function(response) {
                    output = response;
                    service.unSubscribe(output);
                });

                $rootScope.$digest();

                expect(output).toEqual(1);
            }));
        });

    });
});