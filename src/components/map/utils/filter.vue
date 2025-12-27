<script setup>
    import { ref, watch } from 'vue'
    import vButton from '../../utils/vButton.vue'

    const props = defineProps({
        layers: Array,
        resetSignal: Number
    })

    const emit = defineEmits(['update-selection'])

    const selectedLayers = ref([])

    watch(selectedLayers, (newSelection) => {
        emit('update-selection', newSelection)
    })

    // se viene modificata la variabile resetFilters (in map.vue), rimuovo tutti i layer dalla mappa (resetto il filtro)
    watch(() => props.resetSignal, () => {
        clearFilters()
    })

    // funzione per azzerare il filtro (può essere usata solo all'interno di filter.vue)
    function clearFilters() {
        selectedLayers.value = []
    }
</script>

<template>
    <div id="map-filter-container">
        <h3 for="filter">Filtri</h3>

        <div v-for="layer in layers" id="filters">
            <input :id="layer.id" :value="layer.id" type="checkbox" v-model="selectedLayers">
            <label :for="layer.id">{{ layer.name }}</label>
        </div>

        <vButton testo="Azzera" :fn="clearFilters" id="azzera-btn"/>
    </div>
</template>

<style>
    #map-filter-container {
        text-align: left;
    }

    #azzera-btn {
        margin-top: 15px;
    }

    input {
        margin-right: 10px;
    }
    

</style>