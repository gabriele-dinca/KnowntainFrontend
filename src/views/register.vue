<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import vButton from "../components/utils/vButton.vue"
import { setLoggedUser } from "../states/user";

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
  //le apiiiiiiiiiiiiiiii

  const data = {
    token: 'abc123',
    nome: nome.value,
    isDipendente: false
  }
  setLoggedUser(data);
  
  router.push("/");
}
</script>

<template>
  <div class="register-container">
    <h2>Registrati</h2>
    <div class="fields">
      <input type="text" v-model="nome" placeholder="Nome" />
      <input type="text" v-model="cognome" placeholder="Cognome" />
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <input type="password" v-model="confirmPassword" placeholder="Conferma password" />
    </div>

    <vButton testo="Registrati" :fn="register" />
    

    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

    <RouterLink class="login-link" to="/login">
      Hai già un account? Accedi
    </RouterLink>
  </div>
</template>

<style scoped>
.register-container {
  padding: 50px;
  border-radius: 30px;
  background-color: #545151;
  max-width: 400px;
  /*margin: 0 auto;*/
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
}

input {
    width: 100%;
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
  margin-top: 30px;
}
</style>
