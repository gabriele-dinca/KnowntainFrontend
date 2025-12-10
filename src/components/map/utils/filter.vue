<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        layers: Array
    })

    const emit = defineEmits(['update-selection'])

    const selectedLayers = ref([])

    watch(selectedLayers, (newSelection) => {
        emit('update-selection', newSelection)
    })
</script>

<template>
    <div id="map-filter-container">
        <label for="filter">Filtro:</label>

        <div v-for="layer in layers">
            <label :for="layer.id">{{ layer.name }}</label>
            <input :id="layer.id" :value="layer.id" type="checkbox" v-model="selectedLayers">
        </div>
    </div>
</template>

<style>

</style>