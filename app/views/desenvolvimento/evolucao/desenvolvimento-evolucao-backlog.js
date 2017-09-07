(function () {
    'use strict';

    app.controller('DevEvolucaoBacklogCtrl', DevEvolucaoBacklogCtrl);

    /** @ngInject */
    function DevEvolucaoBacklogCtrl($scope, $rootScope, DesenvolvimentoEvolucaoService) {

        $scope.chartOptions = {
            label: "dataFinal",
            graphs: [{
                "title": "Atividades",
                "valueField": "quantidade",
                "balloonText": "Versão: <b>[[versao]]</b><br>[[value]] atividades no backlog"
            }],
            zoom: true,
            date: true
        };

        var watcher = $rootScope.$watch('versao', function () {
            if ($rootScope.versao === undefined) {
                return;
            }
            watcher();
            evolucaoBacklog();
        });

        function evolucaoBacklog() {
            DesenvolvimentoEvolucaoService.getEvolucaoBacklogDesenvolvimento().then(
                function (response) {
                    $scope.dadosEvolucaoBacklog = response.data;
                }, function (response) {
                    console.log("JSON do gráfico evolucaoBacklog incorreto");
                }
            );
        }
    }
})();