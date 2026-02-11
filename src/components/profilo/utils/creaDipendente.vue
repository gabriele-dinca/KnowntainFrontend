<script setup>
  import { ref } from "vue";
  import vButton from "../../utils/vButton.vue"
  import { setLoggedUser,loggedUser } from "../../../states/user.js";
  import Loader from "../../utils/Loader.vue";

    function resetForm() {
        nome.value = '';
        cognome.value = '';
        email.value = '';
        password.value = '';
        isAdmin.value = false;
        showPassword.value = false;
    }


  // Campi della richiesta
  const email = ref("");
  const isAdmin = ref(false);
  const password = ref("");
  const confirmPassword = ref("");
  const nome = ref("");
  const cognome = ref("");

  const errorMessage = ref("");     // Messaggio d'errore
  const showPassword = ref(false);  // Visibilità Password
  const loading = ref(false);       // Loader
  const confirmMsg = ref(false);

  async function register() {
    
    // Controllo che non vi siano campi vuoti
    if (!email.value || !password.value || !confirmPassword.value || !nome.value || !cognome.value) {
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
    const END_POINT = HOST + '/dipendenti/create';

    try {
        loading.value = true;  // Parte il loader

        // Invio la richiesta POST al backend
        const response = await fetch(END_POINT, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'access-token': loggedUser.token
            },
            body: JSON.stringify( {
                email: email.value, 
                password: password.value,
                nome: nome.value,
                cognome: cognome.value,
                isAdmin: isAdmin.value
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

        confirmMsg.value = true;
        errorMessage.value = null
        resetForm();

        setTimeout(() => {
        confirmMsg.value = false;
        }, 3000);

    } catch (error) {
        // In caso di errore non gestito dal backend, mostro questo messaggio
        errorMessage.value = "Errore di connessione al Server";
        console.log(error);
    } finally {
        loading.value = false;
    }
  }
</script>

<template>
  <div class="register-container">
    <h2>Crea Account</h2>
    <div class="fields">
      <input type="text" v-model="nome" placeholder="Nome" />
      <input type="text" v-model="cognome" placeholder="Cognome" />
      <input type="email" v-model="email" placeholder="Email" />
      <div class="admin-toggle">
            <span>Account amministratore</span>

            <label class="switch">
                <input type="checkbox" v-model="isAdmin" />
                <span class="slider"></span>
            </label>
        </div>
      <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" />
      <input :type="showPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Conferma password" />
      <div id="show-psw">
        <input type="checkbox" name="show-psw" @click="showPassword = !showPassword">
        <label for="show-psw">Mostra Password</label>
      </div>
    </div>

    <vButton testo="Registra Account" :fn="register" />
    
    <p id="confirm" v-if="confirmMsg">Nuovo Dipendente Creato ✅</p>
    <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>

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

  text-align: center;

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

.admin-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  padding: 12px 16px;
  border-radius: 14px;
  background-color: #f7f7f7;
  font-size: 14px;
}

/* SWITCH */
.switch {
  position: relative;
  width: 44px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background-color: #ccc;
  border-radius: 999px;
  transition: 0.3s;
  cursor: pointer;
}

.slider::before {
  content: "";
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  top: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}

.switch input:checked + .slider {
  background-color: #2563eb; /* blu elegante */
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}

#show-psw {
  display: flex;
  align-items: center;
  gap: 10px;
}

#show-psw input[type="checkbox"] {
  width: auto;
}

#confirm {
    margin-top: 30px;
}

</style>
