<script setup>
    import { onMounted, onBeforeMount , ref, shallowRef } from 'vue'
    import { loggedUser } from '../../states/user'
    import L from 'leaflet'
    import { booleanPointInPolygon, point } from '@turf/turf'
    import mapFilter from './utils/filter.vue'
    import vButton from '../utils/vButton.vue'
    import zoneEditor from './utils/zoneEditor.vue'

    const emit = defineEmits(['layers-loaded'])

    const map = shallowRef() // uso shallowRef perchè ref dava problemi cambiando i cambiando i filtri
    const mapContainer = ref()
    const zoom = ref(12)
    let showFilters = ref(false);
    const forcedFilterSelection = ref([])
    const userPosition = ref(null)


    // GET posizioni delle Segnalazioni ----------------------------------------
    const segnalazioni = ref([]);
    const aree = ref([]);

    

    let geoJsonData = [];

    async function getMapItems() {
        // Compongo l'URL per la richiesta 
        const HOST = import.meta.env.VITE_API_URL;
        const END_POINT = HOST + '/mappa';

        try {
            // Invio una richeista GET al backend
            const response = await fetch(END_POINT, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'access-token': loggedUser.token
                }
            });

            // Trasformo la risposta in formato JSON
            const data = await response.json();

            // Gestisco eventuali errori dal backend (401, 400, ecc.)
            if (!response.ok) {
                console.error(response.status, response.body);
                return;
            }

            

            segnalazioni.value = data.segnalazioni;
            aree.value = data.aree;

            // Segnalazini salvate nella array 'markers'
            let markers = [];
            segnalazioni.value.forEach(element => {
                markers.push({
                    type: "Feature",
                    properties: { nome: element.titolo },
                    geometry: element.posizione
                });
            });
            console.log('Segnalazioni:', markers);

            // Aree salvate nell'array 'zones'
            let zones = [];
            aree.value.forEach(element => {
                zones.push({
                    type: "Feature",
                    properties: {
                        nome: element.titolo,
                        descrizione: element.descrizione,
                        tipo: element.tipo
                    },
                    geometry: element.posizione
                });
            });
            console.log('Aree:', zones);


            // layer (dovrenno arrivare tramite chiamata API)
            geoJsonData = [
                {
                    id: "layer_1",
                    name: "Segnalazioni",
                    visible: true,
                    style: { color: 'red' },
                    data: {
                        type: "FeatureCollection",
                        // Arriva tramite chiamata API
                        features: markers
                    }
                },
                {
                    id: "layer_2",
                    name: "Aree protette",
                    visible: true,
                    style: { color: 'green' },
                    data: {
                        type: "FeatureCollection",
                        features: zones
                    }
                }
            ];

        } catch (error) {
            // In caso di errore non gestito dal backend, mostro questo messaggio
            //errorMessage.value = "Errore di connessione al Server";

            console.log(error);
        }
    }

    

    onBeforeMount(() => getMapItems());


    onMounted (() => { //solo dopo che l'html è stato montato
        map.value = L.map(mapContainer.value).setView([46.0667, 11.1333], zoom.value); //definisco il centro e lo zoom

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            minZoom: 8
        }).addTo(map.value);

        const infoLayers = geoJsonData.filter(layer => layer.visible == true).map(layer => ({ id: layer.id, name: layer.name }))
        emit('layers-loaded', infoLayers)
    })

    let layersCache = {} // variabile in cui salvo i layer che servono all'utente come oggetti
    // fino a quando un layer non viene selezionato nel filtro, non viene nemmeno caricato

    function gestisciFiltro(newSelection) { //newSelection è l'array che mi arriva da filter.vue in cui ci sono gli id dei layer da mostrare 
        geoJsonData.forEach(obj => {
            // se il layer non esiste ancora in cache, lo creo (lazy creation) 
            if (!layersCache[obj.id]) {
                layersCache[obj.id] = L.geoJSON(obj.data);

                //aggiungo i popup alle features del layer (lo faccio quando salvo il layer in cache in modo da evitare di doverlo rifare ogni volta)
                descrizioneOggettiLayer(layersCache[obj.id]);
            }

            // se mi è stata passata anche la posizione dell'utente, verifico se questo è dentro l'area di un poligono
            if (userPosition.value) {                
                const features = obj.data.type === 'FeatureCollection' ? obj.data.features : [obj.data]; // prendo le features dal geoJSON (in questo modo gestisco sia collections che feature singole)

                const isInside = features.some(feature => {
                    // controllo se è un poligono (altrimenti turf crasha)
                    if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                        return booleanPointInPolygon(userPosition.value, feature); // se il punto è all'interno dell'area ritorna true, altrimenti false e interrompe direttamente il ciclo dato che sto usando .some
                    }
                    return false;
                });

                // Se non sono dentro a nessun poligono di questo layer, salto l'iterazione (return)
                if (!isInside) {
                    return;
                }
            }

            // logica di visualizzazione dei layer selezionati
            if (newSelection.includes(obj.id)) {
                // se l'id del layer è selezionato (è tra gli id presenti in newSelection)
                if (!map.value.hasLayer(layersCache[obj.id])) { //verifico che non sia già visualizzato sulla mappa
                    //in tal caso lo aggiungo
                    map.value.addLayer(layersCache[obj.id]);
                }
            } else {
                // se non è selezionato ma è sulla mappa lo rimuovo
                if (map.value.hasLayer(layersCache[obj.id])) {
                    map.value.removeLayer(layersCache[obj.id]);
                }
            }
        })

        userPosition.value = null;
    }

    // Hot reload della mappa dopo aver aggiunto nuove zone
    // Inefficiente??? Lo so :-)
    async function reloadMapItems() {
        await getMapItems();

        // rimuovo i layer precedenti
        Object.values(layersCache).forEach(layer => map.value.removeLayer(layer))
        layersCache = {}

        // ridisegno tutte le zone e segnalazioni
        geoJsonData.forEach(obj => {
            if (obj.visible) {
                layersCache[obj.id] = L.geoJSON(obj.data).addTo(map.value)
                descrizioneOggettiLayer(layersCache[obj.id])
            }
        })
    }

    // passo il layer come parametro e aggiungo i popup per la descrizione ad ogni oggetto del layer stesso
    function descrizioneOggettiLayer(leafletLayer) {
        leafletLayer.eachLayer(layer => {

            // attributi del layer
            const proprietaLayer = layer.feature?.properties;

            if (proprietaLayer) {
                let contenuto = "";
                // aggiungo nome, descrizione e tipo (solo se ci sono)
                if (proprietaLayer.nome) contenuto += "<strong>" + proprietaLayer.nome + "</strong>";
                if (proprietaLayer.descrizione) contenuto += "<br>" + proprietaLayer.descrizione;
                if (proprietaLayer.tipo) contenuto += "<br><small>(" + proprietaLayer.tipo + ")</small>";

                // aggiungo il popup solo se c'è effettivamente scritto dentro qualcosa
                if (contenuto) {
                    layer.bindPopup(contenuto);
                }
            }
        })
    }

    // icone dei marker colorati
    const getColoredIcon = (color) => {
        return L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    };

    // tolgo tutto dalla mappa
    function clearMap() {
        // azzero i filtri della mappa
        forcedFilterSelection.value = []

        // rimuovo qualsiasi altro layer della mappa (ad esempio vecchi marker della posizione dell'utente)
        map.value.eachLayer(layer => {
            if (!(layer instanceof L.TileLayer)) {
                map.value.removeLayer(layer);
            }
        })
    }

    // localizzazione avvenuta con successo
    function locationSuccess(pos) {
        const crd = pos.coords;

        clearMap()

        // aggiungo un marker diverso per la posizione attuale dell'utente
        L.marker([crd.latitude, crd.longitude], { icon: getColoredIcon('green') }).addTo(map.value)

        // centro la visualizzazione della mappa sulla mia posizione con zoom default
        map.value.setView([crd.latitude, crd.longitude], zoom.value)

        // mostro i poligoni cui l'utente all'interno della loro area
        let allGeoJsonLayers = [];
        geoJsonData.forEach(obj => {
            allGeoJsonLayers.push(obj.id)
        })

        userPosition.value = point([crd.longitude, crd.latitude])

        forcedFilterSelection.value = allGeoJsonLayers // passo alla selezione forzata (dalla mappa) dei filtri tutti i layer, sarà poi gestisciFiltro a decidere cosa mostrare e cosa no
    }

    // errore nella localizzazione dell'utente
    function locationError(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    // localizzazione dell'utente
    function getUserLocation() {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, options)
    }

    function toggleFilters() {
        showFilters.value = !showFilters.value;
    }
</script>

<template>
    <!--<h1>Mappa</h1>-->
    <div class="container">
        <vButton testo="Filtri" :fn="toggleFilters" id="filtersBtn"/>
        <div class="filters">
            <Transition name="dropdown">
                <mapFilter v-show="showFilters" :layers="geoJsonData" :external-selection="forcedFilterSelection" @update-selection="gestisciFiltro" class="menu" />
            </Transition>
        </div>

        <vButton testo="La Mia Posizione" :fn="getUserLocation" id="position-btn"/>

        <!--TODO: rendere visibile i tool per aggiungere layer alla mappa solo ai dipendenti-->
        <zoneEditor v-if="map && loggedUser.role==='dipendente'" :map="map" @zone-created="reloadMapItems" />
       
        <div ref="mapContainer" class="mapContainer"></div>
    </div>
</template>

<style>
    .container {
        position: relative;
        top: 0vh;
        height: 100vh;
        width: 100vw;
    }
    
    .menu {
        display: block;
        padding: 50px;
        height: fit-content;
    }

    #filtersBtn {
        position: absolute;
        top: 20px;
        right: 50px;
        z-index: 1;
    }

    .filters  {
        /*display: none;*/
        border-radius: 20px;
        position: absolute;
        top: 90px;
        right: 50px;
        z-index: 1;
        background: #fff;
        color: #000;
        transition: all 1s cubic-bezier(.215, .61, .355, 1);
    }
    
    .mapContainer {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        height: 100vh;
        width: 100vw;
    }

    /* fase di animazione */
    .dropdown-enter-active {
        transition: all 0.3s ease, opacity 0.5s ease;
        overflow: hidden;
    }

    .dropdown-leave-active {
        transition: all 0.3s ease, opacity 0.2s ease;
        overflow: hidden;
    }

    /* stato chiuso */
    .dropdown-enter-from,
    .dropdown-leave-to {
        max-height: 0;
        opacity: 0;
        padding-top: 0;
        padding-bottom: 0;
    }

    /* stato aperto */
    .dropdown-enter-to,
    .dropdown-leave-from {
        max-height: 100vh; /* da aumentare se serve */
        opacity: 1;
    }


    #position-btn {
        position: absolute;
        top: 20px;
        left: 70px;
        z-index: 1;
    }

    @media (max-width: 768px) {
        #filtersBtn { right: 15px; }
        .filters { right: 15px; }
        #position-btn { left: 50px; }
    }
</style>