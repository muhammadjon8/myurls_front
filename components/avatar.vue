<template>
  <div>
    <!-- Avatar Display (Round Shape) -->
    <div class="avatar">
      <img v-if="imageUrl" :src="imageUrl" alt="Profile Avatar" />
      <img v-else-if="props.photo" :src="props.photo" alt="" />
      <img
        v-else
        class="placeholder"
        src="../public/avatar.png"
        alt=""
      />
    </div>

    <!-- File Input for Image Upload -->
    <input type="file" @change="previewImage" accept="image/*" />

    <!-- Optionally, Save Button -->
    <button @click="saveImage">Save Image</button>
    <Icon name="mdi-light:home" />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Reactive property to hold the image URL for preview
const imageUrl = ref("");

const props = defineProps({
  photo: String,
});

// Function to preview the image
const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // When the file is loaded, set the imageUrl to display the preview
    reader.onload = () => {
      imageUrl.value = reader.result;
    };
  }
};

// Function to save the image (optional, for saving to DB later)
const saveImage = () => {
  // Implement your logic to save the file to the database
  console.log("Image saved to DB");
};
</script>

<style scoped>
/* Styling for the round avatar */
.avatar {
  width: 200px; /* You can adjust the avatar size here */
  height: 200px; /* Ensure width and height are the same for a round shape */
  border-radius: 50%; /* This makes the avatar round */
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%; /* Ensure the image fits the container */
  height: 100%;
  object-fit: cover; /* Ensures the image fills the circular container without distortion */
  object-position: center; /* Centers the image within the circle */
}
</style>
