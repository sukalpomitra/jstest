'use strict';

define([ 'kernel-ui/app/common/service/SysParams', 'angular-mocks' ], function() {
    var sysParams = require('kernel-ui/app/common/service/SysParams');

    describe(' Service "SysParams"', function() {
        describe(', when calling "ajax",', function() {

            it('can be initialized', function() {
                expect(sysParams).toBeDefined();
            });

            it('returns a promise', function() {
                var promise = sysParams.sysParamsPromise;
                expect(promise.then).toBeDefined();
            });

            it('returns the system wide configurations', function() {
                $.when(sysParams.sysParamsPromise).done(function(response){
                    expect(response["time-interval"]).toBe(1000);
                })
                
            });            

        });

    });
});