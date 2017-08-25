(function () {
    'use strict';

    app.controller('SupColaboradoresCtrl', SupColaboradoresCtrl);

    /** @ngInject */
    function SupColaboradoresCtrl($scope, $rootScope, SuporteColaboradoresService) {

        chamadosPorColaborador();

        function chamadosPorColaborador() {
            $scope.dadosChamadosPorColaborador = [];

            var mes = moment($rootScope.mes);

            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteColaboradoresService.getChamadosPorColaborador(dataInicial, dataFinal).then(
                function (response) {
                    var dados = response.data;
                    $scope.dadosChamadosPorColaborador = tratarDados(dados);
                }
            );
        }

        function tratarDados(dados) {
            for (var i = 0; i < dados.length; i++) {
                dados[i] = {
                    label: dados[i].colaborador,
                    value: dados[i].qntEncerrados
                };
            }
            return dados;
        }
    }
})();