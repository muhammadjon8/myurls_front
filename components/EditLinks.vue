<template>
  <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
  <div class="flex flex-col gap-3 w-1/2">
    <div
      v-for="link in userLinks"
      :key="link.id"
      class="border rounded-lg py-3 px-20 text-center"
    >
      <button @click="toggleLink(link)" class="cursor-pointer">
        {{ link.url_name }}
      </button>
      <div v-if="visibleForms[link.id]" class="">
        <div class="flex gap-3 py-4 items-center">
          <p class="w-1/4">Link name</p>
          <input
            v-model="linkName"
            placeholder="Enter link name (Instagram)"
            class="w-full p-2"
            required
          />
        </div>
        <div class="flex gap-3 py-4 items-center">
          <p class="w-1/4">Link URL</p>
          <input
            v-model="linkUrl"
            placeholder="Enter link URL (https://instagram.com/example)"
            class="w-full p-2"
            required
          />
        </div>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <div class="flex gap-5">
          <button
            @click="updateLink(link)"
            class="px-10 py-3 rounded-lg border w-1/2 mt-2 hover:bg-green-500"
          >
            Save
          </button>
          <button
            @click="deleteLink(link)"
            class="px-10 py-3 rounded-lg border w-1/2 mt-2 hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <p v-if="!userLinks.length">No links available.</p>
  </div>
  <div class="px-10 py-3 rounded-lg border w-1/2 mt-2 mb-10">
    <button
      @click="toggleAddLink"
      class="border rounded w-full p-2 bg-slate-200 hover:bg-blue-200"
    >
      Add Link
    </button>
    <div v-if="addLinkFormVisible" class="p-2 rounded">
      <div class="flex gap-3 py-4 items-center">
        <p class="w-1/4">New link name</p>
        <input
          v-model="newLinkName"
          placeholder="Enter link name (Instagram)"
          class="w-full p-2"
          required
        />
      </div>
      <div class="flex gap-3 py-4 items-center">
        <p class="w-1/4">New link URL</p>
        <input
          v-model="newLinkUrl"
          placeholder="Enter link URL (https://instagram.com/example)"
          class="w-full p-2"
          required
        />
      </div>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      <button
        @click="addNewLink"
        class="px-10 py-3 rounded-lg border w-1/4 mt-2 hover:bg-green-500"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps({
  id: Number,
});

const userLinks = ref([]);
const errorMessage = ref("");
const newLinkName = ref("");
const newLinkUrl = ref("");
const successMessage = ref("");
const linkName = ref("");
const linkUrl = ref("");
const visibleForms = ref({}); // Track form visibility per link

// toggle link form visibility for each link
function toggleLink(selectedLink) {
  visibleForms.value[selectedLink.id] = !visibleForms.value[selectedLink.id];
  linkName.value = selectedLink.url_name;
  linkUrl.value = selectedLink.url_link;
  console.log(selectedLink);
}

// Function to fetch user links
async function fetchUserLinks() {
  try {
    const response = await axios.get(
      `http://localhost:3030/api/user-links/${props.id}`
    );
    userLinks.value = response.data; // Assuming response.data is an array of links
  } catch (error) {
    console.error("Error fetching user links:", error);
  }
}

// Function to toggle add link form visibility
const addLinkFormVisible = ref(false);

function toggleAddLink() {
  addLinkFormVisible.value = !addLinkFormVisible.value;
}

// Regex to validate that the URL contains "https://"
const urlRegex = /^https:\/\/.+$/;

// Add new link with URL validation
async function addNewLink() {
  if (!newLinkName.value || !newLinkUrl.value) {
    errorMessage.value = "Link name and URL are required.";
    return;
  }

  if (!urlRegex.test(newLinkUrl.value)) {
    errorMessage.value = "The URL must start with https://";
    return;
  }

  try {
    await axios.post("http://localhost:3030/api/user-links", {
      user_id: props.id,
      url_name: newLinkName.value,
      url_link: newLinkUrl.value,
    });
    successMessage.value = "New link added successfully.";

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);

    toggleAddLink();
    fetchUserLinks(); // Refresh links after adding a new one
    resetForm();
  } catch (error) {
    console.error("Error adding new link:", error);
  }
}

// Reset form after successful submission
function resetForm() {
  linkName.value = "";
  linkUrl.value = "";
  newLinkName.value = "";
  newLinkUrl.value = "";
  addLinkFormVisible.value = false;
}

// Update link with URL validation
async function updateLink(link) {
  if (!linkName.value || !linkUrl.value) {
    errorMessage.value = "Link name and URL are required.";
    return;
  }

  if (!urlRegex.test(linkUrl.value)) {
    errorMessage.value = "The URL must start with https://";
    return;
  }

  // console.log(link)
  try {
    await axios.patch(`http://localhost:3030/api/user-links/${link.id}`, {
      url_name: linkName.value,
      url_link: linkUrl.value,
    });

    successMessage.value = "Link updated successfully.";

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);

    toggleLink(link.id);
    fetchUserLinks(); // Refresh links after updating an existing one
    resetForm();
  } catch (error) {
    console.error("Error updating link:", error);
  }
}

// Delete link
async function deleteLink(link) {
  try {
    await axios.delete(`http://localhost:3030/api/user-links/${link.id}`);
    successMessage.value = "Link deleted successfully.";

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);

    toggleLink(link.id);
    fetchUserLinks(); // Refresh links after deleting an existing one
    resetForm();
  } catch (error) {
    console.error("Error deleting link:", error);
  }
}

watch(() => props.id, fetchUserLinks);
</script>
