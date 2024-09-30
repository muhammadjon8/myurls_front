<script setup>
import Navbar from "../components/Navbar.vue";
import Preview from "../components/Preview.vue";
import Customize from "../components/Customize.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const menu = ref("preview");

// Handle changes in the menu from the Navbar
function updateMenu(selectedMenu) {
  menu.value = selectedMenu;
}

const isLoggedIn = ref(false);
const errorMessage = ref("");

// Get the route params for the slug
const route = useRoute();
const slug = route.params.slug;

// Fetch profile data on component mount
onMounted(async () => {
  try {
    const response = await axios.post(
      "http://localhost:3030/api/user/customize",
      { username: slug }
    );
    console.log("Is logged in response:", response.data);
    
    // Assuming your API sends back a boolean `isLoggedIn` in response.data
    isLoggedIn.value = response.data.isLoggedIn;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || "There was an error checking the user's status.";
    } else {
      errorMessage.value = "Network error. Please try again later.";
    }
  }
});
</script>

<template>
  <div v-if="isLoggedIn">
    <div class="flex flex-col justify-center items-center">
      <Navbar @menuChange="updateMenu" />
    </div>

    <div>
      <Preview v-if="menu === 'preview'" />
      <Customize v-if="menu === 'customize'" />
    </div>
  </div>
  
  <div v-else>
    <h1>User is not logged in to edit this account</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped></style>
