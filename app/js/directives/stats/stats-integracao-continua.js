(function() {
    'use strict';

    angular.module('app')
        .directive('indicadoresStatsCi', function() {
            return {
                templateUrl: 'js/directives/stats/stats-integracao-continua.html',
                replace: false,
                restrict: "AE",
                scope: {
                    label: '='
                },
                controller: function($scope) {
                    if ($scope.label.status == 'SUCCESS') {
                        $scope.label.status = 'Sucesso';
                        $scope.color = 'success';
                        $scope.icon = 'fa-check';
                    } else if ($scope.label.status == 'FAILURE') {
                        $scope.label.status = 'Falha';
                        $scope.color = 'danger';
                        $scope.icon = 'fa-times';
                    } else if ($scope.label.status == 'UNSTABLE') {
                        $scope.label.status = 'Instável';
                        $scope.color = 'warning';
                        $scope.icon = 'fa-exclamation';
                    } else if ($scope.label.status == 'ABORTED') {
                        $scope.label.status = 'Abortado';
                        $scope.color = 'carbon';
                        $scope.icon = 'fa-ban';
                    }
                }
            }
        });

})();
