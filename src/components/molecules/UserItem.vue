<script setup>
import { defineProps, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../../stores/AuthStore';

import date from '@/assets/images/date.png';

const toast = useToast();
const authStore = useAuthStore();

const props = defineProps({
  details: Object,
});

</script>

<template>
  <div class="flex flex-col items-center bg-my-green rounded-xl shadow-md relative">
    <div class="mb-2 p-4 flex flex-col items-center">
      <div class="image-container w-full h-[20vh] overflow-hidden relative mb-6">
        <img
          v-if="details.photo"
          :src="`data:image/jpeg;base64,${details.photo}`"
          alt="Item Photo"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div v-else class="text-my-white text-center">No Image Available</div>
      </div>
      <p class="text-my-white text-base">{{ details.name }}</p>
      <div class="flex items-center mb-3">
        <img class="max-h-5 h-auto w-auto mr-2" :src=date />
        <p class="text-my-white text-base">{{ details.foundDate }}</p>
      </div>
      <RouterLink
        :to="'/found/' + details.id"
        class="bg-my-white text-my-green font-bold hover:bg-my-gray hover:text-my-white mt-2 px-4 py-2 rounded-lg text-center text-sm"
      >
        Read More
      </RouterLink>
    </div>
  </div>
</template>