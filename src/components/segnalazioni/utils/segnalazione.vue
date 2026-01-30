<script setup>
  import Pulsanti from '../utils/pulsanti.vue'

  // Props
  const props = defineProps({
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    tipo: { type: String, required: true },
    stato: { type: String, required: true }
  })

  // Variabile per il template
</script>

<template>
  <div class="segnalazione-card">
    <h3>{{ titolo }}</h3>
    <h4>{{ tipo }}</h4>
    <h5>Stato: {{ stato }}</h5>
    <p>{{ descrizione }}</p>
  </div>
</template>

<style scoped>
  .segnalazione-card {
    border: 1px solid #ccc;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 6px;
    background-color: #f9f9f9;
    cursor: pointer;
  }
  .segnalazione-card *{
    color: #666
  }
  h3 {
    margin: 0 0 8px 0;
  }
  p {
    margin: 0 0 4px 0;
  }
  small {
    color: #666;
  }
</style>