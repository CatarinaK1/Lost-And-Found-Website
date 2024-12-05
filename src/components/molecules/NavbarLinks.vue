<script setup>
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

const isRegisteredUser = computed(() => {
  return authStore.getRole === 'USER' || authStore.getRole === 'ADMIN';
});

const isAdminUser = computed(() =>{
  return authStore.getRole === 'ADMIN';
})

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <div class="md:ml-auto">
    <div class="flex space-x-8">
      <div class="flex flex-1 space-x-4 items-center justify-center md:items-stretch md:justify-start">
        <RouterLink
          to="/about"
          :class="[isActiveLink('/about') ? '' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
        >About</RouterLink>
        <RouterLink
          to="/howto"
          :class="[isActiveLink('/howto') ? '' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
        >How does it work?</RouterLink>
        <RouterLink
          to="/offices"
          :class="[isActiveLink('/offices') ? '' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
        >Our offices</RouterLink>
        <RouterLink
          to="/faq"
          :class="[isActiveLink('/faq') ? '' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
        >FAQ</RouterLink>
        <RouterLink
          to="/found"
          :class="[isActiveLink('/found') ? '' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
        >Found items</RouterLink>
        <RouterLink
          v-if="isRegisteredUser"
          to="/report"
          :class="[isActiveLink('/report') ? '' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
        >Report item</RouterLink>
        <RouterLink
          v-if="isAdminUser"
          to="/users/management"
          :class="[isActiveLink('/users/management') ? '' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
        >Manage Users</RouterLink>
        <RouterLink
          v-if="isAdminUser"
          to="/faq/management"
          :class="[isActiveLink('/faq/management') ? '' : 'hover:bg-gray-900 hover:text-white','text-white','text-sm','px-3','py-2','rounded-md']"
        >Manage FAQs</RouterLink>
      </div>
    </div>
  </div>
</template>