<script setup>
  import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    const name = !!localStorage.getItem('token')?localStorage.getItem('nome') : false;
    let menuOpen = ref(false);

    const toggleMenuOpen = () => { menuOpen.value = !menuOpen.value; };
</script>



<template>
  <nav class="navbar">
    <!-- Questi router dovrebbero sparire su mobile-->
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/segnalazioni">Segnalazioni</RouterLink>
    <RouterLink to="/me">Profilo</RouterLink>
    <div id="hamburger" @click="toggleMenuOpen" :class="{ open: menuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </div>
   
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  bottom: 1vh;
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

#hamburger {
  display: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

#hamburger span {
  display: block;
  margin-top: 8px;
  width: 40px;
  height: 4px;
  background-color: #333;
  transition: all 0.5s cubic-bezier(.215, .61, .355, 1);
}

#hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(9px); }
#hamburger.open span:nth-child(2) { display: none; }
#hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(9px); }

@media (max-width: 768px) {
  #hamburger {
    display: block;
  }
}
</style>
