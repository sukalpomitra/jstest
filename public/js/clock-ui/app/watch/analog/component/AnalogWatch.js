/**
 * AnalogWatchComponent is a reusable Analog Watch Component
 *
 * @memberof eyeota.watch.analog
 *
 */
(function(angular) {
  'use strict';

  var AnalogWatchComponent = function($scope, $q, TimeService, AnalogClockPartsManufacturingService, SysParams, d3) {
    var $ctrl = this;
    $ctrl.d3 = d3;

    $ctrl.$onInit = function() {
      if (_.isUndefined($ctrl.backgroundColor)) {
        $ctrl.backgroundColor = SysParams["analog-watch-background-color"];
      }

      if (_.isUndefined($ctrl.secondsTickEnabled)) {
        $ctrl.secondsTickEnabled = SysParams["analog-watch-seconds-tick-enabled"];
      }

      if (_.isUndefined($ctrl.offset)) {
        $ctrl.offset = SysParams["analog-watch-offset"];
      }

      $q.when(TimeService.subscribe(updateTime, $ctrl.offset))
        .then(function(response) {
          $ctrl.subscriberId = response;
          return AnalogClockPartsManufacturingService.createAnalogClockParts($ctrl);
        })
        .then(function(response) {
          $ctrl.handData = response;
        });
    };


    /* Callback function that updates the currentTime */
    var updateTime = function(currentTime) {
      if (!_.isUndefined($ctrl.handData)) {
        $ctrl.handData[0].value = currentTime.getHours() + (currentTime.getMinutes() / 60);
        $ctrl.handData[1].value = currentTime.getMinutes();
        $ctrl.handData[2].value = currentTime.getSeconds();
        $ctrl.tickTock(d3, $ctrl.handData, $ctrl.subscriberId);
      }

    };

    /* unsubscribe on destroy */
    $ctrl.$onDestroy = function() {
      TimeService.unsubscribe($ctrl.subscriberId);
    };

  };


  AnalogWatchComponent.prototype.tickTock = function() {
    var that = this;
    that.d3.select('#svg' + that.subscriberId).select('#clock-hands').selectAll('line')
      .data(that.handData)
      .transition()
      .attr('transform', function(d) {
        return 'rotate(' + d.scale(d.value) + ')';
      });
  };

  AnalogWatchComponent.$inject = ['$scope', '$q', 'TimeService', 'AnalogClockPartsManufacturingService', 'SysParams', 'd3'];

  function AnalogWatchTemplateUrl(pathPrefix) {
    return pathPrefix.CLOCK + 'watch/analog/component/analog-watch.html';
  }

  AnalogWatchTemplateUrl.$injecct = ['pathPrefix'];

  angular.module('eyeota.watch.analog')
    .component('analogWatch', {
      bindings: {
        backgroundColor: '@',
        secondsTickEnabled: '<',
        offset: '@'
      },
      controller: AnalogWatchComponent,
      templateUrl: AnalogWatchTemplateUrl
    });


})(angular);
