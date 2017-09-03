(function () {
    'use strict';

    app.controller('SupAvaliacaoChamadosCtrl', SupAvaliacaoChamadosCtrl);

    /** @ngInject */
    function SupAvaliacaoChamadosCtrl($scope, $rootScope, SuporteAvaliacaoService) {
        var gridAvaliacaoChamados = [];

        var mes = moment($rootScope.mes);

        avaliacaoChamados();

        function avaliacaoChamados() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteAvaliacaoService.getAvaliacaoChamadosPorColaborador(dataInicial, dataFinal).then(
                function (response) {
                    gridAvaliacaoChamados = response.data;
                    $scope.dadosAvaliacaoChamados = loadDataAvaliacaoChamados();
                }
            );
        }

        function loadDataAvaliacaoChamados() {
            var dadosAvaliacaoChamados = [];
            var dados = gridAvaliacaoChamados;
            var valor = 0;

            // ÓTIMO
            for (var i = 0; i < dados.length; i++) {
                valor += dados[i].otimo;
            }
            dadosAvaliacaoChamados.push({label: "Ótimo", value: valor});

            // BOM
            valor = 0;
            for (i = 0; i < dados.length; i++) {
                valor += dados[i].bom;
            }
            dadosAvaliacaoChamados.push({label: "Bom", value: valor});

            // REGULAR
            valor = 0;
            for (i = 0; i < dados.length; i++) {
                valor += dados[i].regular;
            }
            dadosAvaliacaoChamados.push({label: "Regular", value: valor});

            // RUIM
            valor = 0;
            for (i = 0; i < dados.length; i++) {
                valor += dados[i].ruim;
            }
            dadosAvaliacaoChamados.push({label: "Ruim", value: valor});

            return dadosAvaliacaoChamados;
        }
    }
})();