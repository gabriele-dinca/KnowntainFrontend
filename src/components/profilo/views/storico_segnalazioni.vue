<script setup>
    import segnalazione from '../utils/segnalazioneScore.vue';

    //Segnalazioni test
    let test = [
        { id: 1, titolo: 'Problema 1', testo: 'Testo della segnalazione 1', score: 300 },
        { id: 2, titolo: 'Problema 2', testo: 'Testo della segnalazione 2', score: 1000},
        { id: 3, titolo: 'Problema 3', testo: 'Testo della segnalazione 3', score: 69}
    ];
</script>

<template>
    <div class="sig-display">
        <div>
            <segnalazione v-for="sig in test"
                :key="sig.id"
                :id="sig.id"
                :titolo="sig.titolo"
                :testo="sig.testo"
                :score="sig.score"
            />
        </div>

    </div>
</template>

<style scoped>
.sig-display {
  max-width: 900px;
  margin: 90px auto; /* spazio dalla navbar fissa */
  padding: 0 20px;
}

/* Contenitore della lista */
.sig-display > div {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

/* (Opzionale) se vuoi uniformare le card segnalazione */
.segnalazione-card {
  background-color: #ffffff;
  border-radius: 14px;
  padding: 20px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.segnalazione-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

/* Titolo segnalazione */
.segnalazione-card h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #333;
}

/* Testo segnalazione */
.segnalazione-card p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

/* Score */
.segnalazione-card .score {
  margin-top: 12px;
  font-size: 13px;
  font-weight: 600;
  color: #007bff;
}

</style>