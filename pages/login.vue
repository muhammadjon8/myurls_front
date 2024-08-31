<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-md">
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <form @submit.prevent="login">
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
          <button
            type="submit"
            class="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
      <div class="text-center mt-4">
        <router-link to="/register" class="text-blue-500 hover:underline">
          New here? Register now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");

const router = useRouter();

const login = async () => {
  console.log(`Username: ${username.value}, Password: ${password.value}`);
  // Add your login logic here
  try {
    const response = await axios.post("http://localhost:3030/api/user/login", {
      username: username.value,
      password: password.value,
    });
    console.log("Login successful:", response.data);
    router.push("/");
  } catch (error) {
    console.error("Error logging in:", error);
    // Show an error message to the user
    alert("Invalid username or password");
  }
};

</script>
