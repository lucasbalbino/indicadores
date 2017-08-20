(function () {
    'use strict';

    app.controller('UsuInicializarPerfilCtrl', UsuInicializarPerfilCtrl);

    /** @ngInject */
    function UsuInicializarPerfilCtrl($rootScope, $scope, $state, $timeout, UsuarioService) {

        $timeout(function () {
            buscarUsuario($rootScope.usuario.usuario);
        }, 1000);

        function buscarUsuario(u) {
            UsuarioService.findUsuario(u).then(
                function (response) {
                    $rootScope.usuario.nome = response.data.nome;
                    $rootScope.usuario.email = response.data.email;
                    $rootScope.usuario.avatar = response.data.avatar;

                    $scope.paginas = listaPaginasComPermissao($rootScope.usuario.permissoes);
                },
                function (response) {
                    // console.log("ERRO ao buscar usuario", response);
                }
            );
        }

        function listaPaginasComPermissao(p) {
            var lista = "";
            if (p.includes('dev')) {
                lista += ' | Desenvolvimento';
            }
            if (p.includes('sup')) {
                lista += ' | Suporte';
            }
            if (p.includes('ci')) {
                lista += ' | Integração Contínua';
            }
            if (p.includes('com')) {
                lista += ' | Comercial';
            }
            if (p.includes('fin')) {
                lista += ' | Financeiro';
            }
            return lista.substring(2);
        }

        $scope.sair = function () {
            $rootScope.usuario = null;
            $state.go('login');
        };
    }

})();