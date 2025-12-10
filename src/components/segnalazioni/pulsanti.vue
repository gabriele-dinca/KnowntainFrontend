<script setup>
  import { defineProps } from 'vue'

  // Definisco le props che il componente riceve
  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  })
</script>

<template>
  <div class="segnalazione-card">
    <button type="submit">Accetta</button>
    <button type="submit">Rifiuta</button>
  </div>
</template>