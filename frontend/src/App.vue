<template>
  <div id="app" class="app-container flex flex-col min-h-screen">
    <Navbar />
    <div class="flex-grow">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
/* Ensure the app-container takes the full height */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
