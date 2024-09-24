<template>
  <div class="file-upload">
    <h2>Upload an Image</h2>
    <form @submit.prevent="uploadFile">
      <input type="file" @change="handleFileChange" accept=".jpg, .jpeg, .png" />
      <button type="submit" :disabled="!selectedFile">Upload</button>
    </form>
    <div v-if="uploadStatus">
      <p>{{ uploadStatus }}</p>
    </div>
    <div v-if="imageUrl">
      <p>Uploaded Image URL: <a :href="imageUrl" target="_blank">{{ imageUrl }}</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      uploadStatus: '',
      imageUrl: '',
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]; // Get the first file
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        this.selectedFile = file; // Set the selected file if it's valid
      } else {
        this.selectedFile = null; // Reset if the file is not valid
        alert('Please select a valid image file (JPEG or PNG).');
      }
    },
    async uploadFile() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('image', this.selectedFile);

      try {
        const response = await axios.post('http://localhost:3030/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.uploadStatus = 'Upload successful!';
        this.imageUrl = response.data.imageUrl;
      } catch (error) {
        this.uploadStatus = 'Upload failed: ' + error.response.data.message;
      }
    },
  },
};
</script>

<style scoped>
.file-upload {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

input[type="file"] {
  margin-bottom: 10px;
}
</style>
