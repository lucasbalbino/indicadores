(function () {
    'use strict';

    app.service('DesenvolvimentoEvolucaoService', DesenvolvimentoEvolucaoService);

    /** @ngInject */
    function DesenvolvimentoEvolucaoService($http, $resource, ENV) {
        return {
            getAtividadesPorSituacao: getAtividadesPorSituacao,
            getEvolucaoBacklogDesenvolvimento: getEvolucaoBacklogDesenvolvimento,
            getRelacaoAtividadesAbertasEncerradasTable: getRelacaoAtividadesAbertasEncerradasTable
        };


        function getAtividadesPorSituacao(versao) {
            return $http.get(ENV.API_ENDPOINT + '/atividadesPorSituacao', {
                params: {
                    versao: versao
                }
            });
        }

        function getEvolucaoBacklogDesenvolvimento(versao) {
            return $http.get(ENV.API_ENDPOINT + '/evolucaoBacklogDesenvolvimento', {
                params: {
                    versao: versao
                }
            });
        }

        function getRelacaoAtividadesAbertasEncerradasTable(versao, dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/relacaoAtividadesAbertasEncerradas', {
                versao: versao,
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }
    }
})();
