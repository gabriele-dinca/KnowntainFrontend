<script setup>
  import Segnalazione from '../../segnalazioni/utils/segnalazione.vue';

  // Props
  const props = defineProps({
    id: {type: String, required: true},
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    data: { type: String, required: true },
    tipo: { type: String, required: true },
    stato: { type: String, required: true },
    punti: {type: Number, required: true}
  });

</script>

<template>
  <div class="segnalazione-card">
    <Segnalazione
      :id="id"
      :titolo="titolo"
      :descrizione="descrizione"
      :data="data"
      :tipo="tipo"
      :stato="stato"
    />
    <div class="card-footer">
      <span>{{ punti }} punti</span>
    </div>
  </div>
</template>

<style scoped>
.segnalazione-card {
  color: var(--knt-black);
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.15s ease;
}

.segnalazione-card:hover {
  transform: translateY(-2px);
}

.card-footer {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #2563eb;
  margin-left: 20px;
}
</style>