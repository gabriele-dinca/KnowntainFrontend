<script setup>
  // Definisco le props che il componente riceve
  const props = defineProps({
    testo: { type: String, required: true },
    fn: { type: Function, required: true }
  })
  
</script>

<template>
    <button @click="fn()">{{testo}}</button>
</template>