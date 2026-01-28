<script setup>
    import segnalazione from "../utils/segnalazioneDip.vue" //Anche se la segna inutilizzata, non togliere


    //Segnalazioni test
    const segnalazioni = [
        { id: 1, titolo: 'Problema 1', testo: 'Testo della segnalazione 1' },
        { id: 2, titolo: 'Problema 2', testo: 'Testo della segnalazione 2' },
        { id: 3, titolo: 'Problema 3', testo: 'Testo della segnalazione 3' }
    ];

</script>

<template>
    <div class="sig-display">
        <div class="segnalazioni">
            <segnalazione v-for="segnalazione in segnalazioni"
                :key="segnalazione.id"
                :id="segnalazione.id"
                :titolo="segnalazione.titolo"
                :testo="segnalazione.testo"
            />
        </div>
        <RouterLink to="/segnalazioni/crea">
            <button class="add-btn">Aggiungi Segnalazione</button>
        </RouterLink>

    </div>


</template>

<style scoped>

.sig-display {
    width: 100vw;
    border: 1px solid green;
}

.segnalazioni {
    width: 60%;
    margin: 0 auto;
    border: 1px solid red;
}

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

.add-btn:hover {
  background-color: #0056b3;
}

.add-btn:active {
  background-color: #003f82;
  transform: scale(0.98);
}
</style>