<script setup>
    import { RouterLink } from 'vue-router';
    const name = !!localStorage.getItem('token')?localStorage.getItem('nome') : false;
</script>



<template>
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/segnalazioni">Segnalazioni</RouterLink>
    <RouterLink to="/me">Profilo</RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  bottom: 10px;
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);
  width: 50%;
  height: 10vh;
  border-radius: 30px;
  /*padding: 15px;*/

  background-color: #fff;
  /*opacity: 0.8;*/
  color: #333;

  display: flex;
  justify-content: center; /* centra gli elementi */
  gap: 30px;               /* spazio tra i link */
  align-items: center;
}
</style>
