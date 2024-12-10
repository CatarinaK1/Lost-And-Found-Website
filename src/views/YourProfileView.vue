<script setup>
import { defineEmits,defineProps,onMounted,ref } from 'vue';
import LogOutButton from '@/components/molecules/LogOutButton.vue'
import TableUser from '@/components/organisms/TableUser.vue'
import ChangePassword from '@/components/organisms/ChangePassword.vue';
import ChangeEmail from '@/components/organisms/changeEmail.vue';

import axios from 'axios'
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();

const router = useRouter(); 

const userDetails = ref(null);


onMounted(async () => {
  try {
    if(authStore.getToken){
    const response = await axios.get("/api/user", {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
    });
    if (response.data) {
      userDetails.value = response.data;
    } else {
      console.error('No user found');
    }}
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
  
});


</script>

<template>
  <div class="w-full bg-my-white py-10 flex flex-col items-center">
    <div class="w-full items-center">
      <div v-if="userDetails">
        <div class="login-caption text-my-green text-2xl text-center mb-6">
          This is your lost and found profile
        </div>
        <TableUser :userDetail="userDetails" />
        <ChangePassword />
        <ChangeEmail />
        <div class="flex justify-center items-center mt-4">
          <LogOutButton />
        </div>
      </div>
      <div v-else>
        <p class="text-my-green text-2xl text-center mb-6">
          You are not logged in
        </p>
      </div>
    </div>
  </div>
</template>
