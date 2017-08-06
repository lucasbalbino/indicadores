( function() {
    'use strict';

    app.controller('FinFaturamentoClientesCtrl', FinFaturamentoClientesCtrl);

    FinFaturamentoClientesCtrl.$inject = ['$rootScope', '$scope', 'ENV']

    function FinFaturamentoClientesCtrl($rootScope, $scope, ENV) {

        var mes = moment($rootScope.mes);

        $scope.query = {
            url: ENV.API_ENDPOINT + '/faturamentoPorCliente',
            data: {
                dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                dataFinal: mes.endOf('month').format('DD/MM/YYYY')
            }
        };

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
                return (data == 0) ? '' : currency(data.toFixed(2));
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