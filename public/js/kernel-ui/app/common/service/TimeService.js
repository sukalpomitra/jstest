/*
 * TimeService
 *
 * A Service where clock components subscribes to get the current time
 *
 * */

(function(angular) {
  'use strict';
  angular.module('eyeota.common')
    .service('TimeService', ['$log', '$q', '$interval', 'SysParams',
      function($log, $q, $interval, SysParams) {

        var that = this;
        that.offsetTime = null;
        that.SysParams = SysParams;

        var subscribers = [];
        var count = 0;
        var unSubscribeCount = 0;

        function subscribe(callback, offset) {
          var deferred = $q.defer();
          if (count === 0) {
            that.clockPromise = startClock();
          }
          subscribers.push({
            id: ++count,
            callback: callback,
            offset: offset,
            active: true
          });
          deferred.resolve(count);
          return deferred.promise;
        }

        function unSubscribe(id) {
          _.set(_.find(subscribers, {
            id: id
          }), 'active', false);
          ++unSubscribeCount;
          if (unSubscribeCount === 0) {
            $interval.cancel(that.clockPromise);
            that.clockPromise = null;
          }
        }

        that.subscribe = subscribe;
        that.unSubscribe = unSubscribe;

        function startClock() {
          $log.debug('Clock started');
          return $interval(function() {
            publishTime();
          }, that.SysParams["time-interval"]);

        }

        function publishTime() {
          _.forEach(subscribers, function(subscriber) {
            if (subscriber.active && _.isFunction(subscriber.callback)) {
              try {
                that.offsetTime = new Date();
                that.offsetTime.addOffset(subscriber.offset);
                subscriber.callback(that.offsetTime);
              } catch (err) {
                $log.debug('error in callback or someone forget to unSubscribe');
                $log.error(err);
              }
            }
          });
        }

        Date.prototype.addOffset = function(n) {
          this.setHours(this.getHours() + parseInt(n));
          if (n.split('.').length > 1) {
            if (parseInt(n) < 0) {
              this.setMinutes(this.getMinutes() - (parseFloat('.' + n.split('.')[1]) * 60));
            } else {
              this.setMinutes(this.getMinutes() + (parseFloat('.' + n.split('.')[1]) * 60));
            }
          }
          return this;
        };

      }
    ]);
}(angular));
