/**
 * Created by Isaias on 09/09/2015.
 */
(function () {
    'use strict';

    app.controller('DevColaboradoresDesenvolvidasCtrl', DevColaboradoresDesenvolvidasCtrl);

    /** @ngInject */
    function DevColaboradoresDesenvolvidasCtrl($scope, $rootScope, DesenvolvimentoColaboradoresService) {
        $scope.atividadesResolvidasPorColaborador = [];

        var watcher = $rootScope.$watch('versao', function () {
            if ($rootScope.versao === undefined) {
                return;
            }
            watcher();
            resolvidasPorColaborador($rootScope.versao);
        });

        function resolvidasPorColaborador(versao) {
            DesenvolvimentoColaboradoresService.getResolvidasPorColaborador(versao).then(
                function (response) {
                    $scope.atividadesResolvidasPorColaborador = response.data;
                }
            );
        }
    }
})();