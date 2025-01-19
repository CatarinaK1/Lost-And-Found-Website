<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import pencil from '@/assets/images/pencil.png';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../../stores/AuthStore';

import category from '@/assets/images/categoryg.png'
import date from '@/assets/images/dateg.png'
import location from '@/assets/images/location_black.png'
import office from '@/assets/images/office.png'

const toast = useToast();
const route = useRoute();
const itemId = route.params.id;
const itemDetails = ref(null);
const authStore = useAuthStore();

const isEditing = ref(false);
const updatedDescription = ref('');
const updatedDate = ref('')
const updatedLocation = ref('')
const updatedCategory = ref('')

onMounted(async () => {
  fetchData();
});


const fetchData = async () => {
  try {
    const response = await axios.get(`/api/found_items/${itemId}`, {
    });
    itemDetails.value = response.data;
    updatedDescription.value = itemDetails.value.description;
    updatedDate.value = itemDetails.value.foundDate;
    updatedLocation.value = itemDetails.value.foundPlace
    updatedCategory.value = itemDetails.value.category
  } catch (error) {
    console.error('Error fetching item details', error);
    toast.error('Failed to fetch item details');
  }
}


const handleDelete = async() => {
  try{
    await axios.delete(
      `/api/found_items/${itemId}/picture`,
      {
        headers: {
        'Authorization': `Bearer ${authStore.getToken}`
      },
      }
    );
    toast.success('Photo deleted successfully');
    fetchData();
  }catch(error){
    console.error('Error deleting photo', error);
    toast.error('Failed to delete item picture');
  }
}


const handleUpload = async(event) => {
  try{
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    const response = await axios.put(
      `/api/found_items/${itemId}/picture`, formData,
      {
        headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
        'Content-Type': 'multipart/form-data'
      }
      }
    );
    toast.success('Photo uploaded successfully');
    fetchData();
  }catch(error){
    console.error('Error uploading photo', error);
    toast.error('Failed to upload item picture');
  }
}



const handleUpdate = async () => {
  try {
    const response = await axios.put(
      `/api/found_items/${itemId}`,
      {
        id: itemId,
        name: itemDetails.value.name,
        category: updatedCategory.value,
        description: updatedDescription.value,
        office: itemDetails.value.office,
        foundDate: updatedDate.value,
        foundPlace: updatedLocation.value,
      },
      {
        headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
        'Content-Type': 'application/json',
      },
      }
    );
    itemDetails.value = response.data;
    isEditing.value = false;
    toast.success('Details updated successfully');
  } catch (error) {
    toast.error(
      error.response?.data?.message || 'Error while updating details'
    );
    console.error('Error while updating:', error.response || error.message);
  }
};

const handleSubmitPhoto = () => {
  document.getElementById("photoInput").click();
};

</script>

<template>
  <section class="bg-my-white px-8 py-5">
    <div v-if="itemDetails" class="mt-2">
      

    <div v-if="isEditing" class="bg-my-green rounded-xl relative">
      <div class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
        <div class="bg-my-green text-my-white rounded-lg shadow-md w-auto">
          <div class="flex flex-col justify-center items-center">
            <div class="mb-4 mt-6 text-my-white font-bold text-lg flex flex-col justify-center items-center">
              <h1 class="text-2xl font-bold">{{ itemDetails.name }}</h1>
            </div>
            <div class="mb-6 mt-2 flex flex-col justify-center items-center">
              <div class="rounded-md">
                <img :src="`data:image/jpeg;base64,${itemDetails.photo}`" alt="Item Photo" class="mb-4 w-full max-h-96 object-contain rounded-md" />
              </div>
              <div class="flex items-center justify-center space-x-5 mb-5">
                <button @click="handleSubmitPhoto" class="bg-my-green border border-my-white text-my-white px-4 py-2 mt-2 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">Change</button>
                <button @click="handleDelete" class="bg-red-500 border border-my-white text-my-white px-4 py-2 mt-2 rounded w-full hover:bg-my-white hover:text-my-green transition duration-300">Delete</button>
              </div>
              <input id="photoInput" type="file" class="hidden" @change="handleUpload" accept="image/*" />
              <form @submit.prevent="handleUpdate" class="bg-my-green rounded px-10">
                <table class="table-auto w-full">
                  <tbody>
                    <tr>
                      <td class="pr-4 py-3">Category:</td>
                      <td class="text-right">
                        <input 
                          type="text" 
                          v-model="updatedCategory" 
                          name="category" 
                          id="category" 
                          class="w-full mt-2 p-2 border rounded-md text-my-gray"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 py-3">Description:</td>
                      <td class="text-right">
                        <textarea
                            id="description"
                            v-model="updatedDescription"
                            class="w-full mt-2 p-2 border rounded-md text-my-gray"
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 py-3">Found Date:</td>
                      <td class="text-right">
                        <input 
                          type="date" 
                          v-model="updatedDate" 
                          name="floating_found_date" 
                          id="floating_found_date" 
                          class="w-full mt-2 p-2 border rounded-md text-my-gray"
                          />
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 py-3">Found Location:</td>
                      <td class="text-right">
                        <input 
                          type="text" 
                          v-model="updatedLocation" 
                          name="location" 
                          id="location" 
                          class="w-full mt-2 p-2 border rounded-md text-my-gray"
                          />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" class="bg-my-green border border-my-white text-my-white py-2 mt-2 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col">
      <div class="flex flex-col items-center">
      <div v-if="authStore.getRole === 'ADMIN' || itemDetails.user.username === authStore.getUser" >
      <button @click="isEditing = !isEditing">
        <img class="max-h-5 h-auto w-auto" :src="pencil" alt="Edit icon" />
      </button>
      </div>
      <div class="flex flex-col rounded-lg justify-center items-center bg-my-green mt-4 mb-4 px-4">
      <div class="relative flex items-center justify-between">
        <div class="text-my-white font-bold text-2xl text-center mt-6 mb-6">
            {{ itemDetails.name }}
        </div>
      </div>
      <div class="w-full h-1 bg-my-white mb-2"></div>
      <div class="flex flex-col mb-4 mt-4 rounded-xl">
        <div class="image-container rounded-xl w-[80vh] h-[50vh] overflow-hidden relative mb-6">
          <img :src="'data:image/jpeg;base64,' + itemDetails.photo" alt="Office Photo" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class = "flex flex-col items-center">
          <table class="flex flex-col relative text-my-white p-4">
                  <tbody>
                    <tr>
                      <td class="pr-4 py-3 font-bold">Category:</td>
                      <td class="text-right ml-16">
                        {{ itemDetails.category }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 py-3 font-bold">Found Date:</td>
                      <td class="text-right ml-16">
                        {{ itemDetails.foundDate }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 py-3 font-bold">Found location:</td>
                      <td class="text-right ml-16">
                        {{ itemDetails.foundPlace }}
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-4 py-3 font-bold">Office:</td>
                      <td class="text-right ml-16">
                        {{ itemDetails.office }}
                      </td>
                    </tr>
                  </tbody>
          </table>
        </div>
        
        
      </div>
      <div class="flex flex-col w-full bg-my-gray rounded-xl mb-6 p-3 relative justify-center items-center">
      <p class="text-my-white text-base mb-2">Description</p>
      <div class="w-full h-0.5 bg-my-white mb-2"></div>
      <p class="text-my-white text-center text-sm">{{ itemDetails.description }}</p>
    </div>
    </div>
    
  </div> 
  
  </div>
</div>




    <div v-else>
      <p>Loading item details...</p>
    </div>
  </section>
</template>
