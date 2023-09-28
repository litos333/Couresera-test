(function () {
  'use strict';

  angular.module('Data')
  .component('items', {
    templateUrl: 'lib/templates/items.template.html',
    bindings: {
      elements: '<'
    }
  });

})();
