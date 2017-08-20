(function () {
    'use strict';

    app.service('FinanceiroContratosService', FinanceiroContratosService);

    /** @ngInject */
    function FinanceiroContratosService($http, $resource, ENV) {
        return {
            getContratosCanceladosPorMesTable: getContratosCanceladosPorMesTable,
            getTitulosAbertosClientesTable: getTitulosAbertosClientesTable,
            getTotalEmAbertoPorClienteTable: getTotalEmAbertoPorClienteTable
        };


        function getContratosCanceladosPorMesTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/contratosCanceladosPorMes', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }

        function getTitulosAbertosClientesTable() {
            return $resource(ENV.API_ENDPOINT + '/titulosAbertosClientes').query().$promise;
        }

        function getTotalEmAbertoPorClienteTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/totalEmAbertoPorCliente', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }
    }
})();
