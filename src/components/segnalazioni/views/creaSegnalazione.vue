<script setup>
  import { ref } from "vue"
  import vButton from "../../utils/vButton.vue";
  import { loggedUser } from "../../../states/user.js";

  const titolo = ref("");
  const descrizione = ref("");
  const tipo = ref("");

  const errorMessage = ref("");
  const invioRiuscito = ref(false);
  const isSubmitting = ref(false);

  async function sendSegnalazione() {
    // Impedisce invii multipli della stessa segnalazione
    if (isSubmitting.value) return;

    if (!titolo.value || !descrizione.value || !tipo.value) {
      errorMessage.value = "Tutti i campi sono obbligatori";
      return
    }

    try {
      // Disabilito nuovi invii
      isSubmitting.value = true;

      // Cerco di ottenere le coords dell'utente
      const coords = await getUserLocation();

      // Compongo l'URL per la richiesta 
      const HOST = import.meta.env.VITE_API_URL;
      const END_POINT = HOST + '/segnalazioni';

      // Invio una richeista POST al backend
      const response = await fetch(END_POINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': loggedUser.token 
        },
        body: JSON.stringify({
          titolo: titolo.value,
          descrizione: descrizione.value,
          tipo: tipo.value,
          posizione: {
            type: 'Point',
            coordinates: [coords.longitude, coords.latitude]
          }
        })
      });

      // Trasformo la risposta in formato JSON
      const data = await response.json();
      console.log(data);

      // Gestisco eventuali errori dal backend (401, 400, ecc.)
      if (!response.ok) {
        errorMessage.value = data.message;
        return;
      }
      invioRiuscito.value = true;

      titolo.value = "";
      tipo.value = "";
      descrizione.value = "";

      setTimeout(() => {
        invioRiuscito.value = false;
      }, 3000);
    } catch (err) {
      errorMessage.value = err.message;
      console.error("Errore localizzazione:", err.message);
    } finally {
      isSubmitting.value = false;
    }
  }

  async function getUserLocation() {
    if (!navigator.geolocation) {
      throw new Error("Geolocalizzazione non supportata")
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    return await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        options
      )
    });
  }

</script>

<template>
  

  <div class="container">

    <h2>📝 Crea Segnalazione</h2>

      <input type="text" placeholder="Titolo" v-model="titolo" />
      <select v-model="tipo">
        <option value="Seleziona un tipo" disabled selected hidden>Seleziona un Tipo</option>
        <option value="Avvistamento Faunistico">Avvistamento Faunistico</option>
        <option value="Condizioni Meteo">Condizioni Meteo</option>
        <option value="Manutenzione Sentieri">Manutenzione Sentieri</option>
        <option value="Caduta Alberi">Caduta Alberi</option>
        <option value="Pericolo Frane">Pericolo Frane</option>
        <option value="Pericolo Valanghe">Pericolo Valanghe</option>
        <option value="Altro">Altro</option>
      </select>

      <textarea
        placeholder="Descrizione"
        v-model="descrizione"
        rows="5"
      ></textarea>

      <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>
      <p v-if="invioRiuscito">Segnalazione Ricevuta ✅</p>

      <div class="button-group">
        <vButton testo="Invia" :fn="sendSegnalazione" :disabled="isSubmitting" />
      </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  height: auto;
  margin: 30px auto 20vh auto;
  padding: 30px;

  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  margin-top: 24px;
  margin-bottom: 50px;
  font-weight: 600;
}

/* BASE INPUT */
input,
select,
textarea {
  display: block;
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 18px;

  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #d1d5db;

  font-size: 14px;
  font-family: inherit;
  background-color: #fff;
}

/* PLACEHOLDER */
input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

/* FOCUS */
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

/* SELECT specific */
select {
  cursor: pointer;
}

/* TEXTAREA */
textarea {
  resize: vertical;
}

/* BUTTON */
.button-group {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .container { width: 80vw; }
  h2 { font-size: 40px; }
}

</style>