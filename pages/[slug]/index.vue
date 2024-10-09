<script setup>
import Preview from "../components/Preview.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const allData = ref({});

const route = useRoute();
const slug = route.params.slug;

const errorMessage = ref("");
// Fetch profile data on component mount
onMounted(async () => {
  try {
    const data = await axios.get(
      `https://95.130.227.35/api/user/profile/${slug}`
    );
    if (data.value) {
      allData.value = data.value;
    } else {
      errorMessage.value = "Profile not found";
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    errorMessage.value = error.message || "An error occurred";
  }
});
</script>

<template>
  <div>
    <Preview />
  </div>
</template>

<style scoped></style>
