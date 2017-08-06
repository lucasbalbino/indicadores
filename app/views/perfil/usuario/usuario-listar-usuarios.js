'use strict';
app
    .controller('UsuListarUsuariosCtrl', [
        '$rootScope', '$scope', '$http', 'ENV', function ($rootScope, $scope, $http, ENV) {
            $scope.usuarios = [];

            popularUsuarios();

            function popularUsuarios() {
                $http.get(ENV.API_ENDPOINT + "/usuarios")
                    .then(function(response) {
                        $scope.usuarios = response.data.usuarios;
                    });
            }
        }
    ]);