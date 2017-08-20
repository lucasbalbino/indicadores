(function () {
    'use strict';

    app.controller('ComClientesUltimosChamadosCtrl', ComClientesUltimosChamadosCtrl);

    /** @ngInject */
    function ComClientesUltimosChamadosCtrl($scope, $rootScope, ComercialClientesService) {
        if ($rootScope.idCliente === null || $rootScope.idCliente === undefined) {
            $rootScope.idCliente = 0;
        }

        $scope.query = ComercialClientesService.getUltimosChamadosTable($rootScope.idCliente);

        $scope.columns = [
            {id: 'chamado', titulo: 'Chamado', size: "10%", class: "text-center"},
            {id: 'titulo', titulo: 'Título', size: "35%"},
            {id: 'contato', titulo: 'Contato', size: "15%", class: "text-center"},
            {id: 'dateAbertura', titulo: 'Data de Abertura', size: "10%", class: "text-center"},
            {id: 'situacao', titulo: 'Situação', size: "10%", class: "text-center"},
            {id: 'tipo', titulo: 'Tipo', size: "10%", class: "text-center"},
            {id: 'responsavel', titulo: 'Atendente', size: "10%", class: "text-center"}
        ];

        $scope.columnsDefs = [{
            "targets": 0,
            "render": function (data) {
                return '<div class="tabela-dev-suporte">' +
                    '<a target="_blank" href="http://LINK?dados=' + data + '">' + data + '</a>' + '</div>';
            }
        }, {
            "targets": ['_all'],
            "render": function (data) {
                if (data !== null) {
                    return '<div class="tabela-dev-suporte">' + data + '</div>';
                } else {
                    return '';
                }
            }
        }];

        $scope.order = [[0, "desc"]];
    }
})();