<template>
  <div>
    <h1>Dynamic Page: {{ slug }}</h1>
    <input type="file" />
    <p v-if="profile.full_name">{{ profile.full_name }}</p>
    <p v-if="profile.link">{{ profile.link }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
  <CopyToClipboard />
  <Avatar/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const selectedFile = ref(null);
const imageUrl = ref("");
const uploadStatus = ref("");

async function handleFileChange() {
  const file = target.files[0]; // Get the first file
  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    selectedFile = file; // Set the selected file if it's valid
  } else {
    selectedFile = null; // Reset if the file is not valid
    alert("Please select a valid image file (JPEG or PNG).");
  }
}
async function uploadFile() {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("image", this.selectedFile);

  try {
    const response = await axios.post(
      "http://localhost:3030/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    uploadStatus = "Upload successful!";
    imageUrl = response.data.imageUrl;
  } catch (error) {
    uploadStatus = "Upload failed: " + error.response.data.message;
  }
}

const route = useRoute();
const slug = route.params.slug;

// Reactive variables
const profile = ref({ full_name: "", link: "" });
const errorMessage = ref("");

// Fetch profile data on component mount
onMounted(async () => {
  try {
    console.log("Fetching profile for:", slug); // Log slug value
    const { data } = await axios.get(
      `http://localhost:3030/api/user/profile/${slug}`
    );
    // console.log("API Response:", data);  // Log the full response/

    if (data && data.full_name) {
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
