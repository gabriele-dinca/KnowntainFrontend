<script setup>
import { computed, ref } from 'vue'
import vButton from '../utils/vButton.vue';
import { loggedUser } from '../../states/user';

const props = defineProps({
  id: { type: String, required: true },
  titolo: { type: String, required: true },
  descrizione: { type: String, required: true },
  puntiAttuali: { type: Number, required: true },
  puntiTotali: { type: Number, required: true }
})

const percentuale = computed(() => {
  if (props.puntiTotali === 0) return 0
  return Math.min(100, Math.round((props.puntiAttuali / props.puntiTotali) * 100))
});

const errorMessage = ref("");
const errorOccured = ref(false);

const puntiAssegnati = ref(0);
const confirmMsg = ref(false);
const isSubmitting = ref(false);

const emit = defineEmits(['refresh']);

async function assignPoints() {
  // Compongo l'URL per la richiesta 
  const HOST = import.meta.env.VITE_API_URL;
  const END_POINT = `${HOST}/iniziative/${props.id}`;

  try {
    // Disabilito il Pulsante per assegnare punti
    isSubmitting.value = true;

    // Invio una richeista POST al backend
    const response = await fetch(END_POINT, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'access-token': loggedUser.token
      },
      body: JSON.stringify({ puntiAssegnati: puntiAssegnati.value })
    });
    
    // Trasformo la risposta in formato JSON
    const data = await response.json();

    console.log(data);

    // Gestisco eventuali errori dal backend (401, 400, ecc.)
    if (!response.ok) {
      errorOccured.value = true;
      errorMessage.value = data.message;
      return;
    }

    errorOccured.value = false;
    confirmMsg.value = true;
    setTimeout(() => {
      confirmMsg.value = false;
    }, 3000);

    // Nuovo get delle iniziative
    emit('refresh');
  } catch (err) {
    errorOccured.value = true;
    errorMessage = err.message;
    console.log(err);
  } finally {
    isSubmitting.value = false;
    puntiAssegnati.value = 0;
  }
}


let showInput = ref(false);

function mostraInput() {
  showInput.value =! showInput.value;
}

</script>

<template>
  <div class="iniziativa-card">
    <header>
      <h3>{{ titolo }}</h3>
    </header>

    <p class="descrizione">{{ descrizione }}</p>

    <div class="progress">
      <div class="progress-info">
        <span>{{ puntiAttuali }} / {{ puntiTotali }} punti</span>
        <span>{{ percentuale }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: percentuale + '%' }" />
      </div>
    </div>
    <div class="show-more"v-if="loggedUser.role === 'utente'">
      <vButton testo="Assegna Punti" :fn="mostraInput" />
    </div>
    <div class="user-controls" v-if="showInput">
      <input type="number" placeholder="Punti" v-model="puntiAssegnati">
      <vButton testo="OK" :fn="assignPoints" :disabled="isSubmitting" />
    </div>
    <div class="infos">
      <p v-if="confirmMsg">Iniziativa Aggiornata ✅</p>
      <p class="error-text" v-if="errorOccured">{{ errorMessage }}</p>
    </div>
    
  </div>
</template>

<style scoped>
.iniziativa-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 50px;
}

h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.descrizione {
  font-size: 0.95rem;
  color: #555;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.4rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #16a34a, #22c55e);
  transition: width 0.3s ease;
}

.show-more {
  margin: 0 auto;
}

.user-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.infos p { text-align: center; }

</style>