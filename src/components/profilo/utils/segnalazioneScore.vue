<script setup>
  import segnalazione from '../../segnalazioni/utils/segnalazione.vue';

  // Props
  const props = defineProps({
    id: { type: Number, required: true },
    titolo: { type: String, required: true },
    testo: { type: String, required: true },
    score: {type: Number, required: true}
  })

</script>

<template>
  <div class="segnalazione-card">
    <segnalazione
        :id="id"
        :titolo="titolo"
        :testo="testo"
    />
    <h3>{{ score }} punti</h3>
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