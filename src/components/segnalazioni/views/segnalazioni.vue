<script setup>
    import segnalazione from "../utils/segnalazione.vue" //Anche se la segna inutilizzata, non togliere
    import { loggedUser } from "../../../states/user";
    import { onBeforeMount, ref } from "vue";
    import Loader from "../../utils/Loader.vue";

    // Segnalazioni test
    const segnalazioni = ref(null);

    // Loader
    const loading = ref(true);

    async function getSegnalazioni() {
        // Compongo l'URL per la richiesta 
        const HOST = import.meta.env.VITE_API_URL;
        const END_POINT = HOST + '/segnalazioni';

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
            
            loading.value = false;  // Loader Scopare

            // Gestisco eventuali errori dal backend (401, 400, ecc.)
            if (!response.ok) {
                errorMessage.value = data.message;
                return;
            }

            segnalazioni.value = data;
        } catch (error) {
            // In caso di errore non gestito dal backend, mostro questo messaggio
            errorMessage.value = "Errore di connessione al Server";
            loading.value = false;
            console.log(error);
        }
    }

    onBeforeMount(() => getSegnalazioni());
</script>

<template>
    <div class="sig-display">
        <div class="segnalazioni">
            <div class="header-box">
                <h2>⚠️ Segnalazioni</h2>
                <RouterLink to="/segnalazioni/crea">
                    <button class="add-btn">Aggiungi Segnalazione</button>
                </RouterLink>
            </div>
            <Loader v-if="loading" />
            <segnalazione v-for="segnalazione in segnalazioni"
                :key="segnalazione.id"
                :titolo="segnalazione.titolo"
                :descrizione="segnalazione.descrizione"
                :tipo="segnalazione.tipo"
                :stato="segnalazione.stato"
            />
        </div>
    </div>
</template>

<style scoped>

/* Contenitore esterno che wrappa tutto */
.sig-display {
    margin-top: 5%;
    width: 100vw;
    margin-bottom: 20vh;
}

/* Contenitore delle segnalazioni */
.segnalazioni {
    width: 70%;
    margin: 0 auto;
}

/* Contenitore del Titolo e Bottone */
.header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 30px;
}

/* Style del Bottone */
.add-btn {
    display: block;
    margin: 20px auto;
    padding: 12px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
    width: 100%;
    max-width: 250px;
}

.add-btn:hover { background-color: #0056b3; }
.add-btn:active { background-color: #003f82; transform: scale(0.98); }

/* Aggiustamenti per mobile */
@media (max-width: 768px) {
    .segnalazioni { width: 80%; margin-top: 10%;}
    .header-box { justify-content: center; }
    .header-box h2 { font-size: 40px; }
}
</style>