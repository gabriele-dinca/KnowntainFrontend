<script setup>
    import { ref, watch } from 'vue'
    import vButton from '../../utils/vButton.vue'

    const props = defineProps({
        layers: Array,
        externalSelection: {
            type: Array,
            default: null
        }
    })

    const emit = defineEmits(['update-selection'])

    const selectedLayers = ref([])
    let ignoreUpdate = false

    watch(selectedLayers, (newSelection) => {
        // selectedLayers è cambiada, verifico se devo ignorare l'evento tramite il semaforo 'ignoreUpdate'
        if (ignoreUpdate) {
            ignoreUpdate = false;
            return;
        }

        emit('update-selection', newSelection);
    })

    // se viene modificata la variabile externalSelection (in map.vue), mostro i layer selezionati da map.vue (e non dal filtro)
    watch(() => props.externalSelection, (newExternalFilter) => {
        if (newExternalFilter) {
            // azzero i filtri settando il semaforo 'ignoreUpdate' in modo che non venga emesso l'evento del cambio filtro per la mappa
            ignoreUpdate = true;
            clearFilters();

            // genero l'evento del cambio filtro, ma solo con i layer che la mappa mi ha forzatamente inviato
            emit('update-selection', newExternalFilter);
        }
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