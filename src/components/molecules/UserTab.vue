<script setup>
import { ref, defineProps, onMounted , computed } from 'vue';
import axios from 'axios';
import minusw from "@/assets/images/minusw.png"
import user from '@/assets/images/user.png'
import minusr from "@/assets/images/minusr.png"
import wpen from "@/assets/images/whitepen.png"
import rpen from "@/assets/images/redpen.png"
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../../stores/AuthStore';
import { defineEmits } from 'vue';

const authStore = useAuthStore();


const emit = defineEmits(["changed"]);
const toast = useToast();

const dictionary = ref({
      surname: "",
      name: "",
      username: "",
      mail: "",
      country: ""
});


const selectedCountry = ref();
const priorityCountries = ['Austria', 'Germany', 'Switzerland'];
const search = ref(null);
const initial_data = ref([])

const setSearch = (value_code, value_name) =>{
  search.value = value_name;
  selectedCountry.value = value_code;
  dictionary.country = selectedCountry.value
}

const handleInput = () => {
  selectedCountry.value = null;
};


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

const res = ref();

onMounted(async() => {
  try {
    res.value = await axios.get(`https://restcountries.com/v3.1/all`);
    initial_data.value = res.value.data.sort((a, b) => {

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

    search.value = getCountryNameByCCA2(selectedCountry.value);
    
  } catch (err) {
    console.error('Error! Could not reach the API:', err); 
  }})

const hover = ref(false);
const hoverr = ref(false);
const props = defineProps({
  data: Object,
});

const showOptions = ref(false);
const editField = ref(null);
const updatedValue = ref("");


const editMode = ref(false);

const toggleEditMode = (field) => {
  editField.value = field;
  updatedValue.value = props.data[field];
};

const toggle = () => {
  hover.value = false;
  hoverr.value = false;
  showOptions.value = !showOptions.value;
};

const editModeOn = () => {
  editMode.value = !editMode.value;
  hoverr.value = false;
  hover.value = false;
  showOptions.value = true;
};

const cancelEdit = () => {
  updatedValue.value = props.data[editField.value]; // reset input
  editField.value = null;
  editMode.value = false;
};

const getCountryNameByCCA2 = (cca2Code) => {
  try{
    const found_country = res.value.data.find(country => country.cca2 === cca2Code.toUpperCase());
    country.value = found_country.name.common;
    return found_country.name.common;
  }catch{
    return "";
  } 
}

const saveChanges = async (field) => {
  try {

    if(field === "country"){
      dictionary.value[field] = selectedCountry.value;
    }

    const updatedData = {
      [field]: dictionary.value[field],
    };

    const token = authStore.getToken;
    if (!token || token.split(".").length !== 3) {
      toast.error("Invalid or missing authentication token.");
      return;
    }
    await axios.patch(`/api/users/${props.data.username}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success(`${field} updated successfully!`);
    editField.value = null;
    editMode.value = false;
    emit("changed");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.request.status === 400) {
          toast.error(`Error updating ${field}`);
        } 
        else if(error.response.request.status === 409){
          toast.error(`Provided ${field} cannot be taken`);
        }
        else {
          toast.error("Error " + error.response.request.status);
        }
      } else if (error.request) {
        toast.error("Server does not respond.");
      } else {
        toast.error(`Error: ${error.message}`);
        console.log("Error");
      }
    } else {
      toast.error(`Error: ${error.message}`);
      console.log("Error");
    }
  }
};


const deleteUser = async() =>{
    try{
        await axios.delete('/api/users',{
      data: props.data.username,
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
      }
      })
      emit('changed');
      editMode.value = false
    }  catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if(error.response.request.status === 400){
            toast.error('Fill all the fields including uploading the picture')
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

}

const country = ref("")

const deletePhoto = async() => {
    try {
      await axios.delete(`/api/userphotos/${props.data.username}`, {
        headers: {
          'Authorization': `Bearer ${authStore.getToken}`,
        }
      });
      emit('changed');
      editMode.value = false;
    }  catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error('Error ' + error.response.request.status);
    
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
}

</script>
<template>
    <div class="max-w-lg flex flex-col border-2 rounded-lg border-my-green text-my-white p-2 mb-4 bg-my-green">
        <div v-if="showOptions" class="flex flex-col justify-center items-center space-y-2 py-2">
        <div v-if="props.data.photo" class="flex flex-col justify-center items-center py-2">
            <div v-if="editMode" class="mb-1 mt-1 flex flex-col items-center">
                <img :src="'data:image/jpeg;base64,' + props.data.photo" alt="Image" class="rounded lg mb-2 h-40 w-auto border border-my-green"/>
                <button type="button" @click="deletePhoto" class="bg-my-green text-my-white text-xs rounded w-full border border-my-white p-2 hover:bg-gray-900 hover:text-white transition duration-300">Delete photo</button> 
            </div>
            <div v-else>
                <img  :src="'data:image/jpeg;base64,' + props.data.photo" alt="Image" class="w-32 h-32 rounded-full mb-4 object-cover" />
            </div>
            </div>
        <div v-else class="flex flex-col justify-center items-center py-2">
          <img :src="user" alt="Default Profile Image" class="w-32 h-32 rounded-full mb-2 object-cover" />
        </div>
        <div v-if="editMode">
          <table class="table-auto w-full">
          <tbody>
          <tr>
            <td class="pr-4 py-3">Name:</td>
            <td class="text-right">
              <div class="flex items-center">
                <input
                type="text"
                id="name"
                v-model="dictionary.name"
                class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 text-my-gray focus:ring-my-green placeholder-my-gray text-xs"
                placeholder="Enter your name" required
              />
              <button
                  @click="saveChanges('name')"
                  class="ml-2 bg-my-green text-my-white px-2 py-1 rounded"
              >
                Save
              </button>
              </div>
             
            </td>
          </tr>
          <tr>
            <td class="pr-4 py-3">Surname:</td>
            <td class="text-right">
              <div class="flex items-center">
                <input
                type="text"
                id="surname"
                v-model="dictionary.surname"
                class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 text-my-gray focus:ring-my-green placeholder-my-gray text-xs"
                placeholder="Enter your surname" required
              />
              <button
                  @click="saveChanges('surname')"
                  class="ml-2 bg-my-green text-my-white px-2 py-1 rounded"
              >
                Save
              </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="pr-4 py-3">Username:</td>
            <td class="text-right">
              <div class="flex items-center">
                <input
                type="text"
                id="username"
                v-model="dictionary.username"
                class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 text-my-gray focus:ring-my-green placeholder-my-gray text-xs"
                placeholder="Enter your username" required
              />
              <button
                  @click="saveChanges('username')"
                  class="ml-2 bg-my-green text-my-white px-2 py-1 rounded"
              >
                Save
              </button>
              </div>
             
            </td>
          </tr>
          <tr>
            <td class="pr-4 py-3">Email:</td>
            <td class="text-right">
              <div class="flex items-center">
                <input
                type="text"
                id="mail"
                v-model="dictionary.mail"
                class="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 text-my-gray focus:ring-my-green placeholder-my-gray text-xs"
                placeholder="Enter your email" required
              />
              <button
                  @click="saveChanges('mail')"
                  class="ml-2 bg-my-green text-my-white px-2 py-1 rounded"
              >
                Save
              </button>
              </div>
             
            </td>
          </tr>
          <tr>
            <td class="pr-4 py-3">Country:</td>
            <td class="text-right">
              <div class="flex items-center">
              <div>
                <input id="search" v-model="search" @input="handleInput"  class="border text-my-gray border-gray-300 mb-2 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-my-green placeholder-my-gray text-xs" />
                <div v-if="data.length > 0" id="dropdown" class="bg-my-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 max-h-40 overflow-y-auto">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li  v-for="item in data" :key="item.name" @click="setSearch(item.cca2, item.name.common)"class="px-4 py-2 text-xs">{{ item?.name?.common }}</li>
                  </ul>
                </div>
              </div>
              <button
                  @click="saveChanges('country')"
                  class="ml-2 bg-my-green text-my-white px-2 py-1 rounded"
              >
                Save
              </button>
              </div>
            </td>
          </tr>
          </tbody>
          </table>


        <div class="flex justify-center items-center space-x-4 py-2">
            <button @mouseover="hover = true" @mouseleave="hover = false" @click="deleteUser" class="flex items-center">
                <img class="w-5 h-5" :src="hover ? minusr : minusw">
            </button>
            <button @mouseover="hoverr = true" @mouseleave="hoverr = false" @click="editModeOn" class="flex items-center">
                <img class="w-5 h-5" :src="hoverr ? wpen : rpen">
            </button>
          </div>
        </div>
        <div v-else>
        <div class="w-full text-center mb-2">Name: {{ props.data.name }}</div>
        <div class="w-full text-center mb-2">Surname: {{ props.data.surname }}</div>
        <div class="w-full text-center mb-2">Username: {{ props.data.username }}</div>
        <div class="w-full text-center mb-2">Email: {{ props.data.mail }}</div>
        <div class="w-full text-center mb-2">Salutation: {{ props.data.salutation }}</div>
        <div class="w-full text-center mb-2">Country: {{ getCountryNameByCCA2(props.data.country) }}</div>
        <div class="flex justify-center items-center space-x-4 py-2">
            <button @mouseover="hover = true" @mouseleave="hover = false" @click="deleteUser" class="flex items-center">
                <img class="w-5 h-5" :src="hover ? minusr : minusw">
            </button>
            <button @mouseover="hoverr = true" @mouseleave="hoverr = false" @click="editModeOn" class="flex items-center">
                <img class="w-5 h-5" :src="hoverr ? rpen : wpen">
            </button>
            <button @click="toggle" class="flex items-center">
                Less
            </button>
        </div>
        </div>
        </div>
        <div v-else class="flex justify-between items-center space-x-4 py-2">
    <div class='font-bold flex items-center mr-8'>
        {{ props.data.name }} {{ props.data.surname }}
    </div>
    <div class="flex items-center space-x-2">
        <button @mouseover="hover = true" @mouseleave="hover = false" @click="deleteUser" class="flex items-center">
            <img class="w-5 h-5" :src="hover ? minusr : minusw">
        </button>
        <button @mouseover="hoverr = true" @mouseleave="hoverr = false" @click="editModeOn" class="flex items-center">
            <img class="w-5 h-5" :src="hoverr ? rpen : wpen">
        </button>
        <button @click="toggle" class="flex items-center">
            More
        </button>
    </div>
</div>
        
    </div>
    
</template>