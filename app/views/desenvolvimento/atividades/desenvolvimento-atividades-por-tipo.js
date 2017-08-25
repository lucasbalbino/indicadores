(function () {
    'use strict';

    app.controller('DevAtividadesPorTipoCtrl', DevAtividadesPorTipoCtrl);

    /** @ngInject */
    function DevAtividadesPorTipoCtrl($scope, $rootScope, DesenvolvimentoAtividadesService) {
        $scope.dadosAtividadesPorTipo = [];

        var watcher = $rootScope.$watch('versao', function () {
            if ($rootScope.versao === undefined) {
                return;
            }
            watcher();
            atividadesPorTipo($rootScope.versao);
        });

        function atividadesPorTipo(versao) {
            DesenvolvimentoAtividadesService.getAtividadesPorTipo(versao).then(
                function (response) {
                    $scope.dadosAtividadesPorTipo = response.data;
                }
            );
        }
    }

})();