'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
    .module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main/index.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
