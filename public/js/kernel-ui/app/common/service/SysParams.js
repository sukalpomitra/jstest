define(['pathPrefix'], function(pathPrefix) {
  'use strict';

  var deferredSysParams = $.Deferred();

  // SysParams
  $.ajax({
    type: 'GET',
    url: pathPrefix.KERNEL + 'static/sys-param.json',
    success: function(data) {
      deferredSysParams.resolve(data);
      return data;
    }
  });

  return {
    sysParamsPromise: deferredSysParams.promise()
  };
});
