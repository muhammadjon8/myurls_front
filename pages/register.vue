<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-md">
      <h2 class="text-2xl font-bold text-center">Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="fullname" class="block text-sm font-medium text-gray-700"
            >Full name</label
          >
          <input
            type="text"
            v-model="fullname"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email address</label
          >
          <input
            type="email"
            v-model="email"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            type="text"
            v-model="username"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            type="password"
            v-model="confirmPassword"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <!-- Display Error Message if it exists -->
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-md"
          >
            Register
          </button>
        </div>
      </form>
      <div class="text-center mt-4">
        <router-link to="/login" class="text-blue-500 hover:underline">
          Already have an account? Login now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "../stores/user";

const errorMessage = ref("");
const fullname = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const userStore = useUserStore(); // Use the correct Pinia store hook

const router = useRouter();

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    // Make API call to register the user
    const response = await axios.post("https://95.130.227.35/api/user", {
      full_name: fullname.value,
      username: username.value,
      email: email.value,
      password: password.value,
    });
    userStore.registerUser(); // Call store action or mutation to handle registration
    console.log("Registration successful:", response.data);
    errorMessage.value = "";
    // Redirect to login page
    router.push("/login");
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message; // Display the error returned from the backend
    } else {
      errorMessage.value = "An unexpected error occurred. Please try again.";
    }
  }
};
</script>
