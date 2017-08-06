( function() {
    'use strict';

    app.controller('SupImplantacoesResumoCtrl', SupImplantacoesResumoCtrl);

    SupImplantacoesResumoCtrl.$inject = ['$scope', '$rootScope', '$http', 'ENV']

    function SupImplantacoesResumoCtrl($scope, $rootScope, $http, ENV) {
        var mes = moment($rootScope.mes);

        $scope.implantacoes = {
            mes: mes.locale('pt-br').format('MMMM / YYYY'),
            valor: 0
        };

        implantacoesResumo(function() {

            $http.get(ENV.API_ENDPOINT + '/implantacoesPorCategoria', {
                params: {
                    dataInicial: mes.subtract(2, 'month').startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    var dados = response.data;
                    $scope.implantacoes.mesAnteriorValor = 0;

                    for(var i=0; i<dados.length; i++)
                        $scope.implantacoes.mesAnteriorValor += dados[i].value;

                    $scope.implantacoes.porcentagem = porcentagem($scope.implantacoes.valor,
                        $scope.implantacoes.mesAnteriorValor);
                }
            );
        });

        function implantacoesResumo(callback) {
            $http.get(ENV.API_ENDPOINT + '/implantacoesPorCategoria', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    var dados = response.data;

                    for(var i=0; i<dados.length; i++)
                        $scope.implantacoes.valor += dados[i].value;

                    callback();
                }
            );
        }
    }
})();