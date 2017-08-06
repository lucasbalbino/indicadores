'use strict';
 
angular.module('Authentication')
 
.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout', 'ENV',
    function ($http, $cookieStore, $rootScope, $timeout, ENV) {
        var service = {};

        service.Login = function (usuario, senha, callback) {
            $timeout(function() {
                $http.post(ENV.API_ENDPOINT + '/login', {
                    usuario: usuario,
                    senha: senha
                }).then(function (data) {
                    if (data.data.usuario != null) {
                        callback(data.data, true);
                    } else {
                        callback(false);
                    }
                });
            }, 1000);

        };
 
        service.SetCredentials = function (data) {
            $cookieStore.put('Authorization', data);
        };
 
        service.ClearCredentials = function () {
            $cookieStore.remove('Authorization');
        };
 
        return service;
    }]);