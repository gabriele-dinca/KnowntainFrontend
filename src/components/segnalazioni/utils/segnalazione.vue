<script setup>
  import Pulsanti from '../utils/pulsanti.vue'

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
    <div class="card-header">
      <h3>{{ titolo }}</h3>
      <span class="tipo">{{ tipo }}</span>
    </div>
    <p class="descrizione">{{ descrizione }}</p>
    <div class="card-footer">
      <span class="stato">Stato: {{ stato }}</span>
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
  cursor: pointer;
}

.segnalazione-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-bottom: 12px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.card-header .tipo {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.descrizione {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 16px;
  line-height: 1.4;
}

.card-footer .stato {
  font-size: 13px;
  color: #2563eb;
  font-weight: 500;
}
</style>