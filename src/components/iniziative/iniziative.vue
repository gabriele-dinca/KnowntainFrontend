<script setup>
    import { onBeforeMount, ref } from 'vue';
    import { loggedUser } from '../../states/user';
    import Loader from '../utils/Loader.vue';
    import IniziativaCard from './iniziativeCard.vue';

    const loading = ref(true);
    const iniziative = ref([]);
    const errorMessage = ref(null);

    async function getStandings() {
        // Compongo l'URL per la richiesta 
        const HOST = import.meta.env.VITE_API_URL;
        const END_POINT = HOST + '/iniziative';

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
            loading.value = false;
            console.log(data);

            // Gestisco eventuali errori dal backend (401, 400, ecc.)
            if (!response.ok) {
                errorMessage.value = data.message;
                return;
            }

            iniziative.value = data;
        } catch (error) {
            // In caso di errore non gestito dal backend, mostro questo messaggio
            errorMessage.value = "Errore di connessione al Server";
            console.log(error);
        }
    }

    onBeforeMount(() => getStandings());
</script>

<template>
    <div class="iniziative">
    <h2>🌲 Iniziative</h2>

    <Loader v-if="loading" />

    <p v-else-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>

    
      <IniziativaCard
        v-for="i in iniziative"
        :key="i._id"
        :titolo="i.titolo"
        :descrizione="i.descrizione"
        :punti-attuali="i.puntiAttuali"
        :punti-totali="i.puntiObiettivo"
      />
  </div>

</template>



<style scoped>
.iniziative {
    max-width: 80vw;
    margin: 40px auto 20vh auto;
}

h2 {
    text-align: center;
    margin-bottom: 30px;
}

</style>

