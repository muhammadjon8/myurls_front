<template>
  <div class="flex flex-col items-center justify-center py-9">
    <!-- Avatar Display (Round Shape) -->
    <div class="avatar">
      <img v-if="imageUrl" :src="imageUrl" alt="Profile Avatar" />
      <img v-else-if="props.photo" :src="props.photo" alt="Profile Photo" />
      <img
        v-else
        class="placeholder"
        src="../public/avatar.png"
        alt="Placeholder Avatar"
      />
    </div>

    <!-- File Input for Image Upload -->
    <div class="flex gap-5 py-5">
      <label class="custom-file-upload border rounded-lg p-2 hover:bg-gray-100">
        <input type="file" @change="previewImage" accept="image/*" />
        Update Avatar
        <Icon name="uil:edit" width="256" height="256" style="color: black" />
      </label>

      <!-- Save Button -->
      <button @click="saveImage" class="border rounded-lg p-2 hover:bg-green-500">Save Image</button>
    </div>
    <p v-if="updateSuccess" class="text-green-600">
      Profile image successfully updated
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// Reactive property to hold the image URL for preview
const imageUrl = ref("");

// Define props to accept the user's existing photo and ID
const props = defineProps({
  photo: String,
  id: Number,
});
let updateSuccess = ref(null);
const file = ref(null);

// Function to preview the image
const previewImage = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile; // Save the selected file to `file`
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    // When the file is loaded, set the imageUrl to display the preview
    reader.onload = () => {
      imageUrl.value = reader.result;
    };
  }
};

// Function to save the image to the server
const saveImage = async () => {
  if (!file.value) {
    alert("Please select a file to save")
    return;
  }

  try {
    // Create FormData to upload the image file
    const formData = new FormData();
    formData.append("image", file.value); // Append the file to FormData

    // Upload the image file to the server
    const uploader = await axios.post(
      "http://localhost:3030/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the content type is set to multipart
        },
      }
    );

    // If the upload was successful, save the image URL to the user's profile
    if (uploader.status === 201) {
      const uploadedImageUrl = uploader.data.imageUrl; // Get the uploaded image URL

      // Send a PATCH request to update the user's photo in the DB
      await axios.patch(`http://localhost:3030/api/user/${props.id}`, {
        photo: uploadedImageUrl,
      });

      // Update the `imageUrl` ref for the UI
      imageUrl.value = uploadedImageUrl;
      updateSuccess.value = true; // Set the success message to display
      setTimeout(() => {
        updateSuccess.value = false; // Reset the success message after a short delay
      }, 3000);
      console.log("Image saved to DB and profile updated");
    } else {
      console.error("Error uploading image");
    }
  } catch (error) {
    console.error("Error saving image:", error);
  }
};
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

input[type="file"] {
  display: none;
}
</style>
