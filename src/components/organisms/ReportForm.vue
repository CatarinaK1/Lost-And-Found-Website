<template>
  <form @submit.prevent="submitForm" class="flex flex-col items-center justify-center max-w-md mx-auto">
    <div class="relative z-0 w-full mb-5 group">
      <input 
        type="text" 
        v-model="name" 
        name="floating_name" 
        id="floating_name" 
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
        placeholder="" 
        required 
      />
      <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name of found object</label>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <input 
        type="text" 
        v-model="category" 
        name="floating_category" 
        id="floating_category" 
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
        placeholder=" " 
        required 
      />
      <label for="floating_category" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
    </div>

    <div class="w-full grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
        <input 
          type="text" 
          v-model="foundPlace" 
          name="floating_found_place" 
          id="floating_found_place" 
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          required 
        />
        <label for="floating_found_location" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Found Location</label>
      </div>

      <div class="relative z-0 w-full mb-5 group">
        <input 
          type="date" 
          v-model="foundDate" 
          name="floating_found_date" 
          id="floating_found_date" 
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
          placeholder=" " 
          required 
        />
        <label for="floating_found_date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Found Date</label>
      </div>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <select
        v-model="office"
        id="offices"
        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
        required
      >
        <option value="" disabled>Select your office</option>
        <option v-for="office in offices" :key="office.address" :value="office">
          {{ office.address }}
        </option>
      </select>
      <label
        for="offices"
        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Select your office
      </label>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <textarea 
        v-model="description" 
        id="message" 
        rows="4" 
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
        placeholder=" " 
        required
      ></textarea>
      <label for="message" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
    </div>

    <div class="relative z-0 w-full mb-5 group">
      <input 
        id="user_photo" 
        type="file" 
        @change="handleFileChange" 
        class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
        required accept="image/*"
      />
      <label for="user_photo" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Upload a photo of found item</label>
      <div class="mt-1 text-sm text-gray-500 dark:text-gray-400" id="user_photo_help">A profile picture of the found item is useful to identify it.</div>
    </div>

    <div class="w-full flex justify-center mt-6">
      <button 
        type="submit" 
        id="submit_button" 
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { useAuthStore } from '../../stores/AuthStore';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const toast = useToast();

const router = useRouter();
const name = ref('');
const category = ref('');
const foundPlace = ref('');
const foundDate = ref('');
const office = ref('');
const description = ref('');
const offices = ref([]);
const photo = ref('');

const formData = new FormData();

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      photo.value = reader.result.split(',')[1]; 
    };
    reader.readAsDataURL(file);
  }
  formData.append("file", file)
};

const submitForm = async () => {
    const dtoBlob = new Blob([JSON.stringify({
      name: name.value,
      category: category.value,
      foundPlace: foundPlace.value,
      foundDate: foundDate.value,
      office: office.value?.address,
      description: description.value
    })], { type: 'application/json' });
    
    formData.append("dto", dtoBlob, "dto.json");

    try{
    await axios.post('/api/found_items/submit', formData, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
        'Content-Type': 'multipart/form-data',
      },

    });
    toast.success('Form submitted successfully!');
    clearForm();
    router.push('/found')
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred.';
    toast.error(`Error submitting item: ${errorMessage}`);
  }
};


const fetchOffices = async () => {
  try {
    const response = await axios.get('/api/offices');
    offices.value = response.data;
  } catch (error) {
    toast.error('Failed to fetch offices.');
    console.error(error);
  }
};

const clearForm = () => {
  name.value = '';
  category.value = '';
  foundPlace.value = '';
  foundDate.value = '';
  office.value = '';
  description.value = '';
  photo.value = '';
};

fetchOffices();


onMounted(() =>{
    if(authStore.getToken === null){
        router.push('/login');
    }
}
)
</script>