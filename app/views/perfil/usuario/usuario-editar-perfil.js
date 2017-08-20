(function () {
    'use strict';

    app
        .controller('UsuEditarPerfilCtrl', UsuEditarPerfilCtrl)
        .controller('ModalInstanceEditarPerfilCtrl', ModalInstanceEditarPerfilCtrl);

    /** @ngInject */
    function UsuEditarPerfilCtrl($rootScope, $scope, $http, $state, $uibModal, $log, $timeout, Upload, ENV) {

        $scope.open = function (windowClass, templateUrl, size, usuario) {
            var modalInstance = $uibModal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'ModalInstanceEditarPerfilCtrl',
                size: size,
                resolve: {
                    usuario: function () {
                        return usuario;
                    }
                }
            });

            modalInstance.result.then(
                function (u) {
                    usuario = u;

                    Upload.upload({
                        url: ENV.API_ENDPOINT + '/editarUsuario',
                        data: {
                            usuario: usuario.usuario,
                            nome: usuario.nome,
                            email: usuario.email,
                            avatar: usuario.avatar
                        }
                    }).then(
                        function (response) {
                            $state.reload();
                        },
                        function (response) {
                            console.log("ERRO ao alterar usuário", response);
                        }
                    );

                }, function (u) {
                    $log.info('Modal cancelado em: ' + moment().locale('pt-br').format('LLLL:ss'));
                }
            );

        };

    }

    /** @ngInject */
    function ModalInstanceEditarPerfilCtrl($scope, $uibModalInstance, usuario) {
        $scope.dados = angular.copy(usuario);

        $scope.editarPerfil = function () {
            $uibModalInstance.close($scope.dados);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();