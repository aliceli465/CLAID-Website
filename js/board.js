$(document).ready(function() {
    $.getJSON("/js/board.json", function(data) {
        var size = Object.keys(data.values).length;
        for(let i = 0; i < size; i++) {
            var output = Mustache.render($("#boardTemplate").html(),data.values[i]);
            $("#members").append(output);
        }
    });
});
