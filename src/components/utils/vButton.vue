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

<style scoped>
  button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--knt-green);
  color: var(--knt-white);
  cursor: pointer;
  transition: border-color 0.25s;
}
  button:hover {
    background-color: var(--knt-white);
    color: var(--knt-green);
    border: 1px solid var(--knt-green);
  }
</style>