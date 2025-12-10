<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/segnalazioni">Segnalazioni</RouterLink>
    </nav>
    <RouterView />
</template>