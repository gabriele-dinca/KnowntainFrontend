<script setup>
    import {onMounted, ref} from 'vue'
    import L from 'leaflet'

    const map = ref()
    const mapContainer = ref()
    const zoom = ref(12)

    onMounted (() => { //solo dopo che l'html è stato montato
        map.value = L.map(mapContainer.value).setView([46.0667, 11.1333], zoom.value); //definisco il centro e lo zoom

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            minZoom: 8
        }).addTo(map.value);
    })
</script>

<template>
    <div ref="mapContainer" class="mapContainer">
        
    </div>
</template>

<style>
    .mapContainer {
        height: 50vh;
        width: 50vh;
    }
</style>