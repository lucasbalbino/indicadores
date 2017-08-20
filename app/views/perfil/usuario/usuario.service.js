(function () {
    'use strict';

    app.service('UsuarioService', UsuarioService);

    /** @ngInject */
    function UsuarioService($http, ENV) {
        return {
            editarUsuario: editarUsuario,
            findUsuario: findUsuario,
            getUsuarios: getUsuarios
        };


        function editarUsuario(usuario, nome, email, avatar) {
            return $http.get(ENV.API_ENDPOINT + '/editarUsuario', {
                params: {
                    usuario: usuario,
                    nome: nome,
                    email: email,
                    avatar: avatar
                }
            });
        }

        function findUsuario(usuario) {
            return $http.get(ENV.API_ENDPOINT + '/findUsuario', {
                params: {
                    usuario: usuario
                }
            });
        }

        function getUsuarios() {
            return $http.get(ENV.API_ENDPOINT + '/usuarios');
        }
    }
})();