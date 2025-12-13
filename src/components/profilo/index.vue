<script setup>
    import profilo from './views/profilo.vue';
    import storico_segnalazioni from './views/storico_segnalazioni.vue';
</script>

<template>
    <div class="dashboard">

        <profilo />
        <div class="storico-wrapper">
            <storico_segnalazioni />
        </div>
    </div>
</template>

<style>
.dashboard {
  display: flex;
  gap: 30px;
  /*max-width: 1200px;*/
  width: 90vw;
  flex-wrap: wrap;
  /*margin: 90px auto;*/
  /*padding: 0 20px;*/

  /*align-items: flex-start;*/
}

@media (max-width: 768px) {
  .dashboard {
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

  max-height: 600px;          /* altezza del riquadro */
  overflow-y: auto;           /* scroll verticale */

  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;

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