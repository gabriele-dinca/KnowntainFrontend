<script setup>
  import { ref } from "vue"
  import vButton from "../../utils/vButton.vue";
  import { useRouter } from "vue-router";

  const router = useRouter()
  const titolo = ref("")
  const testo = ref("")

  function invia() {


    

    router.push("/segnalazioni")
  }
</script>

<template>
  
  <h2>Crea segnalazione</h2>

  <div class="container">

    <input type="text" placeholder="Titolo" v-model="titolo" />
    <textarea
      placeholder="Testo della segnalazione"
      v-model="testo"
      rows="5"
    ></textarea>

    <div class="button-group">
      <vButton testo="Invia" :fn="invia" />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 60px auto;
  padding: 25px;

  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-top: 80px; /* spazio dalla navbar fissa */
  margin-bottom: 20px;
  font-size: 24px;
  /*color: #333;*/
}

input {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 12px;

  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 6px;

  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

.button-group {
  margin-top: 20px;
}

.btn-utente {
  width: 100%;
  padding: 12px;

  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-utente:hover {
  background-color: #0056b3;
}

.btn-utente:active {
  transform: scale(0.98);
}


textarea {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 12px;

  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 6px;

  font-size: 14px;
  font-family: inherit;
}

textarea:focus {
  outline: none;
  border-color: #007bff;
}

</style>