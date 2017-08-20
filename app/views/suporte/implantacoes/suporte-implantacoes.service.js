(function () {
    'use strict';

    app.service('SuporteImplantacoesService', SuporteImplantacoesService);

    /** @ngInject */
    function SuporteImplantacoesService($http, $resource, ENV) {
        return {
            getAquisicoesPorCategoria: getAquisicoesPorCategoria,
            getImplantacoesEmAtendimentoTable: getImplantacoesEmAtendimentoTable,
            getImplantacoesEncerradasTable: getImplantacoesEncerradasTable,
            getImplantacoesPorCategoria: getImplantacoesPorCategoria,
            getValoresCamposAdicionaisTable: getValoresCamposAdicionaisTable
        };


        function getAquisicoesPorCategoria(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/aquisicoesPorCategoria', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getImplantacoesEmAtendimentoTable() {
            return $resource(ENV.API_ENDPOINT + '/implantacoesEmAtendimento').query().$promise;
        }

        function getImplantacoesEncerradasTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/implantacoesEncerradas', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }

        function getImplantacoesPorCategoria(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/implantacoesPorCategoria', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getValoresCamposAdicionaisTable(dataInicial, dataFinal, tipoInformacao) {
            return $resource(ENV.API_ENDPOINT + '/valoresCamposAdicionais', {
                dataInicial: dataInicial,
                dataFinal: dataFinal,
                tipoInformacao: tipoInformacao
            }).query().$promise;
        }
    }
})();
