(function () {
    'use strict';

    app.service('FinanceiroEvolucaoService', FinanceiroEvolucaoService);

    /** @ngInject */
    function FinanceiroEvolucaoService($http, $resource, ENV) {
        return {
            getCrescimentoAnual: getCrescimentoAnual,
            getReceitaMensalAcumuladaTable: getReceitaMensalAcumuladaTable,
            getReceitaXCrescimento: getReceitaXCrescimento,
            getReceitaMensalNosAnos: getReceitaMensalNosAnos
        };


        function getCrescimentoAnual(dataInicialAnoAnterior, dataFinalAnoAnterior, dataInicialAnoAtual, dataFinalAnoAtual) {
            return $http.get(ENV.API_ENDPOINT + '/crescimentoAnual', {
                params: {
                    dataInicialAnoAnterior: dataInicialAnoAnterior,
                    dataFinalAnoAnterior: dataFinalAnoAnterior,
                    dataInicialAnoAtual: dataInicialAnoAtual,
                    dataFinalAnoAtual: dataFinalAnoAtual
                }
            });
        }

        function getReceitaMensalAcumuladaTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/receitaMensalAcumulada', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }

        function getReceitaXCrescimento() {
            return $http.get(ENV.API_ENDPOINT + '/receitaXCrescimento');
        }

        function getReceitaMensalNosAnos(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/receitaMensalNosAnos', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }
    }
})();
