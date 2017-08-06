'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', '$state', '$http', 'ENV', 'AuthenticationService',
    function ($scope, $rootScope, $location, $state, $http, ENV, AuthenticationService) {
        $rootScope.usuario = null;
        $scope.avatar = "";

        // reset login status
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.usuario, $scope.senha, function(data, success) {
                if(success) {
                    AuthenticationService.SetCredentials(data);
                    if (data.grupos.includes('desenvolvedores')) {
                        $state.go('desenvolvimento.evolucao');
                    } else if (data.grupos.includes('equipe-suporte')) {
                        $state.go('suporte.evolucao');
                    } else if (data.grupos.includes('comercial')) {
                        $state.go('comercial.oportunidades');
                    } else if (data.grupos.includes('continuous-delivery')) {
                        $state.go('integracao-continua.builds');
                    } else if (data.grupos.includes('administrativo')) {
                        $state.go('financeiro.evolucao');
                    } else {
                        $state.go('desenvolvimento.evolucao');
                    }
                } else {
                    $scope.error = "Usuário ou Senha Inválidos";
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.buscarAvatar = function() {
            if($scope.usuario != null) {
                $http.get(ENV.API_ENDPOINT + '/getAvatar', {
                    params: {
                        usuario: $scope.usuario
                    }
                }).then(
                    function (response) {
                        $scope.avatar = response.data.avatar;
                    },
                    function (response) {
                        console.log("ERRO ao buscar avatar", response);
                    }
                );
            } else {
                $scope.avatar = "";
            }
        }
    }]);