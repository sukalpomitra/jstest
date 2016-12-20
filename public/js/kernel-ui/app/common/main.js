var eyeotaPathPrefix = {
  LIB: '../libs/',
  KERNEL: '/js/kernel-ui/app/'
};

(function(eyeotaPathPrefix) {
  'use strict';

  require.config({

    baseUrl: '/js',
    paths: {
      'angular': eyeotaPathPrefix.LIB + 'plugins-eyeota/angular/angular',
      'angular-route': eyeotaPathPrefix.LIB + 'plugins-eyeota/angular-route/angular-route',
      'ocLazyLoad': eyeotaPathPrefix.LIB + 'plugins-eyeota/oclazyload/dist/ocLazyLoad',
      'd3': eyeotaPathPrefix.LIB + 'plugins-eyeota/d3/d3.min',

      'common-mod': eyeotaPathPrefix.KERNEL + 'common/module',
      'sys-params': eyeotaPathPrefix.KERNEL + 'common/service/sys-params',
      'jquery': eyeotaPathPrefix.LIB + 'plugins-eyeota/jquery/dist/jquery.min',
      'pathPrefix': eyeotaPathPrefix.KERNEL + 'common/pathPrefix'
    },
    shim: {
      'angular': {
        'exports': 'angular'
      },
      'angular-route': {
        deps: ['angular'],
        exports: 'angular-route'
      },
      'ocLazyLoad': {
        deps: ['angular'],
        exports: 'ocLazyLoad'
      },
      'common-mod': {
        deps: ['ocLazyLoad', 'angular-route'],
        exports: 'common-mod'
      }
    }
  });
}(eyeotaPathPrefix));
