<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form @submit.prevent="handleSubmit" class="flex flex-col">
        <div class="mb-4">
          <label
            for="sign-up-username"
            class="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="sign-up-username"
            v-model="signUpUsername"
            required
            placeholder="Enter your username"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <span v-if="signUpErrors.username" class="text-red-500 text-sm">
            {{ signUpErrors.username }}
          </span>
        </div>
        <div class="mb-4">
          <label
            for="sign-up-email"
            class="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="sign-up-email"
            v-model="signUpEmail"
            required
            placeholder="Enter your email"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <span v-if="signUpErrors.email" class="text-red-500 text-sm">
            {{ signUpErrors.email }}
          </span>
        </div>
        <div class="mb-4 relative">
          <label
            for="sign-up-password"
            class="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div class="relative flex items-center mt-1">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="sign-up-password"
              v-model="signUpPassword"
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
          <span v-if="signUpErrors.password" class="text-red-500 text-sm">
            {{ signUpErrors.password }}
          </span>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const signUpUsername = ref('');
const signUpEmail = ref('');
const signUpPassword = ref('');
const showPassword = ref(false);
const signUpErrors = ref({
  username: '',
  email: '',
  password: '',
});

const emit = defineEmits(['signUp']);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
  signUpErrors.value.username = '';
  signUpErrors.value.email = '';
  signUpErrors.value.password = '';

  if (!signUpUsername.value) {
    signUpErrors.value.username = 'Username is required.';
    return;
  }
  if (!signUpEmail.value) {
    signUpErrors.value.email = 'Email is required.';
    return;
  }
  if (!signUpPassword.value) {
    signUpErrors.value.password = 'Password is required.';
    return;
  }

  // Emit signUp event with user data
  emit('signUp', {
    username: signUpUsername.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  });
};
</script>
