<script setup>
  import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    const name = !!localStorage.getItem('token')?localStorage.getItem('nome') : false;
    let menuOpen = ref(false);

    // Al click dell'hamburger
    const toggleMenuOpen = () => { menuOpen.value = !menuOpen.value; };
</script>


<template>
  <!-- Navbar per PC / Tablet -->
  <nav class="navbar" :class="{ expanded: menuOpen }">
    <div class="nav-links">
      <RouterLink to="/">
        <img src="/menu/mappa.svg" alt="mappa">
      </RouterLink>
      <RouterLink to="/segnalazioni">
        <img src="/menu/segnalazioni.svg" alt="segnalazioni">
      </RouterLink>
      <RouterLink to="/classifica">
        <img src="/menu/classifica.svg" alt="classifica">
      </RouterLink>
      <RouterLink to="/me">
        <img src="/menu/profilo.svg" alt="profilo">
      </RouterLink>
    </div>

    <!-- Hamburger che viene mostrato su mobile -->
    <div id="hamburger" @click="toggleMenuOpen" :class="{ open: menuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>


  <!-- MENU MOBILE -->
<Transition name="mobile-menu">
  <div class="mobile-menu" v-if="menuOpen">
    <RouterLink to="/" @click="menuOpen = false" class="mobile-link">
      <img src="/menu/mappa.svg" alt="mappa" />
      <span>Mappa</span>
    </RouterLink>

    <RouterLink to="/segnalazioni" @click="menuOpen = false" class="mobile-link">
      <img src="/menu/segnalazioni.svg" alt="segnalazioni" />
      <span>Segnalazioni</span>
    </RouterLink>

    <RouterLink to="/classifica" @click="menuOpen = false" class="mobile-link">
      <img src="/menu/classifica.svg" alt="classifica" />
      <span>Classifica</span>
    </RouterLink>

    <RouterLink to="/me" @click="menuOpen = false" class="mobile-link">
      <img src="/menu/profilo.svg" alt="profilo" />
      <span>Profilo</span>
    </RouterLink>
  </div>
</Transition>
</template>

<style scoped>
/* Stile dalla Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  bottom: 1vh;
  left: 50%;
  transform: translateX(-50%);
  height: 10vh;

  z-index: 10;
  padding: 30px;

  background-color: var(--knt-abs-white);
  color: #333;
  border-radius: 30px;

  transition:
    width 0.4s cubic-bezier(.215, .61, .355, 1),
    height 0.4s cubic-bezier(.215, .61, .355, 1),
    padding 0.4s cubic-bezier(.215, .61, .355, 1),
    bottom 0.4s cubic-bezier(.215, .61, .355, 1);
}

/*Espansione Navbar su mobile*/
.navbar.expanded {
  width: 100vw;          
  height: 11vh;
  border-radius: 0;
  bottom: 0;
}

/* Link alle pagine su Desktop */
.nav-links {display: flex; gap: 40px;}

img {
  width: 40px;
  height: auto;
  transition: all 0.3s cubic-bezier(.215, .61, .355, 1);
}
img:hover { scale: 1.1; }

/* Style dell'icona Hamburger Mobile */
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

/* Animazione dell'hamburger al click dello stesso */
#hamburger.open { margin-right: 10px; margin-top: 6px; }
#hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(9px); }
#hamburger.open span:nth-child(2) { display: none; }
#hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(9px); }

/* Media Query per fa apparire l'hamburger su mobile */
@media (max-width: 768px) {
  #hamburger { display: block; }
  .nav-links { display: none; }

  .navbar {
    width: 200px;
    justify-content: center;
    align-items: center;
  }
}

/* Mobile Menu Style */
.mobile-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-color: var(--knt-abs-white);
  border-radius: 20px 20px 0 0;
  padding: 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 10vh;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.2);
  z-index: 9;
}

/* Singoli link alle pagine su Mobile */
.mobile-link {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  padding: 12px 0;
}

.mobile-link img { width: 30px; height: auto; }

/* stato iniziale */
.mobile-menu-enter-from { transform: translateY(100%); opacity: 0; }
/* stato finale */
.mobile-menu-enter-to { transform: translateY(0); opacity: 1; }
/* animazione uscita */
.mobile-menu-leave-from { transform: translateY(0); opacity: 1; }
.mobile-menu-leave-to { transform: translateY(100%); opacity: 0;}
/* timing */
.mobile-menu-enter-active,
.mobile-menu-leave-active { transition: all 0.5s cubic-bezier(.215, .61, .355, 1); }

</style>
