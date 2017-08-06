$.fn.dataTable.moment( 'MMM/YYYY', 'pt-br' );
$.fn.dataTable.moment( 'DD/MM/YYYY', 'pt-br' );

function porcentagem(qtd1, qtd2, inverterLogica) {
    var icon, color;
    if(qtd2 == 0) {
        if (qtd1 == 0)
            return {value: 0, icon: "fa-minus", color: "info"};
        else
            qtd2 = 1;
    }
    var porcent = ((qtd1/qtd2)*100 - 100).toFixed(2);

    if(porcent > 0) {
        color = (inverterLogica) ? "danger" : "success";
        return {value: porcent, icon: "fa-caret-up", color: color};
    }
    else if(porcent < 0) {
        color = (inverterLogica) ? "success" : "danger";
        return {value: porcent, icon: "fa-caret-down", color: color};
    }
    else {
        return {value: 0, icon: "fa-minus", color: "info"};
    }
}


function currency(value) {
    if(value) {
        var integer = value.toString().split('.')[0];
        var decimals = value.toString().split('.')[1];

        var result = "";

        for (var i = integer.length; i >= 0; i -= 3)
            if (i > 3)
                result = '.' + integer.substring(i - 3, i) + result;
            else
                result = integer.substring(i - 3, i) + result;

        if (angular.isDefined(decimals))
            return "R$ " + result + "," + decimals;
        else
            return "R$ " + result + ",00";
    }
    else {
        return "R$ 0,00";
    }
}