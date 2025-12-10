<script setup>
import { useRouter } from "vue-router"
import mapComponent from "../components/map.vue"
const router = useRouter()

function logout() {
  localStorage.removeItem("token")
  router.push("/login")
}
</script>

<template>
  <div>
    <h1>Benvenuto nella Home!</h1>
    <mapComponent/>
    <button @click="logout">Logout</button>
  </div>
</template>
