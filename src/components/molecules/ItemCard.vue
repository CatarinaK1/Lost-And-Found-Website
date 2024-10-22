<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  details: Object,
});
</script>

<template>
  <div class="bg-my-green rounded-xl shadow-md relative">
    <div class="mb-6 p-4 flex flex-col items-center">
      <div class="w-full h-[20vh] overflow-hidden relative mb-6">
        <img :src="details.photo" alt="Item Photo" class="w-full h-full object-contain rounded-md" />
      </div>
      <RouterLink
        :to="'/found/' + details.id"
        class="bg-my-white text-my-green hover:bg-my-gray hover:text-my-white px-4 py-2 rounded-lg text-center text-sm"
      >
        Read More
      </RouterLink>
    </div>
  </div>
</template>
