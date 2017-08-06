/**
 * Controlador do modal de metas
 *
 * Created by Isaias Tavares on 15/07/2016.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('MetasModalController', MetasModalController)
        .controller('ModalInstanceComDefinirMetasController', ModalInstanceComDefinirMetasController);

    /** @ngInject */
    function MetasModalController($rootScope, $scope, $uibModal, $log, MetasModalService, ModalUtil) {

        $scope.open = function (windowClass, templateUrl, size) {
            $rootScope.metasGerentes = [];

            getMetas();

            function getMetas() {
                MetasModalService.getMetas().then(function(result) {
                    $rootScope.metasGerentes = result.data;
                }).catch(function(reason) {
                    console.log(reason);
                });
            }

            var modalInstance = $uibModal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'ModalInstanceComDefinirMetasController',
                size: size
            });

            modalInstance.result.then(
                function (result) {
                    salvarMetas(result);
                }, function (u) {
                    $log.info('Modal cancelado em: ' + moment().locale('pt-br').format('LLLL:ss'));
                }
            );

            /**
             * Envia os documentos selecionados por email
             */
            function salvarMetas(metas) {
                MetasModalService.salvarMetas(metas).then(function(result) {
                    ModalUtil.msgSuccess(result.data);
                }).catch(function(reason) {
                    console.log(reason);
                });
            }
        };
    }

    /** @ngInject */
    function ModalInstanceComDefinirMetasController($scope, $rootScope, $uibModalInstance) {

        $scope.definirMetas = function () {
            $uibModalInstance.close($rootScope.metasGerentes);
        };


        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.addGerente = function () {
            $rootScope.metasGerentes.push({
                gerente: '',
                meta: 0
            });
        };

        $scope.removeGerente = function (index) {
            if (index > -1) {
                $rootScope.metasGerentes.splice(index, 1);
            }
        }
    }
})();