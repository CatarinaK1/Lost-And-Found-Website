<script setup>
import {RouterLink} from 'vue-router';
</script>

<template>
    <section class="text-my-gray text-center flex flex-col justify-center items-center h-96">
      <h1 class="text-6xl font-bold mb-4">404 Not Found</h1>
      <p class="text-xl mb-5">This page does not exist</p>
      <RouterLink
        to="/"
        class="text-my-white bg-my-green hover:bg-my-green rounded-md px-3 py-2 mt-4"
        >Go Back</RouterLink
      >
    </section>
</template>