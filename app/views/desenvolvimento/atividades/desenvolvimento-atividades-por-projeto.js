(function () {
    'use strict';

    app.controller('DevAtividadesPorProjetoCtrl', DevAtividadesPorProjetoCtrl);

    DevAtividadesPorProjetoCtrl.$inject = ['$rootScope', '$http', '$q', 'ENV'];

    function DevAtividadesPorProjetoCtrl($rootScope, $http, $q, ENV) {
        var dadosAtividadesPorProjeto = [];

        this.atividadesPorProjeto = function(versao) {
            var deferred = $q.defer();
            $http.get(ENV.API_ENDPOINT + '/atividadesPorProjeto', {
                params: {
                    versao: versao
                }
            }).then(function (response) {
                    dadosAtividadesPorProjeto = response.data;
                    deferred.resolve(graficoAtividadesPorProjeto().init());
                }
            ).catch(function (e) {
                    deferred.reject(e);
                }
            );
            return deferred.promise;
        };

        function graficoAtividadesPorProjeto() {
            return {
                init: function () {
                    return AmCharts.makeChart( "atividades-por-projeto-chart", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosAtividadesPorProjeto,
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