(function () {
    'use strict';

    app.controller('SupAvaliacaoChamadosPorColaboradorCtrl', SupAvaliacaoChamadosPorColaboradorCtrl);

    /** @ngInject */
    function SupAvaliacaoChamadosPorColaboradorCtrl($rootScope, $scope, SuporteAvaliacaoService) {
        var mes = moment($rootScope.mes);

        var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
        var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

        $scope.query = SuporteAvaliacaoService.getAvaliacaoChamadosPorColaboradorTable(dataInicial, dataFinal);

        $scope.columns = [
            {id: 'colaborador', titulo: 'Colaborador', size: "50%"},
            {id: 'otimo', titulo: 'Ótimo', size: "10%", class: "text-center", total: true},
            {id: 'bom', titulo: 'Bom', size: "10%", class: "text-center", total: true},
            {id: 'regular', titulo: 'Regular', size: "10%", class: "text-center", total: true},
            {id: 'ruim', titulo: 'Ruim', size: "10%", class: "text-center", total: true},
            {id: 'total', titulo: 'Total', size: "10%", class: "text-center", total: true}
        ];

        $scope.columnsDefs = [{
            "targets": 5,
            "render": function (data) {
                return '<strong>' + data + '</strong>';
            }
        }];

        $scope.order = [[5, "desc"]];

    }
})();