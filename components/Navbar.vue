<script setup>
import { ref, defineEmits } from "vue";

// Declare emit
const emit = defineEmits();

// Ref to control which component to show
const menu = ref("preview");

function changeMenu(value) {
  menu.value = value;
  emit("menuChange", value); // Emit the menu change to the parent component
}


</script>

<template>
  <div class="container py-5">
    <div class="flex gap-10 justify-center items-center">
      <button
        @click="changeMenu('preview')"
        :class="menu === 'preview' ? 'bg-green-500' : 'bg-gray-200'"
        class="p-2 rounded-md"
      >
        Preview
      </button>
      <button
        @click="changeMenu('customize')"
        :class="menu === 'customize' ? 'bg-green-500' : 'bg-gray-200'"
        class="p-2 rounded-md"
      >
        Customize
      </button>
    </div>
  </div>
</template>

<style scoped></style>
