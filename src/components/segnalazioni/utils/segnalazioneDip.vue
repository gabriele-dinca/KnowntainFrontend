<script setup>
  import Pulsanti from '../utils/pulsanti.vue'
  import segnalazione from './segnalazione.vue';
  import { loggedUser } from '../../../states/user.js'

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
    <segnalazione
        :titolo="segnalazione.titolo"
        :descrizione="segnalazione.descrizione"
        :tipo="segnalazione.tipo"
        :stato="segnalazione.stato"
    />
    <Pulsanti 
      v-if="loggedUser.isDipendente"
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