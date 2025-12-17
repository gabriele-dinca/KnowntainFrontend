<script setup>
    import { RouterView } from 'vue-router';
    import { loggedUser } from './states/user.js';
      
import Navbar from './views/navbar.vue';
</script>

<template>
    <Navbar v-if="loggedUser.token"/>
    <RouterView />
</template>