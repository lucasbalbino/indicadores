(function () {
    'use strict';

    app.controller('SupEvolucaoColaboradoresCtrl', SupEvolucaoColaboradoresCtrl);

    /** @ngInject */
    function SupEvolucaoColaboradoresCtrl($scope, $rootScope, SuporteColaboradoresService) {

        $rootScope.date = {
            // 7 dias atrás
            startDate: moment().subtract(6, 'days'),
            // Hoje
            endDate: moment()
        };

        $scope.chartOptions = {
            categoryField: "colaborador",
            graphs: [
                {
                    valueField: "qntEmAtendimento",
                    title: "Em Atendimento",
                    balloonText: "[[value]] chamado(s) em atendimento"
                },
                {
                    valueField: "qntEncerrados",
                    title: "Encerrados",
                    balloonText: "[[value]] chamado(s) encerrados"
                }
            ],
            legend: {}
        };

        chamadosPorColaborador();

        $scope.$watch('date', function (newDate) {
            $rootScope.date = newDate;
            chamadosPorColaborador();
        }, false);

        function chamadosPorColaborador() {
            var dataInicial = $rootScope.date.startDate.format('DD/MM/YYYY');
            var dataFinal = moment($rootScope.date.endDate);
            dataFinal = dataFinal.add(1, 'days').format('DD/MM/YYYY');

            SuporteColaboradoresService.getChamadosPorColaborador(dataInicial, dataFinal).then(
                function (response) {
                    $scope.dadosChamadosPorColaborador = response.data;
                }
            );
        }
    }
})();