<template>
  <nav class="navbar">
    <div class="container mx-auto flex justify-between items-center py-4">
      <div>
        <router-link to="/" class="text-white mx-2">Home</router-link>
        <router-link v-if="isLoggedIn" to="/characters" class="text-white mx-2"
          >Characters</router-link
        >
      </div>
      <div>
        <router-link
          v-if="isLoggedIn"
          to="/"
          @click.prevent="logout"
          class="text-white mx-2"
          >Logout</router-link
        >
        <router-link v-else to="/auth" class="text-white mx-2"
          >Login/Sign Up</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isLoggedIn = ref(false);
const router = useRouter();
const route = useRoute();

const checkAuthState = () => {
  const loggedInUser = localStorage.getItem('logged_in_user');
  isLoggedIn.value = !!loggedInUser;
};

const logout = () => {
  localStorage.removeItem('logged_in_user');
  isLoggedIn.value = false;
  router.push('/');
};

onMounted(() => {
  checkAuthState();
});

watch(route, () => {
  checkAuthState();
});
</script>

<style scoped>
.navbar {
  background-color: #333;
  color: white;
}
</style>
