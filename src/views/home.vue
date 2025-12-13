<script setup>
  import vButton from '../components/utils/vButton.vue'
  import { useRouter } from "vue-router"
  import mapComponent from "../components/map/map.vue"
import { clearLoggedUser } from '../states/user'
  const router = useRouter()

  function logout() {
    clearLoggedUser()
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
