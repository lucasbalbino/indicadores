( function() {
    'use strict';

    app.controller('SupChamadosClientesCtrl', SupChamadosClientesCtrl);

    SupChamadosClientesCtrl.$inject = ['$rootScope', '$scope', '$http', '$state', 'ENV']

    function SupChamadosClientesCtrl($rootScope, $scope, $http, $state, ENV) {

        var mes = moment($rootScope.mes);
        $scope.origens = ["Todas"];
        $scope.loaded = false;

        function getOrigens() {
            $http.get(ENV.API_ENDPOINT + '/origensChamado').then(
                function (response) {
                    var array = response.data;
                    for(var i=0; i < array.length; i++)
                        $scope.origens.push(array[i][1]);

                    $scope.loaded = true;

                    if(!$rootScope.origem)
                        $rootScope.origem = $scope.origens[0];


                    if($rootScope.origem == "Todas") {
                        $scope.query = {
                            url: ENV.API_ENDPOINT + '/rankingDeClientes',
                            data: {
                                dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                                dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                            }
                        };
                    } else {
                        $scope.query = {
                            url: ENV.API_ENDPOINT + '/rankingDeClientes',
                            data: {
                                dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                                dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY'),
                                origem: $scope.origens.indexOf($rootScope.origem)
                            }
                        };
                    }

                    $scope.columns = [
                        {id: 'cliente', titulo: 'Cliente', size: '80%'},
                        {id: 'quantidade', titulo: 'Quantidade', size: '10%', class: 'text-center', total: true},
                        {id: 'porcentagem', titulo: '%', size: '10%', class: 'text-center', total: true, totalTipo: 'porcentagem'}
                    ];

                    $scope.order = [[ 1, "desc" ]];
                }
            );
        }

        $scope.alteraOrigem = function(id) {
            $rootScope.origem = id;
            $state.reload();
        };

        getOrigens();
    }
})();