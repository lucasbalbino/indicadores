(function () {
    'use strict';

    angular.module('app')
        .directive('indicadoresChart', function ($rootScope) {
            return {
                template: '<indicadores-loading id="load-{{chartId}}" ng-if="!loaded"></indicadores-loading>' +
                          '<div id="{{chartId}}" class="{{chartClass}}" ng-show="loaded"></div>',
                restrict: "E",
                scope: {
                    chartId: '@',
                    chartClass: '@',
                    source: '=',
                    type: '@',
                    options: '=?',
                    reloadable: '@?'
                },
                link: indicadoresChartLink
            };

            function indicadoresChartLink(scope) {
                scope.loaded = false;
                scope.chart = null;

                var watcher = scope.$watch('source', function () {
                    if (scope.source === undefined || scope.source === null) {
                        return;
                    }
                    if(scope.source.length === 0) {
                        $("#" + scope.chartId).before("<span>Nenhum registro encontrado</span>");
                    }
                    if (!scope.reloadable) {
                        watcher();
                    }


                    if (scope.chart) {
                        scope.chart.clear();
                    }

                    var chartOptions = {
                        "type": scope.type,
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "fontSize": 12,
                        "dataProvider": scope.source,
                        "responsive": {
                            "enabled": true
                        },
                        "export": {
                            "enabled": true
                        },
                        "startDuration": 0.2,
                        "zoomOutText": "Mostrar Tudo"
                    };


                    if (scope.type === "pie") {
                        chartOptions.valueField = (scope.options && scope.options.value) ? scope.options.value : "value";
                        chartOptions.titleField = (scope.options && scope.options.label) ? scope.options.label : "label";

                        if (scope.options && scope.options.currency) {
                            chartOptions.labelFunction = function (data) {
                                return data.title + ": " +
                                    currency(data.value.toFixed(2)) + '\n(' +
                                    data.percents.toFixed(2) + "%)";
                            };
                        } else {
                            chartOptions.labelText = "[[title]]: [[value]] ([[percents]]%)";
                        }

                    }


                    else if (scope.type === "bar" || scope.type === "column") {
                        chartOptions.type = "serial";
                        chartOptions.chartCursor = {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        };
                        chartOptions.categoryAxis = {
                            "autoWrap": true
                        };
                        chartOptions.graphs = [{
                            "balloonText": "[[value]]",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column"
                        }];

                        chartOptions.graphs[0].valueField = (scope.options && scope.options.value) ? scope.options.value : "value";
                        chartOptions.categoryField = (scope.options && scope.options.label) ? scope.options.label : "label";


                        if (scope.type === "column") {
                            if (scope.options && scope.options.graphs) {
                                chartOptions.graphs = [];

                                for (var i = 0; i < scope.options.graphs.length; i++) {
                                    var balloonText = "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
                                    if (scope.options.graphs[i].balloonText) {
                                        balloonText = scope.options.graphs[i].balloonText;
                                    }

                                    chartOptions.graphs.push({
                                        "type": "column",
                                        "balloonText": balloonText,
                                        "labelText": "[[value]]",
                                        "fillAlphas": 0.8,
                                        "lineAlpha": 0.2,
                                        "valueField": scope.options.graphs[i].valueField,
                                        "title": scope.options.graphs[i].title,
                                        "showAllValueLabels": scope.options.showAllValueLabels
                                    });
                                    if (scope.options.graphs[i].valueAxis) {
                                        chartOptions.graphs[i].valueAxis = scope.options.graphs[i].valueAxis;
                                        delete chartOptions.graphs[i].type;
                                        delete chartOptions.graphs[i].fillAlphas;
                                        delete chartOptions.graphs[i].lineAlpha;
                                    }
                                    if (scope.options.currency) {
                                        if (scope.options.graphs[i].balloonFunction) {
                                            delete chartOptions.graphs[i].balloonText;
                                            if (scope.options.graphs[i].balloonFunction === "percentage") {
                                                chartOptions.graphs[i].balloonFunction = labelPercentageFunction;
                                            } else {
                                                chartOptions.graphs[i].balloonFunction = balloonCurrencyFunction;
                                            }
                                        }
                                        if (scope.options.graphs[i].labelFunction) {
                                            if (scope.options.graphs[i].labelFunction === "percentage") {
                                                chartOptions.graphs[i].labelFunction = labelPercentageFunction;
                                            } else {
                                                chartOptions.graphs[i].labelFunction = labelCurrencyFunction;
                                            }
                                        }
                                    }
                                }

                                if (scope.options.total) {
                                    chartOptions.dataProvider = addTotal(chartOptions.dataProvider, chartOptions.graphs, scope.options.currency);

                                    chartOptions.graphs.push({
                                        "valueField": "total",
                                        "title": "Total",
                                        "labelText": "[[totalText]]",
                                        //"visibleInLegend": false,
                                        "showBalloon": false,
                                        "lineAlpha": 0,
                                        "fontSize": 9
                                    });
                                }
                            }
                            if (scope.options && scope.options.legend) {
                                chartOptions.legend = scope.options.legend;
                            }
                            if (scope.options && scope.options.categoryField) {
                                chartOptions.categoryField = scope.options.categoryField;
                            }
                            if (scope.options && scope.options.valueAxes) {
                                chartOptions.valueAxes = scope.options.valueAxes;
                            }
                        }

                        if (scope.type === "bar") {
                            chartOptions.rotate = true;
                            chartOptions.categoryAxis = {
                                "gridPosition": "middle",
                                "gridAlpha": 0,
                                "tickPosition": "middle",
                                "tickLength": 5
                            };
                            chartOptions.valueAxes = [{
                                "gridColor": "#FFFFFF",
                                "gridAlpha": 0.2,
                                "dashLength": 0
                            }];
                            chartOptions.gridAboveGraphs = true;
                        }


                    }


                    else if (scope.type === "line") {
                        chartOptions.type = "serial";
                        chartOptions.marginRight = 40;
                        chartOptions.marginLeft = 40;
                        chartOptions.autoMarginOffset = 20;
                        chartOptions.dataDateFormat = "DD/MM/YYYY";
                        chartOptions.valueAxes = [{
                            "axisAlpha": 0,
                            "position": "left"
                        }];
                        chartOptions.balloon = {
                            "borderThickness": 1,
                            "shadowAlpha": 0
                        };
                        chartOptions.chartCursor = {
                            "bulletSize": 5,
                            "cursorAlpha": 1,
                            "cursorColor": $rootScope.colors[0],
                            "valueLineAlpha": 0.2,
                            "categoryBalloonEnabled": true,
                            "zoomable": true
                        };
                        chartOptions.legend = {};
                        chartOptions.graphs = [{
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "hideBulletsCount": 50,
                            "lineThickness": 2,
                            "useLineColorForBulletBorder": true,
                            "labelText": "[[value]]",
                            "valueField": "[[value]]",
                            "balloonText": "[[value]]"
                        }];

                        chartOptions.categoryField = (scope.options && scope.options.label) ? scope.options.label : "label";


                        if (scope.options && scope.options.graphs) {
                            chartOptions.graphs = [];

                            for (var j = 0; j < scope.options.graphs.length; j++) {
                                chartOptions.graphs.push({
                                    "bullet": "round",
                                    "bulletBorderAlpha": 1,
                                    "bulletColor": "#FFFFFF",
                                    "hideBulletsCount": 50,
                                    "lineThickness": 2,
                                    "useLineColorForBulletBorder": true,
                                    "title": scope.options.graphs[j].title,
                                    "valueField": scope.options.graphs[j].valueField,
                                    "balloonText": scope.options.graphs[j].balloonText
                                });

                                if (scope.options.currency) {
                                    if (scope.options.graphs[j].balloonFunction) {
                                        delete chartOptions.graphs[j].balloonText;
                                        if (scope.options.graphs[j].balloonFunction === "percentage") {
                                            chartOptions.graphs[j].balloonFunction = labelPercentageFunction;
                                        } else {
                                            chartOptions.graphs[j].balloonFunction = balloonCurrencyFunction;
                                        }
                                    }
                                    if (scope.options.graphs[j].labelFunction) {
                                        if (scope.options.graphs[j].labelFunction === "percentage") {
                                            chartOptions.graphs[j].labelFunction = labelPercentageFunction;
                                        } else {
                                            chartOptions.graphs[j].labelFunction = labelCurrencyFunction;
                                        }
                                    }
                                }
                            }
                        }

                        if (scope.options && scope.options.date) {
                            chartOptions.chartCursor.categoryBalloonDateFormat = "DD/MM/YYYY";
                            chartOptions.categoryAxis = {
                                "parseDates": true,
                                "dashLength": 1,
                                "minorGridEnabled": true,
                                "labelFunction": function (valueText, date, categoryAxis) {
                                    return moment(date).locale('pt-br').format("DD/MMM");
                                }
                            };

                            if (scope.options && scope.options.categoryAxis) {
                                chartOptions.categoryAxis.minorTickLength = scope.options.categoryAxis.minorTickLength;
                                chartOptions.categoryAxis.minHorizontalGap = scope.options.categoryAxis.minHorizontalGap;
                                if (scope.options.categoryAxis.labelFunction === "DD") {
                                    chartOptions.categoryAxis.labelFunction = function (valueText, date, categoryAxis) {
                                        return moment(date).format("DD");
                                    };
                                }
                            }
                        }

                        if (scope.options && scope.options.currency) {
                            chartOptions.valueAxes[0].labelFunction = function (valueText, date, valueAxis) {
                                return currency(valueText.toFixed(2));
                            };
                        }

                        if (scope.options && scope.options.zoom) {
                            chartOptions.chartScrollbar = {
                                "oppositeAxis": false,
                                "offset": 30,
                                "backgroundAlpha": 0,
                                "selectedBackgroundAlpha": 0.1,
                                "selectedBackgroundColor": "#888888",
                                "graphFillAlpha": 0,
                                "graphLineAlpha": 0.5,
                                "selectedGraphFillAlpha": 0,
                                "selectedGraphLineAlpha": 1,
                                "autoGridCount": true,
                                "color": "#AAAAAA",
                                "labelFunction": function (valueText, date, categoryAxis) {
                                    return moment(date).locale('pt-br').format("YYYY");
                                }
                            };
                        }
                    }


                    else if(scope.type === "map") {
                        chartOptions = {
                            "type": scope.type,
                            "fontFamily": "'Open Sans', 'Segoe UI'",
                            "pathToImages": "ammap/images/",
                            "dataProvider": {
                                "areas": scope.source,
                                "map": "brazilLow",
                                "getAreasFromMap": true
                            },
                            "valueLegend": {
                                "right": 10,
                                "showAsGradient": true
                            },
                            "showObjectsAfterZoom": false,
                            "colorSteps": 20,
                            "areasSettings": {
                                "balloonText": "[[title]] - [[value]] chamados - [[percent]]%",
                                "color": "#ecf0f1",
                                "colorSolid": $rootScope.colors[0],
                                "selectedColor": $rootScope.colors[3],
                                "autoZoom": true
                            }
                        };
                    }



                    // console.log(chartOptions);
                    initChart(scope, chartOptions);
                });
            }

            function initChart(scope, options) {
                scope.loaded = true;

                scope.chart = AmCharts.makeChart(scope.chartId, options);

                if (scope.options && scope.options.zoom) {
                    zoomChart(scope.chart);
                }
            }


            function balloonCurrencyFunction(graphDataItem, graph) {
                return "<b>" + graph.title + "</b><br><span style='font-size:14px'>" +
                    graphDataItem.category + ": <b>" +
                    currency(graphDataItem.dataContext[graph.valueField]) + "</b></span>";
            }

            function labelCurrencyFunction(graphDataItem, graph) {
                return currency(graphDataItem.dataContext[graphDataItem.graph.valueField]);
            }

            function labelPercentageFunction(graphDataItem, graph) {
                return graphDataItem.dataContext[graphDataItem.graph.valueField] + '%';
            }

            function addTotal(dataProvider, graphs, isCurrency) {
                for (var i = 0; i < dataProvider.length; i++) {
                    var dp = dataProvider[i];
                    dp.total = 0;
                    dp.totalText = 0;
                    for (var x = 0; x < graphs.length; x++) {
                        var g = graphs[x];
                        if (dp[g.valueField]) {
                            dp.totalText += parseInt(dp[g.valueField]);
                            if (dp[g.valueField] > 0) {
                                dp.total += parseInt(dp[g.valueField]);
                            }
                        }
                    }
                    if (isCurrency) {
                        dp.totalText = currency(dp.totalText.toFixed(2));
                    }
                }

                return dataProvider;
            }

            function zoomChart(chart) {
                chart.zoomToIndexes(chart.dataProvider.length - 12, chart.dataProvider.length - 1);
            }
        });
})();
