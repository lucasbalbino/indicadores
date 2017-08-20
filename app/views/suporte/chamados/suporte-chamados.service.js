(function () {
    'use strict';

    app.service('SuporteChamadosService', SuporteChamadosService);

    /** @ngInject */
    function SuporteChamadosService($http, $resource, ENV) {
        return {
            getChamadosEncerradosECancelados: getChamadosEncerradosECancelados,
            getOrigensChamado: getOrigensChamado,
            getRankingDeClientesTable: getRankingDeClientesTable
        };

        function getChamadosEncerradosECancelados(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosEncerradosECancelados', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getOrigensChamado() {
            return $http.get(ENV.API_ENDPOINT + '/origensChamado');
        }

        function getRankingDeClientesTable(dataInicial, dataFinal, origem) {
            return $resource(ENV.API_ENDPOINT + '/rankingDeClientes', {
                dataInicial: dataInicial,
                dataFinal: dataFinal,
                origem: origem
            }).query().$promise;
        }
    }
})();
