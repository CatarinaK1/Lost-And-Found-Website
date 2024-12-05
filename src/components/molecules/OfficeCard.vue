<script setup>
import {defineProps, ref, computed, defineEmits} from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import minus from '@/assets/images/minusr.png'
import minusw from '@/assets/images/minusw.png'
import wpen from '@/assets/images/whitepen.png'
import rpen from '@/assets/images/redpen.png'
import ErrorModal from '@/components/molecules/ErrorModal.vue';


import location from '@/assets/images/location.png';
import phone from '@/assets/images/phone.png';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../../stores/AuthStore';
import * as yup from "yup";

const emit = defineEmits(['changed']);
  const schema = yup.object({
    district: yup.object().required("Please specify the district"),
    phoneNumber: yup
    .string()
    .matches(
      /^(?:\+43|0)(?:\s?\d{1,4})(?:\s?\d{1,4})(?:\s?\d{4})$/,
      'Invalid phone number format'
    )
    .required('Phone number is required'),
    address: yup
    .string()
    .required('Address is required'),
    photo: yup
    .string()
    .required('Photo is required'),
    description: yup
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .required('Description is required'),
  });

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

const editMode = ref(false);


const props = defineProps({
    details: Object,
});


const phoneNumber = ref(props.details.phoneNumber);
const address = ref("");
const description = ref(props.details.description);
const photo = ref("");
const districts = ref(null);
const selectedDistrict = ref(null);

const hover = ref(false)
const hoverl = ref(false);

const handleDelete = async (id) => {
    try {
        const response = await axios.delete(`/api/offices/${id}`, {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }})
        toast.success("Successfully deleted");
        emit('changed');
    } catch (error) {
      toast.error("Error while deleting");
      console.error('Error while deleting:', error.response ? error.response.data : error.message);
    }

}

const handleSubmitPhoto = () =>{
  document.getElementById("photoInput").click();
}

const handleEdit = async() => {
  try{
        const response = await axios.get('/api/districts');
        districts.value = response.data
    }catch(error){
        console.error('Error fetching districts',error);
  }
  editMode.value = true;
  selectedDistrict.value = props.details.district;
  phoneNumber.value = props.details.phoneNumber;
  description.value = props.details.description;
  photo.value = props.details.photo;
  address.value = props.details.address;
}

const uploadPhoto = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      photo.value = reader.result.split(',')[1];
    };
    reader.readAsDataURL(file);
  }
};

const isModalOpen = ref(false); 
const modalError = ref(''); 

const closeModal = () => {
  isModalOpen.value = false;
  modalError.value = '';
}
const errors = ref({});

const handleSubmit = async () => {
    try {
      const updOffice = {
          district: selectedDistrict.value,
          phoneNumber: phoneNumber.value,
          address: address.value,
          photo: photo.value,
          description: description.value
      }
      await schema.validate(updOffice, { abortEarly: false });
      await axios.put('/api/offices/'+props.details.id, updOffice, {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
      });
      editMode.value = false;
      emit('changed');
    }  catch (error) {
      if (error instanceof yup.ValidationError) {
      const validationErrors = {};
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      errors.value = validationErrors;
      for (const key in errors.value) {
        if (errors.value.hasOwnProperty(key)) {
          modalError.value += `${errors.value[key]}` + `<br>`;
        }
        isModalOpen.value = true;
      }
    }
      else if (axios.isAxiosError(error)) {
        if (error.response) {
          if(error.response.request.status === 400){
            toast.error(error.response.request)
            console.log(error.response)
          }
          else{
            toast.error('Error ' + error.response.request.status);
          }
        } else if (error.request) {
          toast.error('Server does not respond.');
        } else {
        toast.error(`Error: ${error.message}`);
        console.log('Error');
        }
      } else {
        toast.error(`Error: ${error.message}`);
        console.log('Error');
      }
  }
  };

  



</script>

<template>
    <div v-if="editMode" class="bg-my-green rounded-xl shadow-md relative">
      <div class="mb-4 mt-6 text-my-white font-bold text-lg flex flex-col justify-center items-center">
        Edit details
      </div>
      <div class="mb-6 mt-2 flex flex-col justify-center items-center">
        
        <form @submit.prevent="handleSubmit" class="bg-my-green rounded px-10">

          <label for="district" class="block mb-1 text-xs text-my-white">Set the district:</label>
        <select v-model="selectedDistrict" id="district" class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
        >
          <option v-for="district in districts" :key="district.id" :value="district">
            {{ district.id + ". " +district.name }}
          </option>
        </select>
        <div class="mb-2 mt-3">
          <label for="phoneNumber" class="block mb-1 text-my-white text-xs">Set phone number</label>
          <input
            type="text"
            id="phoneNumber"
            v-model="phoneNumber"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter the phone number" required
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="address" class="block mb-1 text-my-white text-xs">Set address</label>
          <input
            type="text"
            id="address"
            v-model="address"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs"
            placeholder="Enter the address" required
          />
        </div>
        <label for="photo" class="block text-my-white text-xs">Photo</label>
        <div class="mb-1 mt-1 flex flex-col items-center">
          <img :src="'data:image/jpeg;base64,' + photo" alt="Office Photo" class="rounded lg mb-2 h-40 w-auto border border-my-green"/>
          <button type="button" @click="handleSubmitPhoto" class="bg-my-green text-my-white text-xs rounded w-full border border-my-white p-2 hover:bg-gray-900 hover:text-white transition duration-300">Change photo</button>
          <input id="photoInput" type="file" class="hidden" @change="uploadPhoto" accept="image/*"/>  
        </div>
        <div class="mb-2 mt-4">
          <label for="description" class="block mb-1 text-my-white text-xs">Set description</label>
          <textarea
            id="description"
            v-model="description"
            class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray placeholder-text-xs text-xs"
            placeholder="Provide short description" required></textarea>
        </div>
        <button type="submit" class="bg-my-green border border-my-white text-my-white py-2 mt-2 rounded w-full hover:bg-gray-900 hover:text-white transition duration-300">Save changes</button>
        </form>
      </div>
    </div>
    <div v-else class="bg-my-green rounded-xl shadow-md relative">
            <div v-if="authStore.getRole === 'ADMIN'" class="mt-2 flex justify-end">
              <button @click="handleDelete(props.details.id)" @mouseover="hover = true" @mouseleave="hover = false">
                <img class="max-h-5 h-auto w-auto mr-2" :src="hover ? minusw : minus">
              </button>
              <button @click="handleEdit" @mouseover="hoverl = true" @mouseleave="hoverl = false">
                <img class="max-h-5 h-auto w-auto mr-2 mx-2" :src="hoverl ? wpen : rpen">
              </button>
            </div>
            <div class="mb-2 p-4 flex flex-col  items-center">
              <div class="image-container w-full h-[20vh] overflow-hidden relative mb-6">
                <img :src="'data:image/jpeg;base64,' + details.photo" alt="Office Photo" class="absolute inset-0 w-full h-full object-cover" />
                
              </div>
             
              <p class="text-my-white font-bold text-base">{{details.district.name}}</p>
              <div class="flex items-center mt-3 mb-3">
                  <img class="max-h-5 h-auto w-auto mr-2" :src="location" alt="location" />
                  <p class="text-my-white font-bold text-xs">{{details.address}}</p>
              </div>
              <div class="flex items-center mb-3">
                  <img class="max-h-5 h-auto w-auto mr-2" :src="phone" alt="phone" />
                  <p class="text-my-white font-bold text-xs">{{details.phoneNumber}}</p>
              </div>
              <RouterLink
                :to="'/offices/' + details.id"
                class="bg-my-white text-my-green font-bold hover:bg-my-gray hover:text-my-white mt-2 px-4 py-2 rounded-lg text-center text-sm"
              >
                Read More
                </RouterLink>
              </div>
          </div>
          <ErrorModal :isOpen="isModalOpen" :message="modalError" @close="closeModal" />
</template>