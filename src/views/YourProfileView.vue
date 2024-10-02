<script setup>
import { defineEmits,defineProps,onMounted,ref } from 'vue';
import LogOutButton from '@/components/molecules/LogOutButton.vue'
import TableUser from '@/components/organisms/TableUser.vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

const emit = defineEmits(['logout']);
const router = useRouter(); 

const props = defineProps({
  logged: String
});

const userDetails = ref(null);

const handleLogout = () => {
  emit('logout');
};


onMounted(async () => {
  try {
    if(props.logged !== ""){
    const response = await axios.get(`/api/users?username=${props.logged}`);
    if (response.data && response.data.length > 0) {
      userDetails.value = response.data[0];
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
          <div class="flex justify-center items-center">
            <LogOutButton @logout="handleLogout" />
          </div>
        </div>
        <div v-else class="text-my-green text-2xl text-center mb-6">
        <p>You are not logged in</p>
      </div>
        
      </div>
    </div>
  </template>
  
