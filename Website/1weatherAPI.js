let offsetZeitzone; // globale Variable für das Offset (brauchen wir später)



// Wenn der Knopf gedrückt wird, soll das Eingabefeld abgefragt werden und der Inhalt der WetterAPI-Funktion übergeben werden

document.getElementById('buttonReiseziel').addEventListener('click', function() {              // EventListener: sobald der Knopf gedrückt wird, passiert der folgende Code
    var reiseziel = document.getElementById('inputFeldReiseziel').value;                       // in der Variable reiseziel speichern wir den Inhalt des Input-Felds

    // WetterAPI-Funktion aufrufen
    wetterInformation(reiseziel);
});

function reiseZielSuchen(ziel) {
    // Hier kannst du den Code hinzufügen, um mit dem eingegebenen Reiseziel zu arbeiten
    console.log("Reiseziel:", ziel);
}





// Anleitung: https://bithacker.dev/fetch-weather-openweathermap-api-javascript

// Funktion, um einen API aufruf durchzuführen. Wir übergeben eine Stadt und erhalten eine Antwort im JSON Format mit den Wetterdaten
function wetterInformation( stadtName ){
    var key = '6c3f3445df4f51f43c591c865a944320';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + stadtName + '&appid=' + key;

    console.log(apiUrl);
    fetch(apiUrl)
    .then(function(resp) {return resp.json() })     // Konvertierung -> Die Antwort der Funktion ist im JSON Format. ( function(resp) heißt: die Antwort der Funktion)
    .then(function(data) { datenVisualisieren( data ); })    // die Daten, die wir aus der Funktion bekommen, übergeben wir unserer Visualisierungsfunktion -> zum Darstellen
}


// die Windows.Onload Funktion wird aufgerufen, sobald die Website fertig geladen ist.
window.onload = function(){         
    wetterInformation( 'Wien' );   // wir übergeben die Stadt, die wir standardmäßig geladen haben wollen (bevor der Nutzer selbst etwas eingibt)
}


// aktualisiert die Elemente unseres Dokuments -> Visualisierung
function datenVisualisieren( daten ){   // nimmt Daten im Json Format entgegen
    offsetZeitzone = daten.timezone;
    var celsius = Math.round(parseFloat(daten.main.temp) - 273.15);         // wir nehmen den Wert "temp" von "main" (in der JSON Datei ist temp unter main eingeordnet), parsen ihn in eine Float und rechenen Kelvin zu Celsius um
    var description = daten.weather[0].description;                         // wir ziehen die Beschreibung aus der JSON Datei heraus und speichern sie in der Variable "beschreibung"

    document.getElementById('beschreibung').innerHTML = "Wetterlage zurzeit: " + description;                // nimmt die Beschreibung aus dem HTML Dokument
    document.getElementById('temperatur').innerHTML = "Aktuell hat es " + celsius + "° Celsius";            // benutzt unsere Variable
    document.getElementById('ort').innerHTML = daten.name + " (" + daten.sys.country + ")";                  // aktualisiert den Namen der Stadt
    document.getElementById('uhrzeit').innerHTML = "Aktuelle Uhrzeit: " + uhrzeitBerechnen(daten.timezone);
}






// Uhrzeit

/* Funktion, die die aktuelle Uhrzeit berechnet (aus dem Internet). Wir überegben den Timezone Wert von der API und berechnen daraus die aktuelle Uhrzeit in dem spezifischen Ort */
/* Wird von der Datenvisualisieren Funktion aufgerufen, um die aktuelle Uhrzeit in das div-element zu schreiben */
function uhrzeitBerechnen(offset) {
    const aktuelleUtcZeit = new Date();
    const lokalZeit = new Date(aktuelleUtcZeit.getTime() + (offset + aktuelleUtcZeit.getTimezoneOffset() * 60) * 1000);
  
    const formatierteZeit = lokalZeit.toLocaleTimeString();   /* verwandelt die Uhrzeit in einen formatierten String */

    return formatierteZeit;
}
  
/* Funktion, um die Uhrzeit jede Sekunde zu erhöhen */
/* Grundsätzlich hätte man auch jede Sekunde eine neue API Anfrage senden können -> somit wären auch die Temperatur und Wetterbeschreibung aktuell, aber: die Anfragen sind ja begrenzt, darum in dem Fall die Uhrzeitberechnung selbst vornehmen */
setInterval(function () {
    document.getElementById('uhrzeit').innerHTML = "Aktuelle Uhrzeit: " + uhrzeitBerechnen(offsetZeitzone);         // wir übergeben der Uhrzeitberechnen Funktion die globale Variable mit der Zeitzone!
}, 1000);       // Wird alle 1000ms -> 1 Sekunde durchgeführt

// Funktion, um bei Zahlen, die kleiner als 10 sind, eine führende Null anzuzeigen -> wird von setInterval gebraucht 
function pad(num) {
    return num < 10 ? '0' + num : num;
}
  