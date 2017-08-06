(function() {
    'use strict';

    angular.module('app')
        .directive('indicadoresChart', function() {
            return {
                template: '<div id="{{id}}"></div>',
                replace: false,
                restrict: "E",
                scope: {
                    id: '@',
                    function: '&',
                    data: '=',
                    label: '=',
                    type: '@'
                },
                controller: function($scope) {
                    console.log($scope.label, $scope.type, $scope.id, $scope.data, $scope.function);
                    $scope.function(function() {
                        if($scope.type == "serial") {
                            AmCharts.
                                makeChart($scope.id, {
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
                        }
                    });

                }
            }
        });

})();
