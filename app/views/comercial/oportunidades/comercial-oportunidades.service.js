(function () {
    'use strict';

    app.service('ComercialOportunidadesService', ComercialOportunidadesService);

    /** @ngInject */
    function ComercialOportunidadesService($http, $resource, ENV) {
        return {
            getOpsPorGerente: getOpsPorGerente,
            getAllMetas: getAllMetas,
            getOpsPorMesTable: getOpsPorMesTable
        };


        function getOpsPorGerente(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/opsPorGerente', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getAllMetas() {
            return $http.get(ENV.API_ENDPOINT + '/allMetas');
        }

        function getOpsPorMesTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/opsPorMes', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }
    }
})();
