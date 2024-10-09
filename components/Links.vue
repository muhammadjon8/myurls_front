<template>
  <div class="md:grid grid-cols-2 gap-5 md:w-1/2">
    <div
      v-for="link in userLinks"
      :key="link.id"
      class="border rounded-lg py-5 px-20 text-center"
    >
      <a :href="link.url_link">{{ link.url_name }}</a>
    </div>
    <p v-if="!userLinks.length">No links available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const props = defineProps({
  id: Number,
});

const userLinks = ref("");

// Function to fetch user links
async function fetchUserLinks() {
  try {
    const response = await axios.get(
      `http://95.130.227.35/api/user-links/${props.id}`
    );
    userLinks.value = response.data; // Assuming response.data is an array of links
  } catch (error) {
    console.error("Error fetching user links:", error);
  }
}

watch(() => props.id, fetchUserLinks);
</script>
