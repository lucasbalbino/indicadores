( function() {
    'use strict';

    app.controller('DevSuporteCtrl', DevSuporteCtrl);

    DevSuporteCtrl.$inject = ['$scope', 'ENV']

    function DevSuporteCtrl($scope, ENV) {
        $scope.query = {
            url: ENV.API_ENDPOINT + '/ChamadosXAtividades'
        };

        $scope.columns = [
            {id: 'cdchamado', titulo: 'Chamado', class: "tabela-dev-suporte text-center", size: "6%"},
            {id: 'nmtitulochamado', titulo: 'Título do Chamado', class: "tabela-dev-suporte", size: '16%'},
            {id: 'nmcliente', titulo: 'Cliente', class: "tabela-dev-suporte", size: '16%'},
            {id: 'nmresponsavel', titulo: 'Responsável', class: "tabela-dev-suporte text-center", size: "10%"},
            {id: 'nmratividade', titulo: 'Atividade', class: "tabela-dev-suporte text-center", size: "6%"},
            {id: 'prioridade', titulo: 'Prioridade', class: "tabela-dev-suporte text-center", size: "7%"},
            {id: 'situacao', titulo: 'Situação', class: "tabela-dev-suporte text-center", size: "10%"},
            {id: 'nmtituloatividade', titulo: 'Título do Atividade',class: "tabela-dev-suporte", size: "16%"},
            {id: 'tipoatividade', titulo: 'Tipo', class: "tabela-dev-suporte text-center", size: "10%"}
        ];

        $scope.columnsDefs = [
            {
                "targets": 0,
                "render": function ( data ) {
                    return '<div class="tabela-dev-suporte">' +
                        '<a target="_blank" href="http://LINK?dados='+data+'">'+data+'</a>'
                        +'</div>';
                }
            },{
                "targets": 4,
                "render": function ( data ) {
                    var atividade = data.substring(1);
                    return '<div class="tabela-dev-suporte">' +
                        '<a target="_blank" href="http://LINK?dados='+atividade+'">'+data+'</a>'
                        +'</div>';
                }
            },{
                "targets": 6,
                "render": function ( data ) {
                    if(data == "Encerrada" || data == "Liberada" || data == "Não testável") {
                        return '<div class="success tabela-dev-suporte">' + data + '</div>';
                    } else if(data == "Informações Insuficientes" || data == "Rejeitada") {
                        return '<div class="danger tabela-dev-suporte">' + data + '</div>';
                    } else {
                        return '<div class="tabela-dev-suporte">' + data + '</div>';
                    }
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
            }
        ];
    }
})();