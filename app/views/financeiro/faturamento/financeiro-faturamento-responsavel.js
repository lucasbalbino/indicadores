( function() {
    'use strict';

    app.controller('FinFaturamentoResponsavelCtrl', FinFaturamentoResponsavelCtrl);

    /** @ngInject */
    function FinFaturamentoResponsavelCtrl($rootScope, $scope, FinanceiroFaturamentoService) {

        var mes = moment($rootScope.mes);
        var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
        var dataFinal = mes.endOf('month').format('DD/MM/YYYY');

        $scope.query = FinanceiroFaturamentoService.getFaturamentoPorResponsavelTable(dataInicial, dataFinal);

        $scope.columns = [
            {id: 'responsavel', titulo: 'Responsável', size: '45%'},
            {id: 'setup', titulo: 'Setup', size: '15%', class: 'text-center'},
            {id: 'mensalidade', titulo: 'Mensalidade', size: '20%', class: 'text-center'},
            {id: 'total', titulo: 'Total', size: '20%', class: 'text-center'}
        ];

        $scope.columnsDefs = [{
            targets: [1, 2],
            type: 'brazilian-currency',
            render: function (data) {
                return (data === 0) ? '' : currency(data.toFixed(2));
            }
        },{
            targets: 3,
            type: 'brazilian-currency',
            render: function (data) {
                return '<strong>' + currency(data.toFixed(2)) + '</strong>';
            }
        }];

        $scope.order = [[ 3, "desc" ]];
    }
})();