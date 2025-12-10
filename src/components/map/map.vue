<script setup>
    import {onMounted, ref} from 'vue'
    import L from 'leaflet'
    import mapFilter from './utils/filter.vue'

    const emit = defineEmits(['layers-loaded'])

    const map = ref()
    const mapContainer = ref()
    const zoom = ref(12)

    // layer (dovrenno arrivare tramite chiamata API)
    const geoJsonData = [
        {
            id: "layer_1",
            name: "Segnalazioni",
            visible: true,
            style: { color: 'red' },
            data: {
                type: "FeatureCollection",
                features: [
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
                ]
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
    }
</script>

<template>
    <h1>Mappa</h1>
    <mapFilter :layers="geoJsonData" @update-selection="gestisciFiltro"/>
    <div ref="mapContainer" class="mapContainer">
        
    </div>
</template>

<style>
    .mapContainer {
        height: 50vh;
        width: 50vh;
    }
</style>