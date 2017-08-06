(function () {
    'use strict';

    angular.module('app')
        .directive('indicadoresDatatable', function () {
            return {
                templateUrl: 'js/directives/datatable/datatable.html',
                replace: false,
                restrict: "E",
                scope: {
                    ajax: '=',
                    columns: '=',
                    columnsDefs: '=?',
                    type: '@?',
                    hasFooter: '@?',
                    order: '=?',
                    length: '@?'
                },
                controller: function ($scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $resource) {
                    function newPromise() {
                        return $resource($scope.ajax.url, $scope.ajax.data).query().$promise;
                    }

                    $scope.dtOptions = DTOptionsBuilder.fromFnPromise(newPromise)
                        .withLanguage({
                            "sEmptyTable": "Nenhum registro encontrado",
                            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                            "sInfoFiltered": "(filtrados de _MAX_ registros)",
                            "sInfoPostFix": "",
                            "sInfoThousands": ".",
                            "sLengthMenu": "_MENU_ resultados por página",
                            "sLoadingRecords": "Carregando...",
                            "sProcessing": "Processando...",
                            "sZeroRecords": "Nenhum registro encontrado",
                            "sSearch": "",
                            "oPaginate": {
                                "sNext": "Próximo",
                                "sPrevious": "Anterior",
                                "sFirst": "Primeiro",
                                "sLast": "Último"
                            },
                            "oAria": {
                                "sSortAscending": ": Ordenar colunas de forma ascendente",
                                "sSortDescending": ": Ordenar colunas de forma descendente"
                            },
                            "loadingRecords": "Carregando..."
                        })
                        .withButtons([
                            { extend: 'pdf', text: '<i class="fa fa-file-pdf-o" title="Exportar para PDF"></i>' },
                            { extend: 'excel', text: '<i class="fa fa-file-excel-o" title="Exportar para Excel"></i>' },
                            { extend: 'csv', text: '<i class="fa fa-file-text-o" title="Exportar para CSV"></i>' },
                            { extend: 'print', text: '<i class="fa fa-print" title="Imprimir"></i>' },
                            { extend: 'copy', text: '<i class="fa fa-files-o" title="Copiar"></i>' }
                        ]);

                    if (!$scope.type) {
                        $scope.type = "lite";
                    }

                    if ($scope.type == "lite") {
                        $scope.dtOptions.withDOM("fBt");
                    } else if ($scope.type == "full") {
                        $scope.dtOptions.withDOM("fBt<'row DTTTFooter'<'col-sm-7'il><'col-sm-5'p>>")
                    }

                    if ($scope.order)
                        $scope.dtOptions.withOption("order", $scope.order);

                    if (!$scope.length)
                        $scope.length = 10;

                    $scope.dtOptions.withDisplayLength($scope.length);

                    $scope.dtColumns = [];

                    for (var i = 0; i < $scope.columns.length; i++) {
                        var temp = DTColumnBuilder.newColumn($scope.columns[i].id, $scope.columns[i].titulo);
                        if ($scope.columns[i].class != undefined)
                            temp = temp.withClass($scope.columns[i].class);
                        if ($scope.columns[i].size != undefined)
                            temp = temp.withOption('width', $scope.columns[i].size);

                        $scope.dtColumns.push(temp);
                    }

                    $scope.dtColumnDefs = [];

                    if ($scope.columnsDefs) {
                        for (var i = 0; i < $scope.columnsDefs.length; i++) {
                            if ($scope.columnsDefs[i].type)
                                $scope.dtColumnDefs.push(DTColumnDefBuilder
                                        .newColumnDef($scope.columnsDefs[i].targets)
                                        .renderWith($scope.columnsDefs[i].render)
                                        .withOption("type", $scope.columnsDefs[i].type)
                                );
                            else
                                $scope.dtColumnDefs.push(DTColumnDefBuilder
                                        .newColumnDef($scope.columnsDefs[i].targets)
                                        .renderWith($scope.columnsDefs[i].render)
                                );
                        }
                    }

                    $scope.dtInstance = {};
                    $scope.dtInstanceCallback = function (instance) {
                        $scope.dtInstance = instance;
                    };

                    $rootScope.reloadDataTable = function (newData) {
                        $scope.ajax = newData;
                        $scope.dtInstance.rerender();
                        $scope.dtInstance.changeData(newPromise);
                    };

                    if ($scope.hasFooter) {
                        $scope.dtOptions.withOption("footerCallback", function footerCallback(data) {
                            var api = this.api();

                            // Remove the formatting to get integer data for summation
                            var intVal = function (i) {
                                return typeof i === 'string' ?
                                i.replace(/[\%,]/g, '') * 1 :
                                    typeof i === 'number' ?
                                        i : 0;
                            };

                            $(api.column(0).footer()).html('<strong>TOTAL</strong>');

                            for (var i = 0; i < $scope.columns.length; i++) {
                                if ($scope.columns[i].total) {
                                    var temp = api.column(i).data().reduce(function (a, b) {
                                        return intVal(a) + intVal(b);
                                    }, 0);

                                    if (temp.toString().indexOf('.') != -1)
                                        temp = temp.toFixed(2);

                                    if ($scope.columns[i].totalTipo == 'real')
                                        temp = currency(temp);
                                    else if ($scope.columns[i].totalTipo == 'porcentagem')
                                        temp = temp + '%';

                                    $(api.column(i).footer()).html('<strong>' + temp + '</strong>');
                                }
                            }
                        });
                    }

                    $rootScope.dataTableIsLoaded = true;
                }
            }
        });

})();
