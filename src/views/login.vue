<script setup>
  import vButton from "../components/utils/vButton.vue"
    import { ref } from "vue"
    import { useRouter } from "vue-router"
    import { loggedUser, setLoggedUser } from "../states/user"

    const router = useRouter();

    // Campi della richiesta
    const email = ref("");
    const password = ref("");

    // Messaggio d'errore
    const errorMessage = ref("");
    
    // ! TODO: capire meglio come gestire isDipendente <==> backend

    async function login(isDipendente) {
      // Controllo che i campi siano compilati
      if (!email.value || !password.value) {
        errorMessage.value = "Inserisci username e password.";
        return;
      }
      
      // Compongo l'URL per la richiesta 
      const HOST = import.meta.env.VITE_API_URL;
      const END_POINT = HOST + '/auth/login/';

      try {
        // Invio una richeista POST al backend
        const response = await fetch(END_POINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( { email: email.value, password: password.value } )
        });
        
        // Trasformo la risposta in formato JSON
        const data = await response.json();
        console.log(data);

        // Gestisco eventuali errori dal backend (401, 400, ecc.)
        if (!response.ok) {
          errorMessage.value = data.message;
          return;
        }
        
        // Metto l'utente autenticato nel local Storage
        setLoggedUser(data);
        router.push("/");

      } catch (error) {
        // In caso di errore non gestito dal backend, mostro questo messaggio
        errorMessage.value = "Errore di connessione al Server";
        console.log(error);
      }
    }
</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <input placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />

    <div class="button-group">
      <vButton testo="Login Utente" :fn="() => login(false)" />
      <vButton testo="Login Dipendente" :fn="() => login(true)" />
    </div>

    <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>

    <div class="register-link">
      <RouterLink class="register-link" to="/register">
        Non hai un account? Registrati
      </RouterLink>
    </div>
  </div>

  
</template>



<style scoped>
.login-container {
  text-align: center;
  padding: 50px;
  border-radius: 30px;
  background-color: var(--knt-abs-white);
  box-shadow: rgb(108, 108, 108) 10px 10px 20px;
  width: 400px;
  /*margin: 0 auto;*/
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
}

/* Tutti gli elementi full-width */
input,
button {
  display: block;
  width: 100%;
  box-sizing: border-box; /* Impedisce che padding allarghi gli input/pulsanti */
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
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.register-link {
  margin-top: 30px;
}

@media (max-width: 1024px) {
  .login-container {
    width: 60%;
  }
}

@media (max-width: 768px) {
  .login-container {
    width: 80%;
  }
}

</style>
