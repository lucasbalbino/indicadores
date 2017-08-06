'use strict';
app
    .controller('DevAdicionarBacklogCtrl', [
        '$rootScope', '$scope', '$http', '$state', '$uibModal', '$log', 'ENV', function ($rootScope, $scope, $http, $state, $uibModal, $log, ENV) {
            $scope.open = function (windowClass, templateUrl, size) {
                var modalInstance = $uibModal.open({
                    windowClass: windowClass,
                    templateUrl: templateUrl,
                    controller: 'ModalInstanceAdicionarBacklogCtrl',
                    size: size
                });

                modalInstance.result.then(
                    function (result) {
                        $http.get(ENV.API_ENDPOINT + '/inserirBacklogDesenvolvimento', {
                            params: {
                                dataFinal: moment(result.dataFinal).format("DD/MM/YYYY"),
                                quantidade: result.quantidade,
                                versao: result.versao
                            }
                        }).then(
                            function (response) {
                                console.log("Backlog incluido no banco", response);
                            },
                            function (response) {
                                console.log("ERRO ao incluir backlog", response);
                            }
                        );

                    }, function (u) {
                        $log.info('Modal cancelado em: ' + moment().locale('pt-br').format('LLLL:ss'));
                    }
                );

            };
        }
    ]);

app.controller('ModalInstanceAdicionarBacklogCtrl', function ($scope, $uibModalInstance) {
    $scope.backlog = {
        dataFinal: null,
        quantidade: null,
        versao: null
    };

    $scope.adicionarBacklog = function () {
        $uibModalInstance.close($scope.backlog);
    };


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});