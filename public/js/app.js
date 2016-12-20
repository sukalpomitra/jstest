define([
  '../js/kernel-ui/app/common/service/SysParams',
  'pathPrefix',
  'common-mod',
  'd3'
], function(sysParamsPromise, pathPrefix, common, d3) {
  'use strict';
  // Initialize the Angular app with pre-loaded System Parameters
  $.when(sysParamsPromise.sysParamsPromise).done(function(sysParams) {
    common.loadAngularModule(angular);

    angular.module('eyeota.common', []);
    angular.module('eyeota.common')
      .constant('d3', d3)
      .constant('pathPrefix', pathPrefix);
    angular.module('eyeota', ['oc.lazyLoad']).constant('SysParams', sysParams);


    angular.module('eyeota').config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
        jsLoader: require,
        debug: true,
        modules: [{
          name: 'eyeota-common',
          serie: true,
          files: [
            pathPrefix.KERNEL + 'common/service/TimeService.js'
          ]
        }, {
          name: 'eyeota-clock',
          serie: true,
          files: [
            pathPrefix.CLOCK + 'watch/analog/module.js',
            pathPrefix.CLOCK + 'watch/analog/service/AnalogClockPartsManufacturingService.js',
            pathPrefix.CLOCK + 'watch/analog/component/AnalogWatch.js'
          ]
        }]
      });
    }]).run(['$ocLazyLoad', function($ocLazyLoad) {
      $ocLazyLoad.load('eyeota-common');
    }]);

    angular.bootstrap(document, ['eyeota']);

  });

});
