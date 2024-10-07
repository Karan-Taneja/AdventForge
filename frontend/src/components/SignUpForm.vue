<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form @submit.prevent="signUp" class="flex flex-col">
        <div class="mb-4">
          <label
            for="sign-up-username"
            class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            type="text"
            id="sign-up-username"
            v-model="signUpUsername"
            required
            placeholder="Enter your username"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <span v-if="signUpErrors.username" class="text-red-500 text-sm">{{
            signUpErrors.username
          }}</span>
        </div>
        <div class="mb-4">
          <label
            for="sign-up-email"
            class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="sign-up-email"
            v-model="signUpEmail"
            required
            placeholder="Enter your email"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          <span v-if="signUpErrors.email" class="text-red-500 text-sm">{{
            signUpErrors.email
          }}</span>
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
              placeholder="Enter a password"
              class="p-2 w-full border border-gray-300 rounded-md"
            />
            <button
              type="button"
              @mousedown="togglePasswordVisibility"
              class="absolute right-0 pr-3 flex items-center text-sm leading-5"
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
          class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUpUsername: '',
      signUpEmail: '',
      signUpPassword: '',
      showPassword: false,
      signUpErrors: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async signUp() {
      this.signUpErrors.username = '';
      this.signUpErrors.email = '';
      this.signUpErrors.password = '';

      if (!this.signUpUsername) {
        this.signUpErrors.username = 'Username is required.';
      }
      if (!this.signUpEmail) {
        this.signUpErrors.email = 'Email is required.';
      }
      if (!this.signUpPassword) {
        this.signUpErrors.password = 'Password is required.';
      }

      if (
        !this.signUpErrors.username &&
        !this.signUpErrors.email &&
        !this.signUpErrors.password
      ) {
        // Add your sign-up API call here
        const { signUpUsername, signUpEmail, signUpPassword } = this;
        console.log(
          'Signing up with:',
          signUpUsername,
          signUpEmail,
          signUpPassword,
        );
      }
    },
  },
};
</script>
