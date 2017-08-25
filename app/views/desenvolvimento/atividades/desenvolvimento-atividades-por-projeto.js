(function () {
    'use strict';

    app.controller('DevAtividadesPorProjetoCtrl', DevAtividadesPorProjetoCtrl);

    /** @ngInject */
    function DevAtividadesPorProjetoCtrl($scope, $rootScope, DesenvolvimentoAtividadesService) {
        $scope.dadosAtividadesPorProjeto = [];

        var watcher = $rootScope.$watch('versao', function () {
            if ($rootScope.versao === undefined) {
                return;
            }
            watcher();
            atividadesPorProjeto($rootScope.versao);
        });

        function atividadesPorProjeto(versao) {
            DesenvolvimentoAtividadesService.getAtividadesPorProjeto(versao).then(
                function (response) {
                    $scope.dadosAtividadesPorProjeto = response.data;
                }
            );
        }
    }
})();