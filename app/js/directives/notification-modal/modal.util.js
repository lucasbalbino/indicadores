(function() {
    'use strict';

    angular
        .module('app')
        .service('ModalUtil', ModalUtil);

    /** @ngInject */
    function ModalUtil($uibModal, $log) {
        return {
            msg: msg,
            msgInfo: msgInfo,
            msgSuccess: msgSuccess,
            msgWarning: msgWarning,
            msgError: msgError
        };

        function msg(message) {
            msgInfo(message);
        }

        function msgInfo(message, title, tooltip) {
            title = title || 'Mensagem importante!';
            $log.info(message, title);
            openModal(message, title, tooltip, 'info');
        }

        function msgSuccess(message, title, tooltip) {
            title = title || 'Tudo certo!';
            $log.info(message, title);
            openModal(message, title, tooltip, 'success');
        }

        function msgWarning(message, title, tooltip) {
            title = title || 'Atenção!';
            $log.warn(message, title);
            openModal(message, title, tooltip, 'warning');
        }

        function msgError(message, title, tooltip) {
            title = title || 'Ops, algo deu errado!';
            $log.error(message, title);
            openModal(message, title, tooltip, 'error');
        }

        function openModal(message, title, tooltip, type) {
            $uibModal.open({
                backdropClass: 'notification-modal-background',
                controller: 'NotificationModalController',
                controllerAs: 'vm',
                templateUrl: 'js/directives/notification-modal/notification.modal.html',
                resolve: {
                    message: function() { return message; },
                    title: function() { return title; },
                    tooltip: function() { return tooltip; },
                    type: function() { return type; }
                }
            });
        }
    }
})();
