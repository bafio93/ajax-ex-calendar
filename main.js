$(document).ready(function(){
    // Setto il mese iniziale come gennaio 2018.
    var mese = 01;
    compila_calendario(mese);

    // Se clicco next, mese +1. A meno che non sia mese == 12.
    $("#next").click(function() {
        if (mese != 12) {
            mese = mese + 1;
            compila_calendario(mese);
        }
    });
    // Se clicco prev, mese -1. A meno che non sia mese == 1.
    $("#prev").click(function() {
        if (mese != 1) {
            mese = mese - 1;
            compila_calendario(mese);
        }
    });
    // Parte della chiamata ajax.
    $.ajax ({
        "url": "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+(mese - 1), // cambiare month
        "method":"GET",
        "success": function(data_success){


            //
            console.log(data_success.response.length);
            for (var j = 0; j < data_success.response.length; j++) {
                console.log(data_success.response[j].date);
                var data_festiva = moment(data_success.response[j].date);
                console.log(data_festiva);
                $("li").each(function() {
                    if (($(this).text())==(data_festiva.format("Do"))) {
                        $(this).addClass("festive");
                    }
                });
            }
            //
        },
        "error": function(){
            alert("ERROR! -.-");
        }
    })
});

// FUNZIONI:


// FUNZIONE CALENDARIO
function compila_calendario(mese) {
    // Come prima cosa, svuotiamo <ul> ed <h1>:
    $("h1").empty();
    $("ul").empty();
    button_eraser(mese);
    // Componiamo ora la data:
    var data_iniziale = "2018-"+mese;
    var moment_iniziale = moment(data_iniziale);
    // Quanti giorni ha il mese?
    var lunghezza_mese = moment_iniziale.daysInMonth();
    // Stampa a schermo il mese.
    for (var i = 1; i <= lunghezza_mese; i++) {
        // Mettiamolo in template handlebars
        // Inizializzo il template handlebars
        var data_processata = moment(data_iniziale+"-"+i);
        var template_html = $("#template_giorno").html();
        var template_function = Handlebars.compile(template_html);
        var variabili = {
            day: data_processata.format("Do")
        };
        var html_finale = template_function(variabili);
        $("#calendario").append(html_finale);
    };
    // Setto titolo come mese corrente.
    $("h1").append(moment_iniziale.format("MMMM"));
};

// FUNZIONE CHE DISATTIVA PREV E NEXT IN CERTI CASI
function button_eraser(mese){
    $("button").removeClass("disattivato");
    if (mese == 01) {
        $("button#prev").addClass("disattivato");
    } else if (mese == 12) {
        $("button#next").addClass("disattivato");
    }
}