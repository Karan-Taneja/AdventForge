<template>
  <div class="auth-container flex flex-col items-center justify-center">
    <div
      class="flex flex-row w-full max-w-4xl bg-white rounded-lg overflow-hidden"
    >
      <div class="w-1/2 p-8">
        <LoginForm />
      </div>
      <div class="w-px bg-gray-300"></div>
      <div class="w-1/2 p-8">
        <SignUpForm />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';

export default {
  components: {
    LoginForm,
    SignUpForm,
  },
  mounted() {
    // Check for logged_in_user in local storage
    const loggedInUser = localStorage.getItem('logged_in_user');
    if (loggedInUser) {
      // Redirect to home page if user is found
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.auth-container {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
