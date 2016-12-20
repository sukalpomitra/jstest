/*
 * AnalogWatchComponentService
 *
 * A Service where d3 analog clock components are formed and returned to form the clock in svg
 *
 * */

(function(angular) {
  'use strict';
  angular.module('eyeota.watch.analog')
    .service('AnalogClockPartsManufacturingService', ['$q', 'SysParams', 'd3',
      function($q, SysParams, d3) {

        var radians = 0.0174532925,
          clockRadius = SysParams["clock-radius"],
          margin = 50,
          width = (clockRadius + margin) * 2,
          height = (clockRadius + margin) * 2,
          hourHandLength = 2 * clockRadius / 3,
          secondTickLength = -10,
          hourTickLength = -18,
          minuteHandLength = clockRadius - 55,
          secondHandLength = clockRadius - 40,
          hourLabelRadius = clockRadius - 40,
          hourLabelYOffset = 7;

        var hourScale = d3.scaleLinear()
          .range([0, 330])
          .domain([0, 11]);

        var minuteSecondScale = d3.scaleLinear()
          .range([0, 354])
          .domain([0, 59]);

        var handData = [{
          type: 'hour',
          value: new Date().getHours(),
          length: -hourHandLength,
          scale: hourScale
        }, {
          type: 'minute',
          value: new Date().getMinutes(),
          length: -minuteHandLength,
          scale: minuteSecondScale
        }, {
          type: 'second',
          value: new Date().getSeconds(),
          length: -secondHandLength,
          scale: minuteSecondScale,
        }];

        var createSvgComponent = function(subscriberId) {
          return d3.select("#analogWatch")
            .append("svg:svg")
            .attr('id', 'svg' + subscriberId)
            .attr("width", width)
            .attr("height", height);
        };

        var createClockFace = function(svg) {
          return svg.append('g')
            .attr('id', 'clock-face')
            .attr('transform', 'translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');
        };

        var createWatchRim = function(svg, config) {
          svg.selectAll('.watch-rim')
            .data(d3.range(0, 1)).enter()
            .append('circle')
            .attr('class', 'watch-rim')
            .attr('fill', config.backgroundColor)
            .attr('r', clockRadius)
            .attr('cx', (clockRadius + margin))
            .attr('cy', (clockRadius + margin));
        };

        var createTicks = function(face, cssClass, maxRange, tickLength, scale) {
          face.selectAll('.' + cssClass)
            .data(d3.range(0, maxRange)).enter()
            .append('line')
            .attr('class', cssClass)
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', clockRadius)
            .attr('y2', clockRadius + tickLength)
            .attr('transform', function(d) {
              return 'rotate(' + scale(d) + ')';
            });
        };

        var createHourLabels = function(face) {
          face.selectAll('.hour-label')
            .data(d3.range(3, 13, 3))
            .enter()
            .append('text')
            .attr('class', 'hour-label')
            .attr('text-anchor', 'middle')
            .attr('x', function(d) {
              return hourLabelRadius * Math.sin(hourScale(d) * radians);
            })
            .attr('y', function(d) {
              return -hourLabelRadius * Math.cos(hourScale(d) * radians) + hourLabelYOffset;
            })
            .text(function(d) {
              return d;
            });
        };

        var createHands = function(face) {
          var hands = face.append('g').attr('id', 'clock-hands');
          hands.selectAll('line')
            .data(handData)
            .enter()
            .append('line')
            .attr('class', function(d) {
              return d.type + '-hand';
            })
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', function(d) {
              return d.length;
            })
            .attr('transform', function(d) {
              return 'rotate(' + d.scale(d.value) + ')';
            });
        };


        var analogWatchComponent = {
          createAnalogClockParts: function(config) {
            var deferred = $q.defer();
            var svg = createSvgComponent(config.subscriberId);
            createWatchRim(svg, config);
            var face = createClockFace(svg);
            if (config.secondsTickEnabled) {
              createTicks(face, 'second-tick', 60, secondTickLength, minuteSecondScale);
            }
            createTicks(face, 'hour-tick', 12, hourTickLength, hourScale);
            createHourLabels(face);
            createHands(face);

            if (_.isUndefined(config.testMode)) {
              deferred.resolve(handData);
            } else {
              deferred.resolve(svg);
            }
            return deferred.promise;
          }
        };

        return analogWatchComponent;

      }
    ]);
}(angular));
