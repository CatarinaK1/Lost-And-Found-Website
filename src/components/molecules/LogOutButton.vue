<template>
    <RouterLink to="/">
      <button @click="handleLogout" class="bg-my-green text-my-white font-bold text-sm px-3 py-2 rounded hover:bg-gray-900 hover:text-my-white transition duration-300">
        Log out
      </button>
    </RouterLink>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../stores/AuthStore';

  const authStore = useAuthStore();

  const router = useRouter();
  const handleLogout = () => {
    router.push('/');
    localStorage.removeItem('token');
    authStore.setRole(null);
    authStore.setUser(null);
};
  </script>
  