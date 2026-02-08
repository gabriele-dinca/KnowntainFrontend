<script setup>
  const props = defineProps({
    id: { type: String, required: true },
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    data: { type: String, required: true },
    tipo: { type: String, required: true },
    stato: { type: String, required: true },
    canModerate: {type: Boolean, required: false}
  });

  const emit = defineEmits(['change-stato'])

  function cambiaStato(nuovoStato) {

    emit('change-stato', {
      id: props.id,
      stato: nuovoStato
    })
  }

</script>

<template>
  <div class="segnalazione-card">
    <div class="card-header">
      <p class="data">{{ 
        new Date(data).toLocaleString('it-IT', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        }).replace(/\//g, '-')
        }}
      </p>

      <h3>{{ titolo }}</h3>
      <span class="tipo">{{ tipo }}</span>
    </div>
    <p class="descrizione">{{ descrizione }}</p>
    <div class="card-footer">
      <span class="stato">Stato: {{ stato }}</span>
    </div>

    <div class="btn-group" v-if="canModerate && stato === 'Aperta'">
      <button class="button" @click="cambiaStato('Validata')">Valida</button>
      <button class="button" @click="cambiaStato('Rifiutata')">Rifiuta</button>
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
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 12px;
}

.card-header .data {
  font-size: 14px;
  color: #9ca3af; /* grigio chiaro */
  margin-bottom: 10px;
  font-weight: 500;
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
  margin-top: 4px;
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

.btn-group {
  display: flex;
  align-items: center;
  justify-content: baseline;
  gap: 20px;
  margin-top: 30px;
}

.button {
  text-transform: capitalize;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  background-color: var(--knt-green);
}

.button:nth-child(2) {
  background-color: red;
}

</style>