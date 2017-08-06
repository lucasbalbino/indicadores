'use strict';
app
    .controller('UsuAlterarFotoCtrl', [
        '$rootScope', '$scope', '$http', '$state', '$uibModal', '$log', function ($rootScope, $scope, $http, $state, $uibModal, $log) {
            $scope.open = function (windowClass, templateUrl, size, usuario) {
                var modalInstance = $uibModal.open({
                    windowClass: windowClass,
                    templateUrl: templateUrl,
                    controller: 'ModalInstanceAlterarFotoCtrl',
                    size: size,
                    resolve: {
                        usuario: function() {
                            return usuario;
                        }
                    }
                });

                modalInstance.result.then(
                    function (u) {
                        usuario = u;
                        $state.reload();

                    }, function (u) {
                        $log.info('Modal cancelado em: ' + moment().locale('pt-br').format('LLLL:ss'));
                    }
                );

            };

        }
    ]);

app.controller('ModalInstanceAlterarFotoCtrl', function ($rootScope, $scope, $uibModalInstance, $http, $timeout, Upload, usuario, ENV) {
    $scope.dados = angular.copy(usuario);

    $scope.upload = function (original, dataUrl) {
        if(original != null) {
            $scope.dados.avatar = dataUrl;
            console.log(Upload.dataUrltoBlob($scope.dados.avatar));

            Upload.upload({
                url: ENV.API_ENDPOINT + '/editarUsuario',
                data: {
                    usuario: usuario.usuario,
                    nome: usuario.nome,
                    email: usuario.email,
                    avatar: Upload.dataUrltoBlob($scope.dados.avatar)
               }
            }).then(function (response) {
                $timeout(function () {
                    $uibModalInstance.close($scope.dados);
                }, 1000);

            }, function (response) {
                if (response.status > 0) $scope.errorMsg = response.status
                    + ': ' + response.data;

            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});