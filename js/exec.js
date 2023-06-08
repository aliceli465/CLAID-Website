import $ from '/node_modules/jquery/dist/jquery.js';
import Mustache from '/node_modules/mustache/mustache.js';
$(document).ready(function() {
    $.getJSON("/js/exec.json", function(data) {
        var size = Object.keys(data.values).length;
        for(let i = 0; i < size; i++) {
            var output = Mustache.render($("#boardTemplate").html(),data.values[i]);
            $("#exec").append(output);
        }
    });
});
