(function () {
    'use strict';

    app.service('FinanceiroFaturamentoService', FinanceiroFaturamentoService);

    /** @ngInject */
    function FinanceiroFaturamentoService($http, $resource, ENV) {
        return {
            getFaturamentoPorClienteTable: getFaturamentoPorClienteTable,
            getFaturamentoEvolucaoResponsavel: getFaturamentoEvolucaoResponsavel,
            getFaturamentoPorResponsavel: getFaturamentoPorResponsavel,
            getFaturamentoPorResponsavelTable: getFaturamentoPorResponsavelTable,
            getFaturamentoPorMes: getFaturamentoPorMes
        };


        function getFaturamentoPorClienteTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/faturamentoPorCliente', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }

        function getFaturamentoEvolucaoResponsavel() {
            return $http.get(ENV.API_ENDPOINT + '/faturamentoEvolucaoResponsavel');
        }

        function getFaturamentoPorResponsavel(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/faturamentoPorResponsavel', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getFaturamentoPorResponsavelTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/faturamentoPorCliente', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }

        function getFaturamentoPorMes(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/faturamentoPorMes', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }
    }
})();
