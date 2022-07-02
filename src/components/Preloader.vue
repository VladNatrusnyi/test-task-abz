<template>
 <div class="preloader"></div>
</template>

<script>
export default {
  name: 'Preloader'
}
</script>

<style scoped>
.preloader{
  margin: 0 auto;
  border: 8px solid #00BDD3; /* Light grey */
  border-top: 8px solid transparent; /* Blue */
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
