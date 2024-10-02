<script setup>
import OfficeCards from '@/components/organisms/OfficeCards.vue';
</script>

<template>
  <div class="w-full bg-my-white py-10 flex flex-col items-center">
    <div class="w-full">
      <div class="login-caption font-bold text-my-green text-2xl text-center mb-4">
        Our offices
      </div>
      <div class="login-caption font-bold text-my-green text-base text-center mb-4">
        Check our locations all around Vienna
      </div>
      <OfficeCards />
    </div>
  </div>
</template>