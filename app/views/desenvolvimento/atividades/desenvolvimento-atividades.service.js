(function () {
    'use strict';

    app.service('DesenvolvimentoAtividadesService', DesenvolvimentoAtividadesService);

    /** @ngInject */
    function DesenvolvimentoAtividadesService($http, $resource, ENV) {
        return {
            getAtividadesPorProjeto: getAtividadesPorProjeto,
            getAtividadesPorTipo: getAtividadesPorTipo,
            getAtividadesEncerradasPorOrigem: getAtividadesEncerradasPorOrigem,
            getAtividadesNaoLiberadasTable: getAtividadesNaoLiberadasTable
        };


        function getAtividadesPorProjeto(versao) {
            return $http.get(ENV.API_ENDPOINT + '/atividadesPorProjeto', {
                params: {
                    versao: versao
                }
            });
        }

        function getAtividadesPorTipo(versao) {
            return $http.get(ENV.API_ENDPOINT + '/atividadesPorTipo', {
                params: {
                    versao: versao
                }
            });
        }

        function getAtividadesEncerradasPorOrigem(versao) {
            return $http.get(ENV.API_ENDPOINT + '/atividadesEncerradasPorOrigem', {
                params: {
                    versao: versao
                }
            });
        }

        function getAtividadesNaoLiberadasTable(versao) {
            return $resource(ENV.API_ENDPOINT + '/atividadesNaoLiberadas', {
                versao: versao
            }).query().$promise;
        }
    }
})();
