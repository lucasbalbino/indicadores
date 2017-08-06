(function () {
    'use strict';

    app.controller('DevAtividadesPorOrigemCtrl', DevAtividadesPorOrigemCtrl);

    DevAtividadesPorOrigemCtrl.$inject = ['$rootScope', '$http', '$q', 'ENV'];

    function DevAtividadesPorOrigemCtrl($rootScope, $http, $q, ENV) {
        var dadosAtividadesPorOrigem = [];

        this.atividadesPorOrigem = function(versao) {
            var deferred = $q.defer();
            $http.get(ENV.API_ENDPOINT + '/atividadesEncerradasPorOrigem', {
                params: {
                    versao: versao
                }
            }).then(function (response) {
                    dadosAtividadesPorOrigem = response.data;
                    deferred.resolve(graficoAtividadesPorOrigem().init());
                }
            ).catch(function (e) {
                    deferred.reject(e);
                }
            );
            return deferred.promise;
        };

        function graficoAtividadesPorOrigem() {
            return {
                init: function () {
                    return AmCharts.makeChart( "atividades-por-origem-chart", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosAtividadesPorOrigem,
                        "valueField": "value",
                        "titleField": "label",
                        "labelText": "[[title]]: [[value]] ([[percents]]%)",
                        "fontSize": 12,
                        "responsive": {
                            "enabled": true
                        },
                        "balloon":{
                            "fixedPosition":true
                        },
                        "export": {
                            "enabled": true
                        },
                        "startDuration": 0
                    });
                }
            };
        }
    }
})();