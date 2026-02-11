<script setup>
    import Segnalazione from "../utils/segnalazione.vue"
    import { loggedUser } from "../../../states/user";
    import { onBeforeMount, ref } from "vue";
    import Loader from "../../utils/Loader.vue";

    const segnalazioni = ref([]);

    const errorMessage = ref(null);

    // Loader
    const loading = ref(true);
    const voidSegnalazioni = ref(false);

    // Chiamata API per prelevare le segnalazioni ---------------------------
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
            
            loading.value = false;  // Loader Scopare

            // Gestisco eventuali errori dal backend (401, 400, ecc.)
            if (!response.ok) {
                errorMessage.value = data.message;
                return;
            }
            
            segnalazioni.value = data.segnalazioni;
            console.log(segnalazioni);
            
            // Se non ci sono segnalazioni mostro un messaggio
            if (segnalazioni.value.length === 0) {
                voidSegnalazioni.value = true;
                errorMessage.value = 'Nessuna Segnalazione';
            }

        } catch (error) {
            // In caso di errore non gestito dal backend, mostro questo messaggio
            errorMessage.value = "Errore di connessione al Server";
            loading.value = false;
            console.log(error);
        }
    }

    onBeforeMount(() => getSegnalazioni());

    // Chiamata API per la modifica dello stato ---------------------------

    const msg = ref("");
    const showInfo = ref(false);

    async function aggiornaStato({ id, stato, punti }) {

        // Compongo l'URL per la richiesta 
        const HOST = import.meta.env.VITE_API_URL;
        const END_POINT = `${HOST}/segnalazioni/${id}`;

        /*console.log("Patch segnalazione: ", END_POINT);
        console.log("Nuovo Stato: ", stato);
        console.log("Punti Assegnati: ", punti);*/
        
        try {
            // Invio una richeista POST al backend
            const response = await fetch(END_POINT, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'access-token': loggedUser.token
                },
                body: JSON.stringify({
                    stato: stato,
                    punti: punti
                })
            });
            showInfo.value = true;

            if (!response.ok) {
                console.error("Errore dal backend:", response.status, data);
                msg.value = "Errore dal backend:" + response.status;
                return;
            }

            // Trasformo la risposta in formato JSON
            const data = await response.json();
            console.log('Segnalazione Aggiornata', data);

            msg.value = `Segnalazione ${stato} con successo`;

            // Refresh delle segnalazioni
            getSegnalazioni();
        } catch (error) {
            // In caso di errore non gestito dal backend, mostro questo messaggio
            errorMessage.value = "Errore di connessione al Server";
            loading.value = false;
            console.log(error);
        }
    }
</script>

<template>
    <div class="sig-display">
        <div class="segnalazioni">
            <div class="header-box">
                <h2>⚠️ Segnalazioni</h2>
                <RouterLink to="/segnalazioni/crea" v-if="loggedUser.role === 'utente'" >
                    <button class="add-btn">Aggiungi Segnalazione</button>
                </RouterLink>
                <p class="error-text" v-if="voidSegnalazioni">{{ errorMessage }}</p>
            </div>
            <Loader v-if="loading" />

            <Segnalazione
                v-for="s in segnalazioni"
                :key="s._id"
                :id="s._id"
                :titolo="s.titolo"
                :descrizione="s.descrizione"
                :data="s.data"
                :tipo="s.tipo"
                :stato="s.stato"
                :canModerate="loggedUser.role === 'dipendente'"
                @change-stato="aggiornaStato"
            />
        </div>
    </div>

    <div class="info-box" v-if="showInfo">
        <p>{{ msg }}</p>
        <button class="button" @click="showInfo =!showInfo">OK</button>
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


/* Info - Box */
.info-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: var(--knt-black);
    width: 300px;
    height: 200px;
    border-radius: 20px;
    text-align: center;
}

.info-box p {
    color: var(--knt-abs-white);
    padding: 30px;
    font-size: 20px;
    font-weight: bold;
}

.button {
    text-transform: capitalize;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    color: white;
    background-color: var(--knt-blue);
    box-shadow: none;

    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>