<script setup>
    import { RouterLink } from 'vue-router';
    const name = !!localStorage.getItem('token')?localStorage.getItem('nome') : false;
</script>



<template>
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/segnalazioni">Segnalazioni</RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;

  background-color: #333;
  color: white;

  display: flex;
  justify-content: center; /* centra gli elementi */
  gap: 30px;               /* spazio tra i link */
  align-items: center;
}
</style>
