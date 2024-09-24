<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

// Function to check login status and handle redirection
const checkLogin = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3030/api/user/username",
      null,
      {
        withCredentials: true, // This allows sending cookies with the request
      }
    );
    console.log(response);

    // If the backend returns the username directly (as a string)
    const username = response.data;
    console.log(username); // Assuming response.data is the username

    if (username) {
      router.push(`/${username}`); // Redirect to the user's profile page
    }
  } catch (error) {
    console.error("Error checking login status:", error);
    // Optionally handle error (e.g., show a message if something goes wrong)
  }
};

// Run the check when the component is mounted
onMounted(() => {
  checkLogin();
});
</script>

<template>
  <div>
    <!-- This message is shown only if the user is not logged in -->
    Hello to the website, please Log in
  </div>
  <CopyToClipboard />
</template>

<style scoped></style>
