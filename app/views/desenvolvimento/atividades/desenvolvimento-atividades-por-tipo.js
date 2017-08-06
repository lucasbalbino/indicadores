(function () {
    'use strict';

    app.controller('DevAtividadesPorTipoCtrl', DevAtividadesPorTipoCtrl);

    DevAtividadesPorTipoCtrl.$inject = ['$rootScope', '$http', '$q', 'ENV'];

    function DevAtividadesPorTipoCtrl($rootScope, $http, $q, ENV) {
        var dadosAtividadesPorTipo = [];

        this.atividadesPorTipo = function(versao) {
            var deferred = $q.defer();

            $http.get(ENV.API_ENDPOINT + '/atividadesPorTipo', {
                params: {
                    versao: versao
                }
            }).then(function (response) {
                    dadosAtividadesPorTipo = response.data;
                    deferred.resolve(graficoAtividadesPorTipo().init());
                }
            ).catch(function (e) {
                    deferred.reject(e);
                }
            );
            return deferred.promise;
        };

        function graficoAtividadesPorTipo() {
            return {
                init: function () {
                    return AmCharts.makeChart( "atividades-por-tipo-chart", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosAtividadesPorTipo,
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