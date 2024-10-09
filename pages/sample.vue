<script setup>
import axios from "axios";

const name = ref("");
const username = ref("");
const link = ref("");

const nameError = ref("");

const usernameError = ref("");

const linkError = ref("");

const validateName = () => {
  if (name.value.trim() === "") {
    nameError.value = "Name is required.";
    return false;
  } else {
    nameError.value = "";
    return true;
  }
};

const validateLink = () => {
  if (link.value.trim() === "") {
    linkError.value = "Link is required.";
    return false;
  } else if (!/^https?:\/\/.+$/.test(link.value)) {
    linkError.value = "Please enter a valid link.";
    return false;
  } else {
    linkError.value = "";
    return true;
  }
};

const submitForm = async (event) => {
  event.preventDefault();
  if (!validateName() || !validateUsername()) {
    return;
  }

  try {
    const response = await axios.post("http://95.130.227.35/api/user", {
      full_name: name.value,
      username: username.value,
      link: link.value,
    });

    alert("Form submitted successfully!");
    console.log(response.data);
    name.value = "";
    username.value = "";
    link.value = "";
  } catch (error) {
    if (error.response) {
      // Check if error has a response from the server
      alert(
        `Error: ${error.response.data.message || error.response.data.error}`
      );
    } else {
      alert("An unexpected error occurred");
    }
  }
};

const validateUsername = () => {
  if (username.value.trim() === "") {
    usernameError.value = "Username is required.";
    return false;
  } else {
    usernameError.value = "";
    return true;
  }
};
</script>
<template>
  <div class="py-9">
    <form action="" class="flex items-center justify-center flex-col">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        v-model="name"
        required
        class="border py-1 px-2 rounded"
      />
      <p v-if="nameError" class="error-message">Name is required.</p>
      <label for="username">username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        required
        class="border py-1 px-2 rounded"
      />
      <p v-if="usernameError" class="error-message">username is required.</p>
      <label for="link">link:</label>
      <input
        type="link"
        id="link"
        v-model="link"
        required
        class="border py-1 px-2 rounded"
      />
      <p v-if="linkError" class="error-message">
        Please enter a valid link address.
      </p>
      <br />
      <button
        class="py-2 px-3 bg-green-300 rounded"
        type="submit"
        @click="submitForm"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  margin-top: 5px;
}
</style>
