jQuery.fn.dataTableExt.oSort['brazilian-currency-asc'] = function(a,b) {
    var x = (a == "-" || a == "") ? 0 : a.split("R$ ")[1].replace( /\./g, "" ).replace( /,/, "." );
    var y = (b == "-" || b == "") ? 0 : b.split("R$ ")[1].replace( /\./g, "" ).replace( /,/, "." );
    x = parseFloat( x );
    y = parseFloat( y );
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

jQuery.fn.dataTableExt.oSort['brazilian-currency-desc'] = function(a,b) {
    var x = (a == "-" || a == "") ? 0 : a.split("R$ ")[1].replace( /\./g, "" ).replace( /,/, "." );
    var y = (b == "-" || b == "") ? 0 : b.split("R$ ")[1].replace( /\./g, "" ).replace( /,/, "." );
    x = parseFloat( x );
    y = parseFloat( y );
    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
};