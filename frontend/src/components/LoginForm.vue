<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleSubmit" class="flex flex-col">
        <div class="mb-4">
          <label
            for="login-username-or-email"
            class="block text-sm font-medium text-gray-700"
          >
            Username or Email
          </label>
          <input
            type="text"
            id="login-username-or-email"
            v-model="loginUsernameOrEmail"
            required
            placeholder="Enter your username or email"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <span v-if="loginErrors.usernameOrEmail" class="text-red-500 text-sm">
            {{ loginErrors.usernameOrEmail }}
          </span>
        </div>
        <div class="mb-4 relative">
          <label
            for="login-password"
            class="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div class="relative flex items-center mt-1">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="login-password"
              v-model="loginPassword"
              required
              placeholder="Enter your password"
              class="p-2 w-full border border-gray-300 rounded-md"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-2 text-gray-600"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <span v-if="loginErrors.password" class="text-red-500 text-sm">
            {{ loginErrors.password }}
          </span>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const loginUsernameOrEmail = ref('');
const loginPassword = ref('');
const showPassword = ref(false);
const loginErrors = ref({
  usernameOrEmail: '',
  password: '',
});
const errorMessage = ref('');

const emit = defineEmits(['login']);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
  loginErrors.value.usernameOrEmail = '';
  loginErrors.value.password = '';
  errorMessage.value = '';

  if (!loginUsernameOrEmail.value) {
    loginErrors.value.usernameOrEmail = 'Username or email is required.';
    return;
  }
  if (!loginPassword.value) {
    loginErrors.value.password = 'Password is required.';
    return;
  }

  // Emit login event with user data
  emit('login', {
    usernameOrEmail: loginUsernameOrEmail.value,
    password: loginPassword.value,
  });
};
</script>
