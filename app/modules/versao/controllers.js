'use strict';

angular.module('Versao')

    .controller('VersaoController',
    ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'ENV',
        function ($scope, $rootScope, $http, $state, $stateParams, ENV) {

            $scope.projetos = [];
            $scope.versoes = [];

            $http.get(ENV.API_ENDPOINT + '/projetos').then(
                function (response) {
                    $scope.projetos = response.data;
                    if (!$rootScope.projeto) {
                        $rootScope.projeto = $scope.projetos[0];
                    }

                    $http.get(ENV.API_ENDPOINT + '/versaoEmAndamento', {
                        params: {
                            projeto: $rootScope.projeto
                        }
                    }).then(
                        function (response) {
                            var versaoEmAndamento = response.data.versao;
                            if (!$rootScope.versao) {
                                $rootScope.versao = versaoEmAndamento;
                            }

                            // Seta versões
                            var versoesProjeto = "";
                            if ($rootScope.projeto == 'Noov')
                                versoesProjeto = 'versoesNoov';
                            else
                                versoesProjeto = 'versoesDFe';
                            $http.get(ENV.API_ENDPOINT + '/' + versoesProjeto).then(function (response) {
                                $scope.versoes = response.data.versoes;
                            });
                        }
                    );
                }
            );

            $scope.alteraProjeto = function (id) {
                $rootScope.projeto = id;
                $rootScope.versao = undefined;

                $state.reload();
            };

            // Muda o Dropdown da versao
            $scope.alteraVersao = function (id) {
                $rootScope.versao = id;

                $state.reload();
            }
        }]);