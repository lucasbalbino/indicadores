/**
 * Created by Isaias on 07/09/2015.
 */
(function () {
    'use strict';

    app.controller('DevAtividadesNaoLiberadasCtrl', DevAtividadesNaoLiberadasCtrl);

    DevAtividadesNaoLiberadasCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'ENV'];

    function DevAtividadesNaoLiberadasCtrl($scope, $rootScope, $timeout, ENV) {
        $scope.loaded = false;

        $timeout(function () {
            $scope.query = {
                url: ENV.API_ENDPOINT + '/atividadesNaoLiberadas',
                data: {
                    versao: $rootScope.versao
                }
            };
            $scope.loaded = true;
        }, 1500);

        $scope.columns = [
            {id: 'atividade', titulo: 'Tipo', size: '10%', class: "text-center"},
            {id: 'titulo', titulo: 'Título', size: '80%'},
            {id: 'quantidade', titulo: 'Quantidade', size: '10%', class: "text-center"}
        ];

        $scope.columnsDefs = [
            {
                "targets": 0,
                "render": function (data) {
                    return '<a target="_blank" href="http://LINK?dados=' + data + '">' + data + '</a>';
                }
            }
        ];

        $scope.order = [[2, "desc"]];
    }
})();