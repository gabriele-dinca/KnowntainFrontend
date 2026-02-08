<script setup>
    import {onMounted, onBeforeMount , ref, shallowRef, computed} from 'vue'
    import { loggedUser } from '../../states/user'
    import L from 'leaflet'
    import { booleanPointInPolygon, geometry, point } from '@turf/turf'
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
    const isEmployee = computed(() => loggedUser.role === 'dipendente')


    // GET posizioni delle Segnalazioni ----------------------------------------
    const segnalazioni = ref([]);
    let markers = [];

    async function getSegnalazioni() {
        // Compongo l'URL per la richiesta 
        const HOST = import.meta.env.VITE_API_URL;
        const END_POINT = HOST + '/segnalazioni';

        try {
            // Invio una richeista POST al backend
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
                return;
            }

            segnalazioni.value = data;

             

            segnalazioni.value.forEach(element => {
                markers.push({
                    type: "Feature",
                    properties: { nome: element.titolo },
                    geometry: element.posizione
                });
            });

    console.log(markers);


        } catch (error) {
            // In caso di errore non gestito dal backend, mostro questo messaggio
            //errorMessage.value = "Errore di connessione al Server";

            console.log(error);
        }
    }

    onBeforeMount(() => getSegnalazioni());

   



    // layer (dovrenno arrivare tramite chiamata API)
    const geoJsonData = [
        {
            id: "layer_1",
            name: "Segnalazioni",
            visible: true,
            style: { color: 'red' },
            data: {
                type: "FeatureCollection",
                // Arriva tramite chiamata API
                features: markers /*[
                    {
                        type: "Feature",
                        properties: { nome: "Pizzeria Napoli", rating: 5 },
                        geometry: { type: "Point", coordinates: [11.1210, 46.0680] }
                    },
                    {
                        type: "Feature",
                        properties: { nome: "Sushi Zen", rating: 4 },
                        geometry: { type: "Point", coordinates: [11.1250, 46.0710] }
                    }
                ]*/
            }
        },
        {
            id: "layer_2",
            name: "Aree protette",
            visible: true,
            style: { color: 'green' },
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: { nome: "Parco delle Albere" },
                        geometry: {
                            type: "Polygon",
                            coordinates: [[
                                [11.1150, 46.0650],
                                [11.1180, 46.0650],
                                [11.1180, 46.0620],
                                [11.1150, 46.0620],
                                [11.1150, 46.0650]
                            ]]
                        }
                    }
                ]
            }
        },
        {
            id: "layer_3",
            name: "Strade forestali",
            visible: true,
            style: { color: 'blue' },
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: { nome: "Pista Ciclabile" },
                        geometry: {
                            type: "LineString",
                            coordinates: [
                                [11.1200, 46.0700],
                                [11.1220, 46.0720],
                                [11.1240, 46.0730]
                            ]
                        }
                    }
                ]
            }
        },
        {
            id: "layer_4",
            name: "Area test 1",
            visible: true,
            data: {
                type: "Feature",
                geometry: {
                    coordinates: [
                        [
                            [
                            11.070762295522854,
                            46.111434099274646
                            ],
                            [
                            11.070762295522854,
                            46.06782124649308
                            ],
                            [
                            11.208986689566245,
                            46.06782124649308
                            ],
                            [
                            11.208986689566245,
                            46.111434099274646
                            ],
                            [
                            11.070762295522854,
                            46.111434099274646
                            ]
                        ]
                    ],
                    type: "Polygon"
                }
            }
        },
        {
            id: "layer_5",
            name: "Area test 2",
            visible: true,
            data: {
                type: "Feature",
                geometry: {
                    "coordinates": [
                    [
                        [
                        11.05964846800407,
                        46.05088794266831
                        ],
                        [
                        11.081340450756073,
                        46.04398700229311
                        ],
                        [
                        11.09095407951753,
                        46.05088794266831
                        ],
                        [
                        11.156801375245124,
                        46.083631726495014
                        ],
                        [
                        11.166754404147127,
                        46.13128218914213
                        ],
                        [
                        11.084978101449025,
                        46.11449709364899
                        ],
                        [
                        11.108222703639171,
                        46.08209708771918
                        ],
                        [
                        11.05964846800407,
                        46.09097074611438
                        ],
                        [
                        11.05964846800407,
                        46.05088794266831
                        ]
                    ]
                    ],
                    "type": "Polygon"
                }
            }
        }
    ];

    onMounted (() => { //solo dopo che l'html è stato montato
        map.value = L.map(mapContainer.value).setView([46.0667, 11.1333], zoom.value); //definisco il centro e lo zoom

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            minZoom: 8
        }).addTo(map.value);

        const infoLayers = geoJsonData.filter(layer => layer.visible == true).map(layer => ({ id: layer.id, name: layer.name }))
        emit('layers-loaded', infoLayers)
    })

    const layersCache = {} // variabile in cui salvo i layer che servono all'utente come oggetti
    // fino a quando un layer non viene selezionato nel filtro, non viene nemmeno caricato

    function gestisciFiltro(newSelection) { //newSelection è l'array che mi arriva da filter.vue in cui ci sono gli id dei layer da mostrare 
        geoJsonData.forEach(obj => {
            // se il layer non esiste ancora in cache, lo creo (lazy creation) 
            if (!layersCache[obj.id]) {
                layersCache[obj.id] = L.geoJSON(obj.data);
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
        L.marker([crd.latitude, crd.longitude], { icon: getColoredIcon('red') }).addTo(map.value)

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

        <vButton testo="Mostra Limitazioni" :fn="getUserLocation" id="limitationsBtn"/>

        <!--TODO: rendere visibile i tool per aggiungere layer alla mappa solo ai dipendenti-->
        <zoneEditor v-if="map" :map="map" />
       
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


    #limitationsBtn {
        position: absolute;
        top: 20px;
        left: 70px;
        z-index: 1;
    }

    @media (max-width: 768px) {
        #filtersBtn { right: 15px; }
        .filters { right: 15px; }
        #limitationsBtn { left: 50px; }
    }
</style>