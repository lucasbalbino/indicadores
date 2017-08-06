( function() {
    'use strict';

    app.controller('SupImplantacoesEncerradasCtrl', SupImplantacoesEncerradasCtrl);

    SupImplantacoesEncerradasCtrl.$inject = ['$scope', '$rootScope', 'ENV']

    function SupImplantacoesEncerradasCtrl($scope, $rootScope, ENV) {

        var mes = moment($rootScope.mes);

        $scope.query = {
            url: ENV.API_ENDPOINT + '/implantacoesEncerradas',
            data: {
                dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
            }
        };

        $scope.columns = [
            {id: 'chamado', titulo: 'Chamado', size: "7%", class: "text-center"},
            {id: 'op', titulo: 'OP', size: "7%", class: "text-center"},
            {id: 'cliente', titulo: 'Cliente', size: "25%"},
            {id: 'titulo', titulo: 'Título', size: "25%"},
            {id: 'categoria', titulo: 'Categoria', size: "15%"},
            {id: 'data', titulo: 'Data', size: "12%", class: "text-center"},
            {id: 'responsavel', titulo: 'Responsável', size: "15%"}
        ];

        $scope.columnsDefs = [ {
            "targets": 0,
            "render": function ( data ) {
                return '<div class="tabela-dev-suporte">' +
                    '<a target="_blank" href="http://LINK?dados='+data+'">'+data+'</a>'
                    +'</div>';
            }
        },{
            "targets": 1,
            "render": function ( data ) {
                return '<div class="tabela-dev-suporte">' +
                    '<a target="_blank" href="http://LINK?dados=">'+data+'</a>'
                    +'</div>';
            }
        },{
            "targets": [ '_all' ],
            "render": function ( data ) {
                if(data != null) {
                    return '<div class="tabela-dev-suporte">' + data + '</div>';
                } else {
                    return '';
                }
            }
        }];
    }
})();