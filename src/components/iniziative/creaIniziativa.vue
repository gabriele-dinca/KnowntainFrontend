<script setup>
  import { ref } from "vue"
  import vButton from "../utils/vButton.vue";
  import { loggedUser } from "../../states/user.js";

  const titolo = ref("");
  const descrizione = ref("");
  const punti = ref(null);

  const errorMessage = ref("");
  const invioRiuscito = ref(false);

  async function sendIniziativa() {
    if (!titolo.value || !descrizione.value || !punti.value) {
      errorMessage.value = "Tutti i campi sono obbligatori";
      return
    }

    if (punti.value <= 0) {
        errorMessage.value = "I punti devono avere un valore positivo";
        return
    }

    try {

      // Compongo l'URL per la richiesta 
      const HOST = import.meta.env.VITE_API_URL;
      const END_POINT = HOST + '/iniziative';

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
          puntiObiettivo: punti.value
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
      errorMessage.value = "";

      titolo.value = "";
      punti.value = 0;
      descrizione.value = "";

      setTimeout(() => {
        invioRiuscito.value = false;
        
      }, 3000);
    } catch (err) {
      errorMessage.value = err.message;
    }
  }

</script>

<template>
  

  <div class="container">

    <h2>📝 Crea Iniziativa</h2>

      <input type="text" placeholder="Titolo" v-model="titolo" />

      <textarea
        placeholder="Descrizione"
        v-model="descrizione"
        rows="5"
      ></textarea>

      <input type="number" placeholder="Punti" min="1" v-model="punti">

      <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>
      <p v-if="invioRiuscito">Iniziativa Ricevuta ✅</p>

      <div class="button-group">
        <vButton testo="Invia" :fn="sendIniziativa" />
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