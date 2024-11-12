<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import pencil from '@/assets/images/pencil.png';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../../stores/AuthStore';

const toast = useToast();
const route = useRoute();
const itemId = route.params.id;
const itemDetails = ref(null);
const authStore = useAuthStore();

const isEditing = ref(false);
const updatedDescription = ref('');

onMounted(async () => {
  try {
    const response = await axios.get(`/api/found_items/${itemId}`);
    itemDetails.value = response.data;
    updatedDescription.value = itemDetails.value.description;
  } catch (error) {
    console.error('Error fetching item details', error);
  }
});

const handleUpdate = async () => {
  try {
    await axios.put(`/api/found_items/description/${itemId}`, {
      description: updatedDescription.value,
    });
    itemDetails.value.description = updatedDescription.value;
    isEditing.value = false;
    toast.success('Description updated successfully');
  } catch (error) {
    toast.error('Error while updating description');
    console.error('Error while updating:', error.response ? error.response.data : error.message);
  }
};
</script>

<template>
  <section class="bg-my-white px-8 py-10">
    <div v-if="itemDetails" class="mt-2">
      <div v-if="authStore.getRole === 'ADMIN'" class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">{{ itemDetails.name }}</h1>
        <button @click="isEditing = !isEditing">
          <img class="max-h-5 h-auto w-auto" :src="pencil" alt="Edit icon" />
        </button>
      </div>
      
      <img :src="itemDetails.photo" alt="Item Photo" class="mb-4 w-full max-h-96 object-contain rounded-md" />
      <p><strong>Category:</strong> {{ itemDetails.category }}</p>
      
      <div v-if="isEditing">
        <label for="description" class="block font-bold">Edit Description:</label>
        <textarea 
          id="description" 
          v-model="updatedDescription" 
          class="w-full mt-2 p-2 border rounded-md"
        ></textarea>
        <button @click="handleUpdate" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
      </div>
      <div v-else>
        <p><strong>Description:</strong> {{ itemDetails.description }}</p>
      </div>

      <p><strong>Date Found:</strong> {{ itemDetails.foundDate }}</p>
      <p><strong>Location Found:</strong> {{ itemDetails.foundPlace }}</p>
      <p><strong>Office:</strong> {{ itemDetails.office }}</p>
    </div>
    <div v-else>
      <p>Loading item details...</p>
    </div>
  </section>
</template>