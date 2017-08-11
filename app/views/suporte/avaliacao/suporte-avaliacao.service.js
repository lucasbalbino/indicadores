(function () {
    'use strict';

    app.service('SuporteAvaliacaoService', SuporteAvaliacaoService);

    /** @ngInject */
    function SuporteAvaliacaoService($http, $resource, ENV) {
        return {
            getAvaliacaoChamadosPorColaborador: getAvaliacaoChamadosPorColaborador,
            getAvaliacaoChamadosPorColaboradorTable: getAvaliacaoChamadosPorColaboradorTable,
            getAvaliacaoChamadosQuantidade: getAvaliacaoChamadosQuantidade,
            getAvaliacaoChatPorColaborador: getAvaliacaoChatPorColaborador,
            getAvaliacaoChatPorColaboradorTable: getAvaliacaoChatPorColaboradorTable,
            getAvaliacaoChatQuantidade: getAvaliacaoChatQuantidade
        };

        function getAvaliacaoChamadosPorColaborador(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/avaliacaoChamadosPorColaborador', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getAvaliacaoChamadosPorColaboradorTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/avaliacaoChamadosPorColaborador', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }

        function getAvaliacaoChamadosQuantidade(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/avaliacaoChamadosQuantidade', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getAvaliacaoChatPorColaborador(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/avaliacaoChatPorColaborador', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getAvaliacaoChatPorColaboradorTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/avaliacaoChatPorColaborador', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }

        function getAvaliacaoChatQuantidade(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/avaliacaoChatQuantidade', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }
    }
})();
