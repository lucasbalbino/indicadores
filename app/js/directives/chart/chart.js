(function () {
    'use strict';

    angular.module('app')
        .directive('indicadoresChart', function ($rootScope) {
            return {
                template: '<div id="{{chartId}}" class="{{chartClass}}"></div>',
                restrict: "E",
                scope: {
                    chartId: '@',
                    chartClass: '@',
                    source: '=',
                    type: '@',
                    options: '=?'
                },
                link: IndicadoresChartLink
            };

            function IndicadoresChartLink(scope) {
                var chart = false;

                var watcher = scope.$watch('source', function () {
                    if (scope.source === undefined || scope.source.length === 0) {
                        return;
                    }
                    watcher();

                    var chartOptions = {};

                    if (scope.type === "pie") {
                        chartOptions = {
                            "type": "pie",
                            "theme": "light",
                            "colors": $rootScope.colors,
                            "fontFamily": "'Open Sans', 'Segoe UI'",
                            "dataProvider": scope.source,
                            "valueField": "value",
                            "titleField": "label",
                            "labelText": "[[title]]: [[value]] ([[percents]]%)",
                            "fontSize": 12,
                            "responsive": {
                                "enabled": true
                            },
                            "balloon": {
                                "fixedPosition": true
                            },
                            "export": {
                                "enabled": true
                            }
                        };
                    } else if (scope.type === "column") {
                        chartOptions = {
                            "type": "serial",
                            "theme": "light",
                            "colors": $rootScope.colors,
                            "fontFamily": "'Open Sans', 'Segoe UI'",
                            "dataProvider": scope.source,
                            "graphs": [{
                                "balloonText": "[[value]]",
                                "labelText": "[[value]]",
                                "fillAlphas": 0.8,
                                "lineAlpha": 0.2,
                                "type": "column",
                                "valueField": "value"
                            }],
                            "categoryAxis": {
                                "autoWrap": true
                            },
                            "chartCursor": {
                                "categoryBalloonEnabled": false,
                                "cursorAlpha": 0,
                                "zoomable": false
                            },
                            "startDuration": 1,
                            "categoryField": "label",
                            "export": {
                                "enabled": true
                            }
                        };

                        if (scope.options) {
                            if (scope.options.graphs) {
                                chartOptions.graphs = [];

                                for (var i = 0; i < scope.options.graphs.length; i++) {
                                    var balloonText = "[[value]]";
                                    if (scope.options.balloonText) {
                                        balloonText = scope.options.balloonText;
                                    }

                                    chartOptions.graphs.push({
                                        "balloonText": balloonText,
                                        "labelText": "[[value]]",
                                        "fillAlphas": 0.8,
                                        "lineAlpha": 0.2,
                                        "type": "column",
                                        "valueField": scope.options.graphs[i].valueField,
                                        "title": scope.options.graphs[i].title,
                                        "showAllValueLabels": scope.options.showAllValueLabels
                                    });


                                    if(scope.options.currency) {
                                        if (scope.options.graphs[i].balloonFunction) {
                                            delete chartOptions.graphs[i].balloonText;
                                            chartOptions.graphs[i].balloonFunction = balloonFunction;
                                        }
                                        if (scope.options.graphs[i].labelFunction) {
                                            chartOptions.graphs[i].labelFunction = labelFunction;
                                        }
                                    }
                                }
                            }
                            if (scope.options.legend) {
                                chartOptions.legend = scope.options.legend;
                            }
                            if (scope.options.categoryField) {
                                chartOptions.categoryField = scope.options.categoryField;
                            }
                            if (scope.options.valueAxes) {
                                chartOptions.valueAxes = scope.options.valueAxes;
                            }
                        }
                    } else if (scope.type === "bar") {
                        chartOptions = {
                            "type": "serial",
                            "theme": "light",
                            "colors": $rootScope.colors,
                            "fontFamily": "'Open Sans', 'Segoe UI'",
                            "dataProvider": scope.source,
                            "valueAxes": [{
                                "gridColor": "#FFFFFF",
                                "gridAlpha": 0.2,
                                "dashLength": 0
                            }],
                            "gridAboveGraphs": true,
                            "startDuration": 1,
                            "graphs": [{
                                "balloonText": "[[value]]",
                                "labelText": "[[value]]",
                                "fillAlphas": 0.8,
                                "lineAlpha": 0.2,
                                "type": "column",
                                "valueField": "quantidade"
                            }],
                            "chartCursor": {
                                "categoryBalloonEnabled": false,
                                "cursorAlpha": 0,
                                "zoomable": false
                            },
                            "categoryField": "categoria",
                            "categoryAxis": {
                                "gridPosition": "middle",
                                "gridAlpha": 0,
                                "tickPosition": "middle",
                                "tickLength": 5
                            },
                            "rotate": true
                        };
                    } else if (scope.type === "line") {
                        chartOptions = {
                            "type": "serial",
                            "theme": "light",
                            "colors": $rootScope.colors,
                            "fontFamily": "'Open Sans', 'Segoe UI'",
                            "dataProvider": scope.source,
                            "marginRight": 40,
                            "marginLeft": 40,
                            "autoMarginOffset": 20,
                            "dataDateFormat": "DD/MM/YYYY",
                            "valueAxes": [{
                                "id": "v1",
                                "axisAlpha": 0,
                                "position": "left",
                                "ignoreAxisWidth": true
                            }],
                            "balloon": {
                                "borderThickness": 1,
                                "shadowAlpha": 0
                            },
                            "graphs": [{
                                "id": "g1",
                                "bullet": "round",
                                "bulletBorderAlpha": 1,
                                "bulletColor": "#FFFFFF",
                                "bulletSize": 5,
                                "hideBulletsCount": 50,
                                "lineThickness": 2,
                                "title": "Abertos",
                                "useLineColorForBulletBorder": true,
                                "valueField": "abertos",
                                "balloonText": "[[value]] aberto(s)"
                            }, {
                                "id": "g2",
                                "bullet": "round",
                                "bulletBorderAlpha": 1,
                                "bulletColor": "#FFFFFF",
                                "bulletSize": 5,
                                "hideBulletsCount": 50,
                                "lineThickness": 2,
                                "title": "Encerrados",
                                "useLineColorForBulletBorder": true,
                                "valueField": "encerrados",
                                "balloonText": "[[value]] encerrado(s)"
                            }],
                            "chartCursor": {
                                "valueLineEnabled": true,
                                "valueLineBalloonEnabled": true,
                                "cursorAlpha": 1,
                                "cursorColor": "#258cbb",
                                "limitToGraph": "g1",
                                "valueLineAlpha": 0.2,
                                "categoryBalloonDateFormat": "DD/MM/YYYY"
                            },
                            "categoryField": "data",
                            "categoryAxis": {
                                "parseDates": true,
                                "dashLength": 1,
                                "minorGridEnabled": true,
                                "minorTickLength": 1,
                                "minHorizontalGap": 1,
                                "labelFunction": function (valueText, date, categoryAxis) {
                                    return moment(date).format("DD");
                                }
                            },
                            "export": {
                                "enabled": true
                            },
                            "legend": {}
                        };
                    }

                    initChart(chartOptions);


                    function initChart(options) {
                        if (chart) {
                            chart.destroy();
                        }
                        chart = AmCharts.makeChart(scope.chartId, options);

                        if (scope.options && scope.options.total) {
                            addTotal(chart);
                        }
                    }

                    function balloonFunction(graphDataItem, graph) {
                        return "<b>" + graph.title + "</b><br><span style='font-size:14px'>" +
                            graphDataItem.category + ": <b>" +
                            currency(graphDataItem.dataContext[graph.valueField]) + "</b></span>";
                    }

                    function labelFunction(graphDataItem, graph) {
                        return currency(graphDataItem.dataContext[graphDataItem.graph.valueField]);
                    }

                    function addTotal(chart) {
                        // iterate through data
                        for (var i = 0; i < chart.dataProvider.length; i++) {
                            var dp = chart.dataProvider[i];
                            dp.total = 0;
                            dp.totalText = 0;
                            for (var x = 0; x < chart.graphs.length; x++) {
                                var g = chart.graphs[x];
                                if (dp[g.valueField]) {
                                    dp.totalText += parseInt(dp[g.valueField]);
                                    if (dp[g.valueField] > 0) {
                                        dp.total += parseInt(dp[g.valueField]);
                                    }
                                }
                            }
                            if(scope.options.currency) {
                                dp.totalText = currency(dp.totalText.toFixed(2));
                            }
                        }

                        // add additional graph
                        var graph = new AmCharts.AmGraph();
                        graph.valueField = "total";
                        graph.title = "Total";
                        graph.labelText = "[[totalText]]";
                        //graph.visibleInLegend = false;
                        graph.showBalloon = false;
                        graph.lineAlpha = 0;
                        graph.fontSize = 9;
                        chart.addGraph(graph);
                    }
                });
            }

        });
})();
