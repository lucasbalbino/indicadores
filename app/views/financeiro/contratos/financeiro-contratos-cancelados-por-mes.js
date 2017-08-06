( function() {
    'use strict';

    app.controller('FinContratosCanceladosCtrl', FinContratosCanceladosCtrl);

    FinContratosCanceladosCtrl.$inject = ['$rootScope', '$scope', 'ENV']

    function FinContratosCanceladosCtrl($rootScope, $scope, ENV) {

        var mes = moment($rootScope.mes);

        $scope.query = {
            url: ENV.API_ENDPOINT + '/contratosCanceladosPorMes',
            data: {
                dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                dataFinal: mes.endOf('month').format('DD/MM/YYYY')
            }
        };

        $scope.columns = [
            {id: 'cliente', titulo: 'Cliente', size: '28%', class: 'tabela-dev-suporte'},
            {id: 'responsavel', titulo: 'Responsável', size: '10%', class: 'tabela-dev-suporte'},
            {id: 'valorPerdido', titulo: 'Valor Perdido', size: '10%', class: 'tabela-dev-suporte text-center', total: true, totalTipo: 'real'},
            {id: 'inicioDaVigencia', titulo: 'Início', size: '8%', class: 'tabela-dev-suporte text-center'},
            {id: 'fimDaVigencia', titulo: 'Fim', size: '8%', class: 'tabela-dev-suporte text-center'},
            {id: 'motivo', titulo: 'Motivo do Cancelamento', size: '18%', class: 'tabela-dev-suporte'},
            {id: 'observacao', titulo: 'Observação', size: '18%', class: 'tabela-dev-suporte'}
        ];



        $scope.columnsDefs = [{
            targets: 2,
            type: 'brazilian-currency',
            render: function (data) {
                return (data == 0) ? '' : currency(data.toFixed(2));
            }
        }];
    }
})();