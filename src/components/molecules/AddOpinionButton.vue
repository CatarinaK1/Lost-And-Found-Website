<template>
    <RouterLink v-if="authStore.getUser" to="/review">
      <button class="bg-my-white text-my-green font-bold text-sm px-3 py-2 rounded hover:bg-gray-900 hover:text-my-white transition duration-300">
        Add review
      </button>
    </RouterLink>
    <RouterLink v-else to="/login">
      <button class="bg-my-white text-my-green font-bold text-sm px-3 py-2 rounded hover:bg-gray-900 hover:text-my-white transition duration-300">
        Add review
      </button>
    </RouterLink>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  import { useAuthStore } from '../../stores/AuthStore';
 
  const authStore = useAuthStore();
  </script>
  