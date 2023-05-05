$(document).ready(function() {
    $.getJSON("/js/board.json", function(data) {
        // var output = Mustache.render($('#boardTemplate').html(), data);
        // $('#members').html(output);
        // var output2 = Mustache.render($('#modalTemplate').html(),data);
        // $('#members').html += output2;
        var size = Object.keys(data.values).length;
        for(let i = 0; i < size; i++) {
            var output = Mustache.render($("#boardTemplate").html(),data.values[i]);
            $("#members").append(output);
        }
    });
});
