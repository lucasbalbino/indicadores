(function () {
    'use strict';

    app.controller('DevAtividadesPorOrigemCtrl', DevAtividadesPorOrigemCtrl);

    /** @ngInject */
    function DevAtividadesPorOrigemCtrl($scope, $rootScope, DesenvolvimentoAtividadesService) {
        $scope.dadosAtividadesPorOrigem = [];

        var watcher = $rootScope.$watch('versao', function () {
            if ($rootScope.versao === undefined) {
                return;
            }
            watcher();
            atividadesPorOrigem($rootScope.versao);
        });

        function atividadesPorOrigem(versao) {
            DesenvolvimentoAtividadesService.getAtividadesEncerradasPorOrigem(versao).then(
                function (response) {
                    $scope.dadosAtividadesPorOrigem = response.data;
                }
            );
        }
    }
})();