<template>
    <RouterLink to="/">
      <button @click="handleLogout" class="bg-my-green text-my-white font-bold text-sm px-3 py-2 rounded hover:bg-gray-900 hover:text-my-white transition duration-300">
        Log out
      </button>
    </RouterLink>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  import { defineEmits } from 'vue';

  const emit = defineEmits(['logout']);

  const handleLogout = () => {
  emit('logout');
};
  </script>
  