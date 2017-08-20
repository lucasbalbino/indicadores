(function () {
    'use strict';

    app
        .controller('DevAdicionarBacklogCtrl', DevAdicionarBacklogCtrl)
        .controller('ModalInstanceAdicionarBacklogCtrl', ModalInstanceAdicionarBacklogCtrl);

    /** @ngInject */
    function DevAdicionarBacklogCtrl($scope, $uibModal, $log, DevAdicionarBacklogService) {

        $scope.open = function (windowClass, templateUrl, size) {
            var modalInstance = $uibModal.open({
                windowClass: windowClass,
                templateUrl: templateUrl,
                controller: 'ModalInstanceAdicionarBacklogCtrl',
                size: size
            });

            modalInstance.result.then(
                function (result) {
                    var dataFinal = moment(result.dataFinal).format("DD/MM/YYYY");
                    var quantidade = result.quantidade;
                    var versao = result.versao;

                    DevAdicionarBacklogService.inserirBacklogDesenvolvimento(dataFinal, quantidade, versao).then(
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

    /** @ngInject */
    function ModalInstanceAdicionarBacklogCtrl($scope, $uibModalInstance) {
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
    };

})();