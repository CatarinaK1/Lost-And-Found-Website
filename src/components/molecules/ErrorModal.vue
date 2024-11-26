<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div class="bg-my-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 class="text-lg text-red-500 font-semibold mb-4">Error</h2>
        <p class="mb-4 text-my-gray">{{ props.message }}</p>
        <button @click="$emit('close')" class="text-my-gray px-4 py-2 bg-my-green text-white rounded hover:bg-my-gray">
          Close
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
    message: [String, Object],
  });

  const emit = defineEmits(['close']);
  </script>