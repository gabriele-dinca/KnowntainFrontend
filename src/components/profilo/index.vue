<script setup>
    import profilo from './views/profilo.vue';
    import ProfiloDipendente from './views/profiloDipendente.vue';
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

      let END_POINT = HOST;

      if (loggedUser.role === 'utente') {
        END_POINT += '/utenti/me';
      } else {
        END_POINT += '/dipendenti/me';
      }

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

        if (loggedUser.role === 'utente') {
          // splitto le informazioni ritonate
          // user => dati della componente profilo
          // segnalazioni => dati della componente storico_segnalzione
          user.value = {
            nome: data.nome,
            cognome: data.cognome,
            nickname: data.nickname,
            punti: data.punti
          }
          
          segnalazioni.value = data.segnalazioni
        } else {
          user.value = {
            nome: data.nome,
            cognome: data.cognome,
            email: data.email,
            isAdmin: data.isAdmin
          }
          console.log(user);
        }
      } catch (error) {
        // In caso di errore non gestito dal backend, mostro questo messaggio
        errorMessage.value = "Errore di connessione al Server";
        console.log(error);
      } finally {
        loading.value = false;
      }
    }

    onBeforeMount( () => getProfile() );

</script>

<template>
    <Loader v-if="loading" />

    <p v-else-if="errorMessage" class="error-text">
      {{ errorMessage }}
    </p>

    <div v-else-if="loggedUser.role === 'utente'" class="dashboard">
        <profilo :user="user" class="profilo"/>
        <div class="storico-wrapper">
            <storico_segnalazioni :items="segnalazioni" />
        </div>
    </div>

    <div v-else-if="loggedUser.role === 'dipendente'" class="dashboard">
      <ProfiloDipendente :user="user" />
    </div>
</template>

<style>
.dashboard {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 30px;

  width: 90vw;
  height: 88vh;
  padding-top: 50px;
  margin: 0 auto;
  margin-bottom: 20vh;
}

.profilo { flex: 1; }

/* STORICO Scollabile */
.storico-wrapper {
  flex: 2;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  max-height: 100%;
}

/* Scrollbar */
.storico-wrapper::-webkit-scrollbar { width: 8px; }
.storico-wrapper::-webkit-scrollbar-thumb { background-color: #ccc; border-radius: 8px; }
.storico-wrapper::-webkit-scrollbar-thumb:hover { background-color: #aaa; }

@media (max-width: 768px) {
  .dashboard {
    margin-top: 30px;
    flex-direction: column;
    width: 80vw;
    height: auto;
  }

  .storico-wrapper {
    width: 100%;
    flex: none;
    overflow-y: visible;
  }

  .profilo { width: 100%; }
}

</style>