( function() {
    'use strict';

    app.controller('FinContratosTotalTitulosPorClienteCtrl', FinContratosTotalTitulosPorClienteCtrl);

    FinContratosTotalTitulosPorClienteCtrl.$inject = ['$rootScope', '$scope', 'ENV']

    function FinContratosTotalTitulosPorClienteCtrl($rootScope, $scope, ENV) {

        var mes = moment($rootScope.mes);

        $scope.query = {
            url: ENV.API_ENDPOINT + '/totalEmAbertoPorCliente',
            data: {
                dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                dataFinal: mes.endOf('month').format('DD/MM/YYYY')
            }
        };

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