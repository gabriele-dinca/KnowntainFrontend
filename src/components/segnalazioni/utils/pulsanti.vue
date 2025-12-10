<script setup>
  // Definisco le props che il componente riceve
  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  })

  function revisiona(valida){
    //implementare logica che chiama le api e invia id del dipendente e valida true o false
  }
</script>

<template>
  <div class="segnalazione-card">
    <button @click="revisiona('true')">Accetta</button>
    <button @click="revisiona('false')">Rifiuta</button>
  </div>
</template>