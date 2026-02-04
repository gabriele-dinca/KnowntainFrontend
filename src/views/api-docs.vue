<template>
  <div class="swagger-container">
    <iframe 
      :src="END_POINT"
      width="100%" 
      height="100%"
      frameborder="0">
    </iframe>
  </div>
</template>

<script setup>
const END_POINT = import.meta.env.VITE_API_URL + "/api-docs";
console.log(END_POINT);
</script>

<style>
.swagger-container {
    height: 100vh;
}
</style>