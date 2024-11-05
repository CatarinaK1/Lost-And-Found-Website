<script setup>
import {ref, onMounted,computed} from 'vue';
import axios from 'axios';


const errorDescription = ref(false);
const isPhoneError = ref(false);
const phoneNumber = ref("");
const address = ref("");
const photo = ref("");
const description = ref("");

const districts = ref([]);
const selectedDistrict = ref();
import { useToast } from 'vue-toastification';
  
  const toast = useToast();

const validatePhoneNumber = () => {
    const phoneRegex = /^(?:\+43|0)(?:\s?\d{1,4})(?:\s?\d{1,4})(?:\s?\d{4})$/;
    isPhoneError.value = !phoneRegex.test(phoneNumber.value);
  };

const validateDescription = () => description.length <= 300;



const handleSubmit = async () => {
    try {
      const newOffice = {
          district: selectedDistrict.value,
          phoneNumber: phoneNumber.value,
          address: address.value,
          photo: photo.value,
          description: description.value
      }
      console.log(selectedDistrict.value)
      console.log(newOffice)
        await axios.post('/api/offices', newOffice, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
        toast.success('Successfully added office');
    }  catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data || 'Error');
        } else if (error.request) {
          toast.error('Server does not respond.');
        } else {
        toast.error(`Error: ${error.message}`);
        }
      } else {
        toast.error(`Error: ${error.message}`);
      }
  }
  };

onMounted(async () => {
    try{
        const response = await axios.get('/api/districts');
        districts.value = response.data
    }catch(error){
        console.error('Error fetching districts',error);
    }
})



</script>
<template>
    <div class="mb-6 mt-2 flex flex-col justify-center items-center">
        <label for="district" class="block mb-3 text-sm font-medium text-gray-700">Select the district:</label>
        <select v-model="selectedDistrict" id="district" class="bg-my-white text-my-gray p-2 border border-my-gray rounded">
          <option v-for="district in districts" :key="district.id" :value="district">
            {{ district.id + ". " +district.name }}
          </option>
        </select>
    </div>
    <div class="mb-6 mt-2 flex flex-col justify-center items-center">
      <form @submit.prevent="handleSubmit" class="bg-my-white pb-6 rounded shadow-md w-80 px-10">
        <div class="mb-2 mt-3">
          <label for="phoneNumber" class="block text-my-gray text-xs">Phone number</label>
          <input
            type="text"
            id="phoneNumber"
            @input="validatePhoneNumber"
            v-bind:class="{'border-red-500': isPhoneError}"
            v-model="phoneNumber"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter the phone number" required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="address" class="block text-my-gray text-xs">Address</label>
          <input
            type="text"
            id="address"
            v-model="address"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter the address" required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="photo" class="block text-my-gray text-xs">Photo</label>
          <input
            type="text"
            id="photo"
            v-model="photo"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter link to the photo" required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="description" class="block text-my-gray text-xs">Description</label>
          <input
            type="text"
            id="description"
            v-model="description"
            @input="validateDescription"
            v-bind:class="{'border-red-500': errorDescription}"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Provide short description" required
          />
        </div>
        <button type="submit" class="bg-my-green text-my-white py-2 mt-4 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">Add office</button>
      </form>
    </div>
    
</template>