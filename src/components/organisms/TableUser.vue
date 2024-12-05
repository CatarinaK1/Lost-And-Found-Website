<script setup>
import { ref, defineProps, onMounted, computed } from 'vue';
import axios from 'axios';
import user from '@/assets/images/user.png';
import ErrorModal from '../molecules/ErrorModal.vue';
import { useAuthStore } from '../../stores/AuthStore';
import { useToast } from 'vue-toastification';

const toast = useToast();
const authStore = useAuthStore();
const editMode = ref(false);
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

const selectedCountry = ref();

const priorityCountries = ['Austria', 'Germany', 'Switzerland'];
const search = ref(null);
const initial_data = ref([])
const data = computed(() => {
  if (selectedCountry.value) {return [];}

  if (search.value) {
    return initial_data.value.filter(country =>
      country.name.common.toLowerCase().includes(search.value.toLowerCase())
    );
  } else {

    const priorityList = initial_data.value.filter( country =>
      priorityCountries.includes(country.name.common)
    );
    const otherCountries = initial_data.value.filter(
      country => !priorityCountries.includes(country.name.common)
    );
    return [...priorityList, ...otherCountries];
  }
});


onMounted(async() => {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/all`);
    initial_data.value = res.data.sort((a, b) => {

      if(priorityCountries.includes(a.name.common) && priorityCountries.includes(b.name.common)){
        return priorityCountries.indexOf(a.name.common) - priorityCountries.indexOf(b.name.common);
      }

      else if(priorityCountries.includes(a.name.common)){
        return -1;
      } else if(priorityCountries.includes(b.name.common)){
        return 1;
      }
      return a.name.common.localeCompare(b.name.common);

    });
     
  } catch (err) {
    console.error('Error! Could not reach the API:', err); 
  }
  userDetailsFull.value = props.userDetail;
  name.value = props.userDetail.name;
  surname.value = props.userDetail.surname;
  salutation.value = props.userDetail.salutation;
  country.value = props.userDetail.country;
});

const setSearch = (value) =>{
  search.value = value;
  selectedCountry.value = value;
}


const handleInput = () => {
  selectedCountry.value = null;
};


const fetchData = async () => {
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
};


const uploadPhoto = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post('/api/userphotos', formData, {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
          'Content-Type': 'multipart/form-data'
        }});      
      if (response.status === 201) {
        console.log('Photo uploaded successfully');
        await fetchData();
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
    const response = await axios.delete('/api/userphotos', {
      headers: {
        Authorization: `Bearer ${authStore.getToken}`,
      },
    });
    if (response.status === 200) {
      userDetailsFull.value.photo = null;
      console.log('Photo deleted successfully');
      await fetchData();
    } else {
      console.error("Failed to delete photo");
    }
  } catch (error) {
    modalError.value = error.response.statusText;
    isModalOpen.value = true;
    console.error("Error deleting photo:", modalError.value);
  }
};


const name = ref();
const surname = ref();
const salutation = ref();
const country = ref();
const personalizedSalutation = ref();


const handleChangeDetails = async() => {
  editMode.value = true;
}

const handleSubmit = async () => {
  country.value = selectedCountry.value || country.value
    try {
      const updUser = {
          username: userDetailsFull.value?.username,
          name : name.value,
          surname : surname.value,
          mail : userDetailsFull.value?.mail,
          photo: userDetailsFull.value?.photo,
          salutation: personalizedSalutation.value || salutation.value,
          country: country.value
      }
      await axios.put('./api/users', updUser, {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
      });
      editMode.value = false;
      fetchData();
    }  catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if(error.response.request.status === 400){
            toast.error('Fill all the fields')
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
  <div v-if="editMode" class="bg-my-green rounded-xl relative">
    <div v-if="userDetailsFull" class="flex justify-center items-center bg-gray-100 mt-4 mb-4">
    <div class="bg-my-green text-my-white rounded-lg shadow-md w-auto">
      <div class="flex flex-col justify-center items-center">
      <div class="mb-4 mt-6 text-my-white font-bold text-lg flex flex-col justify-center items-center">
        Update data
      </div>
      <div class="mb-6 mt-2 flex flex-col justify-center items-center">
        
        <form @submit.prevent="handleSubmit" class="bg-my-green rounded px-10">
          <table class="table-auto w-full">
          <tbody>
          <tr>
            <td class="pr-4">Username:</td>
            <td class="text-right">{{ userDetailsFull.username }}</td>
          </tr>
          <tr>
            <td class="pr-4 py-3">Name:</td>
            <td class="text-right">
             <input
                type="text"
                id="name"
                v-model="name"
                class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 text-my-gray focus:ring-my-green placeholder-my-gray text-xs"
                placeholder="Enter your name" required
              />
            </td>
          </tr>
          <tr>
            <td class="pr-4 py-3">Surname:</td>
            <td class="text-right">
             <input
                type="text"
                id="surname"
                v-model="surname"
                class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 f text-my-gray ocus:ring-my-green placeholder-my-gray text-xs"
                placeholder="Enter your name" required
              />
            </td>
          </tr>
          <tr>
            <td class="pr-4">Email:</td>
            <td class="text-right">{{ userDetailsFull.mail }}</td>
          </tr>
          <tr>
            <td class="pr-4 py-3">Salutation:</td>
            <td class="text-right">
            <div v-if="salutation != 'other'">
            <select id="salutation" name="salutation" v-model="salutation" placeholder="Choose salutation" class="border text-my-gray border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs">
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
              <option value="Mr">Mr</option>
              <option value="other">Other</option>
              <option value="I prefer not to answer">I prefer not to answer</option>
            </select>
            </div>
            <div v-else class="flex flex-col space-y-2 py-3">
              <input placeholder="Specify the salutation" 
                id="personalizedSalutation" 
                name="personalizedSalutation" 
                v-model="personalizedSalutation" 
                class="border border-gray-300 p-2 w-full rounded text-my-gray focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs" >
                <select id="salutation" name="salutation" v-model="salutation" placeholder="Choose salutation" class="border text-my-gray border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs">
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
              <option value="Mr">Mr</option>
              <option value="other">Other</option>
              <option value="I prefer not to answer">I prefer not to answer</option>
            </select>
              </div>
            </td>
          </tr>
          <tr>
            <td class="pr-4 py-3">Country:</td>
            <td class="text-right">
              <input id="search" v-model="search" @input="handleInput"  class="border text-my-gray border-gray-300 mb-2 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs" />
                <div v-if="data.length > 0" id="dropdown" class="bg-my-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 max-h-40 overflow-y-auto">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li  v-for="item in data" :key="item.name" @click="setSearch(item.name.common)"class="px-4 py-2 text-xs">{{ item?.name?.common }}</li>
                  </ul>
                </div>
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
    <div v-else class="bg-my-green rounded-xl relative">
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
      <div class="flex flex-col justify-center items-center py-2">
        <button @click="handleChangeDetails" class="bg-my-white text-my-green text-sm font-bold rounded-lg shadow-md p-2 hover:bg-gray-900 hover:text-white transition duration-300">Update your data</button>
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
          <tr>
            <td class="pr-4">Salutation:</td>
            <td class="text-right">{{ userDetailsFull.salutation }}</td>
          </tr>
          <tr>
            <td class="pr-4">Country:</td>
            <td class="text-right">{{ userDetailsFull.country }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
    </div>
  
</template>
