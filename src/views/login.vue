<script setup>
    import { ref } from "vue"
    import { useRouter } from "vue-router"

    const router = useRouter()

    const username = ref("")
    const password = ref("")

    function login(isDipendente) {
      localStorage.setItem("isDipendente", isDipendente);
      localStorage.setItem("token", "abc123")
      router.push("/")
    }
</script>




<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required />
      <br/>
      <input v-model="password" type="password" placeholder="Password" required />
      <br/>

      <button @click="login('false')">Accedi</button>
      <button @click="login('true')">Accedi come dipendente</button>
    </form>
  </div>
</template>
