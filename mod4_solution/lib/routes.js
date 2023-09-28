(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to Home if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'lib/templates/home.template.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'lib/templates/main-categories.template.html',
        controller: 'CategoriesController as categories',
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('items', {
        url: '/item/{categoryShortName}',
        templateUrl: 'lib/templates/main-items.template.html',
        controller: 'ItemsController as items'
      });
  }

})();
