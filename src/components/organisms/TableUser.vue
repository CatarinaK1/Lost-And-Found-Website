<script setup>
import { ref, defineProps, onMounted, onUpdated } from 'vue';
import axios from 'axios';
import user from '@/assets/images/user.png';
import ErrorModal from '../molecules/ErrorModal.vue';
import { useAuthStore } from '../../stores/AuthStore';

const authStore = useAuthStore();

const userDetailsFull = ref(null);

const isModalOpen = ref(false);
const modalError = ref('');

const closeModal = () => {
  isModalOpen.value = false;
  modalError.value = '';
};

const props = defineProps({
  userDetail: Object,
});

const handleSubmitPhoto = () => {
  document.getElementById("photoInput").click();
};

onMounted(() => {
  userDetailsFull.value = props.userDetail;
});

onUpdated(async () => {
  try {
    if(authStore.getToken){
    const response = await axios.get("/api/user", {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
    });
    if (response.data) {
      userDetailsFull.value = response.data;
    } else {
      console.error('No user found');
    }}
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
});

const uploadPhoto = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post('/api/user/photo', formData, {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
          'Content-Type': 'multipart/form-data'
        }});      
      if (response.status === 200) {
        console.log('Photo uploaded successfully');
      } else {
        console.error("Failed to upload photo");
      }
    } catch (error) {
      modalError.value = error.response.statusText;
      isModalOpen.value = true;
      console.error("Error uploading photo:", modalError.value);
    }
  }
};

const deletePhoto = async () => {
  try {
    const response = await axios.delete('/api/user/photo', {
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },
    });
    if (response.status === 200) {
      userDetailsFull.value.photo = null;
      console.log('Photo deleted successfully');
    } else {
      console.error("Failed to delete photo");
    }
  } catch (error) {
    modalError.value = error.response.statusText;
    isModalOpen.value = true;
    console.error("Error deleting photo:", modalError.value);
  }
};
</script>

<template>
  <div v-if="userDetailsFull" class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
    <div class="bg-my-green text-my-white p-6 rounded-lg shadow-md w-auto">
      <div class="flex justify-center items-center">
        <div v-if="userDetailsFull.photo" class="flex flex-col justify-center items-center py-2">
          <img :src="'data:image/jpeg;base64,' + userDetailsFull.photo" alt="Image" class="w-32 h-32 rounded-full mb-4 object-cover" />
          <div class="flex space-x-2">
            <button @click="handleSubmitPhoto" class="bg-my-white text-my-green text-sm font-bold rounded-lg shadow-md p-2 hover:bg-gray-900 hover:text-white transition duration-300">Change your photo</button>
            <button @click="deletePhoto" class="bg-red-500 text-white text-sm font-bold rounded-lg shadow-md p-2 hover:bg-red-700 transition duration-300">Delete your photo</button>
          </div>
          <input id="photoInput" type="file" class="hidden" @change="uploadPhoto" accept="image/*" />
        </div>
        <div v-else class="flex flex-col justify-center items-center py-2">
          <img :src="user" alt="Default Profile Image" class="w-32 h-32 rounded-full mb-2 object-cover" />
          <button @click="handleSubmitPhoto" class="bg-my-white text-my-green text-sm font-bold rounded-lg shadow-md p-2 hover:bg-gray-900 hover:text-white transition duration-300">Upload your photo</button>
          <input id="photoInput" type="file" class="hidden" @change="uploadPhoto" accept="image/*" />
        </div>
        <ErrorModal :isOpen="isModalOpen" :message="modalError" @close="closeModal" />
      </div>

      <table class="table-auto w-full">
        <tbody>
          <tr>
            <td class="pr-4">Username:</td>
            <td class="text-right">{{ userDetailsFull.username }}</td>
          </tr>
          <tr>
            <td class="pr-4">Name:</td>
            <td class="text-right">{{ userDetailsFull.name }}</td>
          </tr>
          <tr>
            <td class="pr-4">Surname:</td>
            <td class="text-right">{{ userDetailsFull.surname }}</td>
          </tr>
          <tr>
            <td class="pr-4">Email:</td>
            <td class="text-right">{{ userDetailsFull.mail }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
