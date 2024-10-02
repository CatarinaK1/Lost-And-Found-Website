<script setup>
import logo from '@/assets/images/logo.png';
import NavbarLinks from '@/components/molecules/NavbarLinks.vue';
import LoginButton from '@/components/molecules/LoginButton.vue';
import YourProfileButton from '@/components/molecules/YourProfileButton.vue';
import { RouterLink } from 'vue-router';



defineProps({
    logged: String
});



</script>

<template>
  <nav class="bg-my-green border-b border-green-500" style="height: 100px;">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full">
      <div class="flex h-full items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start h-full">
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="max-h-20 h-auto w-auto" :src="logo" alt="Vue Jobs" />
          </RouterLink>
          <div class="flex items-center space-x-4 md:ml-auto">
          <NavbarLinks />
          <div v-if="logged">
              <YourProfileButton/>
            </div>
            <div v-else>
              <LoginButton />
            </div>
        </div>
        </div>
      </div>
    </div>
  </nav>
</template>