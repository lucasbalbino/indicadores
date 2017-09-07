(function () {
    'use strict';

    app.service('SuporteChamadosService', SuporteChamadosService);

    /** @ngInject */
    function SuporteChamadosService($http, $resource, ENV) {
        return {
            getChamadosPorTipo: getChamadosPorTipo,
            getChamadosPorOrigem: getChamadosPorOrigem,
            getChamadosPorPrioridade: getChamadosPorPrioridade,
            getChamadosPorSuspensao: getChamadosPorSuspensao,
            getChamadosPorUF: getChamadosPorUF,
            getChamadosEncerradosECancelados: getChamadosEncerradosECancelados,
            getOrigensChamado: getOrigensChamado,
            getRankingDeClientesTable: getRankingDeClientesTable
        };


        function getChamadosPorTipo(dataInicial, dataFinal, idCliente) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorTipo', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal,
                    idCliente: idCliente
                }
            });
        }

        function getChamadosPorOrigem(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorOrigem', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getChamadosPorPrioridade(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorPrioridade', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getChamadosPorSuspensao() {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorSuspensao');
        }

        function getChamadosPorUF(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorUF', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

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
