( function() {
    'use strict';

    app.controller('FinContratosTitulosEmAbertoCtrl', FinContratosTitulosEmAbertoCtrl);

    /** @ngInject */
    function FinContratosTitulosEmAbertoCtrl($rootScope, $scope, FinanceiroContratosService) {

        var mes = moment($rootScope.mes);

        $scope.query = FinanceiroContratosService.getTitulosAbertosClientesTable();

        $scope.columns = [
            {id: 'cliente', titulo: 'Cliente', size: '60%'},
            {id: 'nf', titulo: 'NF', size: '10%', class: 'text-center'},
            {id: 'valor', titulo: 'Valor', size: '15%', class: 'text-center'},
            {id: 'vencimento', titulo: 'Data de Vencimento', size: '15%', class: 'text-center'}
        ];

        $scope.order = [[ 3, "desc" ]];

        $scope.columnsDefs = [{
            targets: 2,
            type: 'brazilian-currency',
            render: function (data) {
                return currency(data.toFixed(2));
            }
        }];
    }
})();