<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const nome = ref("");
const cognome = ref("");

const errorMessage = ref("");

function register() {
  // Controlli base
  if (!email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = "Compila tutti i campi.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Le password non coincidono.";
    return;
  }
  //implementare logica che ti fa loggare
  
  router.push("/login");
}
</script>

<template>
  <div class="register-container">
    <h2>Registrazione</h2>

    <input type="text" v-model="nome" placeholder="Nome" />
    <input type="text" v-model="cognome" placeholder="Cognome" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <input type="password" v-model="confirmPassword" placeholder="Conferma password" />

    <button @click="register">Registrati</button>

    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

    <RouterLink class="login-link" to="/login">
      Hai già un account? Accedi
    </RouterLink>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 300px;
  margin: 50px auto;
}

input {
  display: block;
  margin: 10px 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.login-link {
  display: block;
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  color: #007bff;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
