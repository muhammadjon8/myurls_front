<template>
  <div class="flex items-center justify-center flex-col">
    <!-- Display the dynamically generated full URL inside the input (readonly) -->
    <div class="flex gap-5">
      <input
        v-model="fullRoute"
        type="text"
        readonly
        class="text-[12px] border rounded-full h-10 w-[300px] text-center bg-transparent bg-blue-100"
      />

      <!-- Button to copy the full route to the clipboard -->
      <Icon
        name="solar:copy-bold"
        width="256"
        height="256"
        style="color: green"
        @click="copyToClipboard"
        class="border text-2xl h-10 p-1 bg-green-500 cursor-pointer"
      />
    </div>

    <!-- Confirmation message -->
    <p v-if="copySuccess">{{ copySuccess }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // Import useRoute composable

// Reactive property for storing the full route
const fullRoute = ref("");
const copySuccess = ref(""); // Confirmation message

// Get the current route object using Vue Router
const route = useRoute();

// Function to dynamically generate the full URL
const generateFullUrl = () => {
  const baseUrl = window.location.origin; // Get the base URL (e.g., https://example.com)
  fullRoute.value = `${baseUrl}${route.fullPath}`; // Combine base URL with the current path
};

// Function to copy the full route to the clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(fullRoute.value); // Use Clipboard API to copy the text
    copySuccess.value = "Route copied to clipboard!";
  } catch (err) {
    console.error("Failed to copy the route: ", err);
    copySuccess.value = "Failed to copy the route!";
  }

  // Clear the message after a few seconds (optional)
  setTimeout(() => {
    copySuccess.value = "";
  }, 3000);
};

// Generate full URL when the component is mounted
onMounted(() => {
  generateFullUrl();
});
</script>

<style scoped>
/* Style the input and button */
p {
  color: green;
}
</style>
