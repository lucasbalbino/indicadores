'use strict';

angular.module('Mes')

    .controller('MesController',
    ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

        var now = moment().locale('pt-br');

        if ($rootScope.mes == null) {
            $rootScope.mes = now;
            $rootScope.mesLiteral = now.format('MMMM / YYYY');
        }

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            showWeeks: false,
            startingDay: 0,
            'datepicker-mode': "'month'",
            'min-mode': "month"
        };

        $scope.mudarMes = function () {
            var mes = moment($rootScope.mesLiteral).locale('pt-BR');
            $rootScope.mes = mes;
            $rootScope.mesLiteral = mes.format('MMMM / YYYY');
            sessionStorage.setItem("MES-TAG", $rootScope.mes);
            $state.reload();
        }
    }]);