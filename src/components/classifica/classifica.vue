<script setup>
    import { onBeforeMount, ref } from 'vue';
    import { loggedUser } from '../../states/user';
    import Loader from '../utils/Loader.vue';

    const loading = ref(true);
    const classifica = ref(null);
    const errorMessage = ref(null);

    async function getStandings() {
        // Compongo l'URL per la richiesta 
        const HOST = import.meta.env.VITE_API_URL;
        const END_POINT = HOST + '/classifica';

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

            classifica.value = data;
        } catch (error) {
            // In caso di errore non gestito dal backend, mostro questo messaggio
            errorMessage.value = "Errore di connessione al Server";
            console.log(error);
        }
    }

    onBeforeMount(() => getStandings());
</script>

<template>
    <div class="classifica">
        <h2>🏆 Classifica</h2>
        <Loader v-if="loading" />
        <div v-else-if="errorMessage" class="error-text">{{ errorMessage }}</div>

        <ul v-else>
        <li
            v-for="(utente, index) in classifica"
            :key="utente._id"
            class="row"
            :class="[
                `pos-${utente.posizione}`,
                { 'is-me': utente._id === loggedUser.id }
            ]"
        >
            <span class="posizione">
            {{ index + 1 }}
            </span>

            <span class="nickname">
            {{ utente.nickname }}
            </span>

            <span class="punti">
            {{ utente.punti }} pts
            </span>
        </li>
        </ul>
  </div>
</template>

<style scoped>
/* Wrapper Esterno */
.classifica {
    margin-top: 40px;
    max-width: 80vw;
    margin: 50px auto 0 auto;
}


.classifica h2 { text-align: center; margin-bottom: 30px;}
ul { list-style: none; padding: 0; }

/* Singola riga della classifica */
.row {
    display: grid;
    grid-template-columns: 40px 1fr 80px;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 10px;

    background: #fff;
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    cursor: pointer;
}

/* Posizione, nickname Utente e punti totali */
.posizione { font-weight: 700; }
.nickname { font-weight: 600; }
.punti { text-align: right; font-weight: 700; }

/* Top 3 */
.pos-1 { background: #ffd900d7; } /* Oro */
.pos-2 { background: #C0C0C0; } /* Argento */
.pos-3 { background: #CD7F32; } /* Bronzo */

/* Stile della riga che riguarda l'utente loggato (se presente in top 50) */
.is-me > .nickname::after {
    content: "Tu";
    margin-left: 15px;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--knt-green);
    color: white;
    font-weight: 600;
}

.is-me {
    border: 2px solid var(--knt-green);
    box-shadow: 0 0 15px var(--knt-green);
}
</style>