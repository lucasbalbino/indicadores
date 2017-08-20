( function() {
    'use strict';

    app.controller('FinFaturamentoClientesCtrl', FinFaturamentoClientesCtrl);

    /** @ngInject */
    function FinFaturamentoClientesCtrl($rootScope, $scope, FinanceiroFaturamentoService) {

        var mes = moment($rootScope.mes);
        var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
        var dataFinal = mes.endOf('month').format('DD/MM/YYYY');

        $scope.query = FinanceiroFaturamentoService.getFaturamentoPorClienteTable(dataInicial, dataFinal);

        $scope.columns = [
            {id: 'cliente', titulo: 'Cliente', size: '40%'},
            {id: 'responsavel', titulo: 'Responsável', size: '20%', class: 'text-center'},
            {id: 'setup', titulo: 'Setup', size: '10%', class: 'text-center'},
            {id: 'mensalidade', titulo: 'Mensalidade', size: '15%', class: 'text-center'},
            {id: 'total', titulo: 'Total', size: '15%', class: 'text-center'}
        ];

        $scope.columnsDefs = [{
            targets: [2, 3],
            type: 'brazilian-currency',
            render: function (data) {
                return (data === 0) ? '' : currency(data.toFixed(2));
            }
        },{
            targets: 4,
            type: 'brazilian-currency',
            render: function (data) {
                return '<strong>' + currency(data.toFixed(2)) + '</strong>';
            }
        }];

        $scope.order = [[ 4, "desc" ]];
    }
})();