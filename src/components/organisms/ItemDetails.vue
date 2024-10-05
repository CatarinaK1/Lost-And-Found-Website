<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const itemId = route.params.id;
const itemDetails = ref(null);


onMounted(async () => {
  try {
    const response = await axios.get(`/api/found_items/${itemId}`);
    itemDetails.value = response.data;
  } catch (error) {
    console.error('Error fetching item details', error);
  }
});
</script>

<template>
  <section class="bg-my-white px-8 py-10">
    <div v-if="itemDetails" class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">{{ itemDetails.name }}</h1>
      <img :src="itemDetails.photo" alt="Item Photo" class="mb-4 w-full h-64 object-cover rounded-md" />
      <p><strong>Category:</strong> {{ itemDetails.category }}</p>
      <p><strong>Description:</strong> {{ itemDetails.description }}</p>
      <p><strong>Location Found:</strong> {{ itemDetails.location }}</p>
      <p><strong>Date Found:</strong> {{ itemDetails.found_date }}</p>
      <p><strong>Office:</strong> {{ itemDetails.office }}</p>
    </div>
    <div v-else>
      <p>Loading item details...</p>
    </div>
  </section>
</template>

<style scoped>
/* style */
</style>