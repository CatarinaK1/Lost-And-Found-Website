<script setup>
import ItemDetails from '@/components/organisms/ItemDetails.vue';
</script>

<template>
  <div class="w-full bg-my-white py-10 flex flex-col items-center">
    <div class="w-full">
      <div class="login-caption font-bold text-my-green text-2xl text-center mb-4">
        Found item details
      </div>
      <div class="login-caption font-bold text-my-green text-base text-center mb-4">
        Check the detailed information about the lost item
      </div>
      <ItemDetails />
    </div>
  </div>
</template>