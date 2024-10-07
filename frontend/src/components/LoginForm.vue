<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="login" class="flex flex-col">
        <div class="mb-4">
          <label
            for="login-username-or-email"
            class="block text-sm font-medium text-gray-700"
            >Username or Email</label
          >
          <input
            type="text"
            id="login-username-or-email"
            v-model="loginUsernameOrEmail"
            required
            placeholder="Enter your username or email"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <span
            v-if="loginErrors.usernameOrEmail"
            class="text-red-500 text-sm"
            >{{ loginErrors.usernameOrEmail }}</span
          >
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
              class="absolute right-0 pr-3 flex items-center text-sm leading-5"
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
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-500 hover:underline"
          >Forgot your password?</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mockApi } from '@/shared/mocks/api';

export default {
  data() {
    return {
      loginUsernameOrEmail: '',
      loginPassword: '',
      loginErrors: {
        usernameOrEmail: '',
        password: '',
      },
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.loginErrors.usernameOrEmail = '';
      this.loginErrors.password = '';

      if (!this.loginUsernameOrEmail) {
        this.loginErrors.usernameOrEmail = 'Username or email is required.';
      }
      if (!this.loginPassword) {
        this.loginErrors.password = 'Password is required.';
      }

      if (!this.loginErrors.usernameOrEmail && !this.loginErrors.password) {
        // Add your login API call here
        const { loginUsernameOrEmail, loginPassword } = this;

        try {
          await mockApi.login(loginUsernameOrEmail, loginPassword);

          this.$router.push('/');
        } catch (error) {
          console.log('err: ', error);
          this.loginErrors.usernameOrEmail = 'Invalid username or email.';
          this.loginErrors.password = 'Invalid password.';
        }
      }
    },
  },
};
</script>
