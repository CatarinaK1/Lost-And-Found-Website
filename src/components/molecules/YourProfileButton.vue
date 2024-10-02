<template>
    <RouterLink to="/profile">
      <button class="bg-my-white text-my-green font-bold text-sm px-3 py-2 rounded hover:bg-gray-900 hover:text-white transition duration-300">
        Your profile
      </button>
    </RouterLink>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  </script>
  