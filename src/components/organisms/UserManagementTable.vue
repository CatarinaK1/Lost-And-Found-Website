<script setup>

import { ref,onMounted, onUpdated } from 'vue';
import axios from 'axios';
import UserTab from '@/components/molecules/UserTab.vue';
import { useAuthStore } from '../../stores/AuthStore';

const authStore = useAuthStore();

const users = ref([]);



onMounted(async () => {
    try{
        const response = await axios.get('/api/users',{
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
      });
        users.value = response.data
    }catch(error){
        console.error('Error fetching Users',error);
    }
})

onUpdated(async () => {
    try{
        const response = await axios.get('/api/users',{
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
      });
        users.value = response.data
    }catch(error){
        console.error('Error fetching users',error);
    }
})

</script>
<template>
    <div class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
      <div class="bg-my-white text-my-gray px-4 pt-4 rounded-lg shadow-md border-2 border-my-green w-auto">
        <div v-for="user in users">
            <UserTab :data="user"/>
        </div>
      </div>
    </div>
</template>