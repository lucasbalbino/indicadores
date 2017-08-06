(function () {
    'use strict';

    app.controller('SupImplantacoesEmAtendimentoCtrl', SupImplantacoesEmAtendimentoCtrl);

    SupImplantacoesEmAtendimentoCtrl.$inject = ['$scope', 'ENV']

    function SupImplantacoesEmAtendimentoCtrl($scope, ENV) {

        $scope.query = {
            url: ENV.API_ENDPOINT + '/implantacoesEmAtendimento'
        };

        $scope.columns = [
            {id: 'chamado', titulo: 'Chamado', size: "7%", class: "text-center"},
            {id: 'op', titulo: 'OP', size: "7%", class: "text-center"},
            {id: 'cliente', titulo: 'Cliente', size: "25%"},
            {id: 'titulo', titulo: 'Título', size: "25%"},
            {id: 'categoria', titulo: 'Categoria', size: "12%"},
            {id: 'data', titulo: 'Data', size: "12%", class: "text-center"},
            {id: 'responsavel', titulo: 'Responsável', size: "12%"}
        ];

        $scope.columnsDefs = [{
            "targets": 0,
            "render": function (data) {
                return '<div class="tabela-dev-suporte">' +
                    '<a target="_blank" href="http://LINK?dados=' +
                    data + '">' + data + '</a>' + '</div>';
            }
        }, {
            "targets": 1,
            "render": function (data) {
                return '<div class="tabela-dev-suporte">' +
                    '<a target="_blank" href="http://LINK?dados=">' +
                    data + '</a>' + '</div>';
            }
        }, {
            "targets": ['_all'],
            "render": function (data) {
                if (data != null) {
                    return '<div class="tabela-dev-suporte">' + data + '</div>';
                } else {
                    return '';
                }
            }
        }];
    }
})();