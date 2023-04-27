$(document).ready(function() {
    $.getJSON("/js/board.json", function(data) {
        var output = Mustache.render($('#boardTemplate').html(), data);
        var output2 = Mustache.render($('#modalTemplate').html(), data);
        $('#members').html(output);
        $('#modals').html(output2);
    });
    
});
