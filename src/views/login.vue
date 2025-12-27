<script setup>
  import vButton from "../components/utils/vButton.vue"
    import { ref } from "vue"
    import { useRouter } from "vue-router"
    import { setLoggedUser } from "../states/user"

    const router = useRouter()

    const username = ref("")
    const password = ref("")

    function login(isDipendente) {
      if(!password.value || !username.value) return
      const data = {
        token: "test",
        nome: username.value,
        'isDipendente': isDipendente
      }
      setLoggedUser(data)
      router.push("/")
    }

    /***********************
    TODO: la richiesta funziona  */
    const HOST = import.meta.env.VITE_API_URL;
    const END_POINT = HOST + '/auth/login/';

    /*async function login(isDipendente) {
      console.log(END_POINT);
      try {
        const response = await fetch(END_POINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( { email: username.value, password: password.value } ),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }*/

</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <input placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />

    <div class="button-group">
      <vButton testo="Login Utente" :fn="() => login(false)" />
      <vButton testo="Login Dipendente" :fn="() => login(true)" />
    </div>

    <div class="register-link">
      <RouterLink class="register-link" to="/register">
        Non hai un account? Registrati
      </RouterLink>
    </div>
  </div>

  
</template>



<style scoped>
.login-container {
  padding: 50px;
  border-radius: 30px;
  background-color: #545151;
  min-width: 400px;
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

/* Input */


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


</style>
