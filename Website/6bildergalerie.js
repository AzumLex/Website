// Wir legen 4 Variablen fest. Mit dem Query Selector holen wir uns die einzelnen Elemente, die wir brauchen. Der Query Selector holt sich aus dem Document (dem HTML-File) ein DOM-Element.
const galerieContainer = document.querySelector('.galerie-container');
const galerieEinstellungenContainer = document.querySelector('.galerie-einstellungen');
const galerieEinstellungen = ['previous', 'next'];      // Array, mit den zwei Strings (die die Funktionen unserer Knöpfe beinhalten sollen) 
const galerieItems = document.querySelectorAll('.galerie-item');    // wählt alle Elemente der Klasse galerie-items aus.

class Karusell {
    
    constructor(container, items, einstellungen){       
        this.karusellContainer = container;             // Initialisierung
        this.karusellEinstellungen = einstellungen;     // Initialisierung      -> bei uns enthält karusellEinstellungen den Inhalt von einstellungen. Diese Variable enthät den Inhalt von galerieEinstellungen -> das sind die zwei Strings "next" und "previous".
        this.karusellArray = [...items];                // wir erstellen aus der übergebenen Liste an Items ein Array. Das [...] ist der Spread-Operator, der eine Kopie der übergebenen Itemliste im neu erstellten Array speichert.
    }


    // Aktualisiert die Darstellung der Bilder (ihre Position). Entfernt die Klassen der Elemente und ordnet ihnen eine neue Klasse hinzu, die auf ihrer tatsächlichen Position im Array basiert. 
    updateGalerie(){
        this.karusellArray.forEach(el => {              // mit foreach geht man jedes Element des Arrays durch
            el.classList.remove('galerie-item-1');      // die Klasse, zu der das Element gehört, wird entfernt
            el.classList.remove('galerie-item-2');
            el.classList.remove('galerie-item-3');
            el.classList.remove('galerie-item-4');
            el.classList.remove('galerie-item-5');      
        });

        this.karusellArray.slice(0,5).forEach((el, i) => {  // slice nimmt einen Ausschnitt aus einem Array. Hier: von index 0 bis 5. Das sind 5 Elemente (Index 0 bis 4)
            el.classList.add(`galerie-item-${i+1}`);        // dem ausgewählten Element wird wieder eine Klasse zugeordnet. Die Klasse hängt von der Position im Array ab (die wir ja mit den vorherigen Funktionen verändert haben)
        })
    }

    // Funktion, um das die Galerie um ein Element in eine bestimmte Richtung zu verschieben
    setCurrentState(direction){
        if (direction.className == 'galerie-einstellungen-previous'){           // wenn der Zurück-Knopf gedrückt wird
            this.karusellArray.unshift(this.karusellArray.pop());               // Mit pop wird das letzte Element des Arrays entfernt. Genau das Element wird am Anfang wieder hinzugefügt (Unshift fügt es bei index 0 ein und verschiebt das Array nach hinten)
        }else{                                                                  // wenn der Nach-Vorn-Knopf gedrückt wird
            this.karusellArray.push(this.karusellArray.shift());                // Shift entfernt das erste Element im Array und gibt es zurück. Anschließend wird es mit Push an die letzte Stelle hinzugefügt.
        }
        this.updateGalerie();                                                   // Änderungen anzeigen
    }

    
    // Funktion, um die Buttons zu erstellen! (Wollen wir am Anfang aufrufen)
    setControls(){
        this.karusellEinstellungen.forEach(control => {                 // control steht für den jeweiligen ausgewählten String. Bei der ersten Iteration enthält control "previous", bei der nächsten "next". 
            galerieEinstellungenContainer.appendChild(document.createElement('button')).className = `galerie-einstellungen-${control}`; // es wird ein neuer Button erstellt für den jeweiligen String. Der Button wird der Klasse GalerieEinstellungen zugeordnet. Genauer: Dem Button für previous wird die Klasse "galerie-einstellungen-previous" zugeordnet.
            document.querySelector(`.galerie-einstellungen-${control}`).innerText = control;    // innerText bezieht sich auf den Text, der auf dem Button gezeigt wird. Wir schreiben previous bzw. next drauf.
        })
    }

    // gibt den Knöpfen die Funktion
    useControls(){
        const triggers = [...galerieEinstellungenContainer.childNodes];     // Triggers speichert eine Kopie der beiden Buttons! Die in der Funktion SetControls angehängten Childs (also die zwei Buttons) sind die Childs in der Klasse galerieEinstellungenContainer. Triggers speichert in einem Array der beiden Buttons.
        triggers.forEach(control => {                                       // jeder Button wird ausgewählt und je Iteration unter "control" angesteuert.
            control.addEventListener('click', e => {                        // Gibt dem Button die Funktion -> legt fest, was passiert, wenn er gedrückt wird
                e.preventDefault();                                         // soll das Standardverhalten verhindern (Standard: nach Knopfdruck wird die Seite neugeladen (weil normalerweise ein Formular abgeschickt wird))
                this.setCurrentState(control);                              
            });
        });
    }
}

// alles erzeugen
const exampleKarusell = new Karusell(galerieContainer, galerieItems, galerieEinstellungen);     // Karusell erstellen

exampleKarusell.setControls();      // aufrufen, um die next und previous Knöpfe zu erstellen
exampleKarusell.useControls();      // einmal aufrufen, damit die Funktionen aktiviert werden