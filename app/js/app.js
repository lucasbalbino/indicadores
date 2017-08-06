'use strict';

angular.module('Authentication', []);
angular.module('Versao', []);
angular.module('Mes', []);

var mainModel = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ncy-angular-breadcrumb',
    'ui.bootstrap',
    'ui.select',
    'daterangepicker',
    'ngFileUpload',
    'ngImgCrop',
    'datatables',
    'datatables.buttons',
    'ngCookies',
    'Authentication',
    'Versao',
    'Mes',
    'indicadores.environment.const'
]);

mainModel.controller('MainCtrl', function ($scope, $http, $q, $location, $timeout, $window, domain) {
    $scope.url = domain;
});

mainModel.constant('domain', 'http://backend/indicadores-api');

mainModel.config(
    ['$locationProvider', '$httpProvider', function ($locationProvider, $httpProvider) {
        /* Registers auth token interceptor, auth token is either passed by header or by query parameter
         * as soon as there is an authenticated user */
        $httpProvider.interceptors.push(function ($q, $cookieStore) {
                return {
                    'request': function (config) {
                        var token;
                        try {
                            token = $cookieStore.get('Authorization').data.hash;
                        } catch (err) {
                            token = undefined;
                        }

                        if (angular.isDefined(token)) {
                            config.headers['Authorization'] = token;
                        }
                        return config || $q.when(config);
                    }
                };
            }
        );
    }]);