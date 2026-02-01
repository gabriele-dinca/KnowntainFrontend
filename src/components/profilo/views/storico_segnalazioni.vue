<script setup>
    import segnalazione from '../utils/segnalazioneScore.vue';

  defineProps({
    items: Array
  });

</script>

<template>
    <div class="sig-display">
        <div class="segnalazione-card">
          <segnalazione v-for="item in items"
              :key="item.id"
              :titolo="item.titolo"
              :descrizione="item.descrizione"
              :tipo="item.tipo"
              :stato="item.stato"
              :punti="item.punti"
          />
        </div>
    </div>
</template>

<style scoped>


/* Contenitore della lista */
.sig-display > div {
  background-color: var(--knt-abs-white);
  display: flex;
  flex-direction: column;
  gap: 50px;
}

/* (Opzionale) se vuoi uniformare le card segnalazione */
.segnalazione-card {
  background-color: var(--knt-abs-white);
  border-radius: 14px;
  margin: 0;
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