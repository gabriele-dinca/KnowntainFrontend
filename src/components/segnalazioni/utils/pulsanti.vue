<script setup>
  import vButton from "../../utils/vButton.vue"
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
    <vButton
      testo="Accetta"
      :fn="()=>revisiona(true)"
    />
    <vButton
      testo="Rifiuta"
      :fn="()=>revisiona(false)"
    />
  </div>
</template>