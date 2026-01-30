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
    <!--Homepage-->
    <mapComponent/>
  </div>
</template>
