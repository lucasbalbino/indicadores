(function () {
    'use strict';

    app.service('SuporteEvolucaoService', SuporteEvolucaoService);

    /** @ngInject */
    function SuporteEvolucaoService($http, ENV) {
        return {
            getChamadosAbertosEncerrados: getChamadosAbertosEncerrados,
            getChamadosPorTipo: getChamadosPorTipo,
            getChamadosPorColaborador: getChamadosPorColaborador,
            getChamadosPorSituacao: getChamadosPorSituacao
        };


        function getChamadosAbertosEncerrados(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosAbertosEncerrados', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getChamadosPorTipo(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorTipo', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getChamadosPorColaborador(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorColaborador', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getChamadosPorSituacao() {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorSituacao');
        }
    }
})();
