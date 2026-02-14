<script setup>
    // import delle librerie necessarie
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import L from 'leaflet'
    import 'leaflet-draw'
    import 'leaflet-draw/dist/leaflet.draw.css'
    import { loggedUser } from '../../../states/user'
    import vButton from '../../utils/vButton.vue'
    import * as turf from '@turf/turf'

    // definisco le props e gli eventi
    const props = defineProps({
        map: {
            type: Object,
            required: true
        }
    })

    const emit = defineEmits(['zone-created'])

    // variabili per gestire il disegno
    let drawControl // controllo di disegno leaflet
    let drawnItems // gruppo dove salvo i layer disegnati
    let layerDisegnati = [] // array dei layer disegnati dall'utente
    
    // variabili per la gestione dell'UI
    const mostraInputNome = ref(false) // mostra il campo per inserire il nome
    const mostraAggiungiForma = ref(false) // mostra i pulsanti per aggiungere altre forme o salvare
    const nomeZona = ref('') // nome della zona inserito dall'utente
    const descrizioneZona = ref('') // nome della zona inserito dall'utente
    const tipoZona = ref('') // nome della zona inserito dall'utente

    // variabile per il controllo che l'utente abbia inserito nome, descrizione e tipo quando salva
    const errorMessage = ref(null)

    onMounted(() => {
        console.log('ZoneEditor montato, map:', props.map)
        console.log('Logged user role:', loggedUser.role)
        
        // creo il gruppo dove salvo i layer disegnati
        drawnItems = new L.FeatureGroup()
        props.map.addLayer(drawnItems)

        // definisco lo stile personalizzato per le forme disegnate
        const stileDisegno = {
            color: '#2196F3', // colore blu
            weight: 2,
            dashArray: '5, 10', // contorno tratteggiato
            fillOpacity: 0.3,
            fillColor: '#2196F3'
        }

        // configuro il controllo di disegno
        drawControl = new L.Control.Draw({
            draw: {
                polygon: {
                    allowIntersection: true, // permetto intersezioni tra i poligoni
                    showArea: true,
                    shapeOptions: stileDisegno
                },
                polyline: {
                    shapeOptions: stileDisegno
                },
                circle: {
                    shapeOptions: stileDisegno,
                    metric: true
                },
                marker: false, // disabilito i marker
                circlemarker: false, // disabilito i marker circolari
                rectangle: false // disabilito i rettangoli
            },
            position: 'bottomright' // posizione della toolbar
        })

        // aggiungo il controllo alla mappa
        props.map.addControl(drawControl)

        // gestisco l'evento di creazione di una forma
        props.map.on(L.Draw.Event.CREATED, function (event) {
            const layer = event.layer
            layerDisegnati.push(layer) // salvo il layer nell'array
            drawnItems.addLayer(layer) // lo aggiungo alla mappa
            mostraAggiungiForma.value = true // mostro i pulsanti per continuare o salvare
        })
    })

    // funzione per annullare il disegno in corso
    function annullaDisegno() {
        // rimuovo tutti i layer disegnati
        layerDisegnati.forEach(layer => {
            drawnItems.removeLayer(layer)
        })
        layerDisegnati = [] // pulisco l'array
        mostraInputNome.value = false // nascondo l'input del nome
        mostraAggiungiForma.value = false // nascondo i pulsanti
        nomeZona.value = '' // pulisco il nome
        descrizioneZona.value = '' // pulisco il nome
        tipoZona.value = '' // pulisco il nome
    }

    // funzione per aggiungere un'altra forma alla zona
    function aggiungiAltraForma() {
        mostraAggiungiForma.value = false // nascondo i pulsanti per permettere di disegnare
    }

    // funzione per mostrare il form di salvataggio (inserimento nome)
    function mostraFormSalvataggio() {
        mostraAggiungiForma.value = false // nascondo i pulsanti
        mostraInputNome.value = true // mostro l'input per il nome
    }

    // funzione per salvare la zona
    async function salvaZona() {
        errorMessage.value = null

        // controllo che il nome sia stato inserito e che ci sia almeno una forma
        if (!nomeZona.value) {
            errorMessage.value = "Il nome è obbligatorio"
            return
        }

        if (!descrizioneZona.value) {
            errorMessage.value = "La descrizione è obbligatorio"
            return
        }

        if (!tipoZona.value) {
            errorMessage.value = "Il tipo è obbligatorio"
            return
        }

        if (layerDisegnati.length === 0) {
            return
        }

        let geoJsonData

        // normalizza layer: se è un cerchio, lo converte in poligono usando turf (quello che uso anche per controllare se un punto è interno ad uun'area)
        function normalizza(layer) {
            if (layer instanceof L.Circle) {
                const center = layer.getLatLng()
                const radius = layer.getRadius()
                // turf.circle crea un poligono a partire dal centro e raggio
                return turf.circle([center.lng, center.lat], radius / 1000, { steps: 100, units: 'kilometers' }) // gli step sono i punti di precisione (avendo il layer in un poligono, più sono e più sarà preciso il cerchio)
            }
            return layer.toGeoJSON()
        }

        // se ho una sola forma, salvo il GeoJSON singolo
        if (layerDisegnati.length === 1) {
            geoJsonData = normalizza(layerDisegnati[0])
        } else {
            // se ho più forme, creo una FeatureCollection
            const features = layerDisegnati.map(layer => normalizza(layer))
            geoJsonData = {
                type: 'FeatureCollection',
                features: features
            }
        }

        const datiZona = {
            nome: nomeZona.value,
            descrizione: descrizioneZona.value,
            tipo: tipoZona.value,
            features: JSON.stringify(geoJsonData)
        }

        // per ora stampo solo il layer in console
        console.log('Nome zona:', nomeZona.value)
        console.log('Descrizione:', descrizioneZona.value)
        console.log('Tipo:', tipoZona.value)
        console.log(JSON.stringify(geoJsonData, null, 2))

        //TODO: chiamare le API per inserire il nuovo layer nel DB
        try {
            // Compongo l'URL per la richiesta 
            const HOST = import.meta.env.VITE_API_URL;
            const END_POINT = HOST + '/mappa';

            // Invio una richeista POST al backend
            const response = await fetch(END_POINT, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'access-token': loggedUser.token 
                },
                body: JSON.stringify(datiZona)
            });

            // Trasformo la risposta in formato JSON
            const data = await response.json();
            console.log(data);

            // Gestisco eventuali errori dal backend (401, 400, ecc.)
            if (!response.ok) {
                errorMessage.value = data.message;
                return;
            }
        } catch (err) {
            errorMessage.value = err.message;
        }

        // pulisco tutto dopo il salvataggio
        layerDisegnati.forEach(layer => {
            drawnItems.removeLayer(layer)
        })
        layerDisegnati = []
        mostraInputNome.value = false
        nomeZona.value = ''
        descrizioneZona.value = ''
        tipoZona.value = ''

        // emetto l'evento per notificare che la zona è stata creata
        emit('zone-created', datiZona)
    }

    // pulisco tutto quando il componente viene smontato
    onBeforeUnmount(() => {
        if (drawControl) {
            props.map.removeControl(drawControl) // rimuovo il controllo di disegno
        }
        if (drawnItems) {
            props.map.removeLayer(drawnItems) // rimuovo il gruppo dei layer
        }
    })
</script>

<template>
    <div class="zone-editor">
        <!-- pulsanti per aggiungere altre forme o salvare -->
        <div v-if="mostraAggiungiForma" class="name-input-container">
            <p class="info-text">Forme disegnate: {{ layerDisegnati.length }}</p>
            <div class="action-buttons">
                <vButton testo="Aggiungi altra forma" :fn="aggiungiAltraForma" class="add-btn"/>
                <vButton testo="Salva zona" :fn="mostraFormSalvataggio" class="save-btn"/>
                <vButton testo="Annulla tutto" :fn="annullaDisegno" class="cancel-btn"/>
            </div>
        </div>
        
        <!-- form per inserire il nome della zona -->
        <div v-if="mostraInputNome" class="name-input-container">
            <input 
                type="text" 
                v-model="nomeZona" 
                placeholder="Nome zona" 
                class="zone-name-input"
                required
            />
            <input 
                type="text" 
                v-model="descrizioneZona" 
                placeholder="Descrizione" 
                class="zone-name-input"
                required
            />
            <select v-model="tipoZona" placeholder="Tipologia" class="zone-name-input" required>
                <option value="Flora">Flora</option>
                <option value="Fauna">Fauna</option>
                <option value="Aree Protette">Aree Protette</option>
                <option value="Boschi e Foreste">Boschi e Foreste</option>
                <option value="Prati e Pascoli">Prati e Pascoli</option>
                <option value="Corsi d'acqua">Corsi d'acqua</option>
                <option value="Laghi e Bacini">Laghi e Bacini</option>
                <option value="Ghiacciai e Nevi Perpetue">Ghiacciai e Nevi Perpetue</option>
                <option value="Formazioni Rocciose">Formazioni Rocciose</option>
                <option value="Sentieri e Percorsi">Sentieri e Percorsi</option>
                <option value="Altro">Altro</option>
            </select>

            <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>

            <div class="action-buttons">
                <vButton testo="Salva" :fn="salvaZona" class="save-btn"/>
                <vButton testo="Annulla" :fn="annullaDisegno" class="cancel-btn"/>
            </div>
        </div>
    </div>
</template>

<style>
    /* contenitore principale dell'editor */
    .zone-editor {
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
    }

    /* contenitore per i pulsanti e l'input */
    .name-input-container {
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        margin-top: 10px;
        min-width: 250px;
    }

    /* testo informativo */
    .info-text {
        margin: 0 0 10px 0;
        font-size: 14px;
        color: #666;
    }

    /* input per il nome della zona */
    .zone-name-input {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    /* contenitore dei pulsanti di azione */
    .action-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    /* dimensionamento dei pulsanti */
    .action-buttons button {
        flex: 1;
        min-width: 80px;
    }

    /* pulsante per aggiungere altre forme */
    .add-btn {
        background-color: #2196F3;
        color: white;
    }

    .add-btn:hover {
        background-color: white;
        color: #2196F3;
        border: 1px solid #2196F3;
    }

    /* pulsante per salvare */
    .save-btn {
        background-color: var(--knt-green);
        color: var(--knt-white);
    }

    /* pulsante per annullare */
    .cancel-btn {
        background-color: #f44336;
        color: white;
    }

    .cancel-btn:hover {
        background-color: white;
        color: #f44336;
        border: 1px solid #f44336;
    }
</style>
