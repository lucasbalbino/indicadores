(function () {
    'use strict';

    app.controller('ComOportunidadesPorGerenteCtrl', ComOportunidadesPorGerenteCtrl);

    ComOportunidadesPorGerenteCtrl.$inject = ['$scope', '$rootScope', '$http', '$timeout', 'ENV']

    function ComOportunidadesPorGerenteCtrl($scope, $rootScope, $http, $timeout, ENV) {
        $rootScope.metasGerentes = [];
        var gridOPsPorGerente = [];
        var dadosOPsPorGerente = [];

        var mes = moment($rootScope.mes);

        getMetasGerentes(function () {
            opsPorGerente();
        });

        function getMetasGerentes(callback) {
            $http.get(ENV.API_ENDPOINT + '/allMetas').then(
                function (response) {
                    $rootScope.metasGerentes = response.data;
                    callback();
                }
            );
        }

        function opsPorGerente() {
            $http.get(ENV.API_ENDPOINT + '/opsPorGerente', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    gridOPsPorGerente = response.data;

                    $timeout(function () {
                        trataDadosOPs();
                    });
                }
            );
        }

        function trataDadosOPs() {
            var total = {
                gerente: "Total",
                mensalidade: 0,
                setup: 0,
                meta: 0
            };

            for (var i = 0; i < $rootScope.metasGerentes.length; i++) {
                var temp = {
                    gerente: $rootScope.metasGerentes[i].gerente,
                    meta: $rootScope.metasGerentes[i].meta,
                    mensalidade: 0,
                    setup: 0

                };

                for (var j = 0; j < gridOPsPorGerente.length; j++) {
                    if ($rootScope.metasGerentes[i].gerente == gridOPsPorGerente[j].gerente) {
                        temp.mensalidade = gridOPsPorGerente[j].mensalidade;
                        total.mensalidade += gridOPsPorGerente[j].mensalidade;

                        temp.setup = gridOPsPorGerente[j].setup;
                        total.setup += gridOPsPorGerente[j].setup;
                    }
                }

                total.meta += $rootScope.metasGerentes[i].meta;

                dadosOPsPorGerente.push(temp);
            }

            for (i = 0; i < dadosOPsPorGerente.length; i++) {
                graficoOPsPorGerente(i + 1, dadosOPsPorGerente[i]).init();
            }

            graficoOPsPorGerente(0, total).init();
        }

        function graficoOPsPorGerente(i, dados) {
            return {
                init: function () {
                    var bands = [{
                        "color": $rootScope.colors[1],
                        "endValue": 0.7 * dados.meta,
                        "startValue": 0
                    }, {
                        "color": $rootScope.colors[2],
                        "endValue": 0.9 * dados.meta,
                        "startValue": 0.7 * dados.meta
                    }, {
                        "color": $rootScope.colors[3],
                        "endValue": dados.meta,
                        "startValue": 0.9 * dados.meta
                    }];

                    var total = (dados.setup + 12 * dados.mensalidade).toFixed(2);
                    var valorFinal = dados.meta;

                    if (total > dados.meta) {
                        bands.push({
                            "color": $rootScope.colors[0],
                            "endValue": total,
                            "innerRadius": "85%",
                            "startValue": dados.meta
                        });

                        valorFinal = total;
                    }

                    AmCharts.makeChart("ops-por-colaborador" + i, {
                        "type": "gauge",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "axes": [{
                            "axisThickness": 1,
                            "axisAlpha": 0.2,
                            "tickAlpha": 0.2,
                            "valueInterval": valorFinal / 10,
                            "endValue": valorFinal,
                            "bands": bands,
                            "topText": "Meta:\n" + currency(dados.meta),
                            "topTextYOffset": 20,
                            "bottomText": dados.gerente + '\n' + currency(total) + '\n' + ((total / dados.meta) * 100).toFixed(2) + '%',
                            "bottomTextYOffset": -20
                        }],
                        "arrows": [{
                            "value": total
                        }],
                        "export": {
                            "enabled": true
                        }
                    });
                }
            };
        }
    }
})();