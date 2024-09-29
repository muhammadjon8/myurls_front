<script setup>
import { ref, defineEmits } from 'vue';

// Declare emit
const emit = defineEmits();

const menu = ref("preview");

function changeMenu(value) { 
    menu.value = value;
    // Emit the value to the parent component
    emit('menuChange', value);
}
</script>

<template>
  <div class="container py-5">
    <div class="flex gap-10 justify-center items-center">
      <button @click="changeMenu('preview')" :class="menu === 'preview' ? 'bg-green-500' : 'bg-gray-200'" class="p-2 rounded-md">Preview</button>
      <button @click="changeMenu('customize')" :class="menu === 'customize' ? 'bg-green-500' : 'bg-gray-200'" class="p-2 rounded-md">Customize</button>
    </div>
  </div>
</template>

<style scoped></style>
