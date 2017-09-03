/**
 * Created by Isaias on 09/09/2015.
 */
(function () {
    'use strict';

    app.controller('DevColaboradoresTestadasCtrl', DevColaboradoresTestadasCtrl);

    /** @ngInject */
    function DevColaboradoresTestadasCtrl($scope, $rootScope, DesenvolvimentoColaboradoresService) {
        var watcher = $rootScope.$watch('versao', function () {
            if ($rootScope.versao === undefined) {
                return;
            }
            watcher();
            testadasPorColaborador($rootScope.versao);
        });

        function testadasPorColaborador(versao) {
            DesenvolvimentoColaboradoresService.getTestadasPorColaborador(versao).then(
                function (response) {
                    $scope.atividadesTestadasPorColaborador = response.data;
                }
            );
        }
    }
})();