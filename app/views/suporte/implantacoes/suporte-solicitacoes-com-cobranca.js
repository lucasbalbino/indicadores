( function() {
    'use strict';

    app.controller('SupSolicitacoesComCobrancaCtrl', SupSolicitacoesComCobrancaCtrl);

    /** @ngInject */
    function SupSolicitacoesComCobrancaCtrl($scope, $rootScope, SuporteImplantacoesService) {

        var mes = moment($rootScope.mes);
        var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
        var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

        $scope.query = SuporteImplantacoesService.getValoresCamposAdicionaisTable(dataInicial, dataFinal, 1);

        $scope.columns = [
            {id: 'chamado', titulo: 'Chamado', size: "10%", class: "text-center"},
            {id: 'cliente', titulo: 'Cliente', size: "40%"},
            {id: 'titulo', titulo: 'Título', size: "35%"},
            {id: 'valor', titulo: 'Valor', size: "15%", class: "text-center", total: true, totalTipo: 'real'}
        ];

        $scope.columnsDefs = [ {
            "targets": 0,
            "render": function ( data ) {
                return '<div class="tabela-dev-suporte">' +
                    '<a target="_blank" href="http://LINK?dados='+data+'">'+data+'</a>' +'</div>';
            }
        },{
            "targets": 3,
            "type": "brazilian-currency",
            "render": function ( data ) {
                if(data !== null) {
                    return '<div class="tabela-dev-suporte">' + currency(data) + '</div>';
                } else {
                    return '';
                }
            }
        },{
            "targets": [ '_all' ],
            "render": function ( data ) {
                if(data !== null) {
                    return '<div class="tabela-dev-suporte">' + data + '</div>';
                } else {
                    return '';
                }
            }
        }];
    }
})();