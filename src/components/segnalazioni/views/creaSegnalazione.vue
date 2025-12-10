<script setup>
    import { ref } from "vue"

    const titolo = ref("")
    const testo = ref("")

    function invia() {
    }
</script>

<template>
  
  <h2>Crea segnalazione</h2>

  <div class="container">

    <input type="text" placeholder="Titolo" v-model="titolo" />
    <input type="text" placeholder="testo" v-model="testo" />

    <div class="button-group">
      <button class="btn-utente" @click="invia()">Invia</button>
    </div>
  </div>
</template>