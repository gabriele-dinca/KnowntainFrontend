<script setup>
    import profilo from './views/profilo.vue';
    import storico_segnalazioni from './views/storico_segnalazioni.vue';
    import { loggedUser } from '../../states/user.js';
    import { ref, onBeforeMount } from 'vue';
    import Loader from '../utils/Loader.vue';

    const user = ref(null);
    const segnalazioni = ref([]);
    const loading = ref(true);
    const errorMessage = ref(null);


    async function getProfile() {
      // Compongo l'URL per la richiesta 
      const HOST = import.meta.env.VITE_API_URL;
      const END_POINT = HOST + '/utenti/me';

      try {
        // Invio una richeista POST al backend
        const response = await fetch(END_POINT, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'access-token': loggedUser.token
          }
        });

        // Trasformo la risposta in formato JSON
        const data = await response.json();
        console.log(data);

        // Gestisco eventuali errori dal backend (401, 400, ecc.)
        if (!response.ok) {
          errorMessage.value = data.message;
          return;
        }

        // splitto le informazioni ritonate
        // user => dati della componente profilo
        // segnalazioni => dati della componente storico_segnalzione
        user.value = {
          nome: data.nome,
          cognome: data.cognome,
          nickname: data.nickname,
          punti: data.punti,
        }

        segnalazioni.value = data.segnalazioni

      } catch (error) {
        // In caso di errore non gestito dal backend, mostro questo messaggio
        errorMessage.value = "Errore di connessione al Server";
        console.log(error);
      } finally {
        loading.value = false;
      }
    }

    onBeforeMount(() => {
        getProfile();
    })

</script>

<template>
    <Loader v-if="loading" />

    <div v-else-if="errorMessage">
      {{ errorMessage }}
    </div>

    <div v-else class="dashboard">
        <profilo :user="user" />
        <div class="storico-wrapper">
            <storico_segnalazioni :items="segnalazioni" />
        </div>
    </div>
</template>

<style>
.dashboard {
  display: flex;
  gap: 30px;
  width: 90vw;
  height: 85vh;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto;
  /*justify-content: space-evenly;*/
}

@media (max-width: 768px) {
  .dashboard {
    margin-top: 30px;
    flex-direction: column;
    width: 80vw;
  }
}

/* PROFILO (fisso) */
profilo {
  flex: 1;
}

/* STORICO SCROLLABILE */
.storico-wrapper {
  flex: 2;
  height: 500px;
  overflow-y: auto;  /* scroll verticale */
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

/* Scrollbar più elegante (Chrome / Edge) */
.storico-wrapper::-webkit-scrollbar {
  width: 8px;
}

.storico-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 8px;
}

.storico-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}

</style>