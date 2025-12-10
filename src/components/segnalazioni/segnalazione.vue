<script setup>
import { defineProps } from 'vue'
import Pulsanti from './pulsanti.vue'

// Props
const props = defineProps({
  id: { type: Number, required: true },
  titolo: { type: String, required: true },
  testo: { type: String, required: true }
})

// Variabile per il template
const isDipendente = localStorage.getItem('isDipendente') === 'true'
</script>

<template>
  <div class="segnalazione-card">
    <h3>{{ props.titolo }}</h3>
    <p>{{ props.testo }}</p>
    <small>ID: {{ props.id }}</small>
    <Pulsanti 
      v-if="isDipendente"
      :id="props.id"
    />
  </div>
</template>

<style scoped>
  .segnalazione-card {
    border: 1px solid #ccc;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 6px;
    background-color: #f9f9f9;
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