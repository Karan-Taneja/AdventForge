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

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';

const router = useRouter();

onMounted(() => {
  const loggedInUser = localStorage.getItem('logged_in_user');
  if (loggedInUser) {
    router.push('/');
  }
});
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background-color: #f7fafc;
}
</style>
