<template>
  <nav class="bg-gray-800 p-4 flex justify-between items-center">
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
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkAuthState();
  },
  methods: {
    checkAuthState() {
      const loggedInUser = localStorage.getItem('logged_in_user');
      this.isLoggedIn = !!loggedInUser;
      console.log('Auth state checked:', this.isLoggedIn); // Debugging log
      console.log('Logged in user:', loggedInUser); // Additional log
    },
    logout() {
      localStorage.removeItem('logged_in_user');
      this.isLoggedIn = false;
      console.log('Logged out:', this.isLoggedIn); // Debugging log
      this.$router.push('/');
    },
  },
  watch: {
    $route() {
      this.checkAuthState();
    },
  },
};
</script>
