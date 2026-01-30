<template>
    <div class="loader-wrapper">
      <div class="loader"></div>
    </div>
</template>

<style scoped>
    /* Loader ********************* */
    .loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px; /* altezza dell'area di caricamento */
    }

    .loader {
    border: 6px solid #bbbaba; /* colore di sfondo della rotella */
    border-top: 6px solid var(--knt-blue); /* colore della parte che gira */
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 1s linear infinite;
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
</style>