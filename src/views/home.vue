<script setup>
  import vButton from '../components/utils/vButton.vue'
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
    <vButton testo="Logout" :fn="logout" />
  </div>
</template>
