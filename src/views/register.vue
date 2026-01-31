<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import vButton from "../components/utils/vButton.vue"
  import { setLoggedUser } from "../states/user";
import Loader from "../components/utils/Loader.vue";

  const router = useRouter();

  // Campi della richiesta
  const email = ref("");
  const nickname = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const nome = ref("");
  const cognome = ref("");

  const errorMessage = ref("");     // Messaggio d'errore
  const showPassword = ref(false);  // Visibilità Password
  const loading = ref(false);       // Loader

  async function register() {
    

    // Controllo che non vi siano campi vuoti
    if (!email.value || !password.value || !confirmPassword.value || !nickname.value || !nome.value || !cognome.value) {
      errorMessage.value = "Tutti i campi sono obbligatori";
      return;
    }

    // Controllo che il campo 'password' coincida con 'conferma password'
    if (password.value !== confirmPassword.value) {
      errorMessage.value = "Le password non coincidono";
      return;
    }

    // Compongo l'URL per la richiesta 
    const HOST = import.meta.env.VITE_API_URL;
    const END_POINT = HOST + '/auth/register/';

    try {
      loading.value = true;  // Parte il loader

      // Invio la richiesta POST al backend
      const response = await fetch(END_POINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {
          email: email.value, 
          password: password.value,
          nome: nome.value,
          cognome: cognome.value,
          nickname: nickname.value
        })
      });

      // Trasformo la risposta in formato JSON
      const data = await response.json();
      console.log(data);

      // Gestisco eventuali errori dal backend (401, 400, ecc.)
      if (!response.ok) {
        errorMessage.value = data.message;
        loading.value = false;
        return;
      }
      
      // Metto l'utente autenticato nel local Storage (come se fosse autenticato)
      setLoggedUser(data);
      router.push("/");
      
    } catch (error) {
      // In caso di errore non gestito dal backend, mostro questo messaggio
      errorMessage.value = "Errore di connessione al Server";
      loading.value = false;
      console.log(error);
    }
  }
</script>

<template>
  <div class="register-container">
    <h2>Registrati</h2>
    <div class="fields">
      <input type="text" v-model="nome" placeholder="Nome" />
      <input type="text" v-model="cognome" placeholder="Cognome" />
      <input type="email" v-model="email" placeholder="Email" />
      <input type="email" v-model="nickname" placeholder="Nickname" />
      <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" />
      <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Conferma password" />
      <div id="show-psw">
        <input type="checkbox" name="show-psw" id="" @click="showPassword = !showPassword">
        <label for="show-psw">Mostra Password</label>
      </div>
    </div>

    <vButton testo="Registrati" :fn="register" />
    

    <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>

    <RouterLink class="login-link" to="/login">
      Hai già un account? Accedi
    </RouterLink>

    <Loader v-if="loading" />
  </div>
</template>

<style scoped>
.register-container {
  padding: 50px;
  border-radius: 30px;
  background-color: var(--knt-abs-white);
  box-shadow: rgb(108, 108, 108) 10px 10px 20px;
  max-width: 400px;
  /*margin: 0 auto;*/
  position: absolute;
  text-align: center;
  top: 3%;
  left: 50%;
  transform: translate(-50%);
}

input {
  width: 100%;
  margin: 5px 0;
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

#show-psw {
  display: flex;
  align-items: center;
  gap: 10px;
}

#show-psw input[type="checkbox"] {
  width: auto;
}

</style>
