(function () {
    'use strict';

    app.controller('ComOportunidadesNoMesCtrl', ComOportunidadesNoMesCtrl);

    /** @ngInject */
    function ComOportunidadesNoMesCtrl($scope, $rootScope, ComercialOportunidadesService) {

        var mes = moment($rootScope.mes);
        var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
        var dataFinal = mes.endOf('month').format('DD/MM/YYYY');

        $scope.query = ComercialOportunidadesService.getOpsPorMesTable(dataInicial, dataFinal);

        $scope.columns = [
            {id: 'op', titulo: 'OP', size: '5%'},
            {id: 'titulo', titulo: 'Título', size: '25%'},
            {id: 'cliente', titulo: 'Cliente', size: '20%'},
            {id: 'gerente', titulo: 'Gerente', size: '10%', class: 'text-center'},
            {id: 'setup', titulo: 'Setup', size: '10%', class: 'text-center'},
            {id: 'mensalidade', titulo: 'Mensalidade', size: '10%', class: 'text-center'},
            {id: 'situacao', titulo: 'Situação', size: '10%', class: 'text-center'},
            {id: 'data', titulo: 'Data do Aceite', size: '10%', class: 'text-center'}
        ];

        $scope.columnsDefs = [{
            targets: [4, 5],
            type: 'brazilian-currency',
            render: function (data) {
                return (data === 0) ? '' : '<div class="tabela-dev-suporte">' + currency(data) + '</div>';
            }
        }, {
            "targets": 0,
            "render": function (data) {
                return '<div class="tabela-dev-suporte">' +
                    '<a target="_blank" href="http://LINK?dados=">' + data + '</a>' + '</div>';
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

        $scope.order = [[7, "desc"]];
    }
})();