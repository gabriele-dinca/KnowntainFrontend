<script setup>
    import { ref } from "vue"
    import { useRouter } from "vue-router"

    const router = useRouter()

    const username = ref("")
    const password = ref("")

    function login(isDipendente) {
      localStorage.setItem("isDipendente", isDipendente);
      localStorage.setItem('nome',username.value)
      localStorage.setItem("token", "abc123")
      router.push("/")
    }
</script>

<template>
  
  <h2>Login</h2>
  <div class="login-container">

    <input placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />

    <div class="button-group">
      <button class="btn-utente" @click="login('false')">Login Utente</button>
      <button class="btn-dipendente" @click="login('true')">Login Dipendente</button>
    </div>
  </div>
  <div class="register-link">
    <RouterLink class="register-link" to="/register">
      Non hai un account? Registrati
    </RouterLink>
  </div>
</template>



<style scoped>
.login-container {
  max-width: 300px;
  margin: 50px auto;
}

/* Tutti gli elementi full-width */
input,
button {
  display: block;
  width: 100%;
  box-sizing: border-box; /* Impedisce che padding allarghi gli input/pulsanti */
}

/* Input */
input {
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* Container dei pulsanti */
.button-group {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Pulsanti */
button {
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

/* Login Utente */
.btn-utente {
  background-color: #3498db;
  color: white;
}

.btn-utente:hover {
  background-color: #2d89c7;
}

/* Login Dipendente */
.btn-dipendente {
  background-color: #2ecc71;
  color: white;
}

.btn-dipendente:hover {
  background-color: #27b864;
}
</style>
