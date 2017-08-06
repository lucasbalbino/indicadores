(function () {
    'use strict';

    app.controller('DateRangePickerCtrl', DateRangePickerCtrl);

    function DateRangePickerCtrl($rootScope, $scope) {
        $scope.opts = {
            locale: {
                format: "DD/MM/YYYY",
                separator: " - ",
                applyLabel: "OK",
                cancelLabel: "Limpar",
                fromLabel: "Entre",
                toLabel: "E",
                customRangeLabel: "Período Específico",
                daysOfWeek: [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sáb"
                ],
                monthNames: [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro"
                ],
                firstDay: 1
            },
            ranges: {
                'Hoje': [moment(), moment()],
                'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Últimos 7 Dias': [moment().subtract(6, 'days'), moment()],
                'Últimos 30 Dias': [moment().subtract(29, 'days'), moment()],
                'Esse Mês': [moment().startOf('month'), moment().endOf('month')],
                'Mês Passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            linkedCalendars: false,
            opens: "left",
            cancelClass: "btn-danger",
            eventHandlers: { 'cancel.daterangepicker': function(ev, picker) {
                $("#date").val('');
            }
            }
        };
        //Watch for date changes
        $scope.$watch('date', function(newDate) {
            $rootScope.date = newDate;
        }, false);

    }
})();