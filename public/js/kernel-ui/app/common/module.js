define([
  'pathPrefix',
], function(pathPrefix) {
  'use strict';


  var loadEyeotaCommon = function(angular) {
    var common = angular.module('eyeota.common', []);

    common.constant('pathPrefix', pathPrefix);

  };

  return {
    loadAngularModule: loadEyeotaCommon
  };
});
