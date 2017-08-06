( function() {
    'use strict';

    app.controller('FinFaturamentoResponsavelCtrl', FinFaturamentoResponsavelCtrl);

    FinFaturamentoResponsavelCtrl.$inject = ['$rootScope', '$scope', 'ENV']

    function FinFaturamentoResponsavelCtrl($rootScope, $scope, ENV) {

        var mes = moment($rootScope.mes);

        $scope.query = {
            url: ENV.API_ENDPOINT + '/faturamentoPorResponsavel',
            data: {
                dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                dataFinal: mes.endOf('month').format('DD/MM/YYYY')
            }
        };

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
                return (data == 0) ? '' : currency(data.toFixed(2));
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