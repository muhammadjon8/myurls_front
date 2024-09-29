<template>
  <div class="flex flex-col items-center justify-center py-4">
    <p v-if="profile.full_name">{{ profile.full_name }}</p>
    <p v-else> No Account found for this User</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
  <div class="flex flex-col justify-center items-center">
    <CopyToClipboard />
    <Avatar :photo="imageUrl || profile?.photo" />
    <p v-if="profile.username">{{ profile.username }}</p>
    <Links :id="profile.id" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Avatar from "./Avatar.vue";

const imageUrl = ref("");

const route = useRoute();
const slug = route.params.slug;

// Reactive variables
const profile = ref({
  id: 2,
  full_name: "",
  link: "",
  photo: "",
  username: "",
});
const errorMessage = ref("");

// Fetch profile data on component mount
onMounted(async () => {
  try {
    console.log("Fetching profile for:", slug); // Log slug value
    const { data } = await axios.get(
      `http://localhost:3030/api/user/profile/${slug}`
    );
    // console.log("API Response:", data);  // Log the full response/

    if (data) {
      profile.value = data; // Assign response to the reactive profile
    } else {
      errorMessage.value = "Profile not found";
    }
  } catch (error) {
    console.error("Error fetching profile:", error); // Log the error for debugging
    errorMessage.value = error.message || "An error occurred";
  }
});
</script>
