(function () {
    'use strict';

    app.controller('UsuListarUsuariosCtrl', UsuListarUsuariosCtrl)

    /** @ngInject */
    function UsuListarUsuariosCtrl($scope, UsuarioService) {
        $scope.usuarios = [];

        popularUsuarios();

        function popularUsuarios() {
            UsuarioService.getUsuarios().then(function (response) {
                $scope.usuarios = response.data.usuarios;
            });
        }
    }
})();