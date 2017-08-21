(function () {
    'use strict';

    angular.module('app')
        .directive('indicadoresChart', function () {
            return {
                template: '<div id="{{id}}" class="{{class}}"></div>',
                replace: false,
                restrict: "E",
                scope: {
                    id: '@',
                    class: '@',
                    // function: '&',
                    data: '=',
                    label: '=',
                    type: '@'
                },
                controller: IndicadoresChartController
            };

            function IndicadoresChartController($scope, $rootScope) {
                console.log($scope.label, $scope.type, $scope.id, $scope.data, $scope.function);

                // $scope.function(function () {
                if ($scope.type === "serial") {
                    AmCharts.makeChart($scope.id, {
                        "type": "serial",
                        "theme": "light",
                        "dataProvider": $scope.data,
                        "graphs": [{
                            "balloonText": "[[value]]",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "value"
                        }],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryAxis": {
                            "autoWrap": true
                        },
                        "startDuration": 1,
                        "categoryField": "label"
                    });
                } else if ($scope.type === "pie") {

                    console.log($scope.data);

                    AmCharts.makeChart($scope.id, {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": $scope.data,
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
                    });
                }
                // });

            }

        });
})();
