<script setup>

import { ref,onMounted } from 'vue';
import axios from 'axios';
import FAQTab from '@/components/molecules/FAQTab.vue';

const faqs = ref([]);


onMounted(async () => {
  try {
    // Fetch all FAQs
    const response = await axios.get('/api/faqs');
    
    // Filter approved FAQs directly after fetching
    faqs.value = response.data.filter(faq => faq.approved === true);
  } catch (error) {
    console.error('Error fetching FAQs', error);
  }
});





</script>
<template>
    <div class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
      <div class="bg-my-white text-my-gray px-4 pt-4 rounded-lg shadow-md border-2 border-my-green w-auto">
        <div v-for="faq in faqs">
            <FAQTab :data="faq"/>
        </div>
      </div>
    </div>
</template>