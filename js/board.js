$(document).ready(function() {
    $.getJSON("/js/board.json", function(data) {
        var output = Mustache.render($('#boardTemplate').html(), data);
        $('#members').html(output);
    });
    
});
