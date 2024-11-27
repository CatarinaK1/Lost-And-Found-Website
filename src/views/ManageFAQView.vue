<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import AdminFAQTable from '@/components/organisms/AdminFAQTable.vue';


import axios from 'axios';


const router = useRouter();
const authStore = useAuthStore();

const faqs = ref([]);

// Fetch FAQs from the backend
const fetchAllFAQs = async () => {
  const response = await axios.get('/api/faqs', {
    headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        },
  });
  faqs.value = response.data;
};

onMounted( async () =>{
  if(authStore.getRole !== 'ADMIN'){
    router.push('/unauthorized');
  }

  try {
    faqs.value = await fetchAllFAQs();
  } catch (error) {
    console.error("Error fetching FAQs:", error);
  }
});


</script>

<template>
  <div>

    <h2 class="text-2xl font-bold mb-4 text-center text-my-green">Admin - Manage FAQs</h2>
    <AdminFAQTable :faqs="faqs" @refresh="fetchAllFAQs" />
  </div>
</template>





