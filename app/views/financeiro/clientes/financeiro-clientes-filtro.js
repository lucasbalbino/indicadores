'use strict';
/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */
app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

app.controller('FinClientesFiltroCtrl', function ($rootScope, $scope, $http, $state, ENV) {
    $scope.clear = function () {
        $scope.cliente.selected = undefined;
        $rootScope.idCliente = $scope.cliente.selected;
    };

    $scope.clientes = [];

    $scope.cliente = {};

    $http.get(ENV.API_ENDPOINT + '/faturamentoListaClientes').then(
        function (response) {
            $scope.clientes = response.data;
        }
    );

    $scope.alteraCliente = function(id) {
        $rootScope.idCliente = id;
        $state.reload();
    }

});
