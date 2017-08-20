( function() {
    'use strict';

    app.controller('FinContratosTotalTitulosPorClienteCtrl', FinContratosTotalTitulosPorClienteCtrl);

    /** @ngInject */
    function FinContratosTotalTitulosPorClienteCtrl($rootScope, $scope, FinanceiroContratosService) {

        var mes = moment($rootScope.mes);
        var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
        var dataFinal = mes.endOf('month').format('DD/MM/YYYY');

        $scope.query = FinanceiroContratosService.getTotalEmAbertoPorClienteTable(dataInicial, dataFinal);

        $scope.columns = [
            {id: 'cliente', titulo: 'Cliente', size: '70%'},
            {id: 'valor', titulo: 'Valor em Aberto', size: '30%', class: 'text-center'}
        ];

        $scope.order = [[ 1, "desc" ]];

        $scope.columnsDefs = [{
            targets: 1,
            type: 'brazilian-currency',
            render: function (data) {
                return currency(data.toFixed(2));
            }
        }];
    }
})();