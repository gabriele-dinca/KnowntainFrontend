<script setup>
    import segnalazione from "../components/segnalazioni/segnalazione.vue"
    const segnalazioni = [
        { id: 1, titolo: 'Problema 1', testo: 'Testo della segnalazione 1' },
        { id: 2, titolo: 'Problema 2', testo: 'Testo della segnalazione 2' },
        { id: 3, titolo: 'Problema 3', testo: 'Testo della segnalazione 3' }
    ];

</script>

<template>
    <div>
        <segnalazione v-for="segnalazione in segnalazioni"
        :key="segnalazione.id"
        :id="segnalazione.id"
        :titolo="segnalazione.titolo"
        :testo="segnalazione.testo"
        />
    </div>


</template>